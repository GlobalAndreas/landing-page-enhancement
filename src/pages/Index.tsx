import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsAndServicesSection } from "@/components/sections/StatsAndServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LegalSection } from "@/components/sections/LegalSection";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { TelegramBotSection } from "@/components/sections/TelegramBotSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { ThankYouModal } from "@/components/modals/ThankYouModal";
import { ExitIntentModal } from "@/components/modals/ExitIntentModal";
import { FAQSection } from "@/components/sections/FAQSection";
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
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-primary/30 ring-2 ring-primary/30">
                <img 
                  src="https://cdn.poehali.dev/files/4282259e-6f12-4a46-9573-6f5a0b5d5880.jpg" 
                  alt="Andrej Dilman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight">Andrej Dilman</div>
                <div className="text-xs text-muted-foreground">Digital-автоворонки</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#services" onClick={() => analytics.trackLinkClick('nav_services', '#services')} className="hover:text-primary transition-colors">Услуги</a>
              <a href="#process" onClick={() => analytics.trackLinkClick('nav_process', '#process')} className="hover:text-primary transition-colors">Процесс</a>
              <a href="#legal" onClick={() => analytics.trackLinkClick('nav_legal', '#legal')} className="hover:text-primary transition-colors">Прозрачность</a>
            </nav>

            <Button onClick={scrollToConsultation} className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
              Консультация
            </Button>
          </div>
        </div>
      </header>

      <main>
        <HeroSection scrollToConsultation={scrollToConsultation} slots={slots} onTimerCTA={handleHeroCTA} />
        <StatsAndServicesSection />
        <TestimonialsSection />
        <LegalSection />
        <TelegramBotSection />
        <ComparisonSection />
        <FAQSection />
        <ConsultationForm 
          formData={formData} 
          handleSubmit={handleSubmit} 
          setFormData={setFormData} 
        />
      </main>

      <footer className="py-12 border-t border-border/50 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">© 2025-2026 Andrej Dilman. Все права защищены.</p>
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
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
          <Button
            onClick={handleStickyClick}
            className="w-full h-14 bg-gradient-to-r from-primary to-accent text-base font-semibold"
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