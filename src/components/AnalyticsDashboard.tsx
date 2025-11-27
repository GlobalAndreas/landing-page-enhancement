import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { analytics } from '@/utils/analytics';
import { getLeads, exportLeadsToJSON, exportLeadsToCSV, clearLeads } from '@/services/leadsStorage';

export const AnalyticsDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [leadsCount, setLeadsCount] = useState(0);
  const [stats, setStats] = useState({
    totalEvents: 0,
    clicks: 0,
    views: 0,
    submits: 0,
    maxScroll: 0,
    conversionRate: 0,
    exitPopupViews: 0,
    exitPopupClicks: 0,
    exitPopupConversion: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(analytics.getEngagementStats());
      setLeadsCount(getLeads().length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let sequence = '';
    const SECRET_CODE = 'admin';
    
    const handleKeyPress = (e: KeyboardEvent) => {
      sequence += e.key.toLowerCase();
      
      if (sequence.length > SECRET_CODE.length) {
        sequence = sequence.slice(-SECRET_CODE.length);
      }
      
      if (sequence === SECRET_CODE) {
        setIsVisible(true);
        sequence = '';
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  const exportToCSV = () => {
    const events = analytics.getEvents();
    if (events.length === 0) {
      alert('Нет данных для экспорта');
      return;
    }

    const headers = ['Событие', 'Категория', 'Действие', 'Метка', 'Значение', 'Время'];
    const rows = events.map(e => [
      e.event,
      e.category,
      e.action,
      e.label || '',
      e.value || '',
      new Date(e.timestamp).toLocaleString('ru-RU')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isVisible) {
    return null;
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all"
        title="Открыть аналитику (только для администратора)"
      >
        <Icon name="BarChart3" size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="p-6 bg-card/95 backdrop-blur-xl border-primary/30 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h3 className="font-bold text-lg">Аналитика</h3>
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

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2">
              <Icon name="MousePointer" size={16} className="text-blue-400" />
              <span className="text-sm">Кликов</span>
            </div>
            <span className="font-bold text-lg">{stats.clicks}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2">
              <Icon name="Eye" size={16} className="text-green-400" />
              <span className="text-sm">Просмотров секций</span>
            </div>
            <span className="font-bold text-lg">{stats.views}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2">
              <Icon name="Send" size={16} className="text-purple-400" />
              <span className="text-sm">Отправок форм</span>
            </div>
            <span className="font-bold text-lg">{stats.submits}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2">
              <Icon name="ArrowDown" size={16} className="text-orange-400" />
              <span className="text-sm">Макс. прокрутка</span>
            </div>
            <span className="font-bold text-lg">{stats.maxScroll}%</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <span className="text-sm font-bold">Конверсия</span>
            </div>
            <span className="font-bold text-lg text-primary">{stats.conversionRate.toFixed(1)}%</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="text-xs font-semibold text-muted-foreground mb-3">📊 Exit-попап статистика:</div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2">
                <Icon name="Eye" size={14} className="text-amber-400" />
                <span className="text-xs">Показов попапа</span>
              </div>
              <span className="font-bold text-sm text-amber-400">{stats.exitPopupViews}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="flex items-center gap-2">
                <Icon name="MousePointerClick" size={14} className="text-emerald-400" />
                <span className="text-xs">Кликов на CTA</span>
              </div>
              <span className="font-bold text-sm text-emerald-400">{stats.exitPopupClicks}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <div className="flex items-center gap-2">
                <Icon name="Percent" size={14} className="text-purple-400" />
                <span className="text-xs font-bold">Конверсия попапа</span>
              </div>
              <span className="font-bold text-sm text-purple-400">{stats.exitPopupConversion.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="mb-3 p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Users" size={16} className="text-green-400" />
                <span className="text-sm font-bold">Лидов собрано</span>
              </div>
              <span className="font-bold text-lg text-green-400">{leadsCount}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground mb-2">Экспорт лидов:</div>
            
            <Button
              variant="default"
              size="sm"
              onClick={exportLeadsToJSON}
              className="w-full text-xs bg-gradient-to-r from-blue-500 to-cyan-500"
              disabled={leadsCount === 0}
            >
              <Icon name="FileJson" size={14} className="mr-2" />
              Скачать JSON ({leadsCount})
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={exportLeadsToCSV}
              className="w-full text-xs bg-gradient-to-r from-green-500 to-emerald-500"
              disabled={leadsCount === 0}
            >
              <Icon name="FileSpreadsheet" size={14} className="mr-2" />
              Скачать CSV ({leadsCount})
            </Button>

            <div className="text-xs font-semibold text-muted-foreground mt-3 mb-2">Экспорт аналитики:</div>

            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="w-full text-xs bg-white/[0.03] backdrop-blur-[16px] border-white/[0.08] text-[#E7E7E7] shadow-[0_8px_18px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_10px_24px_rgba(0,0,0,0.45),0_0_10px_rgba(168,85,247,0.2),0_0_20px_rgba(236,72,153,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.13)] transition-all duration-200"
            >
              <Icon name="Download" size={14} className="mr-2" />
              События в CSV
            </Button>

            <div className="text-xs font-semibold text-destructive mt-3 mb-2">Опасная зона:</div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm('Удалить все лиды? Это действие нельзя отменить!')) {
                  clearLeads();
                  setLeadsCount(0);
                }
              }}
              className="w-full text-xs bg-white/[0.03] backdrop-blur-[16px] border-destructive/50 text-destructive shadow-[0_8px_18px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-destructive/10 hover:border-destructive hover:shadow-[0_10px_24px_rgba(0,0,0,0.45),0_0_10px_rgba(239,68,68,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.13)] transition-all duration-200"
              disabled={leadsCount === 0}
            >
              <Icon name="UserX" size={14} className="mr-2" />
              Удалить лиды ({leadsCount})
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm('Очистить всю аналитику?')) {
                  analytics.clearEvents();
                  setStats({
                    totalEvents: 0,
                    clicks: 0,
                    views: 0,
                    submits: 0,
                    maxScroll: 0,
                    conversionRate: 0,
                  });
                }
              }}
              className="w-full text-xs bg-white/[0.03] backdrop-blur-[16px] border-destructive/50 text-destructive shadow-[0_8px_18px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-destructive/10 hover:border-destructive hover:shadow-[0_10px_24px_rgba(0,0,0,0.45),0_0_10px_rgba(239,68,68,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.13)] transition-all duration-200"
            >
              <Icon name="Trash2" size={14} className="mr-2" />
              Очистить события
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          Сессия: {analytics.getSessionId().slice(-8)}
        </p>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Всего событий: {stats.totalEvents}
        </p>
      </Card>
    </div>
  );
};