import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { analytics, AnalyticsEvent } from "@/utils/analytics";
import { isAdminLiteAuthorized, setupAdminLiteKeyListener, setAdminLiteAuthorized } from "@/utils/adminAuth";

export const AdminPanelLite = () => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [reportStatus, setReportStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
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
    setIsAuthorized(isAdminLiteAuthorized());
    
    const cleanupKeyListener = setupAdminLiteKeyListener(() => {
      setIsAuthorized(true);
    });
    
    const handleAuthChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ authorized: boolean }>;
      setIsAuthorized(customEvent.detail.authorized);
      if (!customEvent.detail.authorized) {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('adminLiteAuthChanged', handleAuthChange);
    
    loadAnalytics();
    const interval = setInterval(loadAnalytics, 2000);
    
    return () => {
      clearInterval(interval);
      cleanupKeyListener();
      window.removeEventListener('adminLiteAuthChanged', handleAuthChange);
    };
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

  const handleLogout = () => {
    if (confirm('Выйти из админки? Все кнопки управления будут скрыты.')) {
      setAdminLiteAuthorized(false);
      setIsAuthorized(false);
      setIsVisible(false);
    }
  };

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  const sendGA4Report = async () => {
    setIsLoadingReport(true);
    setReportStatus(null);
    
    try {
      const response = await fetch('https://functions.poehali.dev/ef3050db-a8c0-48b2-a4b8-5a2eee875f23', {
        method: 'GET',
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setReportStatus({
          type: 'success',
          message: 'Отчёт отправлен в Telegram! Проверьте сообщения.'
        });
      } else {
        setReportStatus({
          type: 'error',
          message: data.error || 'Ошибка отправки отчёта'
        });
      }
    } catch (error) {
      setReportStatus({
        type: 'error',
        message: 'Ошибка подключения к серверу'
      });
    } finally {
      setIsLoadingReport(false);
      setTimeout(() => setReportStatus(null), 5000);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isAuthorized && e.ctrlKey && e.shiftKey && e.key === 'A') {
        togglePanel();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible, isAuthorized]);

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
        <div 
          className="fixed top-0 right-0 bottom-0 max-h-screen overflow-y-auto overflow-x-hidden"
          style={{
            width: '360px',
            zIndex: 9999,
            background: '#111'
          }}
        >
          <div className="p-3 border-b border-border flex items-center justify-between sticky top-0 bg-[#111] z-10">
            <div className="flex items-center gap-2">
              <Icon name="BarChart3" size={18} className="text-primary" />
              <h2 className="text-lg font-bold">Аналитика</h2>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={sendGA4Report}
                disabled={isLoadingReport}
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 px-2"
              >
                <Icon name={isLoadingReport ? "Loader2" : "Send"} size={14} className={isLoadingReport ? 'animate-spin' : ''} />
              </Button>
              <Button variant="outline" size="sm" onClick={clearAllData} className="px-2">
                <Icon name="Trash2" size={14} />
              </Button>
              <Button variant="destructive" size="sm" onClick={handleLogout} className="px-2">
                <Icon name="LogOut" size={14} />
              </Button>
              <Button variant="ghost" size="sm" onClick={togglePanel} className="px-2">
                <Icon name="X" size={18} />
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-4">
              {reportStatus && (
                <div className={`p-4 rounded-lg border ${
                  reportStatus.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  <div className="flex items-center gap-2">
                    <Icon name={reportStatus.type === 'success' ? 'CheckCircle2' : 'AlertCircle'} size={20} />
                    <p className="font-medium">{reportStatus.message}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
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

              <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
                <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                  <Icon name="Zap" size={18} className="text-primary" />
                  Ключевые события
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-card/50">
                    <div className="flex items-center gap-2">
                      <span className="text-base">👀</span>
                      <div>
                        <p className="text-sm font-medium">Блок с ботом</p>
                        <p className="text-xs text-muted-foreground">open_bot_block</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">{openBotBlock}</div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-card/50">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🤖</span>
                      <div>
                        <p className="text-sm font-medium">Клик на бота</p>
                        <p className="text-xs text-muted-foreground">click_bot_button</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">{clickBotButton}</div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-card/50">
                    <div className="flex items-center gap-2">
                      <span className="text-base">✅</span>
                      <div>
                        <p className="text-sm font-medium">Благодарность</p>
                        <p className="text-xs text-muted-foreground">thanks_popup_opened</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">{thanksPopupOpened}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
                <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                  <Icon name="Activity" size={18} className="text-accent" />
                  Недавние события
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {events.slice(-20).reverse().map((event, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-card/30 text-sm">
                      <div className="flex-1">
                        <span className="font-medium">{event.event}</span>
                        <p className="text-xs text-muted-foreground">
                          {event.category}
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
        </div>
      )}
    </>
  );
};