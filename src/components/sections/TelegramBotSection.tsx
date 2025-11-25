import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
          <Card className="p-8 md:p-12 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl border-primary/30 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg animate-pulse">
                <Icon name="Send" size={32} className="text-white" />
              </div>
              
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-4 relative"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 0.2, 0] }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, times: [0, 0.5, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl"
                />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent relative">
                  Получайте бесплатные мастер-классы и разборы в Telegram
                </span>
              </motion.h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Присоединяйтесь к моему Telegram-боту и получите доступ к эксклюзивным материалам, которые помогут вам построить эффективные автоворонки
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Icon name={benefit.icon} size={20} className="text-primary" />
                  </div>
                  <p className="text-sm pt-2">{benefit.text}</p>
                </div>
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
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 hover:scale-110 transition-transform">
                  <span className="text-xl">🎥</span>
                  <span className="text-xs font-medium text-foreground/80">Видео-разборы</span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 hover:scale-110 transition-transform">
                  <span className="text-xl">📈</span>
                  <span className="text-xs font-medium text-foreground/80">Кейсы</span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:scale-110 transition-transform">
                  <span className="text-xl">🚀</span>
                  <span className="text-xs font-medium text-foreground/80">Автоворонки</span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:scale-110 transition-transform">
                  <span className="text-xl">🎯</span>
                  <span className="text-xs font-medium text-foreground/80">Уроки по трафику</span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 hover:scale-110 transition-transform">
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