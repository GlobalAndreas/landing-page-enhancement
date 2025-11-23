import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";
import { analytics } from "@/utils/analytics";
import { Helmet } from "react-helmet";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    analytics.track('policy_viewed', 'legal', 'privacy');
  }, []);

  return (
    <>
      <Helmet>
        <title>Политика конфиденциальности — Дильман Андрей Игоревич</title>
        <meta name="description" content="Политика обработки персональных данных на сайте dilman.pro" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-[#0B0B0D] text-white">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Icon name="ArrowLeft" size={20} />
              <span className="text-sm font-medium">Вернуться на главную</span>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-primary transition-colors">
                  Главная
                </Link>
                <Icon name="ChevronRight" size={14} />
                <span className="text-foreground">Политика конфиденциальности</span>
              </nav>

              <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Политика конфиденциальности
              </h1>

              <p className="text-lg text-white/80 mb-12">
                Самозанятый: Дильман Андрей Игоревич
              </p>

              <Card className="p-8 md:p-12 bg-card/50 backdrop-blur border-border/50 space-y-8">
                <div>
                  <p className="text-white/90 leading-relaxed">
                    Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных пользователей сайта dilman.pro, а также лиц, взаимодействующих через формы обратной связи и Telegram-бота.
                  </p>
                </div>

                <div className="h-px bg-border/50" />

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      1
                    </span>
                    Собираемые данные
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Сайт может собирать следующие данные пользователей:
                  </p>
                  <ul className="space-y-2 ml-11">
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>имя или псевдоним;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>телефон, email или Telegram-логин;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>данные, указанные пользователем добровольно;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>техническая информация: cookie-файлы, IP-адрес, тип устройства, время посещения, глубина просмотра страниц.</span>
                    </li>
                  </ul>
                </section>

                <div className="h-px bg-border/50" />

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      2
                    </span>
                    Цели обработки данных
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Персональные данные используются для:
                  </p>
                  <ul className="space-y-2 ml-11">
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>связи с пользователем;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>предоставления консультаций и услуг по маркетингу, автоворонкам и чат-ботам;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>отправки полезных материалов и обучающих уведомлений;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>аналитики рекламных каналов и улучшения качества сайта.</span>
                    </li>
                  </ul>
                </section>

                <div className="h-px bg-border/50" />

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      3
                    </span>
                    Передача данных третьим лицам
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Данные могут передаваться только в случаях:
                  </p>
                  <ul className="space-y-2 ml-11">
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>по запросу уполномоченных государственных органов;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>при использовании внешних сервисов уведомлений (например, Telegram API).</span>
                    </li>
                  </ul>
                  <p className="text-white/80 leading-relaxed mt-4 ml-11">
                    Трансграничная передача возможна только в рамках технической работы сервисов.
                  </p>
                </section>

                <div className="h-px bg-border/50" />

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      4
                    </span>
                    Хранение данных
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-3">
                    Все персональные данные хранятся в соответствии с законодательством РФ.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Пользователь вправе запросить удаление или изменение своих данных.
                  </p>
                </section>

                <div className="h-px bg-border/50" />

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      5
                    </span>
                    Контакты для обращений
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Самозанятый: Дильман Андрей Игоревич
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    По вопросам обработки данных можно написать:
                  </p>
                  <div className="flex flex-col gap-2 mt-4 ml-11">
                    <a 
                      href="mailto:andreas.dilman@gmail.com"
                      className="text-primary hover:underline transition-colors flex items-center gap-2"
                      onClick={() => analytics.trackLinkClick('email_privacy', 'mailto:andreas.dilman@gmail.com')}
                    >
                      <Icon name="Mail" size={16} />
                      andreas.dilman@gmail.com
                    </a>
                    <a 
                      href="https://t.me/andreasdilman"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline transition-colors flex items-center gap-2"
                      onClick={() => analytics.trackLinkClick('telegram_privacy', 'https://t.me/andreasdilman')}
                    >
                      <Icon name="Send" size={16} />
                      https://t.me/andreasdilman
                    </a>
                  </div>
                </section>
              </Card>

              <div className="mt-12 text-center">
                <Link 
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Вернуться на главную страницу
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
