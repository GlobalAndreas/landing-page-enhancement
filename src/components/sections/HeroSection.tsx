import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { motion, AnimatePresence } from "framer-motion";
import { analytics } from "@/utils/analytics";
import { glassEmergence, breathingGlow, glassStyle, premiumEasing, staggerDelay } from "@/utils/premiumAnimations";

interface HeroSectionProps {
  scrollToConsultation: () => void;
  slots: number;
  onTimerCTA: () => void;
}

export const HeroSection = ({ scrollToConsultation, slots, onTimerCTA }: HeroSectionProps) => {
  const hasSlots = slots > 0;
  const timerText = hasSlots
    ? `Бесплатная консультация — осталось ${slots} ${slots === 1 ? "место" : slots < 5 ? "места" : "мест"} на этой неделе`
    : "Запись на эту неделю закрыта — оставьте заявку на следующую";

  return (
    <section className="relative min-h-[100dvh] md:min-h-0 md:py-28 py-8 overflow-hidden flex items-center">
      {/* 3D-сцена глубины: многослойный фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(236,72,153,0.08),transparent)]" />
      
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] opacity-20 -translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-accent/15 rounded-full blur-[180px] opacity-15 translate-x-1/3 translate-y-1/4" />
      
      <div className="absolute left-0 top-1/2 w-1/4 h-1/3 bg-gradient-to-r from-primary/5 to-transparent blur-3xl" />
      <div className="absolute right-0 top-1/3 w-1/4 h-1/3 bg-gradient-to-l from-accent/5 to-transparent blur-3xl" />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      
      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="grid lg:grid-cols-[1fr_1.08fr] gap-8 md:gap-16 items-center">
          {/* Левая колонка */}
          <motion.div 
            {...glassEmergence}
            transition={{ ...glassEmergence.transition, delay: 0 }}
            className="space-y-4 md:space-y-8"
          >
            {/* Бейдж с единым стеклянным стилем */}
            <motion.div 
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full ${glassStyle.base} ${glassStyle.shadow} transition-all duration-300`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: premiumEasing }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" 
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                }}
              />
              <span className="text-xs font-bold tracking-widest uppercase text-slate-200">13 лет в автоматизации</span>
              <span className="sr-only">Эксперт по разработке Telegram-ботов, автоворонок, чат-ботов и настройке трафика для автоматизации бизнес-процессов</span>
            </motion.div>

            {/* H1 с breathing glow */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-[5.5rem] font-black leading-[1.1] text-balance tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: premiumEasing }}
            >
              <motion.span 
                className="inline-block bg-gradient-to-r from-white from-10% via-primary via-50% to-accent to-90% bg-clip-text text-transparent"
                animate={{
                  filter: [
                    "drop-shadow(0 0 16px rgba(168,85,247,0.19)) drop-shadow(0 0 32px rgba(168,85,247,0.08))",
                    "drop-shadow(0 0 20px rgba(168,85,247,0.22)) drop-shadow(0 0 38px rgba(168,85,247,0.1))",
                    "drop-shadow(0 0 16px rgba(168,85,247,0.19)) drop-shadow(0 0 32px rgba(168,85,247,0.08))"
                  ],
                  scale: [1, 1.008, 1]
                }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              >
                Чат-боты, автоворонки
              </motion.span>
              <br />
              <motion.span 
                className="text-slate-50"
                animate={{
                  filter: [
                    "drop-shadow(0 0 16px rgba(168,85,247,0.19)) drop-shadow(0 0 32px rgba(168,85,247,0.08))",
                    "drop-shadow(0 0 20px rgba(168,85,247,0.22)) drop-shadow(0 0 38px rgba(168,85,247,0.1))",
                    "drop-shadow(0 0 16px rgba(168,85,247,0.19)) drop-shadow(0 0 32px rgba(168,85,247,0.08))"
                  ],
                  scale: [1, 1.008, 1]
                }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                и трафик
              </motion.span>
              <br />
              {/* Подзаголовок уменьшен на 13% */}
              <motion.div 
                className="relative inline-block -mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: premiumEasing }}
              >
                <span 
                  className="inline-block font-semibold leading-tight"
                  style={{
                    fontSize: "calc((2.75rem * 0.85))",
                    letterSpacing: "0.015em",
                    color: "#E1E4FF",
                    filter: "brightness(0.9)",
                    textShadow: "0 0 8px rgba(199,201,248,0.22)",
                    WebkitTextStroke: "0.4px rgba(0,0,0,0.35)",
                    whiteSpace: "nowrap"
                  }}
                >
                  24/7 без выходных и отпусков
                </span>
                <div className="absolute left-0 right-0 bottom-0 h-[0.5px] bg-white/[0.15]" />
              </motion.div>
            </motion.h1>

            {/* Текст с появлением из глубины */}
            <motion.p 
              className="text-base md:text-lg max-w-2xl text-balance leading-relaxed font-semibold -mt-2"
              style={{ color: "rgba(248, 250, 252, 0.88)" }}
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: premiumEasing }}
            >
              Строю систему: трафик → прогрев → квалификация → продажа. Без ручной работы и потери лидов
              <span className="sr-only">. Полная автоматизация продаж через Telegram-ботов с интеграцией CRM, настройка контекстной рекламы и таргетированной рекламы, разработка автоворонок для увеличения конверсии в 3-5 раз</span>
            </motion.p>

            {/* Бейджи с единым стеклянным стилем */}
            <div className="flex flex-wrap gap-3">
              {["Чат-боты под ключ", "Трафик: контекст, таргет", "Видео-лендинги"].map((tag, i) => (
                <motion.span 
                  key={tag} 
                  className={`px-4 py-2.5 rounded-xl ${glassStyle.base} ${glassStyle.shadow} ${glassStyle.hover} text-sm font-semibold text-slate-100 transition-all duration-300 cursor-default relative overflow-hidden`}
                  initial={{ opacity: 0, y: 10, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: staggerDelay(i, 0.08) + 0.35, duration: 0.7, ease: premiumEasing }}
                >
                  <span className="relative z-10">{tag}</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.span>
              ))}
            </div>

            {/* Таймер слотов */}
            <motion.button
              type="button"
              onClick={() => {
                onTimerCTA();
              }}
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl ${glassStyle.base} ${glassStyle.shadow} transition-all duration-300 group`}
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.01 }}
              transition={{ delay: 0.5, duration: 0.7, ease: premiumEasing }}
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 flex items-center justify-center shadow-[0_4px_12px_rgba(168,85,247,0.2),inset_0_1px_1px_rgba(255,255,255,0.08)] group-hover:shadow-[0_6px_18px_rgba(168,85,247,0.3)] transition-all duration-300`}>
                <Icon name="Clock" size={16} className="text-primary group-hover:text-accent transition-colors" />
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`slots-${slots}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`font-bold text-sm ${hasSlots ? "text-slate-200" : "text-slate-400"}`}
                >
                  {timerText}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Кнопки с единой стеклянной физикой */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7, ease: premiumEasing }}
            >
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={scrollToConsultation}
                  size="lg" 
                  className="relative bg-gradient-to-br from-primary/95 via-primary via-accent to-accent/95 hover:from-primary hover:via-accent hover:to-accent transition-all text-base font-bold px-8 shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-3px_12px_rgba(0,0,0,0.2)] border border-white/[0.08] hover:border-white/[0.12] backdrop-blur-sm overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Консультация
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  className="relative bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-[16px] border border-white/[0.08] hover:border-white/[0.12] text-[#E7E7E7] text-base font-bold shadow-[0_8px_18px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.45),0_0_10px_rgba(168,85,247,0.2),0_0_20px_rgba(236,72,153,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.13)] transition-all duration-200"
                  asChild
                >
                  <a 
                    href="#testimonials"
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      analytics.trackLinkClick('cases_button', '#testimonials');
                      document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Icon name="FileText" size={18} />
                    Кейсы
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  className="relative bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-[16px] border border-white/[0.08] hover:border-white/[0.12] text-[#E7E7E7] text-base font-bold shadow-[0_8px_18px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.45),0_0_10px_rgba(168,85,247,0.2),0_0_20px_rgba(236,72,153,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.13)] transition-all duration-200"
                  asChild
                >
                  <a 
                    href="#about"
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      analytics.trackLinkClick('about_button', '#about');
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Icon name="User" size={18} />
                    Обо мне
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.p 
              className="text-sm text-slate-400 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              30–40 минут для анализа воронки и точек роста без лишней теории
            </motion.p>
          </motion.div>

          {/* Правая колонка - карточка */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: premiumEasing }}
            className="lg:scale-[1.08] lg:-translate-y-16"
          >
            <motion.div
              whileHover={{ scale: 1.005, y: -2 }}
              transition={{ duration: 0.4, ease: premiumEasing }}
            >
            <Card className="relative p-8 backdrop-blur-2xl bg-black/[0.38] border border-t-white/[0.12] border-x-white/[0.08] border-b-white/[0.06] shadow-[0_14px_52px_rgba(0,0,0,0.65),0_0_110px_rgba(168,85,247,0.16),inset_0_2px_4px_rgba(255,255,255,0.12),inset_0_-2px_6px_rgba(0,0,0,0.15)] overflow-hidden group">
              {/* Градиентная подложка */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.03] opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Верхний блик */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Внутренний блюр для объёма */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/15 rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              
              <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500 mb-1.5 font-bold">Модель работы</div>
                <div className="text-sm font-bold text-slate-100">Digital-упаковка и автоматизация</div>
              </div>
              <motion.span 
                className={`px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/8 to-amber-500/10 border border-amber-400/15 text-[11px] font-bold text-amber-300 shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-sm`}
                animate={{
                  boxShadow: [
                    "0 4px 14px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.08)",
                    "0 6px 18px rgba(251,191,36,0.15), inset 0 1px 1px rgba(255,255,255,0.12)",
                    "0 4px 14px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.08)"
                  ]
                }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              >
                1 проект = 1 воронка
              </motion.span>
            </div>

            <div className="mb-8">
              <motion.div 
                className="text-6xl font-black bg-gradient-to-r from-white from-20% via-primary via-50% to-accent to-80% bg-clip-text text-transparent relative"
                {...breathingGlow}
                style={{ backgroundSize: "200% 200%" }}
              >
                +30–120%
              </motion.div>
              <div className="text-sm text-slate-300 mt-2 font-semibold">
                рост обращений с тем же бюджетом на трафик*
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: "Play", text: "Видео-лендинги, которые прогревают клиента за 30–90 секунд" },
                { icon: "Bot", text: "Чат-боты и автоворонки: ответы, сегментация, допродажи автоматически" },
                { icon: "TrendingUp", text: "Легальные источники трафика: тизеры, контекст, таргет" },
                { icon: "MessageCircle", text: "Консалтинг по структуре оффера и триггерным цепочкам" },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex gap-3 items-start group/item"
                  initial={{ opacity: 0, x: -15, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: staggerDelay(i, 0.1) + 0.5, duration: 0.7, ease: premiumEasing }}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-primary/12 via-accent/8 to-primary/12 border border-white/[0.08] flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-sm group-hover/item:shadow-[0_6px_20px_rgba(168,85,247,0.2),inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-300`}>
                    <Icon name={item.icon as any} size={16} className="text-primary group-hover/item:text-accent transition-colors" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300 group-hover/item:text-slate-100 transition-colors font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className={`mt-7 p-4 rounded-xl ${glassStyle.base} shadow-[0_6px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.08)]`}>
              <p className="text-center text-xs font-bold text-slate-200 leading-relaxed">
                Без воды, сложных терминов и риска для бизнеса — только практическая система, которая работает
              </p>
            </div>
            </div>
          </Card>
          </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};