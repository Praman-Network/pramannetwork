import { useEffect } from 'react';

export function useKeyboard(keyOrOptions, callback, metaOrCtrl = false) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (typeof keyOrOptions === 'object' && keyOrOptions !== null) {
        const { onCommandK, onEscape } = keyOrOptions;
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          if (onCommandK) onCommandK();
        }
        if (e.key === 'Escape' && onEscape) {
          onEscape();
        }
        return;
      }

      if (typeof keyOrOptions === 'string') {
        const keyMatch = e.key.toLowerCase() === keyOrOptions.toLowerCase();
        const metaMatch = metaOrCtrl ? (e.metaKey || e.ctrlKey) : true;
        if (keyMatch && metaMatch) {
          e.preventDefault();
          if (callback) callback(e);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyOrOptions, callback, metaOrCtrl]);
}
