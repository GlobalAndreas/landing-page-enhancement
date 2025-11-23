import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { type Lead } from '@/services/leadsStorage';
import { type Filters } from './LeadsFilterControls';

interface LeadsExportButtonsProps {
  filteredLeads: Lead[];
  resetFilters: () => void;
}

export const LeadsExportButtons = ({ filteredLeads, resetFilters }: LeadsExportButtonsProps) => {
  const exportToJSON = () => {
    if (filteredLeads.length === 0) {
      alert('Нет лидов для экспорта с текущими фильтрами');
      return;
    }

    const dataStr = JSON.stringify(filteredLeads, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads_filtered_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    if (filteredLeads.length === 0) {
      alert('Нет лидов для экспорта с текущими фильтрами');
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
      'Реферер',
      'Досмотр (%)',
      'Время (сек)',
      'Устройство'
    ];

    const escapeCSV = (value: string | number): string => {
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const rows = filteredLeads.map(lead => [
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
      lead.referrer || '-',
      lead.pageDepth,
      lead.timeOnPage,
      lead.device
    ].map(escapeCSV).join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    const BOM = '\uFEFF';
    const dataBlob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads_filtered_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 space-y-2">
      <Button
        onClick={exportToJSON}
        disabled={filteredLeads.length === 0}
        className="w-full text-sm bg-gradient-to-r from-blue-500 to-cyan-500"
      >
        <Icon name="FileJson" size={16} className="mr-2" />
        Скачать JSON ({filteredLeads.length})
      </Button>

      <Button
        onClick={exportToCSV}
        disabled={filteredLeads.length === 0}
        className="w-full text-sm bg-gradient-to-r from-green-500 to-emerald-500"
      >
        <Icon name="FileSpreadsheet" size={16} className="mr-2" />
        Скачать CSV ({filteredLeads.length})
      </Button>

      <Button
        onClick={resetFilters}
        variant="outline"
        className="w-full text-sm"
      >
        <Icon name="RotateCcw" size={16} className="mr-2" />
        Сбросить фильтры
      </Button>
    </div>
  );
};
