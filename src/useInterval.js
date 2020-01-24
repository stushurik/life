import { useEffect } from 'react';

export default (tick, delay) =>
  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [tick, delay]);
