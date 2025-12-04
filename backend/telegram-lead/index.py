import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправка уведомлений о новых лидах в Telegram
    '''
    method: str = event.get('httpMethod', 'POST')
    
    # CORS OPTIONS
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
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        # Получаем данные
        body_data = json.loads(event.get('body', '{}'))
        
        # Отправляем в Telegram
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '').strip()
        chat_id = os.environ.get('TELEGRAM_CHAT_ID', '').strip()
        
        if not bot_token or not chat_id:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'error': 'Telegram credentials not configured',
                    'debug': {
                        'bot_token_exists': bool(bot_token),
                        'chat_id_exists': bool(chat_id)
                    }
                }),
                'isBase64Encoded': False
            }
        
        # Формируем сообщение
        message = f"""🎯 Новая заявка с сайта!

👤 Имя: {body_data.get('name', 'Не указано')}
📱 Контакт: {body_data.get('contact', 'Не указан')}
🎨 Ниша: {body_data.get('niche', 'Не указана')}
🎯 Цель: {body_data.get('goal', 'Не указана')}

📊 Аналитика:
• Скролл: {body_data.get('pageDepth', 0)}%
• Время: {body_data.get('timeOnPage', 0)} сек
• Устройство: {body_data.get('device', 'Неизвестно')}

🔗 UTM-метки:
• Source: {body_data.get('utmSource', '-')}
• Medium: {body_data.get('utmMedium', '-')}
• Campaign: {body_data.get('utmCampaign', '-')}
• Content: {body_data.get('utmContent', '-')}
• Term: {body_data.get('utmTerm', '-')}

📍 Реферер: {body_data.get('referrer', 'Прямой переход')}
"""
        
        url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        payload = {
            'chat_id': chat_id,
            'text': message
        }
        
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=data, method='POST')
        req.add_header('Content-Type', 'application/json')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            response_data = json.loads(response.read().decode('utf-8'))
            
            if not response_data.get('ok'):
                raise Exception(f"Telegram API error: {response_data.get('description', 'Unknown error')}")
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Notification sent'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }