import { useState, useEffect } from 'react';

export function useScrollSpy(headingSelectors = 'h2, h3', offset = 100) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll(headingSelectors));
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id || '');
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headingSelectors, offset]);

  return activeId;
}
