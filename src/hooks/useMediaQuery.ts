import { useState, useEffect } from 'react';

/**
 * Custom hook to monitor screen width using media queries.
 * @param width - The pixel threshold (e.g., 768)
 * @param onBelowLimit - Optional callback to fire when crossing below the threshold
 */
function useMediaQuery(width: number, onBelowLimit?: () => void): boolean {
  const [isBelow, setIsBelow] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia(`(max-width: ${width}px)`);

    const handleChange = (event: MediaQueryListEvent): void => {
      setIsBelow(event.matches);
      if (event.matches && onBelowLimit) {
        onBelowLimit();
      }
    };

    // Set initial state
    setIsBelow(mediaQuery.matches);
    if (mediaQuery.matches && onBelowLimit) {
      onBelowLimit();
    }

    // Listener setup
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [width, onBelowLimit]);

  return isBelow;
}

export default useMediaQuery;