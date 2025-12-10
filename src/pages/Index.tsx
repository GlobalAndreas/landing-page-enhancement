import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsAndServicesSection } from "@/components/sections/StatsAndServicesSection";

const ClientJourneySection = lazy(() => import("@/components/sections/ClientJourneySection").then(m => ({ default: m.ClientJourneySection })));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const LegalSection = lazy(() => import("@/components/sections/LegalSection").then(m => ({ default: m.LegalSection })));
const ConsultationForm = lazy(() => import("@/components/sections/ConsultationForm").then(m => ({ default: m.ConsultationForm })));
const TelegramBotSection = lazy(() => import("@/components/sections/TelegramBotSection").then(m => ({ default: m.TelegramBotSection })));
const ComparisonSection = lazy(() => import("@/components/sections/ComparisonSection").then(m => ({ default: m.ComparisonSection })));
const ThankYouModal = lazy(() => import("@/components/modals/ThankYouModal").then(m => ({ default: m.ThankYouModal })));
const ExitIntentModal = lazy(() => import("@/components/modals/ExitIntentModal").then(m => ({ default: m.ExitIntentModal })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const MethodologySection = lazy(() => import("@/components/sections/MethodologySection").then(m => ({ default: m.MethodologySection })));
const AboutMeSection = lazy(() => import("@/components/sections/AboutMeSection").then(m => ({ default: m.AboutMeSection })));
const AnalyticsDashboard = lazy(() => import("@/components/AnalyticsDashboard").then(m => ({ default: m.AnalyticsDashboard })));
const LeadsExportPanel = lazy(() => import("@/components/LeadsExportPanel").then(m => ({ default: m.LeadsExportPanel })));
const WarmupPreview = lazy(() => import("@/components/WarmupPreview"));
const PauseReminder = lazy(() => import("@/components/Popups/PauseReminder").then(m => ({ default: m.PauseReminder })));
import { useScrollTracking } from "@/hooks/useAnalytics";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useConsultationSlots } from "@/hooks/useConsultationSlots";
import { analytics } from "@/utils/analytics";
import { sendTelegramNotification } from "@/services/telegramNotify";
import { parseAndSaveUTM } from "@/utils/utmTracking";
import { getOrganizationSchema, getPersonSchema, getServiceSchema, getLocalBusinessSchema, getBreadcrumbSchema } from "@/utils/schemaOrg";
import { pixelIntegration } from "@/utils/pixelIntegration";

const Index = () => {
  const { toast } = useToast();
  useScrollTracking();
  const { getTrackingData } = usePageTracking();
  const { showExitIntent, closeExitIntent } = useExitIntent();
  const { slots, decreaseSlot } = useConsultationSlots();

  useEffect(() => {
    parseAndSaveUTM();

    pixelIntegration.init({
      metaPixelId: import.meta.env.VITE_META_PIXEL_ID,
      vkPixelId: import.meta.env.VITE_VK_PIXEL_ID,
      yandexMetrikaId: 101026698,
      ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID,
    });

    pixelIntegration.trackPageView();

    const organizationScript = document.createElement('script');
    organizationScript.type = 'application/ld+json';
    organizationScript.text = JSON.stringify(getOrganizationSchema());
    document.head.appendChild(organizationScript);

    const personScript = document.createElement('script');
    personScript.type = 'application/ld+json';
    personScript.text = JSON.stringify(getPersonSchema());
    document.head.appendChild(personScript);

    const serviceScript = document.createElement('script');
    serviceScript.type = 'application/ld+json';
    serviceScript.text = JSON.stringify(getServiceSchema());
    document.head.appendChild(serviceScript);

    const localBusinessScript = document.createElement('script');
    localBusinessScript.type = 'application/ld+json';
    localBusinessScript.text = JSON.stringify(getLocalBusinessSchema());
    document.head.appendChild(localBusinessScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(getBreadcrumbSchema());
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.head.removeChild(organizationScript);
      document.head.removeChild(personScript);
      document.head.removeChild(serviceScript);
      document.head.removeChild(localBusinessScript);
      document.head.removeChild(breadcrumbScript);
    };
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
    
    analytics.trackFormSubmit('consultation_form', formData);
    analytics.track('form_pdn_agree', 'consent', 'pdn_checked');
    pixelIntegration.trackLead(formData);
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
    pixelIntegration.trackConsultationOpen();
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHeroCTA = () => {
    analytics.trackEvent('fomo_timer_influence', 'engagement', 'cta_from_timer');
    scrollToConsultation();
  };

  useEffect(() => {
    let hasReachedTwentyFive = false;
    let throttleTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (throttleTimeout) return;
      
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, 150);

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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
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
                  alt="Андрей Дильман — эксперт по Telegram-ботам, автоворонкам и трафику"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight text-slate-100">Andrej Dilman</div>
                <div 
                  className="text-xs" 
                  style={{
                    color: "#D7DAFF",
                    textShadow: "0 0 4px rgba(199,201,248,0.18)"
                  }}
                >
                  Digital-экосистема под ключ
                </div>
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
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <ClientJourneySection />
          <TestimonialsSection />
          <AboutMeSection />
          <LegalSection />
          <TelegramBotSection />
          <ComparisonSection />
          <MethodologySection />
          <FAQSection />
        </Suspense>
        
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

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <ConsultationForm 
            formData={formData} 
            handleSubmit={handleSubmit} 
            setFormData={setFormData} 
          />
        </Suspense>
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
      <Suspense fallback={null}>
        <ThankYouModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <ExitIntentModal isOpen={showExitIntent} onClose={closeExitIntent} />
        <AnalyticsDashboard />
        <LeadsExportPanel />
        <WarmupPreview />
        <PauseReminder onCTA={scrollToConsultation} />
      </Suspense>
    </div>
  );
};

export default Index;