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
        className="w-full text-sm bg-white/[0.03] backdrop-blur-[16px] border-white/[0.08] text-[#E7E7E7] shadow-[0_8px_18px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_10px_24px_rgba(0,0,0,0.45),0_0_10px_rgba(168,85,247,0.2),0_0_20px_rgba(236,72,153,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.13)] transition-all duration-200"
      >
        <Icon name="RotateCcw" size={16} className="mr-2" />
        Сбросить фильтры
      </Button>
    </div>
  );
};