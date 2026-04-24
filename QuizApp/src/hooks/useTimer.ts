import { useRef, useState } from 'react';

function useTimer() {
  const [time, setTime] = useState(20);

  const interval = useRef<number | null>(null);

  const startTimer = () => {
    setTime(20);

    interval.current = setInterval(() => {
      setTime(time => time - 1);
    }, 1000);
  };

  const clearTimer = () => {
    if (interval.current !== null) {
      clearInterval(interval.current);
    }
  };

  return {
    time,
    startTimer,
    clearTimer,
  };
}
export { useTimer };
