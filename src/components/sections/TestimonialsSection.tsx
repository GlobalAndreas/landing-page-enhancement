import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { glassEmergence, breathingGlow, glassStyle, premiumEasing, staggerDelay } from "@/utils/premiumAnimations";

const testimonials = [
  {
    name: "Алексей Морозов",
    niche: "Онлайн-школа по недвижимости",
    avatar: "👨‍💼",
    before: "Реклама вела на сайт с формой обратной связи. Конверсия в заявку — <span class='text-slate-300 font-semibold'>2%</span>, большинство отваливались сразу. За месяц <span class='text-slate-300 font-semibold'>150 кликов = 3 заявки</span>.",
    after: "Запустили видео-лендинг с прогревом 60 секунд и чат-бот для квалификации. Конверсия выросла до <span class='text-slate-200 font-bold'>8%</span>. За тот же бюджет — <span class='text-slate-200 font-bold'>12 заявок в месяц</span>.",
    result: "×4 рост заявок",
    badgeType: "purple",
    category: "leads"
  },
  {
    name: "Мария Соколова",
    niche: "Психолог-коуч, личные консультации",
    avatar: "👩‍⚕️",
    before: "Лендинг с текстом и формой записи. Люди читали, но не записывались. Конверсия <span class='text-slate-300 font-semibold'>1,5%</span>, стоимость заявки — <span class='text-slate-300 font-semibold'>3200₽</span>.",
    after: "Добавили видео-приветствие и чат-бот с тестом на определение запроса. Конверсия выросла до <span class='text-slate-200 font-bold'>6%</span>, стоимость заявки упала до <span class='text-slate-200 font-bold'>950₽</span>.",
    result: "×4 конверсия",
    badgeType: "pink",
    category: "conversion"
  },
  {
    name: "Дмитрий Ковалёв",
    niche: "E-commerce: спортивное питание",
    avatar: "🏋️",
    before: "Классический интернет-магазин. Трафик был, но брошенных корзин — <span class='text-slate-300 font-semibold'>78%</span>. Повторных покупок почти нет.",
    after: "Внедрили чат-бот для консультации по продуктам и допродажи в мессенджере. Брошенных корзин — <span class='text-slate-200 font-bold'>45%</span>, повторные покупки выросли на <span class='text-slate-200 font-bold'>35%</span>.",
    result: "+35% LTV",
    badgeType: "mint",
    category: "roi"
  },
  {
    name: "Елена Смирнова",
    niche: "Бизнес-консалтинг, услуги для B2B",
    avatar: "💼",
    before: "Сайт-визитка и холодные звонки. На консультацию выходило <span class='text-slate-300 font-semibold'>2-3 человека в месяц</span>. Долгий цикл сделки, низкая предсказуемость.",
    after: "Запустили автоворонку: контекстная реклама → лендинг с кейсами → бот для записи. Заявок стало <span class='text-slate-200 font-bold'>10-12 в месяц</span>, цикл сокращён на <span class='text-slate-200 font-bold'>30%</span>.",
    result: "×5 заявок",
    badgeType: "purple",
    category: "leads"
  },
  {
    name: "Игорь Волков",
    niche: "Образовательные курсы по программированию",
    avatar: "👨‍💻",
    before: "Трафик с YouTube на лендинг с ценой курса. Конверсия в покупку — <span class='text-slate-300 font-semibold'>0,8%</span>. Много вопросов в комментариях, но не покупали.",
    after: "Добавили чат-бот с бесплатным мини-курсом и автоворонку прогрева на 5 дней. Конверсия в покупку выросла до <span class='text-slate-200 font-bold'>4,2%</span>.",
    result: "×5 продаж",
    badgeType: "pink",
    category: "conversion"
  },
  {
    name: "Анна Петрова",
    niche: "Фитнес-студия, персональные тренировки",
    avatar: "🏃‍♀️",
    before: "Запускала таргет ВКонтакте на форму записи. Стоимость заявки — <span class='text-slate-300 font-semibold'>850₽</span>, конверсия в оплату — <span class='text-slate-300 font-semibold'>15%</span>. Много нецелевых заявок.",
    after: "Сделали видео-лендинг с прогревом + чат-бот для квалификации. Стоимость целевой заявки упала до <span class='text-slate-200 font-bold'>450₽</span>, конверсия в оплату выросла до <span class='text-slate-200 font-bold'>42%</span>.",
    result: "450₽ за заявку",
    badgeType: "mint",
    category: "roi"
  }
];

const badgeStyles = {
  pink: {
    bg: "rgba(255, 79, 211, 0.15)",
    border: "rgba(255, 79, 211, 0.08)",
    shadow: "0 8px 18px rgba(255, 79, 211, 0.3)",
    text: "#FF4FD3"
  },
  purple: {
    bg: "rgba(147, 51, 234, 0.15)",
    border: "rgba(147, 51, 234, 0.08)",
    shadow: "0 8px 18px rgba(147, 51, 234, 0.3)",
    text: "#9333EA"
  },
  mint: {
    bg: "rgba(44, 255, 181, 0.15)",
    border: "rgba(44, 255, 181, 0.08)",
    shadow: "0 8px 18px rgba(44, 255, 181, 0.3)",
    text: "#2CFFB5"
  }
};

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const badgeStyle = badgeStyles[testimonial.badgeType];

  return (
    <motion.div
      ref={ref}
      {...glassEmergence}
      animate={isInView ? glassEmergence.animate : glassEmergence.initial}
      transition={{ ...glassEmergence.transition, delay: staggerDelay(index, 0.12) }}
      className="h-full"
    >
      <Card className={`p-7 ${glassStyle.base} ${glassStyle.shadow} ${glassStyle.hover} border-white/[0.08] group h-full relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-6">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-purple-500/20 border border-purple-500/20 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-purple-500/10"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.6, delay: index * 0.12 + 0.2, type: "spring", stiffness: 200 }}
            >
              {testimonial.avatar}
            </motion.div>
            <div className="flex-1 min-w-0 pr-20 md:pr-0">
              <h3 className="font-bold text-base text-slate-100 mb-1 leading-snug">{testimonial.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{testimonial.niche}</p>
            </div>
          </div>

          <motion.div 
            className="absolute top-3 right-1.5 md:static md:top-auto md:right-auto md:ml-auto px-3.5 py-2 rounded-lg backdrop-blur-sm group-hover:scale-105 transition-transform duration-300"
            style={{ 
              backgroundColor: badgeStyle.bg,
              border: `1px solid ${badgeStyle.border}`,
              boxShadow: badgeStyle.shadow
            }}
          animate={{
            boxShadow: [
              badgeStyle.shadow,
              badgeStyle.shadow.replace('0.3', '0.4'),
              badgeStyle.shadow
            ]
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: premiumEasing
          }}
        >
          <p 
            className="text-xs font-bold whitespace-nowrap leading-tight tracking-wide"
            style={{ color: badgeStyle.text }}
          >
            {testimonial.result}
          </p>
          </motion.div>

          <div className="space-y-5">
            <div className="relative pl-3.5 border-l-2 border-red-400/25">
              <div className="flex items-center gap-2 mb-2.5">
                <Icon name="X" size={13} className="text-red-400/80" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400/70">Было</span>
              </div>
              <p 
                className="text-sm text-slate-400/90 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: testimonial.before }}
              />
            </div>

            <div className="relative pl-3.5 border-l-2 border-emerald-400/30">
              <div className="flex items-center gap-2 mb-2.5">
                <Icon name="CheckCircle2" size={13} className="text-emerald-400/90" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/80">Стало</span>
              </div>
              <p 
                className="text-sm text-slate-300 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: testimonial.after }}
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Андрей Дильман — Telegram-боты, автоворонки и трафик",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": testimonials.length.toString()
    }
  };

  const reviewsSchema = testimonials.map((testimonial) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": testimonial.name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": `${testimonial.before.replace(/<[^>]*>/g, '')} После: ${testimonial.after.replace(/<[^>]*>/g, '')} Результат: ${testimonial.result}`,
    "itemReviewed": {
      "@type": "Service",
      "name": "Разработка Telegram-ботов, автоворонок и настройка трафика"
    }
  }));

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950/50 via-purple-950/10 to-slate-950/50">
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      {reviewsSchema.map((schema, index) => (
        <script 
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),transparent_65%)]" />
      <motion.div 
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]"
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-600/5 rounded-full blur-[100px]"
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/60 border border-purple-500/20 backdrop-blur-xl mb-8 shadow-lg shadow-purple-500/10">
              <Icon name="Award" size={14} className="text-purple-400/90" />
              <span className="text-xs font-semibold tracking-wide uppercase text-purple-300/80">Реальные кейсы клиентов</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                Что изменилось у клиентов
              </span>
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Конкретные результаты по разным нишам — без приукрашивания, только факты
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="p-7 bg-slate-900/40 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
              <div className="flex gap-4 items-start">
                <Icon name="Info" size={18} className="text-purple-400/90 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-200">Важно понимать:</span> результаты зависят от вашей ниши, оффера и качества трафика. 
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