import { useEffect } from 'react';

declare global {
  interface Window {
    twq: any;
  }
}

export const useTwitterConversionTracker = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.twq = window.twq || function(this: any, ...args: any[]) {
        (window.twq.q = window.twq.q || []).push(args);
      };
    }
  }, []);

  const trackEvent = (eventId: string, params: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.twq) {
      window.twq('event', eventId, params);
    } else {
      console.warn('Twitter conversion tracking is not available');
    }
  };

  return trackEvent;
};

export default useTwitterConversionTracker;