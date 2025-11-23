import { utmTracker } from './utm';
import { pageTracker } from './pageTracking';

export interface LeadData {
  name: string;
  contact: string;
  niche: string;
  goal: string;
  timestamp?: number;
}

export interface TelegramNotifyPayload extends LeadData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  pageDepth: number;
  timeOnPage: number;
  device: string;
  referrer: string;
  timestamp: number;
}

export async function sendTelegramNotification(leadData: LeadData): Promise<boolean> {
  const utmParams = utmTracker.getUTMParams();
  
  const payload: TelegramNotifyPayload = {
    ...leadData,
    ...utmParams,
    pageDepth: pageTracker.getMaxScrollDepth(),
    timeOnPage: pageTracker.getTimeOnPage(),
    device: pageTracker.getDevice(),
    referrer: pageTracker.getReferrer(),
    timestamp: Date.now(),
  };

  try {
    const response = await fetch('/tg_notify.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Failed to send notification', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending telegram notification:', error);
    return false;
  }
}

export function saveLeadToLocalStorage(leadData: LeadData): void {
  try {
    const leads = getLeadsFromLocalStorage();
    const utmParams = utmTracker.getUTMParams();
    
    const enrichedLead: TelegramNotifyPayload = {
      ...leadData,
      ...utmParams,
      pageDepth: pageTracker.getMaxScrollDepth(),
      timeOnPage: pageTracker.getTimeOnPage(),
      device: pageTracker.getDevice(),
      referrer: pageTracker.getReferrer(),
      timestamp: Date.now(),
    };
    
    leads.push(enrichedLead);
    localStorage.setItem('leads_data', JSON.stringify(leads));
  } catch (e) {
    console.error('Failed to save lead', e);
  }
}

export function getLeadsFromLocalStorage(): TelegramNotifyPayload[] {
  try {
    const stored = localStorage.getItem('leads_data');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load leads', e);
    return [];
  }
}

export function exportLeadsToCSV(): void {
  const leads = getLeadsFromLocalStorage();
  
  if (leads.length === 0) {
    alert('Нет данных для экспорта');
    return;
  }

  const headers = [
    'Дата и время',
    'Имя',
    'Контакт',
    'Ниша',
    'Цель',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Content',
    'UTM Term',
    'Прокрутка страницы (%)',
    'Время на сайте (сек)',
    'Устройство',
    'Источник трафика'
  ];

  const rows = leads.map(lead => [
    new Date(lead.timestamp).toLocaleString('ru-RU'),
    lead.name,
    lead.contact,
    lead.niche,
    lead.goal,
    lead.utmSource || '',
    lead.utmMedium || '',
    lead.utmCampaign || '',
    lead.utmContent || '',
    lead.utmTerm || '',
    lead.pageDepth,
    lead.timeOnPage,
    lead.device,
    lead.referrer
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `leads_${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportLeadsToJSON(): void {
  const leads = getLeadsFromLocalStorage();
  
  if (leads.length === 0) {
    alert('Нет данных для экспорта');
    return;
  }

  const jsonContent = JSON.stringify(leads, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `leads_${Date.now()}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
