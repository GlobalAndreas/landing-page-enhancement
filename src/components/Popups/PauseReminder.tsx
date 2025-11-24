import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { analytics } from "@/utils/analytics";

interface PauseReminderProps {
  onCTA: () => void;
}

export const PauseReminder = ({ onCTA }: PauseReminderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const handleIdle = () => {
      if (!hasShownRef.current) {
        setIsVisible(true);
        hasShownRef.current = true;
        analytics.trackEvent("pause_reminder_show", "engagement", "view");
      }
    };

    const handleActivity = () => {
      if (timeout) clearTimeout(timeout);
      if (!hasShownRef.current) {
        timeout = setTimeout(handleIdle, 15000);
      }
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;

      if (scrollPercentage > 35 && scrollPercentage < 70) {
        handleActivity();
      } else {
        if (timeout) clearTimeout(timeout);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleCTA = () => {
    analytics.trackEvent("pause_reminder_click", "conversion", "click");
    handleDismiss();
    onCTA();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed right-4 bottom-32 sm:bottom-24 z-50"
        >
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20 p-4 max-w-xs">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 flex items-center justify-center">
              <Icon name="Bell" size={18} className="text-white" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Забронируем консультацию?</p>
              <p className="text-xs text-muted-foreground">
                Есть ещё 2 свободных слота на этой неделе. Можем созвониться и разобрать воронку.
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" className="px-4" onClick={handleCTA}>
                  Показать окно
                </Button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="text-xs text-muted-foreground hover:text-white transition-colors"
                >
                  Позже
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};