// src/hooks/useIntersectionObserver.ts

import { useEffect, useRef } from 'react';

/**
 * Опции для IntersectionObserver.
 * Можно использовать стандартный тип IntersectionObserverInit.
 */
type ObserverOptions = IntersectionObserverInit;

export function useIntersectionObserver<T extends HTMLElement>(
  callback: () => void,
  options?: ObserverOptions,
) {
  const targetRef = useRef<T>(null);

  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callbackRef.current();
      }
    }, options);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);
  return targetRef;
}
