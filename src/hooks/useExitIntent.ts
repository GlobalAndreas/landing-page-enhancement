import { useState, useEffect } from 'react';
import { pixelIntegration } from '@/utils/pixelIntegration';

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
      if (e.clientY <= 0) {
        setShowExitIntent(true);
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