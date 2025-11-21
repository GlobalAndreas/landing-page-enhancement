import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { analytics } from '@/utils/analytics';

export const AnalyticsDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 0,
    clicks: 0,
    views: 0,
    submits: 0,
    maxScroll: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(analytics.getEngagementStats());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all"
        title="Открыть аналитику"
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              analytics.clearEvents();
              setStats({
                totalEvents: 0,
                clicks: 0,
                views: 0,
                submits: 0,
                maxScroll: 0,
                conversionRate: 0,
              });
            }}
            className="w-full text-xs"
          >
            <Icon name="Trash2" size={14} className="mr-2" />
            Очистить данные
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          Сессия: {analytics.getSessionId().slice(-8)}
        </p>
      </Card>
    </div>
  );
};
