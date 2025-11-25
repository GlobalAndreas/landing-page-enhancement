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
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[140px] opacity-25" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
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
              <span className="text-xs font-bold tracking-widest uppercase text-slate-200">13 лет в автоматизации
</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black leading-[1.1] text-balance tracking-tight">
              <motion.span 
                className="inline-block bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(168,85,247,0.3), 0 0 40px rgba(168,85,247,0.1)",
                    "0 0 30px rgba(236,72,153,0.3), 0 0 50px rgba(236,72,153,0.1)",
                    "0 0 20px rgba(168,85,247,0.3), 0 0 40px rgba(168,85,247,0.1)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Чат-боты, автоворонки
              </motion.span>
              <br />
              <span className="text-slate-100">и трафик</span>
              <br />
              <span className="text-slate-400 text-3xl md:text-4xl lg:text-5xl font-bold">под ваши услуги</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl text-balance leading-relaxed font-medium">
              Создаю интеллектуальные автоворонки и чат-боты, которые превращают трафик в стабильные заявки и освобождают время предпринимателю
            </p>

            <div className="flex flex-wrap gap-3">
              {["Чат-боты под ключ", "Трафик: контекст, таргет", "Видео-лендинги"].map((tag, i) => (
                <motion.span 
                  key={tag} 
                  className="px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-primary/30 hover:shadow-[0_4px_16px_rgba(168,85,247,0.2)] transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
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
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={scrollToConsultation}
                  size="lg" 
                  className="relative bg-gradient-to-r from-primary/90 via-accent/90 to-primary/90 hover:from-primary hover:via-accent hover:to-primary transition-all text-base font-bold px-8 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] border border-primary/30 backdrop-blur-sm overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Консультация
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  className="relative bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 hover:border-primary/40 transition-all text-base font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]"
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
            <Card className="relative p-8 bg-gradient-to-br from-white/[0.07] via-white/[0.04] to-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_80px_rgba(168,85,247,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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

            <div className="mb-6">
              <motion.div 
                className="text-5xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent relative"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  filter: [
                    "drop-shadow(0 0 8px rgba(168,85,247,0.4))",
                    "drop-shadow(0 0 12px rgba(236,72,153,0.5))",
                    "drop-shadow(0 0 8px rgba(168,85,247,0.4))"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                +30–120%
              </motion.div>
              <div className="text-sm text-slate-400 mt-2 font-medium">
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
                  transition={{ delay: i * 0.1 + 0.4 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(168,85,247,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-sm group-hover/item:shadow-[0_4px_24px_rgba(168,85,247,0.4)] transition-all duration-300">
                    <Icon name={item.icon as any} size={16} className="text-primary group-hover/item:text-accent transition-colors" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300 group-hover/item:text-slate-100 transition-colors">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-white/5 via-white/[0.02] to-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-center text-xs font-bold text-slate-300 leading-relaxed">
                Работаю с экспертами, сервисами и компаниями, которым важны системность, масштабирование и предсказуемые результаты
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