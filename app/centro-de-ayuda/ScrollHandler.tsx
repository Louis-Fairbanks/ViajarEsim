'use client';
import { useEffect } from 'react';

const ScrollHandler = () => {
  useEffect(() => {
    requestAnimationFrame(() => {
      const vh = window.innerHeight;
      window.scrollTo({
        top: vh,
        behavior: 'smooth'
      });
    });
  }, []);

  return null;
};

export default ScrollHandler;