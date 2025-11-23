import { useState, useEffect } from 'react';

interface PageTrackingData {
  timeOnPage: number;
  pageDepth: number;
}

export const usePageTracking = () => {
  const [startTime] = useState<number>(Date.now());
  const [maxScrollDepth, setMaxScrollDepth] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      
      if (scrollPercentage > maxScrollDepth) {
        setMaxScrollDepth(Math.min(scrollPercentage, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxScrollDepth]);

  const getTrackingData = (): PageTrackingData => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    
    return {
      timeOnPage,
      pageDepth: maxScrollDepth,
    };
  };

  return { getTrackingData };
};
