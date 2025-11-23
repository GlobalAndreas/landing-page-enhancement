import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsAndServicesSection } from "@/components/sections/StatsAndServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LegalSection } from "@/components/sections/LegalSection";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { TelegramBotSection } from "@/components/sections/TelegramBotSection";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { useScrollTracking } from "@/hooks/useAnalytics";
import { analytics } from "@/utils/analytics";

const Index = () => {
  const { toast } = useToast();
  useScrollTracking();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    niche: "",
    goal: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analytics.trackFormSubmit('consultation_form');
    toast({
      title: "Заявка отправлена!",
      description: "Свяжемся с вами в течение 24 часов",
    });
    setFormData({ name: "", contact: "", niche: "", goal: "" });
  };

  const scrollToConsultation = () => {
    analytics.trackButtonClick('get_consultation', 'hero_section');
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
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
        <HeroSection scrollToConsultation={scrollToConsultation} />
        <StatsAndServicesSection />
        <TestimonialsSection />
        <LegalSection />
        <TelegramBotSection />
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
      <AnalyticsDashboard />
    </div>
  );
};

export default Index;