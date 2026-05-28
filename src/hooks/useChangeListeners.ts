import { useCallback, useRef } from "react";

/**
 * Manages document-level mouseup/touchend listeners so onChangeComplete fires
 * even when the pointer leaves the slider track during a drag.
 */
export function useChangeListeners<T>(
  onChangeComplete: ((value: T) => void) | undefined,
  getCurrentValue: () => T,
) {
  const activeRef = useRef(false);
  const listenersRef = useRef(false);

  const handleEnd = useCallback(() => {
    if (!activeRef.current) return;
    activeRef.current = false;
    if (listenersRef.current) {
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
      listenersRef.current = false;
    }
    onChangeComplete?.(getCurrentValue());
  }, [onChangeComplete, getCurrentValue]);

  const handleStart = useCallback(
    (onStart?: (value: T) => void) => {
      activeRef.current = true;
      onStart?.(getCurrentValue());
      if (!listenersRef.current) {
        document.addEventListener("mouseup", handleEnd);
        document.addEventListener("touchend", handleEnd);
        listenersRef.current = true;
      }
    },
    [handleEnd, getCurrentValue],
  );

  const cleanup = useCallback(() => {
    if (listenersRef.current) {
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    }
  }, [handleEnd]);

  return { handleStart, cleanup, isActive: activeRef };
}
