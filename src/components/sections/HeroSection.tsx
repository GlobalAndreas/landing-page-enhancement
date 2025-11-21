import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";
import { analytics } from "@/utils/analytics";

interface HeroSectionProps {
  scrollToConsultation: () => void;
}

export const HeroSection = ({ scrollToConsultation }: HeroSectionProps) => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-3xl opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-primary/30 backdrop-blur">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase">автоматизация бизнес процессов
</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-balance">
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">
                Чат-боты, автоворонки
              </span>
              <br />
              <span className="text-foreground">и трафик</span>
              <br />
              <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">под ваши услуги</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl text-balance leading-relaxed">
              Помогаю предпринимателям выстраивать понятные воронки: чат-боты, посадочные страницы и видео-лендинги, которые приводят клиентов на консультацию
            </p>

            <div className="flex flex-wrap gap-2">
              {["Чат-боты под ключ", "Трафик: контекст, таргет", "Видео-лендинги"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-card border border-border text-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={scrollToConsultation}
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-base font-semibold px-8 shadow-lg shadow-primary/30"
              >
                Получить консультацию
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 text-base font-semibold"
                asChild
              >
                <a 
                  href="https://t.me/andreasdilman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2"
                  onClick={() => analytics.trackLinkClick('telegram_button', 'https://t.me/andreasdilman')}
                >
                  <Icon name="Send" size={18} />
                  Написать в Telegram
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              30–40 минут созвона, чтобы разложить воронку по шагам без лишней теории
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 shadow-2xl shadow-primary/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Модель работы</div>
                <div className="text-sm font-medium">Digital-упаковка и автоматизация</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-xs font-medium">
                1 проект = 1 воронка
              </span>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                +30–120%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
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
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20">
                    <Icon name={item.icon as any} size={16} className="text-green-400" />
                  </div>
                  <p className="text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-center text-xs font-semibold">
                Без инвестиций, крипты и финансовых услуг
              </p>
            </div>
          </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};