import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    niche: "",
    goal: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Свяжемся с вами в течение 24 часов",
    });
    setFormData({ name: "", contact: "", niche: "", goal: "" });
  };

  const scrollToConsultation = () => {
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-primary/30 ring-2 ring-primary/30">
                <img 
                  src="https://cdn.poehali.dev/files/4282259e-6f12-4a46-9573-6f5a0b5d5880.jpg" 
                  alt="Andrej Dilman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight">Andrej Dilman</div>
                <div className="text-xs text-muted-foreground">Digital-автоворонки</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#process" className="hover:text-primary transition-colors">Процесс</a>
              <a href="#legal" className="hover:text-primary transition-colors">Прозрачность</a>
            </nav>

            <Button onClick={scrollToConsultation} className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
              Консультация
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-3xl opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in space-y-8">
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
                    <a href="https://t.me/andreasdilman" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Icon name="Send" size={18} />
                      Написать в Telegram
                    </a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  30–40 минут созвона, чтобы разложить воронку по шагам без лишней теории
                </p>
              </div>

              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 animate-scale-in shadow-2xl shadow-primary/10">
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
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-secondary/50 to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.15),transparent_50%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur mb-6">
                  <Icon name="Sparkles" size={16} className="text-purple-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-purple-300">Полный цикл digital-упаковки</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    От идеи до потока клиентов
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Создаю полноценные системы привлечения: от премиальных сайтов до умных автоворонок, которые работают 24/7
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <Card className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 shadow-2xl shadow-purple-500/10">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <Icon name="Zap" size={20} className="text-purple-400" />
                          </div>
                          Полный спектр решений
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          Работаю на всех этапах воронки продаж — от первого касания до закрытия сделки
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {[
                          {
                            icon: "Globe",
                            title: "Сайты и лендинги",
                            desc: "Премиальные посадочные страницы с фокусом на конверсию: каждый элемент работает на результат",
                            badge: "До 300% рост конверсии"
                          },
                          {
                            icon: "Sparkles",
                            title: "AI-ассистент на сайте",
                            desc: "Умный помощник общается с посетителями 24/7: отвечает на вопросы, закрывает возражения, подогревает до покупки. Вы спите — он продаёт",
                            badge: "+40% к конверсии в лид"
                          },
                          {
                            icon: "Bot",
                            title: "Чат-боты и автоматизация",
                            desc: "Умные боты для Telegram: квалификация лидов, ответы на вопросы, запись на встречи без участия человека",
                            badge: "Экономия 15+ часов/нед"
                          },
                          {
                            icon: "Workflow",
                            title: "Автоворонки продаж",
                            desc: "Многошаговые цепочки с триггерами и сегментацией: каждый клиент получает персональное сообщение в нужный момент",
                            badge: "Допродажи на автомате"
                          },
                          {
                            icon: "Target",
                            title: "Трафик и масштабирование",
                            desc: "Настройка контекста, таргета, тизеров: только белые каналы с прозрачной аналитикой и предсказуемым результатом",
                            badge: "От 50 заявок/месяц"
                          },
                        ].map((item, i) => (
                          <div 
                            key={i} 
                            className="p-4 rounded-xl bg-gradient-to-br from-secondary/80 to-secondary/40 border border-border/50 hover:border-purple-500/50 transition-all duration-300 group hover:scale-[1.02]"
                          >
                            <div className="flex gap-4 items-start">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                                <Icon name={item.icon as any} size={22} className="text-purple-400" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h4 className="font-bold text-sm">{item.title}</h4>
                                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-[10px] font-bold text-green-400 whitespace-nowrap">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="order-1 lg:order-2 relative">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-50 animate-pulse" />
                    
                    <Card className="relative p-1 bg-gradient-to-br from-purple-500/50 via-pink-500/50 to-purple-500/50 backdrop-blur shadow-2xl">
                      <div className="bg-card rounded-2xl overflow-hidden">
                        <img 
                          src="https://cdn.poehali.dev/files/4282259e-6f12-4a46-9573-6f5a0b5d5880.jpg"
                          alt="Andrej Dilman — Digital-маркетолог"
                          className="w-full h-auto"
                        />
                        
                        <div className="p-6 bg-gradient-to-br from-card to-secondary/50">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-2xl font-black mb-1">Andrej Dilman</h3>
                              <p className="text-sm text-muted-foreground">Digital-маркетолог, разработчик систем продаж</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {[
                                { icon: "Award", text: "13+ лет в digital" },
                                { icon: "Users", text: "100+ проектов" },
                                { icon: "TrendingUp", text: "x2-x5 рост конверсий" },
                              ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border/50">
                                  <Icon name={stat.icon as any} size={14} className="text-purple-400" />
                                  <span className="text-xs font-medium">{stat.text}</span>
                                </div>
                              ))}
                            </div>

                            <div className="pt-4 border-t border-border/50">
                              <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                                Специализируюсь на создании digital-экосистем, где каждый элемент дополняет друг друга: 
                                <span className="text-foreground font-medium"> сайт привлекает, бот квалифицирует, воронка продаёт</span>
                              </p>
                              
                              <div className="flex gap-3">
                                <Button 
                                  onClick={scrollToConsultation}
                                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-all shadow-lg shadow-purple-500/30"
                                >
                                  <Icon name="Calendar" size={16} />
                                  Записаться
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="border-2"
                                  asChild
                                >
                                  <a href="https://t.me/andreasdilman" target="_blank" rel="noopener noreferrer">
                                    <Icon name="Send" size={16} />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />
                  </div>
                </div>
              </div>

              <div className="mt-16 grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "Rocket",
                    title: "Быстрый запуск",
                    desc: "От брифа до запуска первой воронки — 7-14 дней. Никаких месяцев ожидания",
                    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
                  },
                  {
                    icon: "ShieldCheck",
                    title: "Только легальные методы",
                    desc: "Работаю исключительно с белыми нишами и соблюдаю все требования площадок",
                    color: "from-green-500/20 to-emerald-500/20 border-green-500/30"
                  },
                  {
                    icon: "BarChart3",
                    title: "Прозрачная аналитика",
                    desc: "Видите каждый шаг клиента, источник трафика и ROI в реальном времени",
                    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30"
                  },
                ].map((feature, i) => (
                  <Card 
                    key={i} 
                    className={`p-6 bg-gradient-to-br ${feature.color} backdrop-blur border hover:scale-105 transition-all duration-300 text-center`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-background/50 to-background/30 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon name={feature.icon as any} size={28} className="text-foreground" />
                    </div>
                    <h4 className="font-bold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 bg-gradient-to-b from-transparent to-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-16 animate-fade-in">
              <div className="text-xs uppercase tracking-wider text-primary mb-3 font-semibold">Что я делаю</div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">Белые ниши, понятные услуги</h2>
              <p className="text-lg text-muted-foreground">
                Сфокусирован на разработке digital-систем, которые помогают получать больше целевых заявок
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "Bot", title: "Разработка чат-ботов", desc: "Построение логики бота: ответы на вопросы, записи на консультацию, сегментация аудитории", tag: "Автоматизация" },
                { icon: "Workflow", title: "Автоворонки и триггеры", desc: "Проработка пути клиента от первого клика до оплаты: цепочки сообщений, триггеры, вовлечение", tag: "Системные продажи" },
                { icon: "Target", title: "Трафик: тизеры, контекст, таргет", desc: "Настройка и рекомендация стратегий для легальных источников трафика с фокусом на посадочные страницы", tag: "Белый трафик" },
                { icon: "Video", title: "Короткие видео-лендинги", desc: "Концепция и структура страниц, где основную работу делают короткие видео: минимум текста, максимум смысла", tag: "Визуальный прогрев" },
                { icon: "Layout", title: "Посадочные страницы", desc: "Архитектура лендинга под конкретную задачу: сбор заявок, запуск новой услуги или продукта", tag: "Конвертация" },
                { icon: "Phone", title: "Консалтинг по воронкам", desc: "Разбор текущей системы привлечения клиентов, рекомендации по улучшению, помощь в выборе каналов", tag: "Личная стратегия" },
              ].map((service, i) => (
                <Card 
                  key={i} 
                  className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 group cursor-pointer"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                    <Icon name={service.icon as any} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{service.desc}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium uppercase tracking-wider">
                    {service.tag}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-16">
              <div className="text-xs uppercase tracking-wider text-primary mb-3 font-semibold">Как это работает</div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">От контакта до готовой воронки</h2>
              <p className="text-lg text-muted-foreground">
                Прозрачно выстраиваем систему: что, кому и на каком этапе показывается
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                {[
                  { step: "1", title: "Диагностика", desc: "Созвон: разбираем вашу нишу, текущие точки контакта с аудиторией. Формируем гипотезы, а не слепой план" },
                  { step: "2", title: "Архитектура", desc: "Проектируем структуру чат-бота, автоворонки, лендинга: какие шаги, сообщения, призывы к действию" },
                  { step: "3", title: "Реализация", desc: "Настройка бота, запуск автоворонок, сборка страниц. Подключение каналов: тизеры, контекст, таргет" },
                  { step: "4", title: "Аналитика и доработка", desc: "Смотрим, где люди отваливаются, что работает. Улучшаем тексты, креативы и ветки бота" },
                ].map((item, i) => (
                  <Card key={i} className="p-5 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 font-black text-lg shadow-lg shadow-primary/30">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-sm uppercase tracking-wider">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                {[
                  { title: "Прозрачная экономика", desc: "Никаких обещаний доходности, процентов, инвестиций. Только услуги по автоматизации и маркетингу" },
                  { title: "Фокус на консультации", desc: "Главное действие — заявка или запись на консультацию, а не быстрая покупка на эмоциях" },
                  { title: "Минимум лишнего, максимум смысла", desc: "Меньше перегруженных текстов — больше ясных шагов, коротких видео и живых триггеров" },
                  { title: "Требования платёжных сервисов", desc: "Архитектура воронки учитывает правила модерации рекламных сетей и платёжных поставщиков" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="legal" className="py-20 bg-gradient-to-b from-transparent to-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur mb-6">
                  <Icon name="ShieldCheck" size={16} className="text-green-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-green-300">Честные ответы на важные вопросы</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Полная прозрачность
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Чтобы вы понимали, с кем работаете и чего ожидать — без скрытых условий и сюрпризов
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Что именно вы делаете?",
                    a: "Разрабатываю digital-решения для бизнеса: сайты, лендинги, чат-боты, автоворонки и настраиваю рекламные кампании. Это услуги маркетинга, разработки и консалтинга — ничего больше."
                  },
                  {
                    q: "Как происходит оплата?",
                    a: "Работаю официально через договор. Оплата за услуги разработки и консультаций — никаких «скрытых платежей». Вы платите за работу, получаете результат."
                  },
                  {
                    q: "Есть ли гарантии результата?",
                    a: "Гарантирую качественную реализацию: рабочий сайт, настроенный бот, запущенную рекламу. Конверсия зависит от вашего оффера, ниши и аудитории — я помогаю максимизировать результат, но не обещаю волшебных цифр."
                  },
                  {
                    q: "С какими нишами вы работаете?",
                    a: "Частые мои клиенты: онлайн-школы, эксперты и наставники, услуги для бизнеса, e-commerce, консалтинг. Мой опыт в 100+ нишах — заполните заявку, найдём решение и для вас."
                  },
                  {
                    q: "Сколько стоят ваши услуги?",
                    a: "Зависит от проекта. Продающий лендинг — от 20 000₽, чат-бот с автоворонкой — от 35 000₽, комплексная система (сайт + бот + трафик) — от 100 000₽. Точную цену обсуждаем на консультации после разбора задачи."
                  },
                  {
                    q: "Как долго реализуется проект?",
                    a: "Лендинг — 3-7 дней, чат-бот — 5-10 дней, полная воронка с трафиком — 2-4 недели. Сроки зависят от сложности, но я всегда фиксирую дедлайны в договоре."
                  },
                  {
                    q: "Можно ли начать с пробной консультации?",
                    a: "Да! Первая консультация 30-40 минут — бесплатно. Разбираем вашу ситуацию, даю рекомендации. Если решите работать дальше — обсудим конкретный план и стоимость."
                  },
                  {
                    q: "Что будет после запуска?",
                    a: "Передаю вам все доступы, инструкции и обучаю команду работе с системой. Поддержка первые 14 дней бесплатно, дальше — по желанию на абонентской основе или разовые правки."
                  },
                ].map((faq, i) => (
                  <Card 
                    key={i}
                    className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-green-500/50 transition-all duration-300 group"
                  >
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20">
                        <Icon name="HelpCircle" size={20} className="text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-3 text-foreground">{faq.q}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="mt-12 p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 backdrop-blur">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle2" size={24} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-3 text-green-400">Почему именно Я? Ваша выгода в 3 пунктах</h3>
                    <p className="text-sm leading-relaxed text-foreground font-semibold mb-4">
                      🎯 <span className="text-green-400">13 лет опыта = экономия ваших денег.</span> Я уже сделал все ошибки за свой счёт. 
                      Вы получаете готовые решения, которые работают с первого раза — без дорогих экспериментов на вашем бюджете.
                    </p>
                    <p className="text-sm leading-relaxed text-foreground font-semibold mb-4">
                      ⚡ <span className="text-green-400">Полная прозрачность = ваша безопасность.</span> Работаю только с белыми нишами, 
                      официально, через договор. Это значит: никаких блокировок рекламы, проблем с оплатой и внезапных "исчезновений" исполнителя.
                    </p>
                    <p className="text-sm leading-relaxed text-foreground font-semibold">
                      💰 <span className="text-green-400">Системный подход = реальные продажи.</span> Не просто "сделаю красиво" — 
                      каждый элемент заточен под конверсию. Вы платите за результат: заявки, звонки, продажи. А не за "дизайн для портфолио".
                    </p>
                  </div>
                </div>
              </Card>

              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground mb-6">
                  Остались вопросы? Обсудим на бесплатной консультации
                </p>
                <Button 
                  onClick={scrollToConsultation}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition-all shadow-lg shadow-green-500/30 text-base font-semibold px-8"
                >
                  <Icon name="MessageCircle" size={18} />
                  Задать вопрос на консультации
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="consultation" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-3xl opacity-20" />
          
          <div className="container mx-auto px-4 relative z-10">
            <Card className="max-w-5xl mx-auto p-8 md:p-12 bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl">
              <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary mb-3 font-semibold">Личная работа</div>
                    <h2 className="text-3xl md:text-4xl font-black mb-4">Записаться на консультацию</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Помогу собрать из разрозненных идей цельную систему: чат-бот, автоворонку, посадочную страницу и трафик
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["Разбор текущей ситуации", "Предложения по структуре", "Рекомендации по трафику", "План внедрения"].map((item) => (
                      <span key={item} className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium">
                        {item}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-4">
                    Никаких навязанных решений и "золотых пилюль" — только реалистичный план действий, который можно внедрить поэтапно
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя</label>
                      <Input
                        placeholder="Как к вам обращаться"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-secondary/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Telegram или What's app</label>
                      <Input
                        placeholder="@username или почта"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        required
                        className="bg-secondary/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Ниша / проект</label>
                    <Input
                      placeholder="Кого вы привлекаете и что продаёте"
                      value={formData.niche}
                      onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                      className="bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Главная цель консультации</label>
                    <Textarea
                      placeholder="Например: больше заявок на консультацию, настроить бота, выстроить автоворонку..."
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="bg-secondary/50 border-border/50 focus:border-primary min-h-[100px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-base font-semibold shadow-lg shadow-primary/30"
                  >
                    Оставить заявку на консультацию
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая на кнопку, вы отправляете заявку на личный контакт. Оплата услуг осуществляется только через официальные инструменты
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border/50 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>© 2025-2026 Andrej Dilman. Digital-автоворонки, чат-боты и консультации
</div>
            <div className="flex gap-6">
              <a href="https://t.me/andreasdilman" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Telegram
              </a>
              <a href="#legal" className="hover:text-primary transition-colors">
                Условия оказания услуг
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;