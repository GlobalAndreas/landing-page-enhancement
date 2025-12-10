import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExitIntentModal = ({ isOpen, onClose }: ExitIntentModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    pdnConsent: false,
  });

  useEffect(() => {
    if (isOpen) {
      analytics.logEvent('exit_popup_viewed', 'exit_intent_trigger');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pdnConsent) {
      return;
    }

    analytics.logEvent('exit_popup_cta', 'open_bot');
    
    window.open('https://t.me/dilman4in1bot?start=exit_popup', '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={onClose}
          />
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              className="w-full max-w-lg"
            >
              <Card className="p-8 md:p-10 bg-white dark:bg-card backdrop-blur-xl border-2 border-primary/20 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="absolute top-4 right-4 h-8 w-8 p-0 bg-secondary/50 hover:bg-secondary z-10 rounded-full"
                >
                  <Icon name="X" size={16} />
                </Button>

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-center mb-6"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 shadow-lg">
                      <span className="text-4xl">🎁</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      Подождите!
                    </h3>
                    <h4 className="text-xl md:text-2xl font-bold mb-4">
                      Получите материалы по автоворонкам бесплатно
                    </h4>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Я подготовил подборку полезных материалов: видео-разборы, примеры автоворонок и чек-лист по трафику.
                    </p>
                  </motion.div>

                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="space-y-2">
                      <Input 
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="bg-background/50 border-border/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Input 
                        placeholder="Telegram или телефон"
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        required
                        className="bg-background/50 border-border/50"
                      />
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
                      <Checkbox 
                        id="exitPdnConsent"
                        checked={formData.pdnConsent}
                        onCheckedChange={(checked) => setFormData({...formData, pdnConsent: checked as boolean})}
                        className="mt-0.5"
                      />
                      <label 
                        htmlFor="exitPdnConsent" 
                        className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        Я согласен с{' '}
                        <Link 
                          to="/privacy" 
                          className="text-primary hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            analytics.trackLinkClick('privacy_policy_exit', '/privacy');
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
                            analytics.trackLinkClick('personal_data_policy_exit', '/personal-data');
                          }}
                        >
                          Обработкой персональных данных
                        </Link>
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-right-bottom transition-all duration-500 text-base font-bold py-6 shadow-xl shadow-primary/30"
                      disabled={!formData.pdnConsent}
                    >
                      <Icon name="Send" size={20} className="mr-2" />
                      Получить материалы в Telegram
                    </Button>

                    <p className="text-xs text-center text-muted-foreground leading-relaxed">
                      Переходя в Telegram-бота, вы соглашаетесь получать полезные материалы и информационные сообщения.
                    </p>
                  </motion.form>
                </div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;