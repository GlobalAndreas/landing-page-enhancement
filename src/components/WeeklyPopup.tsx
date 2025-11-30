import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const POPUP_KEY = 'weekly_popup_last_shown';
const DAYS_INTERVAL = 7;

export const WeeklyPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkAndShowPopup = () => {
      const lastShown = localStorage.getItem(POPUP_KEY);
      const now = Date.now();
      
      if (!lastShown) {
        setIsVisible(true);
        localStorage.setItem(POPUP_KEY, now.toString());
        return;
      }

      const lastShownTime = parseInt(lastShown, 10);
      const daysPassed = (now - lastShownTime) / (1000 * 60 * 60 * 24);

      if (daysPassed >= DAYS_INTERVAL) {
        setIsVisible(true);
        localStorage.setItem(POPUP_KEY, now.toString());
      }
    };

    const timer = setTimeout(checkAndShowPopup, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-xl border-primary/30 shadow-2xl p-6 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute top-4 right-4"
        >
          <Icon name="X" size={20} />
        </Button>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={32} className="text-white" />
          </div>
          
          <h2 className="text-2xl font-bold">Специальное предложение!</h2>
          
          <p className="text-muted-foreground">
            Получите бесплатную консультацию по автоматизации вашего бизнеса. 
            Расскажу, как увеличить конверсию на 30-120% с помощью чат-ботов и автоворонок.
          </p>

          <Button 
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-primary to-accent"
          >
            Записаться на консультацию
          </Button>
        </div>
      </Card>
    </div>
  );
};
