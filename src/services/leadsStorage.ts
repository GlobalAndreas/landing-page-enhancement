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

  const headers = [
    'ID',
    'Дата',
    'Имя',
    'Контакт',
    'Ниша',
    'Цель',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Content',
    'UTM Term',
    'Досмотр страницы (%)',
    'Время на сайте (сек)',
    'Устройство',
    'Реферер'
  ];

  const escapeCSV = (value: string | number): string => {
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const rows = leads.map(lead => [
    lead.id,
    lead.date,
    lead.name,
    lead.contact,
    lead.niche,
    lead.goal,
    lead.utmSource || '-',
    lead.utmMedium || '-',
    lead.utmCampaign || '-',
    lead.utmContent || '-',
    lead.utmTerm || '-',
    lead.pageDepth,
    lead.timeOnPage,
    lead.device,
    lead.referrer || '-'
  ].map(escapeCSV).join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');
  const BOM = '\uFEFF';
  const dataBlob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
