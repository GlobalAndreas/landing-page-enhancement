import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";
import { glassEmergence, breathingGlow, glassStyle, premiumEasing, staggerDelay } from "@/utils/premiumAnimations";

const columns = [
  {
    title: "Без автоворонки",
    subtitle: "Старый способ",
    gradient: "from-rose-500/30 via-rose-500/10 to-transparent",
    accentBorder: "border-rose-500/40",
    badge: "Ручной режим",
    badgeColor: "from-rose-500/30 to-red-500/30",
    icon: "AlertTriangle",
    textColor: "text-rose-50",
    items: [
      "Ручная обработка заявок",
      "Потери 50–70% клиентов",
      "Холодный трафик",
      "Низкая конверсия",
      "Всё держится на руках",
      "Нет прогрева",
      "Нет аналитики",
    ],
    iconColor: "text-rose-200",
  },
  {
    title: "С автоворонкой",
    subtitle: "Умная система",
    gradient: "from-emerald-500/30 via-primary/20 to-transparent",
    accentBorder: "border-emerald-400/40",
    badge: "Новый стандарт",
    badgeColor: "from-emerald-400/40 to-primary/30",
    icon: "Sparkles",
    textColor: "text-emerald-50",
    items: [
      "Автоматизация 24/7",
      "Конверсия выше на 3–5×",
      "Горячие лиды",
      "Последовательный прогрев",
      "Прозрачная аналитика",
      "Чёткая система",
      "Предсказуемый результат",
    ],
    iconColor: "text-emerald-100",
  },
];

export const ComparisonSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedRef.current) {
            analytics.trackEvent("comparison_view", "engagement", "view");
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-3xl" />
      <div className="container mx-auto px-4 relative z-10 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Сценарий</p>
          <motion.h2 
            {...breathingGlow}
            className="text-3xl md:text-4xl font-black text-balance bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            Что меняется, когда подключаете автоворонку
          </motion.h2>
          <p className="text-muted-foreground">
            Показываю честное сравнение процессов. Слева — ручной хаос, справа — выстроенная система, которая работает
            даже когда вы спите.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {columns.map((column) => (
            <motion.div
              key={column.title}
              {...glassEmergence}
              whileInView={glassEmergence.animate}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card
                className={`relative overflow-hidden border-white/[0.08] ${glassStyle.base} ${glassStyle.shadow} bg-gradient-to-b ${column.gradient} p-6 md:p-8`}
              >
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_45%)]" />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{column.subtitle}</p>
                      <h3 className="text-2xl font-extrabold text-white">{column.title}</h3>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${column.badgeColor} border-white/[0.08] ${glassStyle.shadow}`}
                    >
                      {column.badge}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {column.items.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                          <Icon name={column.icon as any} size={18} className={column.iconColor} />
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;