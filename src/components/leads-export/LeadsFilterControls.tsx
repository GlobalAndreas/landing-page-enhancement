import Icon from '@/components/ui/icon';

type DateFilter = 'today' | 'yesterday' | 'last7' | 'last30' | 'month' | 'custom' | 'all';
type ScrollFilter = '0-25' | '25-50' | '50-75' | '75-100' | 'all';
type SortBy = 'date-desc' | 'date-asc' | 'source' | 'scroll' | 'time';

export interface Filters {
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

interface UniqueValues {
  sources: string[];
  mediums: string[];
  campaigns: string[];
  contents: string[];
  terms: string[];
}

interface LeadsFilterControlsProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  uniqueValues: UniqueValues;
}

export const LeadsFilterControls = ({ filters, setFilters, uniqueValues }: LeadsFilterControlsProps) => {
  return (
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
  );
};
