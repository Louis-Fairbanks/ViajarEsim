import { useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
declare global {
  interface Window {
    fbq: any;
  }
}

type EventId = {
    eventID: number;
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
    const uuid = uuidv4();
    const eventId = parseInt(uuid.split('-')[0]);
    window.fbq('track', 'PageView', {eventID: eventId});
  };

  const event = (name: string, options = {}, eventId : EventId) => {
    window.fbq('track', name, options, eventId);
  };

  return { pageView, event };
};