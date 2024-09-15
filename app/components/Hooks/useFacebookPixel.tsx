import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: any;
  }
}

export const useFacebookPixel = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.fbq = window.fbq || function() {
        (window.fbq.q = window.fbq.q || []).push(arguments);
      };
    }
  }, []);

  const pageView = () => {
    window.fbq('track', 'PageView');
  };

  const event = (name: string, options = {}) => {
    window.fbq('track', name, options);
  };

  return { pageView, event };
};