import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

interface MethodologyStep {
  title: string;
  icon: string;
  description: string;
}

const steps: MethodologyStep[] = [
  {
    title: "Диагностика и стратегия",
    icon: "Search",
    description: "анализ ниши, УТП, сегментов, целей. Формируем стратегию."
  },
  {
    title: "Упаковка и структура",
    icon: "Layout",
    description: "создаем лендинг, путь клиента, триггеры, структуру."
  },
  {
    title: "Автоматизация и воронки",
    icon: "Bot",
    description: "чат-боты, сегментация, автопрогрев, цепочки."
  },
  {
    title: "Трафик и масштабирование",
    icon: "Rocket",
    description: "контекст, таргет, тизеры, рост и предсказуемость."
  }
];

export function MethodologySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent relative"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 0.2, 0] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, times: [0, 0.5, 1] }}
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl"
            />
            <span className="relative">Методология Dilman-Flow™</span>
          </motion.h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Фирменный подход, который позволяет запускать автоворонки быстро, системно и предсказуемо
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300"
                >
                  <Icon name={step.icon} size={28} className="text-primary" />
                </motion.div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}