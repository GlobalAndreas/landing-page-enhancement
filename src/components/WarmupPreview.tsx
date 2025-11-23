import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { warmup, type WarmupDay, type WarmupAttachment } from '@/data/warmupMessages';
import { isDayActive, setWarmupDayActive } from '@/utils/warmupStorage';
import { isAdminAuthorized, setupAdminKeyListener } from '@/utils/adminAuth';

const getAttachmentIcon = (type: WarmupAttachment['type']) => {
  const icons = {
    video: 'Video',
    pdf: 'FileText',
    image: 'Image',
    document: 'File',
    link: 'Link',
  };
  return icons[type] || 'File';
};

const getAttachmentColor = (type: WarmupAttachment['type']) => {
  const colors = {
    video: 'text-red-400',
    pdf: 'text-blue-400',
    image: 'text-green-400',
    document: 'text-purple-400',
    link: 'text-cyan-400',
  };
  return colors[type] || 'text-gray-400';
};

const formatDelay = (seconds: number): string => {
  if (seconds === 0) return 'Сразу';
  const hours = seconds / 3600;
  const days = hours / 24;
  if (days >= 1) return `+${Math.floor(days)} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`;
  return `+${Math.floor(hours)} ч`;
};

const truncateText = (text: string, maxLength: number = 120): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const WarmupPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [dayStates, setDayStates] = useState<Record<string, boolean>>({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsAuthorized(isAdminAuthorized());
    
    const cleanup = setupAdminKeyListener(() => {
      setIsAuthorized(true);
    });
    
    const handleAuthChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ authorized: boolean }>;
      setIsAuthorized(customEvent.detail.authorized);
      if (!customEvent.detail.authorized) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('adminAuthChanged', handleAuthChange);
    
    const states: Record<string, boolean> = {};
    Object.entries(warmup).forEach(([key, value]) => {
      states[key] = isDayActive(key, value.active ?? true);
    });
    setDayStates(states);
    
    return () => {
      cleanup();
      window.removeEventListener('adminAuthChanged', handleAuthChange);
    };
  }, []);

  const toggleDayActive = (dayId: string, currentState: boolean) => {
    const newState = !currentState;
    setWarmupDayActive(dayId, newState);
    setDayStates(prev => ({ ...prev, [dayId]: newState }));
  };

  const warmupDays = Object.entries(warmup).map(([key, value], index) => ({
    id: key,
    dayNumber: index,
    ...value,
    isActive: dayStates[key] ?? value.active ?? true,
  }));

  const toggleDay = (dayId: string) => {
    setExpandedDay(expandedDay === dayId ? null : dayId);
  };

  if (!isAuthorized) {
    return null;
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-36 right-4 z-50 rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-all"
        title="Превью автопрогрева"
      >
        <Icon name="Zap" size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[480px] max-h-[80vh] overflow-y-auto">
      <Card className="p-6 bg-card/95 backdrop-blur-xl border-primary/30 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Zap" size={20} className="text-purple-500" />
            <h3 className="font-bold text-lg">Автопрогрев</h3>
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

        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Последовательность</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {warmupDays.length} дней прогрева
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-green-400">Активна</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {warmupDays.map((day, index) => (
            <div
              key={day.id}
              className={`relative border rounded-lg transition-all ${
                day.isActive
                  ? 'border-primary/30 bg-secondary/30'
                  : 'border-border/50 bg-secondary/10 opacity-60'
              }`}
            >
              <div
                className="p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => toggleDay(day.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        day.isActive
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {index}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm truncate">{day.title}</h4>
                      <div className="flex items-center gap-2 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDayActive(day.id, day.isActive);
                          }}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            day.isActive ? 'bg-green-500' : 'bg-gray-500'
                          }`}
                          title={day.isActive ? 'Отключить' : 'Включить'}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                              day.isActive ? 'translate-x-5' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                          {formatDelay(day.delay || 0)}
                        </span>
                        <Icon
                          name={expandedDay === day.id ? 'ChevronUp' : 'ChevronDown'}
                          size={16}
                          className="text-muted-foreground"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      {truncateText(
                        day.message.split('\n').filter((line) => line.trim()).join(' ')
                      )}
                    </p>

                    {day.attachments && day.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {day.attachments.map((attachment, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50 border border-border"
                          >
                            <Icon
                              name={getAttachmentIcon(attachment.type)}
                              size={12}
                              className={getAttachmentColor(attachment.type)}
                            />
                            <span className="text-[10px] text-muted-foreground">
                              {attachment.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>


                </div>
              </div>

              {expandedDay === day.id && (
                <div className="border-t border-border/50 p-4 bg-secondary/20">
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground mb-2">
                        Полный текст:
                      </div>
                      <div className="text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap bg-background/50 p-3 rounded border border-border/50 max-h-48 overflow-y-auto">
                        {day.message}
                      </div>
                    </div>

                    {day.attachments && day.attachments.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-2">
                          Вложения ({day.attachments.length}):
                        </div>
                        <div className="space-y-2">
                          {day.attachments.map((attachment, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 p-2 rounded bg-background/50 border border-border/50"
                            >
                              <Icon
                                name={getAttachmentIcon(attachment.type)}
                                size={16}
                                className={`${getAttachmentColor(attachment.type)} flex-shrink-0 mt-0.5`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-foreground truncate">
                                  {attachment.title || 'Без названия'}
                                </div>
                                {attachment.description && (
                                  <div className="text-[10px] text-muted-foreground mt-0.5">
                                    {attachment.description}
                                  </div>
                                )}
                                <div className="text-[10px] text-muted-foreground/70 mt-1 truncate">
                                  {attachment.url}
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                                  {attachment.type}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-border/50">
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={10} />
                            <span>Задержка: {formatDelay(day.delay || 0)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Hash" size={10} />
                            <span>ID: {day.id}</span>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded ${
                          day.isActive 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            day.isActive ? 'bg-green-400' : 'bg-red-400'
                          }`} />
                          <span className="font-semibold">
                            {day.isActive ? 'Активен' : 'Выключен'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {index < warmupDays.length - 1 && (
                <div className="absolute left-[28px] top-full w-0.5 h-3 bg-gradient-to-b from-primary/30 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="text-xs text-muted-foreground mb-1">Всего дней</div>
              <div className="text-lg font-bold text-foreground">{warmupDays.length}</div>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="text-xs text-muted-foreground mb-1">Вложений</div>
              <div className="text-lg font-bold text-foreground">
                {warmupDays.reduce(
                  (acc, day) => acc + (day.attachments?.length || 0),
                  0
                )}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="text-xs text-muted-foreground mb-1">Активных</div>
              <div className="text-lg font-bold text-green-400">
                {warmupDays.filter((d) => d.isActive).length}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-300/90 leading-relaxed">
              Это превью текущей последовательности автопрогрева. 
              Для изменения структуры отредактируйте файл <code className="px-1 py-0.5 rounded bg-blue-500/20">warmupMessages.ts</code>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};