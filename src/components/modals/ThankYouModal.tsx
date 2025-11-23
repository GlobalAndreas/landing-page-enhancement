import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";
import { motion, AnimatePresence } from "framer-motion";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThankYouModal = ({ isOpen, onClose }: ThankYouModalProps) => {
  const handleTelegramClick = () => {
    analytics.trackButtonClick('telegram_modal_cta', 'thank_you_modal');
    window.open('https://t.me/dilman4in1bot?start=from_landing', '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <Card className="p-8 bg-gradient-to-br from-card/98 to-card/95 backdrop-blur-xl border-primary/30 shadow-2xl relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="absolute top-4 right-4 h-8 w-8 p-0 hover:bg-secondary/50"
                >
                  <Icon name="X" size={16} />
                </Button>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-6 shadow-lg animate-bounce">
                    <Icon name="CheckCircle2" size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Спасибо! Заявка отправлена
                  </h3>
                  
                  <p className="text-muted-foreground mb-2">
                    Свяжемся с вами в течение 24 часов
                  </p>

                  <div className="my-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                    <p className="text-sm font-medium mb-1">
                      💎 А пока не ждите — получите пользу прямо сейчас!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Перейдите в Telegram-бот и получите бесплатные мастер-классы, разборы и готовые шаблоны автоворонок
                    </p>
                  </div>

                  <Button
                    onClick={handleTelegramClick}
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-right-bottom transition-all duration-500 text-base font-semibold py-6 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 hover:scale-105"
                  >
                    <Icon name="Send" size={20} className="mr-2" />
                    Перейти в Telegram-бота →
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Закрыть
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
