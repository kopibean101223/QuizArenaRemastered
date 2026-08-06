import { useState, useEffect, useRef } from "react";

export function AnimatedScore({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (value === prevRef.current) return;
    const diff = value - prevRef.current;
    const steps = 20;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(Math.round(prevRef.current + (diff * i) / steps));
      if (i >= steps) {
        clearInterval(iv);
        prevRef.current = value;
      }
    }, 18);
    return () => clearInterval(iv);
  }, [value]);

  return <>{displayed.toLocaleString()}</>;
}