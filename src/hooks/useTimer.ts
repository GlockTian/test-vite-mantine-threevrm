import { useEffect, useRef, useState } from 'react';

const useTimer = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();
  const [id, setId] = useState<NodeJS.Timeout | null>(null);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (!start) return;
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      setId(id);
      return () => clearInterval(id);
    }
  }, [delay, start]);

  const endTimer = () => {
    if (id) {
      clearInterval(id);
      setEnd(true);
    }
  };

  const startTimer = () => {
    setStart(true);
  };

  return { id, startTimer, endTimer };
};

export default useTimer;
