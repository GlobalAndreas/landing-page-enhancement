import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { type Lead } from '@/services/leadsStorage';

interface LeadsPreviewTableProps {
  filteredLeads: Lead[];
  totalLeads: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const LeadsPreviewTable = ({ 
  filteredLeads, 
  totalLeads, 
  searchQuery, 
  setSearchQuery 
}: LeadsPreviewTableProps) => {
  const [showPreview, setShowPreview] = useState(true);

  const highlightText = (text: string): JSX.Element => {
    if (!searchQuery.trim()) {
      return <>{text}</>;
    }

    const query = searchQuery.trim();
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) => 
          regex.test(part) ? (
            <mark key={index} className="bg-yellow-400/30 text-yellow-900 dark:text-yellow-200 rounded px-0.5">
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  if (totalLeads === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
          <Icon name="Table" size={12} />
          Предпросмотр ({filteredLeads.length})
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          className="h-6 px-2 text-xs"
        >
          {showPreview ? <Icon name="ChevronUp" size={14} /> : <Icon name="ChevronDown" size={14} />}
        </Button>
      </div>

      {showPreview && (
        <>
          <div className="mb-3 relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по имени или контакту..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-10 py-2 text-sm rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>

          {filteredLeads.length === 0 ? (
            <div className="border border-border rounded-lg p-6 text-center">
              <Icon name="SearchX" size={32} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Ничего не найдено</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-secondary sticky top-0">
                    <tr>
                      <th className="px-2 py-2 text-left font-semibold">Имя</th>
                      <th className="px-2 py-2 text-left font-semibold">Контакт</th>
                      <th className="px-2 py-2 text-left font-semibold">UTM</th>
                      <th className="px-2 py-2 text-center font-semibold">Скролл</th>
                      <th className="px-2 py-2 text-center font-semibold">Время</th>
                      <th className="px-2 py-2 text-left font-semibold">Дата</th>
                      <th className="px-2 py-2 text-center font-semibold">Устр.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-secondary/50 transition-colors">
                        <td className="px-2 py-2 text-foreground truncate max-w-[80px]" title={lead.name}>
                          {highlightText(lead.name)}
                        </td>
                        <td className="px-2 py-2 text-foreground truncate max-w-[80px]" title={lead.contact}>
                          {highlightText(lead.contact)}
                        </td>
                        <td className="px-2 py-2 truncate max-w-[100px]" title={`${lead.utmSource || '-'} / ${lead.utmMedium || '-'} / ${lead.utmCampaign || '-'}`}>
                          <div className="flex flex-col gap-0.5">
                            {lead.utmSource && (
                              <span className="text-blue-400">{lead.utmSource}</span>
                            )}
                            {lead.utmCampaign && (
                              <span className="text-muted-foreground text-[10px]">{lead.utmCampaign}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-2 py-2 text-center">
                          <span className={`font-semibold ${
                            lead.pageDepth >= 75 ? 'text-green-400' : 
                            lead.pageDepth >= 50 ? 'text-yellow-400' : 
                            lead.pageDepth >= 25 ? 'text-orange-400' : 
                            'text-red-400'
                          }`}>
                            {lead.pageDepth}%
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center text-muted-foreground">
                          {lead.timeOnPage}с
                        </td>
                        <td className="px-2 py-2 text-muted-foreground text-[10px]">
                          {lead.date.split(',')[0]}
                        </td>
                        <td className="px-2 py-2 text-center">
                          {lead.device === 'mobile' ? (
                            <Icon name="Smartphone" size={12} className="inline text-blue-400" />
                          ) : (
                            <Icon name="Monitor" size={12} className="inline text-purple-400" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLeads.length > 5 && (
                <div className="bg-secondary/50 px-3 py-1.5 text-center text-[10px] text-muted-foreground border-t border-border">
                  Показано {filteredLeads.length} {filteredLeads.length === 1 ? 'строка' : filteredLeads.length < 5 ? 'строки' : 'строк'}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
