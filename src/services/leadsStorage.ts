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

const LEADS_STORAGE_KEY = 'landing_leads';

export const saveLead = (lead: Omit<Lead, 'id' | 'timestamp' | 'date'>): void => {
  try {
    const leads = getLeads();
    const timestamp = Date.now();
    const newLead: Lead = {
      ...lead,
      id: `lead_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      date: new Date(timestamp).toLocaleString('ru-RU'),
    };
    
    leads.push(newLead);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
  } catch (error) {
    console.error('Error saving lead:', error);
  }
};

export const getLeads = (): Lead[] => {
  try {
    const storedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
    return storedLeads ? JSON.parse(storedLeads) : [];
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
};

export const clearLeads = (): void => {
  localStorage.removeItem(LEADS_STORAGE_KEY);
};

export const exportLeadsToJSON = (): void => {
  const leads = getLeads();
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

export const exportLeadsToCSV = (): void => {
  const leads = getLeads();
  
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