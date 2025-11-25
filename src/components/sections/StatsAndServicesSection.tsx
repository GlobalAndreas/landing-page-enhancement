import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const StatsAndServicesSection = () => {
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-secondary/50 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur mb-6">
                <Icon name="Trophy" size={16} className="text-primary" />
                <span className="text-xs font-bold tracking-wider uppercase text-primary">результаты и цифры</span>
              </div>
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-black mb-4 relative"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 0.2, 0] }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, times: [0, 0.5, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 blur-xl"
                />
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent relative">
                  Факты для принятия решения
                </span>
              </motion.h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Простые цифры, которые показывают, зачем нужна автоматизация — без красивых обещаний
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "Users",
                  value: "500+",
                  label: "реализованных проектов",
                  description: "За 13 лет: от малого бизнеса до федеральных компаний"
                },
                {
                  icon: "TrendingUp",
                  value: "3–5x",
                  label: "рост обращений",
                  description: "Средний показатель при внедрении чат-ботов и прогревов"
                },
                {
                  icon: "Clock",
                  value: "80%",
                  label: "экономия времени",
                  description: "За счёт автоответов в боте и квалификации заявок"
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 group h-full">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                      <Icon name={stat.icon as any} size={24} className="text-primary" />
                    </div>
                    <div className="text-3xl font-black mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="font-bold mb-2 text-foreground">{stat.label}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              ref={servicesRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 backdrop-blur mb-6">
                <Icon name="Briefcase" size={16} className="text-accent" />
                <span className="text-xs font-bold tracking-wider uppercase text-accent">услуги</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Что я делаю для вашего бизнеса
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Каждый проект — это законченная digital-воронка: от дизайна лендинга до автоворонки и трафика
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "Bot",
                  color: "from-blue-500 to-cyan-500",
                  title: "Telegram-боты и автоворонки",
                  description: "Создаю чат-боты с логикой квалификации клиентов, автоответами, записью на консультацию, допродажами. Интеграция с CRM, аналитикой и платёжными системами.",
                  features: ["Логика сегментации клиентов", "Авто-квалификация и прогрев", "Интеграция с CRM и оплатами"]
                },
                {
                  icon: "Video",
                  color: "from-purple-500 to-pink-500",
                  title: "Видео-лендинги и сайты",
                  description: "Разрабатываю продающие страницы с видео-прогревом, которые держат внимание 30–90 секунд и ведут клиента к целевому действию без лишних кликов.",
                  features: ["Дизайн и структура под конверсию", "Видео-интеграция с авто-запуском", "A/B тесты для роста показателей"]
                },
                {
                  icon: "Target",
                  color: "from-orange-500 to-red-500",
                  title: "Настройка трафика и реклама",
                  description: "Запускаю контекстную рекламу (Яндекс Директ, Google Ads), таргет и тизерные сети. Только белые ниши, легальные связки, минимальный риск блокировок.",
                  features: ["Контекст: Яндекс, Google", "Таргет: ВКонтакте, Telegram Ads", "Тизеры: для массовых продуктов"]
                },
                {
                  icon: "Zap",
                  color: "from-green-500 to-emerald-500",
                  title: "Консалтинг и оптимизация",
                  description: "Аудит текущих воронок, советы по структуре оффера, триггерам, сценариям. Помогаю повысить конверсию на каждом этапе — от креатива до закрытия сделки.",
                  features: ["Разбор текущей воронки", "Рекомендации по офферу", "Чек-листы для масштабирования"]
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 group h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl`}>
                      <div className="absolute w-14 h-14 rounded-2xl bg-gradient-to-br from-white/20 to-transparent backdrop-blur flex items-center justify-center">
                        <Icon name={service.icon as any} size={28} className="text-foreground" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black mb-3 text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="py-20 bg-gradient-to-b from-secondary/30 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              ref={processRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur mb-6">
                <Icon name="GitBranch" size={16} className="text-purple-400" />
                <span className="text-xs font-bold tracking-wider uppercase text-purple-300">процесс работы</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Как мы работаем
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                5 простых шагов от заявки до запуска вашей автоворонки — прозрачно и без сюрпризов
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                { step: "01", title: "Консультация и анализ", description: "Созваниваемся 30–40 минут. Разбираем вашу нишу, текущую воронку, цели. Определяем, что нужно для роста обращений.", icon: "Phone" },
                { step: "02", title: "Стратегия и план", description: "Составляю план воронки: структура бота, лендинг, источники трафика. Согласуем сроки, бюджет, KPI.", icon: "FileText" },
                { step: "03", title: "Разработка и запуск", description: "Создаю бот, лендинг, настраиваю интеграции. Тестируем, исправляем недочёты, запускаем тестовый трафик.", icon: "Code" },
                { step: "04", title: "Настройка трафика", description: "Запускаю рекламу: контекст, таргет или тизеры. Отслеживаем первые заявки, корректируем креативы и ставки.", icon: "TrendingUp" },
                { step: "05", title: "Передача и поддержка", description: "Передаю доступы, обучаю команду работе с системой. Первые 14 дней — бесплатная поддержка, далее — по желанию.", icon: "CheckCircle2" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isProcessInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-purple-500/50 transition-all duration-300 group">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                          <Icon name={item.icon as any} size={20} className="text-purple-400" />
                        </div>
                        <div className="text-xs font-black text-purple-400/50 text-center">{item.step}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};