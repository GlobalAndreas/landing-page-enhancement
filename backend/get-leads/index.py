import json
import os
import psycopg2
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Бизнес: Получение списка лидов из базы данных
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с request_id и другими атрибутами
    Returns: HTTP response dict с массивом лидов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    
    try:
        with conn.cursor() as cur:
            cur.execute('''
                SELECT 
                    id, timestamp, date, name, contact, niche, goal,
                    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                    page_depth, time_on_page, device, referrer
                FROM leads
                ORDER BY timestamp DESC
            ''')
            
            rows = cur.fetchall()
            leads: List[Dict[str, Any]] = []
            
            for row in rows:
                leads.append({
                    'id': row[0],
                    'timestamp': row[1],
                    'date': row[2],
                    'name': row[3],
                    'contact': row[4],
                    'niche': row[5],
                    'goal': row[6],
                    'utmSource': row[7] or '',
                    'utmMedium': row[8] or '',
                    'utmCampaign': row[9] or '',
                    'utmContent': row[10] or '',
                    'utmTerm': row[11] or '',
                    'pageDepth': row[12],
                    'timeOnPage': row[13],
                    'device': row[14],
                    'referrer': row[15] or ''
                })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'leads': leads}),
            'isBase64Encoded': False
        }
    finally:
        conn.close()
