import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { glassEmergence, breathingGlow, glassStyle, premiumEasing, staggerDelay } from "@/utils/premiumAnimations";

export const AboutMeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      analytics.logEvent('about_me_view', 'about_me_section');
    }
  }, [isInView]);

  const achievements = [
    {
      icon: "TrendingUp",
      title: "100+ проектов",
      description: "за 2024-2025г.",
    },
    {
      icon: "Zap",
      title: "Рост конверсии",
      description: "×2–×5",
    },
    {
      icon: "Clock",
      title: "Запуск",
      description: "за 14–30 дней",
    },
    {
      icon: "Target",
      title: "Прозрачный",
      description: "трафик",
    },
  ];

  const handleCTAClick = () => {
    analytics.logEvent('about_me_cta_click', 'about_me_cta');
    window.open('https://t.me/dilman_ads', '_blank');
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          {...glassEmergence}
          animate={isInView ? glassEmergence.animate : glassEmergence.initial}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${glassStyle.base} ${glassStyle.shadow}`}>
              <Icon name="User" size={16} className="text-accent" />
              <span className="text-xs font-bold tracking-wider uppercase text-accent">Обо мне</span>
            </div>
            <motion.h2 
              {...breathingGlow}
              className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Кто за этим стоит
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              <span className="font-bold text-foreground">Андрей Дильман</span> — эксперт по трафику, автоворонкам и чат-ботам<br className="hidden sm:block" /> 13+ лет опыта
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              {...glassEmergence}
              animate={isInView ? glassEmergence.animate : glassEmergence.initial}
              transition={{ ...glassEmergence.transition, delay: staggerDelay(1) }}
              className="order-2 md:order-1"
            >
              <Card className={`p-8 ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08]`}>
                <p className="text-lg leading-relaxed mb-8 text-foreground/90">
                  Помогаю предпринимателям системно увеличивать поток заявок за счёт упаковки, автоворонок, чат-ботов и аналитики. Строю воронки, которые прогревают, сегментируют и стабильно доводят клиента до сделки.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      {...glassEmergence}
                      animate={isInView ? glassEmergence.animate : glassEmergence.initial}
                      transition={{ ...glassEmergence.transition, delay: staggerDelay(index + 2, 0.1) }}
                      className={`flex flex-col items-start gap-2 p-4 rounded-xl ${glassStyle.base} ${glassStyle.shadow} ${glassStyle.hover} border-white/[0.08]`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                          <Icon name={achievement.icon} size={16} className="text-accent" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-sm">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button
                  size="lg"
                  onClick={handleCTAClick}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-base md:text-lg py-6 rounded-xl shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:shadow-[0_0_60px_rgba(147,51,234,0.5)] transition-all duration-300"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Получить консультацию
                    <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Card>
            </motion.div>

            <motion.div
              {...glassEmergence}
              animate={isInView ? glassEmergence.animate : glassEmergence.initial}
              transition={{ ...glassEmergence.transition, delay: staggerDelay(2) }}
              className="order-1 md:order-2"
            >
              <Card className="relative p-2 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 border-0 shadow-2xl shadow-accent/20 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://cdn.poehali.dev/files/791797f1-17b2-4b45-a837-d1fe8f9ae82c.png"
                    alt="Андрей Дильман"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};