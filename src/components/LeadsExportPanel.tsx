import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getLeads, type Lead } from '@/services/leadsStorage';

type DateFilter = 'today' | 'yesterday' | 'last7' | 'last30' | 'month' | 'custom' | 'all';
type ScrollFilter = '0-25' | '25-50' | '50-75' | '75-100' | 'all';
type SortBy = 'date-desc' | 'date-asc' | 'source' | 'scroll' | 'time';

interface Filters {
  dateFilter: DateFilter;
  customDateFrom: string;
  customDateTo: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  scrollFilter: ScrollFilter;
  device: 'all' | 'mobile' | 'desktop';
  sortBy: SortBy;
}

export const LeadsExportPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState<Filters>({
    dateFilter: 'all',
    customDateFrom: '',
    customDateTo: '',
    utmSource: 'all',
    utmMedium: 'all',
    utmCampaign: 'all',
    utmContent: 'all',
    utmTerm: 'all',
    scrollFilter: 'all',
    device: 'all',
    sortBy: 'date-desc',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLeads(getLeads());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const uniqueValues = useMemo(() => {
    return {
      sources: [...new Set(leads.map(l => l.utmSource).filter(Boolean))],
      mediums: [...new Set(leads.map(l => l.utmMedium).filter(Boolean))],
      campaigns: [...new Set(leads.map(l => l.utmCampaign).filter(Boolean))],
      contents: [...new Set(leads.map(l => l.utmContent).filter(Boolean))],
      terms: [...new Set(leads.map(l => l.utmTerm).filter(Boolean))],
    };
  }, [leads]);

  const filterByDate = (lead: Lead): boolean => {
    const leadDate = new Date(lead.timestamp);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filters.dateFilter) {
      case 'today':
        return leadDate >= today;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return leadDate >= yesterday && leadDate < today;
      case 'last7':
        const last7 = new Date(today);
        last7.setDate(last7.getDate() - 7);
        return leadDate >= last7;
      case 'last30':
        const last30 = new Date(today);
        last30.setDate(last30.getDate() - 30);
        return leadDate >= last30;
      case 'month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return leadDate >= monthStart;
      case 'custom':
        if (!filters.customDateFrom || !filters.customDateTo) return true;
        const from = new Date(filters.customDateFrom);
        const to = new Date(filters.customDateTo);
        to.setHours(23, 59, 59, 999);
        return leadDate >= from && leadDate <= to;
      default:
        return true;
    }
  };

  const filterByScroll = (lead: Lead): boolean => {
    if (filters.scrollFilter === 'all') return true;
    const depth = lead.pageDepth;
    switch (filters.scrollFilter) {
      case '0-25': return depth >= 0 && depth <= 25;
      case '25-50': return depth > 25 && depth <= 50;
      case '50-75': return depth > 50 && depth <= 75;
      case '75-100': return depth > 75 && depth <= 100;
      default: return true;
    }
  };

  const filteredLeads = useMemo(() => {
    const result = leads.filter(lead => {
      if (!filterByDate(lead)) return false;
      if (!filterByScroll(lead)) return false;
      if (filters.device !== 'all' && lead.device !== filters.device) return false;
      if (filters.utmSource !== 'all' && lead.utmSource !== filters.utmSource) return false;
      if (filters.utmMedium !== 'all' && lead.utmMedium !== filters.utmMedium) return false;
      if (filters.utmCampaign !== 'all' && lead.utmCampaign !== filters.utmCampaign) return false;
      if (filters.utmContent !== 'all' && lead.utmContent !== filters.utmContent) return false;
      if (filters.utmTerm !== 'all' && lead.utmTerm !== filters.utmTerm) return false;
      return true;
    });

    switch (filters.sortBy) {
      case 'date-desc':
        result.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case 'date-asc':
        result.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case 'source':
        result.sort((a, b) => (a.utmSource || '').localeCompare(b.utmSource || ''));
        break;
      case 'scroll':
        result.sort((a, b) => b.pageDepth - a.pageDepth);
        break;
      case 'time':
        result.sort((a, b) => b.timeOnPage - a.timeOnPage);
        break;
    }

    return result;
  }, [leads, filters]);

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

  const resetFilters = () => {
    setFilters({
      dateFilter: 'all',
      customDateFrom: '',
      customDateTo: '',
      utmSource: 'all',
      utmMedium: 'all',
      utmCampaign: 'all',
      utmContent: 'all',
      utmTerm: 'all',
      scrollFilter: 'all',
      device: 'all',
      sortBy: 'date-desc',
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 rounded-full w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg hover:shadow-xl transition-all"
        title="Экспорт лидов"
      >
        <Icon name="FileDown" size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] overflow-y-auto">
      <Card className="p-6 bg-card/95 backdrop-blur-xl border-primary/30 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="FileDown" size={20} className="text-green-500" />
            <h3 className="font-bold text-lg">Экспорт лидов</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{filteredLeads.length}</div>
            <div className="text-xs text-muted-foreground">из {leads.length} лидов</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              <Icon name="Calendar" size={12} className="inline mr-1" />
              Период
            </label>
            <select
              value={filters.dateFilter}
              onChange={(e) => setFilters({ ...filters, dateFilter: e.target.value as DateFilter })}
              className="w-full px-3 py-2 text-sm rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Все время</option>
              <option value="today">Сегодня</option>
              <option value="yesterday">Вчера</option>
              <option value="last7">Последние 7 дней</option>
              <option value="last30">Последние 30 дней</option>
              <option value="month">Текущий месяц</option>
              <option value="custom">Свой период</option>
            </select>
          </div>

          {filters.dateFilter === 'custom' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">От</label>
                <input
                  type="date"
                  value={filters.customDateFrom}
                  onChange={(e) => setFilters({ ...filters, customDateFrom: e.target.value })}
                  className="w-full px-2 py-1 text-sm rounded bg-secondary border border-border"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">До</label>
                <input
                  type="date"
                  value={filters.customDateTo}
                  onChange={(e) => setFilters({ ...filters, customDateTo: e.target.value })}
                  className="w-full px-2 py-1 text-sm rounded bg-secondary border border-border"
                />
              </div>
            </div>
          )}

          {uniqueValues.sources.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                <Icon name="Link" size={12} className="inline mr-1" />
                UTM Source
              </label>
              <select
                value={filters.utmSource}
                onChange={(e) => setFilters({ ...filters, utmSource: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-secondary border border-border"
              >
                <option value="all">Все источники</option>
                {uniqueValues.sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          )}

          {uniqueValues.mediums.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                <Icon name="Radio" size={12} className="inline mr-1" />
                UTM Medium
              </label>
              <select
                value={filters.utmMedium}
                onChange={(e) => setFilters({ ...filters, utmMedium: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-secondary border border-border"
              >
                <option value="all">Все каналы</option>
                {uniqueValues.mediums.map(medium => (
                  <option key={medium} value={medium}>{medium}</option>
                ))}
              </select>
            </div>
          )}

          {uniqueValues.campaigns.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                <Icon name="Megaphone" size={12} className="inline mr-1" />
                UTM Campaign
              </label>
              <select
                value={filters.utmCampaign}
                onChange={(e) => setFilters({ ...filters, utmCampaign: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-secondary border border-border"
              >
                <option value="all">Все кампании</option>
                {uniqueValues.campaigns.map(campaign => (
                  <option key={campaign} value={campaign}>{campaign}</option>
                ))}
              </select>
            </div>
          )}

          {uniqueValues.contents.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                <Icon name="FileText" size={12} className="inline mr-1" />
                UTM Content
              </label>
              <select
                value={filters.utmContent}
                onChange={(e) => setFilters({ ...filters, utmContent: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-secondary border border-border"
              >
                <option value="all">Весь контент</option>
                {uniqueValues.contents.map(content => (
                  <option key={content} value={content}>{content}</option>
                ))}
              </select>
            </div>
          )}

          {uniqueValues.terms.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                <Icon name="Tag" size={12} className="inline mr-1" />
                UTM Term
              </label>
              <select
                value={filters.utmTerm}
                onChange={(e) => setFilters({ ...filters, utmTerm: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-secondary border border-border"
              >
                <option value="all">Все термины</option>
                {uniqueValues.terms.map(term => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              <Icon name="ArrowDown" size={12} className="inline mr-1" />
              Досмотр страницы
            </label>
            <select
              value={filters.scrollFilter}
              onChange={(e) => setFilters({ ...filters, scrollFilter: e.target.value as ScrollFilter })}
              className="w-full px-3 py-2 text-sm rounded-lg bg-secondary border border-border"
            >
              <option value="all">Любой досмотр</option>
              <option value="0-25">0–25%</option>
              <option value="25-50">25–50%</option>
              <option value="50-75">50–75%</option>
              <option value="75-100">75–100%</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              <Icon name="Smartphone" size={12} className="inline mr-1" />
              Устройство
            </label>
            <select
              value={filters.device}
              onChange={(e) => setFilters({ ...filters, device: e.target.value as 'all' | 'mobile' | 'desktop' })}
              className="w-full px-3 py-2 text-sm rounded-lg bg-secondary border border-border"
            >
              <option value="all">Все устройства</option>
              <option value="mobile">Мобильные</option>
              <option value="desktop">Десктоп</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              <Icon name="ArrowUpDown" size={12} className="inline mr-1" />
              Сортировка
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as SortBy })}
              className="w-full px-3 py-2 text-sm rounded-lg bg-secondary border border-border"
            >
              <option value="date-desc">Новые → Старые</option>
              <option value="date-asc">Старые → Новые</option>
              <option value="source">По источнику</option>
              <option value="scroll">По досмотру</option>
              <option value="time">По времени на сайте</option>
            </select>
          </div>
        </div>

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
      </Card>
    </div>
  );
};
