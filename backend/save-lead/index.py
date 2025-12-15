import json
import os
import psycopg2
from typing import Dict, Any
from pydantic import BaseModel, Field, ValidationError

class LeadData(BaseModel):
    id: str = Field(..., min_length=1)
    timestamp: int = Field(..., gt=0)
    date: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1)
    contact: str = Field(..., min_length=1)
    niche: str = Field(..., min_length=1)
    goal: str = Field(..., min_length=1)
    utm_source: str = ''
    utm_medium: str = ''
    utm_campaign: str = ''
    utm_content: str = ''
    utm_term: str = ''
    page_depth: int = Field(..., ge=0, le=100)
    time_on_page: int = Field(..., ge=0)
    device: str = Field(..., pattern='^(mobile|desktop)$')
    referrer: str = ''

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Сохранение лида в базу данных PostgreSQL
    Args: event - dict с httpMethod, body
          context - объект с request_id и другими атрибутами
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    lead = LeadData(**body_data)
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    
    try:
        with conn.cursor() as cur:
            cur.execute('''
                SELECT id FROM leads 
                WHERE contact = %s 
                AND timestamp > %s
                LIMIT 1
            ''', (lead.contact, lead.timestamp - 60000))
            
            if cur.fetchone():
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True, 'duplicate': True, 'id': lead.id}),
                    'isBase64Encoded': False
                }
            
            cur.execute('''
                INSERT INTO leads (
                    id, timestamp, date, name, contact, niche, goal,
                    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                    page_depth, time_on_page, device, referrer
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO NOTHING
            ''', (
                lead.id, lead.timestamp, lead.date, lead.name, lead.contact,
                lead.niche, lead.goal, lead.utm_source, lead.utm_medium,
                lead.utm_campaign, lead.utm_content, lead.utm_term,
                lead.page_depth, lead.time_on_page, lead.device, lead.referrer
            ))
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'id': lead.id}),
            'isBase64Encoded': False
        }
    finally:
        conn.close()