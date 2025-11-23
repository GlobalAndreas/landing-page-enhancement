import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getLeads, type Lead } from '@/services/leadsStorage';
import { LeadsFilterControls, type Filters } from './leads-export/LeadsFilterControls';
import { LeadsPreviewTable } from './leads-export/LeadsPreviewTable';
import { LeadsExportButtons } from './leads-export/LeadsExportButtons';
import { isAdminAuthorized, setupAdminKeyListener } from '@/utils/adminAuth';

export const LeadsExportPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
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
    setIsAuthorized(isAdminAuthorized());
    
    const cleanupKeyListener = setupAdminKeyListener(() => {
      setIsAuthorized(true);
    });
    
    const interval = setInterval(() => {
      setLeads(getLeads());
    }, 1000);
    
    return () => {
      clearInterval(interval);
      cleanupKeyListener();
    };
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
    let result = leads.filter(lead => {
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

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(query) || 
        lead.contact.toLowerCase().includes(query)
      );
    }

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
  }, [leads, filters, searchQuery]);

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

  if (!isAuthorized) {
    return null;
  }

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

        <LeadsFilterControls 
          filters={filters}
          setFilters={setFilters}
          uniqueValues={uniqueValues}
        />

        <LeadsPreviewTable 
          filteredLeads={filteredLeads}
          totalLeads={leads.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <LeadsExportButtons 
          filteredLeads={filteredLeads}
          resetFilters={resetFilters}
        />
      </Card>
    </div>
  );
};