import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";
import { glassEmergence, breathingGlow, glassStyle, premiumEasing, staggerDelay } from "@/utils/premiumAnimations";

const rawSteps = [
  {
    title: "Хаос",
    description: "Случайные заявки, нет структуры",
    icon: "ShieldAlert",
    gradient: "from-rose-500/30 via-rose-500/10 to-transparent",
  },
  {
    title: "Потери",
    description: "До 70% клиентов “остывают” без прогрева",
    icon: "TrendingDown",
    gradient: "from-orange-500/30 via-orange-500/10 to-transparent",
  },
  {
    title: "Построение системы",
    description: "Лендинг, автоворонка, сегментация",
    icon: "Workflow",
    gradient: "from-blue-500/30 via-blue-500/10 to-transparent",
  },
  {
    title: "Запуск и трафик",
    description: "Тёплые лиды, автоматические ответы",
    icon: "Rocket",
    gradient: "from-purple-500/30 via-purple-500/10 to-transparent",
  },
  {
    title: "Рост и масштаб",
    description: "Конверсия выше в 3–5 раз, стабильные заявки",
    icon: "TrendingUp",
    gradient: "from-emerald-500/30 via-emerald-500/10 to-transparent",
  },
];

export const ClientJourneySection = () => {
  const steps = useMemo(() => rawSteps, []);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedRef.current) {
            analytics.trackEvent("client_journey_view", "engagement", "view");
            hasTrackedRef.current = true;
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(94,96,206,0.15),_transparent_60%)]" />
      <div className="container mx-auto px-4 relative z-10 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Навигация</p>
          <motion.h2 {...breathingGlow} className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Путь клиента: от хаоса к работающей автоворонке
          </motion.h2>
          <p className="text-muted-foreground">
            Коротко показываю, как меняются процессы после внедрения системы — шаг за шагом.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute inset-x-12 top-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex flex-col md:flex-row gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                {...glassEmergence}
                whileInView={glassEmergence.animate}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...glassEmergence.transition, delay: staggerDelay(index, 0.1) }}
                className="flex-1"
              >
                <Card className={`relative p-6 h-full ${glassStyle.base} ${glassStyle.shadow} bg-gradient-to-b ${step.gradient} border-white/[0.08]`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08]`}>
                        <Icon name={step.icon as any} size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Шаг {index + 1}</div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/40">
                      <Icon name="ChevronRight" size={24} />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-sm text-white/70 mt-8"
          >
            Все этапы проходят последовательно — клиент всегда понимает, на каком этапе мы сейчас
          </motion.p>
        </div>
      </div>
    </section>
  );
};