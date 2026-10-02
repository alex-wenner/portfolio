import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Reveals `text` one character at a time; shows it all at once under reduced motion. */
export function useTypewriter(text: string, msPerChar = 55): string {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return;
    }
    setCount(0);
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, msPerChar);
    return () => window.clearInterval(id);
  }, [text, msPerChar, reduced]);

  return text.slice(0, count);
}
