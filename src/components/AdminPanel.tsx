import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { analytics, AnalyticsEvent } from "@/utils/analytics";

export const AdminPanel = () => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [typedCommand, setTypedCommand] = useState('');
  const [stats, setStats] = useState({
    totalEvents: 0,
    clicks: 0,
    views: 0,
    submits: 0,
    maxScroll: 0,
    conversionRate: 0,
  });

  const loadAnalytics = () => {
    const allEvents = analytics.getEvents();
    setEvents(allEvents);
    setStats(analytics.getEngagementStats());
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authorized') === 'true';
    setIsAuthorized(isAuth);
    
    loadAnalytics();
    const interval = setInterval(loadAnalytics, 2000);
    return () => clearInterval(interval);
  }, []);

  const customEvents = events.filter(e => e.category === 'custom');
  const openBotBlock = customEvents.filter(e => e.event === 'open_bot_block').length;
  const clickBotButton = customEvents.filter(e => e.event === 'click_bot_button').length;
  const thanksPopupOpened = customEvents.filter(e => e.event === 'thanks_popup_opened').length;

  const clearAllData = () => {
    if (confirm('Удалить все данные аналитики?')) {
      analytics.clearEvents();
      loadAnalytics();
    }
  };

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const newCommand = typedCommand + key;
      
      if (newCommand.endsWith('admin')) {
        setIsAuthorized(true);
        localStorage.setItem('admin_authorized', 'true');
        setTypedCommand('');
        return;
      }
      
      setTypedCommand(newCommand.slice(-10));
      
      if (isAuthorized && e.ctrlKey && e.shiftKey && e.key === 'A') {
        togglePanel();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible, isAuthorized, typedCommand]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      <Button
        onClick={togglePanel}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 shadow-2xl bg-gradient-to-br from-primary to-accent"
        title="Админ-панель (Ctrl+Shift+A)"
      >
        <Icon name="BarChart3" size={20} />
      </Button>

      {isVisible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={togglePanel}>
          <Card 
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-primary/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur-xl z-10">
              <div className="flex items-center gap-3">
                <Icon name="BarChart3" size={24} className="text-primary" />
                <h2 className="text-2xl font-bold">Аналитика лендинга</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAllData}>
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Очистить
                </Button>
                <Button variant="ghost" size="sm" onClick={togglePanel}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="MousePointerClick" size={16} className="text-blue-500" />
                    <p className="text-xs text-muted-foreground">Всего событий</p>
                  </div>
                  <p className="text-2xl font-bold">{stats.totalEvents}</p>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Target" size={16} className="text-green-500" />
                    <p className="text-xs text-muted-foreground">Кликов</p>
                  </div>
                  <p className="text-2xl font-bold">{stats.clicks}</p>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Eye" size={16} className="text-purple-500" />
                    <p className="text-xs text-muted-foreground">Просмотров</p>
                  </div>
                  <p className="text-2xl font-bold">{stats.views}</p>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Send" size={16} className="text-orange-500" />
                    <p className="text-xs text-muted-foreground">Заявок</p>
                  </div>
                  <p className="text-2xl font-bold">{stats.submits}</p>
                </Card>
              </div>

              <Card className="p-5 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="Zap" size={20} className="text-primary" />
                  Ключевые события
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-lg">👀</span>
                      </div>
                      <div>
                        <p className="font-medium">Блок с ботом в поле зрения</p>
                        <p className="text-xs text-muted-foreground">open_bot_block</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{openBotBlock}</div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <span className="text-lg">🚀</span>
                      </div>
                      <div>
                        <p className="font-medium">Клик по кнопке бота</p>
                        <p className="text-xs text-muted-foreground">click_bot_button</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{clickBotButton}</div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <span className="text-lg">🎉</span>
                      </div>
                      <div>
                        <p className="font-medium">Благодарность открыта</p>
                        <p className="text-xs text-muted-foreground">thanks_popup_opened</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{thanksPopupOpened}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="List" size={20} className="text-accent" />
                  Последние 20 событий
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {events.slice(-20).reverse().map((event, index) => (
                    <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-card/50 hover:bg-card/70 transition-colors text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{event.event}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.category} • {event.action}
                          {event.label && ` • ${event.label}`}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                        {new Date(event.timestamp).toLocaleTimeString('ru-RU')}
                      </p>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Пока нет событий
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};