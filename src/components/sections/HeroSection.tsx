import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { motion, AnimatePresence } from "framer-motion";
import { analytics } from "@/utils/analytics";

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
    <section className="relative py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(236,72,153,0.08),transparent)]" />
      
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] opacity-20 -translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-accent/15 rounded-full blur-[180px] opacity-15 translate-x-1/3 translate-y-1/4" />
      
      <div className="absolute left-0 top-1/2 w-1/4 h-1/3 bg-gradient-to-r from-primary/5 to-transparent blur-3xl" />
      <div className="absolute right-0 top-1/3 w-1/4 h-1/3 bg-gradient-to-l from-accent/5 to-transparent blur-3xl" />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.08fr] gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <motion.div 
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)]"
              animate={{
                boxShadow: [
                  "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)",
                  "0 4px 24px rgba(168,85,247,0.3), inset 0 1px 1px rgba(255,255,255,0.2)",
                  "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-slate-200">13 лет в автоматизации</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-[5.5rem] font-black leading-[1.1] text-balance tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <motion.span 
                className="inline-block bg-gradient-to-r from-white from-10% via-primary via-50% to-accent to-90% bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(168,85,247,0.5)) drop-shadow(0 0 60px rgba(168,85,247,0.2))"
                }}
                animate={{
                  filter: [
                    "drop-shadow(0 0 30px rgba(168,85,247,0.5)) drop-shadow(0 0 60px rgba(168,85,247,0.2))",
                    "drop-shadow(0 0 40px rgba(236,72,153,0.6)) drop-shadow(0 0 80px rgba(236,72,153,0.25))",
                    "drop-shadow(0 0 30px rgba(168,85,247,0.5)) drop-shadow(0 0 60px rgba(168,85,247,0.2))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Чат-боты, автоворонки
              </motion.span>
              <br />
              <span className="text-slate-50">и трафик</span>
              <br />
              <div className="relative inline-block mt-1 mb-3">
                <div 
                  className="absolute inset-0 translate-y-1 blur-[3px] opacity-10 bg-gradient-to-r from-primary via-accent to-primary"
                  style={{ backgroundSize: "200% 100%" }}
                />
                <motion.span 
                  className="relative inline-block font-black leading-tight bg-gradient-to-r from-slate-300 via-white to-slate-300 bg-clip-text text-transparent"
                  style={{
                    fontSize: "calc(3rem + 3px)",
                    letterSpacing: "0.055em",
                    backgroundSize: "200% 200%",
                    filter: "drop-shadow(0 0 30px rgba(255,255,255,0.3)) drop-shadow(0 0 60px rgba(168,85,247,0.15))",
                    WebkitTextStroke: "0.5px transparent",
                    backgroundImage: "linear-gradient(to right, rgb(203 213 225) 0%, rgb(236 72 153 / 0.05) 20%, rgb(168 85 247 / 0.05) 50%, rgb(236 72 153 / 0.05) 80%, rgb(203 213 225) 100%), linear-gradient(to right, rgb(203 213 225), rgb(255 255 255), rgb(203 213 225))",
                    backgroundClip: "text, text"
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    filter: [
                      "drop-shadow(0 0 30px rgba(255,255,255,0.3)) drop-shadow(0 0 60px rgba(168,85,247,0.15))",
                      "drop-shadow(0 0 40px rgba(255,255,255,0.4)) drop-shadow(0 0 80px rgba(168,85,247,0.25))",
                      "drop-shadow(0 0 30px rgba(255,255,255,0.3)) drop-shadow(0 0 60px rgba(168,85,247,0.15))"
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  в единую систему
                </motion.span>
              </div>
            </motion.h1>

            <p className="text-lg text-slate-200 max-w-2xl text-balance leading-relaxed font-semibold -mt-2">
              Создаю интеллектуальные автоворонки и чат-боты, которые превращают хаос в стабильные заявки
            </p>

            <div className="flex flex-wrap gap-3">
              {["Чат-боты под ключ", "Трафик: контекст, таргет", "Видео-лендинги"].map((tag, i) => (
                <motion.span 
                  key={tag} 
                  className="px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/[0.15] text-sm font-semibold text-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12),0_0_20px_rgba(168,85,247,0.08)] hover:bg-black/50 hover:border-primary/30 hover:shadow-[0_6px_20px_rgba(168,85,247,0.35),inset_0_1px_2px_rgba(255,255,255,0.18),0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.25 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <motion.button
              type="button"
              onClick={() => {
                onTimerCTA();
              }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/15 text-sm shadow-[0_0_25px_rgba(129,140,248,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/10 transition-all duration-300 group"
              animate={{
                boxShadow: [
                  "0 0 25px rgba(129,140,248,0.3), inset 0 1px 1px rgba(255,255,255,0.1)",
                  "0 0 35px rgba(236,72,153,0.4), inset 0 1px 1px rgba(255,255,255,0.15)",
                  "0 0 25px rgba(129,140,248,0.3), inset 0 1px 1px rgba(255,255,255,0.1)"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                <Icon name="Clock" size={16} className="text-primary group-hover:text-accent transition-colors" />
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`slots-${slots}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`font-bold ${hasSlots ? "text-slate-200" : "text-slate-400"}`}
                >
                  {timerText}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0 0 35px rgba(168,85,247,0.5)",
                    "0 0 45px rgba(168,85,247,0.6)",
                    "0 0 35px rgba(168,85,247,0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Button 
                  onClick={scrollToConsultation}
                  size="lg" 
                  className="relative bg-gradient-to-br from-primary/95 via-primary via-accent to-accent/95 hover:from-primary hover:via-accent hover:to-accent transition-all text-base font-bold px-8 shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_40px_rgba(168,85,247,0.5),inset_0_1px_2px_rgba(255,255,255,0.25),inset_0_-2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_60px_rgba(168,85,247,0.7),0_0_100px_rgba(168,85,247,0.3),inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-3px_12px_rgba(0,0,0,0.2)] border border-primary/40 hover:border-primary/70 backdrop-blur-sm overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Консультация
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  className="relative bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl border border-white/20 hover:border-primary/50 transition-all text-base font-bold shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-2px_6px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.4),inset_0_1px_2px_rgba(255,255,255,0.18),inset_0_-3px_10px_rgba(0,0,0,0.15)]"
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
            </div>

            <p className="text-sm text-slate-400 font-medium">
              30–40 минут для анализа воронки и точек роста без лишней теории
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:scale-[1.08] lg:-translate-y-14"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
            <Card className="relative p-8 bg-white/[0.08] backdrop-blur-2xl border-t-2 border-x border-b border-t-amber-500/[0.12] border-x-white/[0.12] border-b-white/[0.08] shadow-[0_12px_48px_rgba(0,0,0,0.6),0_0_100px_rgba(168,85,247,0.25),0_0_160px_rgba(168,85,247,0.12),inset_0_2px_3px_rgba(255,255,255,0.18),inset_0_-1px_2px_rgba(0,0,0,0.1)] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-accent/[0.04] opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
              
              <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500 mb-1.5 font-bold">Модель работы</div>
                <div className="text-sm font-bold text-slate-100">Digital-упаковка и автоматизация</div>
              </div>
              <motion.span 
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-400/20 text-[11px] font-bold text-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.2)] backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    "0 0 16px rgba(251,191,36,0.2)",
                    "0 0 24px rgba(251,191,36,0.35)",
                    "0 0 16px rgba(251,191,36,0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                1 проект = 1 воронка
              </motion.span>
            </div>

            <div className="mb-8">
              <motion.div 
                className="text-6xl font-black bg-gradient-to-r from-white from-20% via-primary via-50% to-accent to-80% bg-clip-text text-transparent relative"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ 
                  backgroundSize: "200% 200%",
                  filter: "drop-shadow(0 0 16px rgba(168,85,247,0.6)) drop-shadow(0 0 32px rgba(168,85,247,0.3)) drop-shadow(0 0 48px rgba(168,85,247,0.15))"
                }}
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.35 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(168,85,247,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-sm group-hover/item:shadow-[0_4px_24px_rgba(168,85,247,0.4)] transition-all duration-300">
                    <Icon name={item.icon as any} size={16} className="text-primary group-hover/item:text-accent transition-colors" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300 group-hover/item:text-slate-100 transition-colors font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-7 p-4 rounded-xl bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06] border border-white/10 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
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