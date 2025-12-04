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

  // Разделитель для Excel в русской локали
  const DELIMITER = ';';
  // Windows line ending для Excel
  const LINE_BREAK = '\r\n';
  // UTF-8 BOM для корректного отображения кириллицы
  const BOM = '\uFEFF';

  // Заголовки в правильном порядке
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

  // ВСЕГДА оборачиваем значения в кавычки и экранируем внутренние кавычки
  const escapeCSV = (value: string | number): string => {
    const stringValue = String(value);
    // Удваиваем кавычки внутри значения и оборачиваем всё в кавычки
    return `"${stringValue.replace(/"/g, '""')}"`;
  };

  // Формируем строки данных
  const rows = leads.map(lead => [
    lead.id,
    lead.date,
    lead.name,
    lead.contact,
    lead.pageDepth + '%',
    lead.timeOnPage + ' сек',
    lead.niche,
    lead.goal,
    lead.utmSource || '-',
    lead.utmMedium || '-',
    lead.utmCampaign || '-',
    lead.utmContent || '-',
    lead.utmTerm || '-',
    lead.referrer || '-',
    lead.device
  ].map(escapeCSV).join(DELIMITER));

  // Собираем CSV: BOM + заголовки + строки с Windows line endings
  const csvLines = [
    headers.map(escapeCSV).join(DELIMITER),
    ...rows
  ];
  
  const csvContent = BOM + csvLines.join(LINE_BREAK);
  
  // Создаём blob с правильным MIME-типом
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