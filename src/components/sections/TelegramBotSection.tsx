import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { glassEmergence, breathingGlow, glassStyle, premiumEasing, staggerDelay } from "@/utils/premiumAnimations";

export const TelegramBotSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasLoggedView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoggedView.current) {
            analytics.logEvent('open_bot_block', 'telegram_section');
            hasLoggedView.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTelegramClick = () => {
    analytics.trackButtonClick('telegram_bot_cta', 'telegram_section');
    analytics.logEvent('click_bot_button', 'telegram_section');
    window.open('https://t.me/dilman4in1bot?start=from_landing', '_blank');
  };

  const benefits = [
    {
      icon: "Video",
      text: "Бесплатные видео-разборы реальных кейсов",
    },
    {
      icon: "TrendingUp",
      text: "Уроки по продвижению и привлечению клиентов",
    },
    {
      icon: "Workflow",
      text: "Готовые примеры автоворонок для вашей ниши",
    },
    {
      icon: "Zap",
      text: "Бонусы по трафику и рекламным каналам",
    },
    {
      icon: "Sparkles",
      text: "Новые кейсы и инсайты каждую неделю",
    },
    {
      icon: "Gift",
      text: "Эксклюзивные чек-листы и шаблоны для быстрого старта",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className={`p-8 md:p-12 ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08]`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg animate-pulse">
                <Icon name="Send" size={32} className="text-white" />
              </div>
              
              <motion.h2 
                {...breathingGlow}
                className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              >
                Получайте бесплатные мастер-классы и разборы в Telegram
              </motion.h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Присоединяйтесь к моему Telegram-боту и получите доступ к эксклюзивным материалам, которые помогут вам построить эффективные автоворонки
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  {...glassEmergence}
                  whileInView={glassEmergence.animate}
                  viewport={{ once: true }}
                  transition={{ ...glassEmergence.transition, delay: staggerDelay(index, 0.08) }}
                  className={`flex items-start gap-3 p-4 rounded-xl ${glassStyle.base} ${glassStyle.shadow} ${glassStyle.hover} border-white/[0.08]`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08]`}>
                    <Icon name={benefit.icon} size={20} className="text-primary" />
                  </div>
                  <p className="text-sm pt-2">{benefit.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={handleTelegramClick}
                size="lg"
                className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-right-bottom transition-all duration-500 text-lg px-8 py-6 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 animate-gradient"
              >
                <Icon name="Send" size={24} className="mr-3" />
                Получить доступ в Telegram-боте
              </Button>
              
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08] hover:scale-110 transition-transform`}>
                  <span className="text-xl">🎥</span>
                  <span className="text-xs font-medium text-foreground/80">Видео-разборы</span>
                </div>
                
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08] hover:scale-110 transition-transform`}>
                  <span className="text-xl">📈</span>
                  <span className="text-xs font-medium text-foreground/80">Кейсы</span>
                </div>
                
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08] hover:scale-110 transition-transform`}>
                  <span className="text-xl">🚀</span>
                  <span className="text-xs font-medium text-foreground/80">Автоворонки</span>
                </div>
                
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08] hover:scale-110 transition-transform`}>
                  <span className="text-xl">🎯</span>
                  <span className="text-xs font-medium text-foreground/80">Уроки по трафику</span>
                </div>
                
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08] hover:scale-110 transition-transform`}>
                  <span className="text-xl">💼</span>
                  <span className="text-xs font-medium text-foreground/80">Практические примеры</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Никакого спама — только полезный контент
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};