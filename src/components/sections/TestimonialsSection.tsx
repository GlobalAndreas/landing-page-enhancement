import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Алексей Морозов",
    niche: "Онлайн-школа по недвижимости",
    avatar: "👨‍💼",
    before: "Реклама вела на сайт с формой обратной связи. Конверсия в заявку — 2%, большинство отваливались сразу. За месяц 150 кликов = 3 заявки.",
    after: "Запустили видео-лендинг с прогревом 60 секунд и чат-бот для квалификации. Конверсия выросла до 8%. За тот же бюджет — 12 заявок в месяц.",
    result: "×4 рост заявок",
    bgColor: "#4C7DFF"
  },
  {
    name: "Мария Соколова",
    niche: "Психолог-коуч, личные консультации",
    avatar: "👩‍⚕️",
    before: "Лендинг с текстом и формой записи. Люди читали, но не записывались. Конверсия 1,5%, стоимость заявки — 3200₽.",
    after: "Добавили видео-приветствие и чат-бот с тестом на определение запроса. Конверсия выросла до 6%, стоимость заявки упала до 950₽.",
    result: "×4 рост конверсии, −70% стоимость заявки",
    bgColor: "#FF4FD3"
  },
  {
    name: "Дмитрий Ковалёв",
    niche: "E-commerce: спортивное питание",
    avatar: "🏋️",
    before: "Классический интернет-магазин. Трафик был, но брошенных корзин — 78%. Повторных покупок почти нет.",
    after: "Внедрили чат-бот для консультации по продуктам и допродажи в мессенджере. Брошенных корзин — 45%, повторные покупки выросли на 35%.",
    result: "+35% LTV клиента",
    bgColor: "#4C7DFF"
  },
  {
    name: "Елена Смирнова",
    niche: "Бизнес-консалтинг, услуги для B2B",
    avatar: "💼",
    before: "Сайт-визитка и холодные звонки. На консультацию выходило 2-3 человека в месяц. Долгий цикл сделки, низкая предсказуемость.",
    after: "Запустили автоворонку: контекстная реклама → лендинг с кейсами → бот для записи. Заявок стало 10-12 в месяц, цикл сокращён на 30%.",
    result: "×5 рост заявок, −30% цикл сделки",
    bgColor: "#2CFFB5"
  },
  {
    name: "Игорь Волков",
    niche: "Образовательные курсы по программированию",
    avatar: "👨‍💻",
    before: "Трафик с YouTube на лендинг с ценой курса. Конверсия в покупку — 0,8%. Много вопросов в комментариях, но не покупали.",
    after: "Добавили чат-бот с бесплатным мини-курсом и автоворонку прогрева на 5 дней. Конверсия в покупку выросла до 4,2%.",
    result: "×5 рост продаж",
    bgColor: "#4C7DFF"
  },
  {
    name: "Анна Петрова",
    niche: "Фитнес-студия, персональные тренировки",
    avatar: "🏃‍♀️",
    before: "Запускала таргет ВКонтакте на форму записи. Стоимость заявки — 850₽, конверсия в оплату — 15%. Много нецелевых заявок, люди просто спрашивали цены.",
    after: "Сделали видео-лендинг с прогревом + чат-бот для квалификации. Стоимость целевой заявки упала до 45₽, конверсия в оплату выросла до 42%.",
    result: "45₽ за заявку, ×3 конверсия в продажу",
    bgColor: "#FF4FD3"
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 group h-full relative">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl flex-shrink-0">
            {testimonial.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground">{testimonial.name}</h3>
            <p className="text-xs text-muted-foreground">{testimonial.niche}</p>
          </div>
          <div 
            className="absolute top-4 right-4 px-3 py-2 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            style={{ 
              backgroundColor: testimonial.bgColor,
              filter: 'blur(0px)'
            }}
          >
            <p className="text-xs md:text-sm font-bold text-white whitespace-nowrap" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              {testimonial.result}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative pl-4 border-l-2 border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="X" size={14} className="text-red-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">Было</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.before}</p>
          </div>

          <div className="relative pl-4 border-l-2 border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="CheckCircle2" size={14} className="text-green-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-green-400">Стало</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.after}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur mb-6">
              <Icon name="Award" size={16} className="text-primary" />
              <span className="text-xs font-bold tracking-wider uppercase text-primary">Реальные кейсы клиентов</span>
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
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl"
              />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent relative">
                Что изменилось у клиентов
              </span>
            </motion.h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Конкретные результаты по разным нишам — без приукрашивания, только факты
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 backdrop-blur">
              <div className="flex gap-3 items-start">
                <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground">Важно понимать:</span> результаты зависят от вашей ниши, оффера и качества трафика. 
                  Я гарантирую качественную реализацию воронки, но не могу обещать конкретных цифр — они формируются вашим продуктом и рынком.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};