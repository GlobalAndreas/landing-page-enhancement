import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const LegalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="legal" className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-slate-950/50 to-background">
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px]"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-[120px]"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl mb-8 shadow-lg shadow-emerald-500/10">
              <Icon name="Shield" size={14} className="text-emerald-400/90" />
              <span className="text-xs font-semibold tracking-wide uppercase text-emerald-300/80">Честные ответы на важные вопросы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                Полная прозрачность
              </span>
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Чтобы вы понимали, с кем работаете и чего ожидать — без скрытых условий и сюрпризов
            </p>
          </motion.div>

          <div className="space-y-3">
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
                a: "Лендинг — 3-7 дней, чат-бот — 5-10 дней, полная воронка с трафиком — 2-4 недели. Сроки зависит от сложности, но я всегда фиксирую дедлайны в договоре."
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card 
                  className="p-7 bg-slate-900/30 backdrop-blur-xl border border-emerald-500/10 hover:border-emerald-500/30 hover:bg-slate-900/40 transition-all duration-500 group shadow-[0_0_20px_rgba(16,185,129,0.03)] hover:shadow-[0_0_35px_rgba(16,185,129,0.08)]"
                >
                  <div className="flex gap-5">
                    <motion.div 
                      className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/15 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-emerald-500/40 transition-all duration-300"
                      initial={{ rotate: -180, scale: 0 }}
                      animate={isInView ? { rotate: 0, scale: 1 } : { rotate: -180, scale: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.08 + 0.2, type: "spring", stiffness: 200 }}
                    >
                      <Icon name="HelpCircle" size={16} className="text-emerald-400/80" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold mb-2.5 text-slate-100 leading-snug">{faq.q}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="mt-8 p-8 bg-slate-900/40 backdrop-blur-xl border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.08)] hover:shadow-[0_0_60px_rgba(16,185,129,0.12)] transition-all duration-500">
              <div className="flex gap-5 items-start">
                <motion.div 
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20"
                  initial={{ rotate: -180, scale: 0 }}
                  animate={isInView ? { rotate: 0, scale: 1 } : { rotate: -180, scale: 0 }}
                  transition={{ duration: 0.7, delay: 0.9, type: "spring", stiffness: 180 }}
                >
                  <Icon name="CheckCircle2" size={20} className="text-emerald-400/90" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-black mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Почему именно Я? Ваша выгода в 3 пунктах</h3>
                  <p className="text-sm leading-relaxed text-slate-300 font-medium mb-4">
                    🎯 <span className="text-emerald-400 font-semibold">13 лет опыта = экономия ваших денег.</span> Я уже сделал все ошибки за свой счёт. 
                    Вы получаете готовые решения, которые работают с первого раза — без дорогих экспериментов на вашем бюджете.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300 font-medium mb-4">
                    ⚡ <span className="text-emerald-400 font-semibold">Полная прозрачность = ваша безопасность.</span> Работаю только с белыми нишами, 
                    официально, через договор. Это значит: никаких блокировок рекламы, проблем с оплатой и внезапных "исчезновений" исполнителя.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300 font-medium">
                    🚀 <span className="text-emerald-400 font-semibold">Комплексный подход = ваш результат.</span> Не просто "сделаю лендинг" или "настрою рекламу". 
                    Вы получаете готовую воронку: от первого клика до заявки. Всё работает вместе, а не по частям.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LegalSection;