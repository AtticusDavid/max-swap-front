import { useEffect, useRef } from 'react';

export const useInterval = (cb: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    const tick = () => {
      if (!savedCallback.current) return;
      savedCallback.current();
    };

    if (delay !== null) {
      let intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};
