import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { glassEmergence, breathingGlow, glassStyle, premiumEasing, staggerDelay } from "@/utils/premiumAnimations";

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "Сколько стоит разработка?",
      answer: "Стоимость зависит от задач. Чат-бот под ключ — от 30–60К. Автоворонка — от 50–120К. Комплекс «бот + лендинг + трафик» — индивидуально.",
    },
    {
      question: "Сколько времени занимает разработка?",
      answer: "Обычно 2–4 недели. Простые проекты — быстрее.",
    },
    {
      question: "Что входит в разработку автоворонки?",
      answer: "Структура, чат-бот, лендинг, триггеры, прогрев, сценарии, интеграции, настройка аналитики.",
    },
    {
      question: "Что если воронка не сработает?",
      answer: "Я дорабатываю систему до результата. Корректирую связки, улучшаю предложения, меняю сценарии.",
    },
    {
      question: "Подходит ли это для моей ниши?",
      answer: "Работает в 90% ниш: услуги, эксперты, обучение, блогеры, бизнесы. Если ниша необычная — подберём стратегию на созвоне.",
    },
    {
      question: "Что нужно от меня?",
      answer: "Только 15–20 минут на бриф. Я беру на себя весь продакшен «под ключ».",
    },
    {
      question: "Даете ли гарантию?",
      answer: "Да — гарантия результата или доработка без доплат.",
    },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleAccordionChange = (value: string) => {
    if (value) {
      analytics.logEvent('faq_open', 'faq_item');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          {...glassEmergence}
          animate={isInView ? glassEmergence.animate : glassEmergence.initial}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08]`}>
              <Icon name="HelpCircle" size={16} className="text-primary" />
              <span className="text-xs font-bold tracking-wider uppercase text-primary">FAQ</span>
            </div>
            <motion.h2 
              {...breathingGlow}
              className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Ответы на частые вопросы
            </motion.h2>
          </div>

          <Card className={`p-6 md:p-8 ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08]`}>
            <Accordion 
              type="single" 
              collapsible 
              className="w-full"
              onValueChange={handleAccordionChange}
            >
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-border/50 last:border-0"
                >
                  <AccordionTrigger className="text-left hover:no-underline group py-5">
                    <div className="flex items-start gap-3 pr-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform ${glassStyle.base} ${glassStyle.shadow} border-white/[0.08]`}>
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="font-semibold text-base md:text-lg group-hover:text-primary transition-colors">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11 pr-4 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};