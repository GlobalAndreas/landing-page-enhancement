import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";
import { analytics } from "@/utils/analytics";
import { Helmet } from "react-helmet";

export default function PersonalData() {
  useEffect(() => {
    window.scrollTo(0, 0);
    analytics.track('pdn_page_viewed', 'legal', 'personal_data');
  }, []);

  return (
    <>
      <Helmet>
        <title>Согласие на обработку персональных данных — Дильман Андрей Игоревич</title>
        <meta name="description" content="Информация о согласии на обработку персональных данных на сайте dilman.pro" />
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
                <span className="text-foreground">Обработка персональных данных</span>
              </nav>

              <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Согласие на обработку персональных данных
              </h1>

              <p className="text-lg text-white/80 mb-12">
                Самозанятый: Дильман Андрей Игоревич
              </p>

              <Card className="p-8 md:p-12 bg-card/50 backdrop-blur border-border/50 space-y-8">
                <div>
                  <p className="text-white/90 leading-relaxed">
                    Пользователь, заполняя форму на сайте dilman.pro или переходя в Telegram-бота, выражает согласие на обработку своих персональных данных в соответствии с Федеральным законом №152-ФЗ.
                  </p>
                </div>

                <div className="h-px bg-border/50" />

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Icon name="Database" size={24} className="text-primary flex-shrink-0" />
                    Обрабатываемые данные
                  </h2>
                  <ul className="space-y-2 ml-11">
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>имя или псевдоним;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>телефон, email, Telegram-логин;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>лично предоставленная информация.</span>
                    </li>
                  </ul>
                </section>

                <div className="h-px bg-border/50" />

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Icon name="Target" size={24} className="text-primary flex-shrink-0" />
                    Цели обработки
                  </h2>
                  <ul className="space-y-2 ml-11">
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>связь с пользователем;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>предоставление консультаций и услуг;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>отправка полезных материалов и обучающих сообщений;</span>
                    </li>
                    <li className="text-white/80 leading-relaxed flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>аналитика рекламных источников и улучшение качества сервиса.</span>
                    </li>
                  </ul>
                </section>

                <div className="h-px bg-border/50" />

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Icon name="Clock" size={24} className="text-primary flex-shrink-0" />
                    Срок действия согласия
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-3">
                    Согласие действует бессрочно, до момента его отзыва пользователем.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Пользователь вправе запросить удаление данных.
                  </p>
                </section>

                <div className="h-px bg-border/50" />

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Icon name="MessageCircle" size={24} className="text-primary flex-shrink-0" />
                    Контакт для отзыва согласия
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Для отзыва согласия на обработку персональных данных свяжитесь с нами:
                  </p>
                  <div className="flex flex-col gap-2 ml-11">
                    <a 
                      href="mailto:andreas.dilman@gmail.com"
                      className="text-primary hover:underline transition-colors flex items-center gap-2"
                      onClick={() => analytics.trackLinkClick('email_personal_data', 'mailto:andreas.dilman@gmail.com')}
                    >
                      <Icon name="Mail" size={16} />
                      andreas.dilman@gmail.com
                    </a>
                    <a 
                      href="https://t.me/andreasdilman"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline transition-colors flex items-center gap-2"
                      onClick={() => analytics.trackLinkClick('telegram_personal_data', 'https://t.me/andreasdilman')}
                    >
                      <Icon name="Send" size={16} />
                      https://t.me/andreasdilman
                    </a>
                  </div>
                </section>

                <div className="mt-8 p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex gap-3 items-start">
                    <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/80 leading-relaxed">
                      <span className="font-bold text-white">Важно:</span> Заполняя форму или используя Telegram-бота, вы автоматически даёте согласие на обработку персональных данных в соответствии с данным документом.
                    </p>
                  </div>
                </div>
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
