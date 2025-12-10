import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThankYouModal = ({ isOpen, onClose }: ThankYouModalProps) => {
  useEffect(() => {
    if (isOpen) {
      analytics.logEvent('thanks_popup_opened', 'thank_you_modal');
      
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#00CED1', '#9370DB'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA500', '#FF6347'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#00CED1', '#9370DB', '#FFD700'],
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleTelegramClick = () => {
    analytics.trackButtonClick('telegram_modal_cta', 'thank_you_modal');
    
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0088cc', '#00aced', '#55acee'],
    });
    
    setTimeout(() => {
      window.open('https://t.me/dilman4in1bot?start=from_landing', '_blank');
      onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
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
              <Card className="p-8 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-xl border-2 border-primary/30 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="absolute top-4 right-4 h-8 w-8 p-0 hover:bg-secondary/50 z-10 rounded-full"
                >
                  <Icon name="X" size={16} />
                </Button>

                <div className="text-center relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: [0, 1.2, 1],
                      rotate: [180, 0, 0],
                    }}
                    transition={{ 
                      delay: 0.2, 
                      duration: 0.6,
                      times: [0, 0.6, 1],
                      ease: "easeOut"
                    }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 mb-6 shadow-2xl shadow-green-500/60 relative"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-full bg-green-500"
                    />
                    <Icon name="CheckCircle2" size={48} className="text-white relative z-10" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1
                    }}
                    transition={{ 
                      delay: 0.3,
                      type: "spring",
                      stiffness: 150
                    }}
                    className="text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 10, 0] }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="inline-block"
                    >
                      🎉
                    </motion.span>
                    {' '}Ура! Заявка отправлена
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground mb-2 text-base"
                  >
                    Свяжемся с вами в течение <span className="font-bold text-foreground">24 часов</span>
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.02 }}
                    className="my-8 p-5 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 border-2 border-primary/30 shadow-lg relative overflow-hidden cursor-default"
                  >
                    <motion.div 
                      animate={{ 
                        x: [-100, 500],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                        repeatDelay: 1
                      }}
                      className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <p className="text-base font-bold mb-2 flex items-center justify-center gap-2">
                        <motion.span 
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 2,
                            repeatDelay: 3
                          }}
                          className="text-2xl inline-block"
                        >
                          💎
                        </motion.span>
                        <span>А пока не ждите — получите пользу прямо сейчас!</span>
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Перейдите в Telegram-бот и получите <span className="font-semibold text-foreground">бесплатные мастер-классы</span>, разборы и готовые шаблоны автоворонок
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleTelegramClick}
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] hover:bg-right-bottom transition-all duration-500 text-base font-bold py-7 shadow-2xl shadow-blue-500/50 hover:shadow-3xl hover:shadow-blue-500/70 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <Icon name="Send" size={22} className="mr-2" />
                      <span>Перейти в Telegram-бот</span>
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={onClose}
                      className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-xl py-3"
                    >
                      Вернуться на сайт
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThankYouModal;