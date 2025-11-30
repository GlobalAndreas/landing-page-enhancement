import { useState, useEffect } from 'react';
import { pixelIntegration } from '@/utils/pixelIntegration';

const EXIT_INTENT_KEY = 'exit_intent_last_shown';
const DAYS_INTERVAL = 7;

const canShowExitIntent = (): boolean => {
  const lastShown = localStorage.getItem(EXIT_INTENT_KEY);
  
  if (!lastShown) {
    return true;
  }

  const lastShownTime = parseInt(lastShown, 10);
  const now = Date.now();
  const daysPassed = (now - lastShownTime) / (1000 * 60 * 60 * 24);

  return daysPassed >= DAYS_INTERVAL;
};

const markExitIntentShown = (): void => {
  localStorage.setItem(EXIT_INTENT_KEY, Date.now().toString());
};

export const useExitIntent = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && canShowExitIntent()) {
        setShowExitIntent(true);
        markExitIntentShown();
        pixelIntegration.trackExitIntent();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const closeExitIntent = () => {
    setShowExitIntent(false);
  };

  return { showExitIntent, closeExitIntent };
};