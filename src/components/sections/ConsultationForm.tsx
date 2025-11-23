import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { analytics } from "@/utils/analytics";
import { Link } from "react-router-dom";

interface ConsultationFormProps {
  formData: {
    name: string;
    contact: string;
    niche: string;
    goal: string;
    pdnConsent: boolean;
  };
  handleSubmit: (e: React.FormEvent) => void;
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    contact: string;
    niche: string;
    goal: string;
    pdnConsent: boolean;
  }>>;
}

export const ConsultationForm = ({ formData, handleSubmit, setFormData }: ConsultationFormProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="consultation" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur mb-6">
              <Icon name="MessageSquare" size={16} className="text-primary" />
              <span className="text-xs font-bold tracking-wider uppercase text-primary">Начните прямо сейчас</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Получить бесплатную консультацию
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              30–40 минут созвона, чтобы разобрать вашу ситуацию и предложить конкретные решения
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur border-border/50 shadow-2xl shadow-primary/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ваше имя</label>
                <Input 
                  placeholder="Как к вам обращаться?"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Telegram или What's app</label>
                <Input 
                  placeholder="@username или +7 (___) ___-__-__"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ваша ниша или продукт</label>
                <Input 
                  placeholder="Например: онлайн-школа, консалтинг, e-commerce"
                  value={formData.niche}
                  onChange={(e) => setFormData({...formData, niche: e.target.value})}
                  required
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Какую задачу хотите решить?</label>
                <Textarea 
                  placeholder="Опишите вашу цель: запустить воронку, увеличить конверсию, автоматизировать процесс..."
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  required
                  className="bg-background/50 border-border/50 min-h-[120px]"
                />
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border/50">
                <Checkbox 
                  id="pdnConsent"
                  checked={formData.pdnConsent}
                  onCheckedChange={(checked) => setFormData({...formData, pdnConsent: checked as boolean})}
                  className="mt-0.5"
                />
                <label 
                  htmlFor="pdnConsent" 
                  className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                >
                  Я согласен с{' '}
                  <Link 
                    to="/privacy" 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      analytics.trackLinkClick('privacy_policy', '/privacy');
                    }}
                  >
                    Политикой конфиденциальности
                  </Link>
                  {' '}и{' '}
                  <Link 
                    to="/personal-data" 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      analytics.trackLinkClick('personal_data_policy', '/personal-data');
                    }}
                  >
                    Обработкой персональных данных
                  </Link>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg font-semibold py-6"
              >
                Отправить заявку
              </Button>
            </form>
          </Card>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">Или свяжитесь со мной напрямую:</p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-2"
                asChild
              >
                <a 
                  href="https://t.me/andreasdilman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2"
                  onClick={() => analytics.trackLinkClick('telegram_footer', 'https://t.me/andreasdilman')}
                >
                  <Icon name="Send" size={18} />
                  Telegram
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-2"
                asChild
              >
                <a 
                  href="mailto:contact@example.com" 
                  className="flex items-center gap-2"
                  onClick={() => analytics.trackLinkClick('email_footer', 'mailto:contact@example.com')}
                >
                  <Icon name="Mail" size={18} />
                  Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};