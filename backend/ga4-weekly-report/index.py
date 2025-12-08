"""
Business: Collect GA4 analytics weekly, calculate CR/drop-off/best traffic source, send Telegram report
Args: event with httpMethod or scheduled trigger; context with request_id
Returns: HTTP response with report status or Telegram delivery confirmation
Updated: Redeploy with new GA4_PROPERTY_ID
"""

import os
import json
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    is_scheduled = event.get('messages') is not None or event.get('trigger') is not None
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS' and not is_scheduled:
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    try:
        ga4_property_id = os.environ.get('GA4_PROPERTY_ID')
        ga4_credentials = os.environ.get('GA4_CREDENTIALS_JSON')
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if not all([ga4_property_id, ga4_credentials, telegram_token, telegram_chat_id]):
            missing = []
            if not ga4_property_id: missing.append('GA4_PROPERTY_ID')
            if not ga4_credentials: missing.append('GA4_CREDENTIALS_JSON')
            if not telegram_token: missing.append('TELEGRAM_BOT_TOKEN')
            if not telegram_chat_id: missing.append('TELEGRAM_CHAT_ID')
            
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Missing secrets',
                    'missing': missing,
                    'message': 'Please add secrets via project settings'
                })
            }
        
        try:
            credentials = json.loads(ga4_credentials)
            print(f"DEBUG Service Account Email: {credentials.get('client_email', 'NOT FOUND')}")
        except json.JSONDecodeError:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Invalid GA4_CREDENTIALS_JSON format',
                    'message': 'Please provide valid JSON credentials'
                })
            }
        
        access_token = get_ga4_access_token(credentials)
        
        print(f'Using GA4 Property ID: {ga4_property_id}')
        
        end_date = datetime.now()
        start_date = end_date - timedelta(days=7)
        
        metrics_data = fetch_ga4_metrics(
            access_token, 
            ga4_property_id,
            start_date.strftime('%Y-%m-%d'),
            end_date.strftime('%Y-%m-%d')
        )
        
        report = generate_report(metrics_data, start_date, end_date)
        
        send_telegram_message(telegram_token, telegram_chat_id, report)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Weekly report sent to Telegram',
                'report_preview': report[:200] + '...'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': str(e),
                'type': type(e).__name__
            })
        }


def get_ga4_access_token(credentials: Dict[str, str]) -> str:
    import jwt
    import time
    
    now = int(time.time())
    payload = {
        'iss': credentials['client_email'],
        'scope': 'https://www.googleapis.com/auth/analytics.readonly',
        'aud': 'https://oauth2.googleapis.com/token',
        'iat': now,
        'exp': now + 3600
    }
    
    signed_jwt = jwt.encode(payload, credentials['private_key'], algorithm='RS256')
    
    data = urllib.parse.urlencode({
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': signed_jwt
    }).encode('utf-8')
    
    req = urllib.request.Request(
        'https://oauth2.googleapis.com/token',
        data=data,
        headers={'Content-Type': 'application/x-www-form-urlencoded'}
    )
    
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        return result['access_token']


def fetch_ga4_metrics(access_token: str, property_id: str, start_date: str, end_date: str) -> Dict[str, Any]:
    print("DEBUG GA4 PROPERTY ID:", property_id)
    url = f'https://analyticsdata.googleapis.com/v1beta/properties/{property_id}:runReport'
    print("DEBUG GA4 URL:", url)
    print(f"DEBUG Access Token (first 20 chars): {access_token[:20]}...")
    print(f"DEBUG Date Range: {start_date} to {end_date}")
    
    request_body = {
        'dateRanges': [{'startDate': start_date, 'endDate': end_date}],
        'dimensions': [
            {'name': 'eventName'},
            {'name': 'sessionSource'},
            {'name': 'sessionMedium'},
            {'name': 'sessionCampaignName'}
        ],
        'metrics': [{'name': 'eventCount'}],
        'dimensionFilter': {
            'filter': {
                'fieldName': 'eventName',
                'inListFilter': {
                    'values': [
                        'page_view',
                        'engaged_scroll',
                        'view_item',
                        'begin_checkout',
                        'generate_lead'
                    ]
                }
            }
        }
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(request_body).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
    )
    
    print(f"DEBUG Request Body: {json.dumps(request_body, indent=2)}")
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"DEBUG GA4 Response (first 500 chars): {str(result)[:500]}")
            return result
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f'=== GA4 API ERROR DETAILS ===')
        print(f'HTTP Status Code: {e.code}')
        print(f'Error Response: {error_body}')
        print(f'Request URL: {url}')
        print(f'Property ID: {property_id}')
        print(f'Date Range: {start_date} to {end_date}')
        
        try:
            error_json = json.loads(error_body)
            if 'error' in error_json:
                print(f"Error Code: {error_json['error'].get('code', 'N/A')}")
                print(f"Error Message: {error_json['error'].get('message', 'N/A')}")
                print(f"Error Status: {error_json['error'].get('status', 'N/A')}")
                if 'details' in error_json['error']:
                    print(f"Error Details: {json.dumps(error_json['error']['details'], indent=2)}")
        except:
            pass
        
        print(f'=== END ERROR DETAILS ===')
        
        if e.code == 404:
            raise Exception(f'GA4 Property not found (404). Check: 1) Property ID={property_id} is correct in GA4 console, 2) Service account has access. Full error: {error_body}')
        elif e.code == 403:
            raise Exception(f'GA4 Access denied (403). Service account email needs "Viewer" or "Administrator" role in GA4 property {property_id}. Check: 1) Correct property selected, 2) Permissions applied (may take 5-10 min). Full error: {error_body}')
        else:
            raise Exception(f'GA4 API Error {e.code}: {error_body}')


def generate_report(metrics_data: Dict[str, Any], start_date: datetime, end_date: datetime) -> str:
    events_count = {
        'page_view': 0,
        'engaged_scroll': 0,
        'view_item': 0,
        'begin_checkout': 0,
        'generate_lead': 0
    }
    
    utm_sources = {}
    
    rows = metrics_data.get('rows', [])
    
    # Check if no data available
    if not rows:
        print("WARNING: No GA4 data found for the specified period")
        return f"""📊 Еженедельный отчёт GA4
Период: {start_date.strftime('%d.%m.%Y')} - {end_date.strftime('%d.%m.%Y')}

⚠️ Нет данных за выбранный период.

Возможные причины:
• Трекинг GA4 не установлен на сайте
• Сайт не получал посетителей за последние 7 дней
• GA4 ещё обрабатывает данные (обычно задержка до 24-48 часов)

Проверьте установку кода отслеживания GA4 на сайте."""
    
    for row in rows:
        event_name = row['dimensionValues'][0]['value']
        source = row['dimensionValues'][1]['value']
        medium = row['dimensionValues'][2]['value']
        campaign = row['dimensionValues'][3]['value']
        count = int(row['metricValues'][0]['value'])
        
        if event_name in events_count:
            events_count[event_name] += count
        
        if event_name in ['begin_checkout', 'generate_lead']:
            utm_key = f"{source} / {medium}"
            if utm_key not in utm_sources:
                utm_sources[utm_key] = 0
            utm_sources[utm_key] += count
    
    page_views = events_count['page_view']
    engaged = events_count['engaged_scroll']
    viewed_form = events_count['view_item']
    bot_opens = events_count['begin_checkout']
    form_submits = events_count['generate_lead']
    
    total_conversions = bot_opens + form_submits
    
    cr_overall = round((total_conversions / page_views * 100), 2) if page_views > 0 else 0
    cr_form = round((form_submits / viewed_form * 100), 2) if viewed_form > 0 else 0
    cr_bot = round((bot_opens / page_views * 100), 2) if page_views > 0 else 0
    
    dropoff_engagement = round(((page_views - engaged) / page_views * 100), 2) if page_views > 0 else 0
    dropoff_form_view = round(((engaged - viewed_form) / engaged * 100), 2) if engaged > 0 else 0
    dropoff_conversion = round(((viewed_form - total_conversions) / viewed_form * 100), 2) if viewed_form > 0 else 0
    
    best_source = max(utm_sources.items(), key=lambda x: x[1]) if utm_sources else ('N/A', 0)
    
    engaged_pct = (engaged/page_views*100) if page_views > 0 else 0
    viewed_form_pct = (viewed_form/page_views*100) if page_views > 0 else 0
    form_submits_pct = (form_submits/total_conversions*100) if total_conversions > 0 else 0
    bot_opens_pct = (bot_opens/total_conversions*100) if total_conversions > 0 else 0
    
    report = f"""📊 <b>Еженедельный отчёт GA4</b>
📅 {start_date.strftime('%d.%m.%Y')} - {end_date.strftime('%d.%m.%Y')}

<b>📈 Воронка:</b>
1️⃣ page_view: {page_views:,}
2️⃣ engaged_scroll: {engaged:,} ({engaged_pct:.1f}% от входа)
3️⃣ view_item (форма): {viewed_form:,} ({viewed_form_pct:.1f}% от входа)
4️⃣ Конверсии:
   • generate_lead: {form_submits:,}
   • begin_checkout: {bot_opens:,}
   📍 Всего: {total_conversions:,}

<b>🎯 Конверсии (CR):</b>
• Общий CR: {cr_overall:.2f}%
• CR формы: {cr_form:.2f}%
• CR Telegram-бота: {cr_bot:.2f}%

<b>⚠️ Drop-off (потери):</b>
• Шаг 1→2: {dropoff_engagement:.1f}% (не прокрутили)
• Шаг 2→3: {dropoff_form_view:.1f}% (не дошли до формы)
• Шаг 3→4: {dropoff_conversion:.1f}% (не конвертировали)

<b>🏆 Лучший источник:</b>
{best_source[0]}: {best_source[1]:,} конверсий

<b>📌 Типы лидов:</b>
• Консультация: {form_submits:,} ({form_submits_pct:.1f}%)
• Telegram-бот: {bot_opens:,} ({bot_opens_pct:.1f}%)

<b>🔝 ТОП-3 источника трафика:</b>"""
    
    sorted_sources = sorted(utm_sources.items(), key=lambda x: x[1], reverse=True)[:3]
    for i, (source, count) in enumerate(sorted_sources, 1):
        report += f"\n{i}. {source}: {count:,}"
    
    report += f"\n\n✅ Отчёт сгенерирован автоматически"
    
    return report


def send_telegram_message(bot_token: str, chat_id: str, message: str) -> None:
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    print(f"DEBUG Telegram: Sending to chat_id={chat_id}, token length={len(bot_token)}")
    print(f"DEBUG Telegram URL (masked): https://api.telegram.org/bot{'*'*20}/sendMessage")
    
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'HTML'
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data)
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"DEBUG Telegram response: {result}")
            if not result.get('ok'):
                raise Exception(f"Telegram API error: {result}")
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"=== TELEGRAM API ERROR ===")
        print(f"Status Code: {e.code}")
        print(f"Error: {error_body}")
        print(f"Chat ID: {chat_id}")
        print(f"Token valid format: {bot_token.count(':') == 1 and len(bot_token) > 40}")
        print(f"=== END TELEGRAM ERROR ===")
        raise Exception(f"Telegram API Error {e.code}: {error_body}. Check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID secrets.")