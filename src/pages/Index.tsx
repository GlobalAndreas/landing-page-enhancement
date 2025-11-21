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
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary animate-gradient flex items-center justify-center shadow-lg shadow-primary/30 animate-glow">
                <span className="text-xl font-black text-primary-foreground">A</span>
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight">Andreas Dilman</div>
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
                  <p className="text-xs text-center font-medium">
                    Без инвестиций, крипты и финансовых услуг
                  </p>
                </div>
              </Card>
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

        <section id="legal" className="py-20 bg-gradient-to-b from-transparent to-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <div className="text-xs uppercase tracking-wider text-primary mb-3 font-semibold">Юридическая прозрачность</div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">Только digital-маркетинг</h2>
              <p className="text-lg text-muted-foreground">
                Вся деятельность связана с разработкой, консалтингом и настройкой digital-систем. Ничего сверх этого
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-2 border-emerald-500/30 backdrop-blur">
              <h3 className="text-sm uppercase tracking-wider font-bold mb-4 text-emerald-400">Что важно знать</h3>
              <div className="space-y-3 text-sm leading-relaxed">
                <p className="flex items-start gap-2">
                  <Icon name="CircleCheck" size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Не осуществляю финансовую, инвестиционную или брокерскую деятельность</span>
                </p>
                <p className="flex items-start gap-2">
                  <Icon name="CircleCheck" size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Не привлекаю средства клиентов под проценты и не управляю их капиталом</span>
                </p>
                <p className="flex items-start gap-2">
                  <Icon name="CircleCheck" size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Не занимаюсь криптовалютами, токенами, трейдингом и инвестиционными продуктами</span>
                </p>
                <p className="flex items-start gap-2">
                  <Icon name="CircleCheck" size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Все услуги относятся к области разработки, маркетинга и консалтинга для бизнеса</span>
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-6 pt-6 border-t border-emerald-500/20">
                Это позволяет безопасно интегрировать платёжные решения и соответствовать требованиям платёжных провайдеров и рекламных площадок
              </p>
            </Card>
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
                      <label className="text-sm font-medium mb-2 block">Telegram или e-mail</label>
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
            <div>© {new Date().getFullYear()} Andreas Dilman. Digital-автоворонки, чат-боты и консультации</div>
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