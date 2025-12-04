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
    'Досмотр (%)',
    'Время (сек)',
    'Устройство',
    'Реферер'
  ].map(h => `"${h}"`);

  const escapeCSV = (value: string | number): string => {
    const stringValue = String(value);
    return `"${stringValue.replace(/"/g, '""')}"`;
  };

  const rows = leads.map(lead => [
    escapeCSV(lead.id),
    escapeCSV(lead.date),
    escapeCSV(lead.name),
    escapeCSV(lead.contact),
    escapeCSV(lead.niche),
    escapeCSV(lead.goal),
    escapeCSV(lead.utmSource || '-'),
    escapeCSV(lead.utmMedium || '-'),
    escapeCSV(lead.utmCampaign || '-'),
    escapeCSV(lead.utmContent || '-'),
    escapeCSV(lead.utmTerm || '-'),
    escapeCSV(lead.pageDepth),
    escapeCSV(lead.timeOnPage),
    escapeCSV(lead.device),
    escapeCSV(lead.referrer || '-')
  ].join(','));

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