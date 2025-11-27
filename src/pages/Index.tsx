import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsAndServicesSection } from "@/components/sections/StatsAndServicesSection";
import { ClientJourneySection } from "@/components/sections/ClientJourneySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LegalSection } from "@/components/sections/LegalSection";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { TelegramBotSection } from "@/components/sections/TelegramBotSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { ThankYouModal } from "@/components/modals/ThankYouModal";
import { ExitIntentModal } from "@/components/modals/ExitIntentModal";
import { FAQSection } from "@/components/sections/FAQSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { AboutMeSection } from "@/components/sections/AboutMeSection";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { LeadsExportPanel } from "@/components/LeadsExportPanel";
import { WarmupPreview } from "@/components/WarmupPreview";
import { PauseReminder } from "@/components/Popups/PauseReminder";
import { useScrollTracking } from "@/hooks/useAnalytics";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useConsultationSlots } from "@/hooks/useConsultationSlots";
import { analytics } from "@/utils/analytics";
import { sendTelegramNotification } from "@/services/telegramNotify";
import { parseAndSaveUTM } from "@/utils/utmTracking";

const Index = () => {
  const { toast } = useToast();
  useScrollTracking();
  const { getTrackingData } = usePageTracking();
  const { showExitIntent, closeExitIntent } = useExitIntent();
  const { slots, decreaseSlot } = useConsultationSlots();

  useEffect(() => {
    parseAndSaveUTM();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    niche: "",
    goal: "",
    pdnConsent: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pdnConsent) {
      toast({
        title: "Требуется согласие",
        description: "Поставьте галочку, чтобы отправить заявку",
        variant: "destructive",
      });
      return;
    }
    
    analytics.trackFormSubmit('consultation_form');
    analytics.track('form_pdn_agree', 'consent', 'pdn_checked');
    decreaseSlot();
    
    const trackingData = getTrackingData();
    const savedFormData = { ...formData };
    
    setFormData({ name: "", contact: "", niche: "", goal: "", pdnConsent: false });
    setIsModalOpen(true);
    
    await sendTelegramNotification(savedFormData, trackingData);
  };

  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const hasShownStickyRef = useRef(false);
  const hasVibratedRef = useRef(false);

  const scrollToConsultation = () => {
    analytics.trackButtonClick('get_consultation', 'hero_section');
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHeroCTA = () => {
    analytics.trackEvent('fomo_timer_influence', 'engagement', 'cta_from_timer');
    scrollToConsultation();
  };

  useEffect(() => {
    let hasReachedTwentyFive = false;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollPercentage = scrollHeight > 0 ? (currentScroll / scrollHeight) * 100 : 0;
      const isMobile = window.innerWidth <= 768;
      const isScrollingDown = currentScroll > lastScrollY;

      if (scrollPercentage >= 25 && !hasReachedTwentyFive) {
        hasReachedTwentyFive = true;
        analytics.trackEvent('sticky_cta_show', 'engagement', 'view');
        hasShownStickyRef.current = true;
      }

      if (isMobile && hasReachedTwentyFive) {
        if (!isScrollingDown) {
          setIsStickyVisible(true);
        } else {
          setIsStickyVisible(false);
        }

        const consultationElement = document.getElementById('consultation');
        if (consultationElement) {
          const rect = consultationElement.getBoundingClientRect();
          const isNearForm = rect.top < window.innerHeight && rect.bottom > window.innerHeight / 2;

          if (isNearForm && !hasVibratedRef.current && 'vibrate' in navigator && typeof navigator.vibrate === 'function') {
            navigator.vibrate(15);
            hasVibratedRef.current = true;
          }
        }
      } else {
        setIsStickyVisible(false);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleStickyClick = () => {
    analytics.trackEvent('sticky_cta_click', 'engagement', 'click');
    scrollToConsultation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/[0.35] border-b border-white/[0.08] shadow-[0_8px_18px_rgba(0,0,0,0.4)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.3),0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-white/[0.08]">
                <img 
                  src="https://cdn.poehali.dev/files/4282259e-6f12-4a46-9573-6f5a0b5d5880.jpg" 
                  alt="Andrej Dilman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight text-slate-100">Andrej Dilman</div>
                <div className="text-xs text-slate-400">Digital-автоворонки</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <a href="#services" onClick={() => analytics.trackLinkClick('nav_services', '#services')} className="hover:text-slate-100 transition-colors duration-300">Услуги</a>
              <a href="#testimonials" onClick={() => analytics.trackLinkClick('nav_cases', '#testimonials')} className="hover:text-slate-100 transition-colors duration-300">Кейсы</a>
              <a href="#process" onClick={() => analytics.trackLinkClick('nav_process', '#process')} className="hover:text-slate-100 transition-colors duration-300">Процесс</a>
              <a href="#legal" onClick={() => analytics.trackLinkClick('nav_legal', '#legal')} className="hover:text-slate-100 transition-colors duration-300">Прозрачность</a>
            </nav>

            <Button onClick={scrollToConsultation} className="bg-gradient-to-br from-primary/95 via-accent to-accent/95 hover:from-primary hover:via-accent hover:to-accent shadow-[0_6px_16px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_22px_rgba(168,85,247,0.3),inset_0_2px_3px_rgba(255,255,255,0.25)] border border-white/[0.08] transition-all duration-300">
              Консультация
            </Button>
          </div>
        </div>
      </header>

      <main>
        <HeroSection scrollToConsultation={scrollToConsultation} slots={slots} onTimerCTA={handleHeroCTA} />
        <StatsAndServicesSection />
        <ClientJourneySection />
        <TestimonialsSection />
        <AboutMeSection />
        <LegalSection />
        <TelegramBotSection />
        <ComparisonSection />
        <MethodologySection />
        <FAQSection />
        
        <section className="py-12 text-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Button 
                variant="secondary"
                size="default"
                onClick={() => {
                  analytics.trackEvent('audit_cta_click', 'engagement', 'audit_cta', { audit: 'true' });
                  scrollToConsultation();
                }}
                className="text-sm group bg-white/[0.03] backdrop-blur-[16px] border-white/[0.08] text-[#E7E7E7] shadow-[0_8px_18px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_10px_24px_rgba(0,0,0,0.45),0_0_10px_rgba(168,85,247,0.2),0_0_20px_rgba(236,72,153,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.13)] transition-all duration-200"
              >
                Пройти аудит бесплатно
                <motion.div
                  animate={{ y: [0, 2, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                  className="inline-block md:animate-none"
                >
                  <Icon 
                    name="ChevronDown" 
                    size={14} 
                    className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </section>

        <ConsultationForm 
          formData={formData} 
          handleSubmit={handleSubmit} 
          setFormData={setFormData} 
        />
      </main>

      <footer className="py-12 border-t border-white/[0.08] bg-black/[0.35] backdrop-blur-xl shadow-[0_-8px_18px_rgba(0,0,0,0.4)]">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-slate-400">
            <p className="mb-2 text-slate-300">© 2025-2026 Andrej Dilman. Все права защищены.</p>
            <p className="text-xs">Digital-маркетинг, разработка, автоматизация — официально и легально</p>
          </div>
        </div>
      </footer>
      <div
        className={`fixed inset-x-4 sm:inset-x-auto sm:right-6 transition-all duration-300 ease-out z-50 md:hidden ${
          isStickyVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
        }`}
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 16px) + 16px)' }}
      >
        <div className="bg-black/[0.35] backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_40px_rgba(168,85,247,0.2),inset_0_1px_1px_rgba(255,255,255,0.08)]">
          <Button
            onClick={handleStickyClick}
            className="w-full h-14 bg-gradient-to-br from-primary/95 via-accent to-accent/95 hover:from-primary hover:via-accent hover:to-accent text-base font-semibold shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] hover:shadow-[inset_0_2px_3px_rgba(255,255,255,0.25),0_0_30px_rgba(168,85,247,0.3)] border border-white/[0.08] transition-all duration-300"
          >
            Получить консультацию
          </Button>
        </div>
      </div>
      <ThankYouModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ExitIntentModal isOpen={showExitIntent} onClose={closeExitIntent} />
      <AnalyticsDashboard />
      <LeadsExportPanel />
      <WarmupPreview />
      <PauseReminder onCTA={scrollToConsultation} />
    </div>
  );
};

export default Index;