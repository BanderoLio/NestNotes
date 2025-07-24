import { useCallback, useRef } from 'react';

export function useCallbackStable<T extends never[], U>(
  callback: (...args: T) => U,
): (...args: T) => U {
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  return useCallback((...args: T) => {
    return callbackRef.current(...args);
  }, []);
}
