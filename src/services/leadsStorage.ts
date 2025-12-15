import func2url from '@/../backend/func2url.json';

export interface Lead {
  id: string;
  timestamp: number;
  date: string;
  name: string;
  contact: string;
  niche: string;
  goal: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  pageDepth: number;
  timeOnPage: number;
  device: string;
  referrer: string;
}

export const saveLead = async (lead: Omit<Lead, 'id' | 'timestamp' | 'date'>): Promise<void> => {
  try {
    const timestamp = Date.now();
    const leadData = {
      id: `lead_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      date: new Date(timestamp).toLocaleString('ru-RU'),
      name: lead.name,
      contact: lead.contact,
      niche: lead.niche,
      goal: lead.goal,
      utm_source: lead.utmSource,
      utm_medium: lead.utmMedium,
      utm_campaign: lead.utmCampaign,
      utm_content: lead.utmContent,
      utm_term: lead.utmTerm,
      page_depth: lead.pageDepth,
      time_on_page: lead.timeOnPage,
      device: lead.device,
      referrer: lead.referrer,
    };

    const response = await fetch(func2url['save-lead'], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save lead: ${response.status}`);
    }
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
};

export const getLeads = async (): Promise<Lead[]> => {
  try {
    const url = func2url['get-leads'];
    if (!url) {
      console.warn('get-leads URL not found in func2url.json');
      return [];
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      console.warn(`get-leads returned ${response.status}`);
      return [];
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('get-leads response is not JSON');
      return [];
    }
    
    const data = await response.json();
    return data.leads || [];
  } catch (error) {
    console.warn('get-leads fetch failed:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};

export const clearLeads = (): void => {
  console.log('clearLeads is deprecated - leads are now in database');
};

export const exportLeadsToJSON = async (): Promise<void> => {
  const leads = await getLeads();
  const dataStr = JSON.stringify(leads, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `leads_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportLeadsToCSV = async (): Promise<void> => {
  const leads = await getLeads();
  
  if (leads.length === 0) {
    alert('Нет лидов для экспорта');
    return;
  }

  const DELIMITER = ',';
  const LINE_BREAK = '\r\n';
  const BOM = '\uFEFF';

  const headers = [
    'ID',
    'Дата',
    'Имя',
    'Контакт',
    'Скролл',
    'Время',
    'Ниша',
    'Цель',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Content',
    'UTM Term',
    'Реферер',
    'Устройство'
  ];

  const escapeCSV = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === '') {
      return '""';
    }
    const stringValue = String(value);
    const escapedValue = stringValue.replace(/"/g, '""');
    return `"${escapedValue}"`;
  };

  const formatDate = (dateString: string): string => {
    return dateString.replace(',', '');
  };

  const rows = leads.map(lead => [
    lead.id,
    formatDate(lead.date),
    lead.name,
    lead.contact,
    `${lead.pageDepth}%`,
    `${lead.timeOnPage} сек`,
    lead.niche,
    lead.goal,
    lead.utmSource || '',
    lead.utmMedium || '',
    lead.utmCampaign || '',
    lead.utmContent || '',
    lead.utmTerm || '',
    lead.referrer || '',
    lead.device
  ].map(escapeCSV).join(DELIMITER));

  const csvLines = [
    headers.map(escapeCSV).join(DELIMITER),
    ...rows
  ];
  
  const csvContent = BOM + csvLines.join(LINE_BREAK);
  
  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};