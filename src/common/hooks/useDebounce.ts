import React from 'react';

/**
 * useDebounce hook
 *
 * @param callback - The function to debounce.
 * @param delay - The delay in milliseconds.
 * @returns A debounced version of the callback function.
 *
 * @example
 * ```typescript
 * const debouncedFunction = useDebounce((value) => {
 *   console.log('Debounced value:', value);
 * }, 500);
 *
 * debouncedFunction('test');
 * ```
 */
export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const callbackRef = React.useRef(callback);

  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  let timer: NodeJS.Timeout;

  const naiveDebounce = (
    func: (...args: any[]) => void,
    delayMs: number,
    ...args: any[]
  ) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delayMs);
  };

  return React.useMemo(
    () =>
      (...args: any) =>
        naiveDebounce(callbackRef.current, delay, ...args),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay]
  );
};
