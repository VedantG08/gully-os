import { useState, useEffect, useRef, useCallback } from "react";

export function useNeonFlicker() {
  const [flickerState, setFlickerState] = useState({
    main: 1,
    tapri: 1,
    bloom: 1,
    jitter: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isPowerSurging, setIsPowerSurging] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const triggerPowerSurge = useCallback(() => {
    if (prefersReducedMotion.current) return;
    setIsPowerSurging(true);
    setFlickerState({ main: 1.6, tapri: 1.6, bloom: 1.8, jitter: 0 });
    setTimeout(() => {
      setFlickerState({ main: 0.7, tapri: 0.6, bloom: 0.7, jitter: 0 });
      setTimeout(() => {
        setFlickerState({ main: 1.3, tapri: 1.3, bloom: 1.4, jitter: 0 });
        setTimeout(() => {
          setIsPowerSurging(false);
          setFlickerState({ main: 1, tapri: 1, bloom: 1, jitter: 0 });
        }, 120);
      }, 70);
    }, 150);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    let timeoutId;
    let isCancelled = false;

    // Fast micro-jitter for electrical buzz feel
    const jitterInterval = setInterval(() => {
      if (isHovered || isPowerSurging || isCancelled) return;
      const micro = (Math.random() - 0.5) * 0.05;
      setFlickerState((prev) => ({
        ...prev,
        jitter: micro,
      }));
    }, 100);

    const scheduleNextFlicker = () => {
      if (isCancelled) return;
      // Random wait between flickers: 1.5s to 5s
      const delay = 1500 + Math.random() * 3500;
      timeoutId = setTimeout(() => {
        if (isCancelled || isHovered || isPowerSurging) {
          scheduleNextFlicker();
          return;
        }

        const isDouble = Math.random() > 0.6;
        const tapriStutter = Math.random() > 0.4;

        // Dip
        setFlickerState((prev) => ({
          ...prev,
          main: 0.45 + Math.random() * 0.25,
          tapri: tapriStutter ? 0.2 + Math.random() * 0.3 : prev.tapri,
          bloom: 0.4,
        }));

        setTimeout(() => {
          if (isCancelled) return;
          // Recover
          setFlickerState((prev) => ({
            ...prev,
            main: 0.95,
            tapri: 0.95,
            bloom: 0.95,
          }));

          if (isDouble) {
            setTimeout(() => {
              if (isCancelled) return;
              // Second quick dip
              setFlickerState((prev) => ({
                ...prev,
                main: 0.3,
                tapri: 0.15,
                bloom: 0.3,
              }));
              setTimeout(() => {
                if (isCancelled) return;
                setFlickerState({ main: 1, tapri: 1, bloom: 1, jitter: 0 });
                scheduleNextFlicker();
              }, 45);
            }, 55);
          } else {
            scheduleNextFlicker();
          }
        }, 65);
      }, delay);
    };

    scheduleNextFlicker();

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      clearInterval(jitterInterval);
    };
  }, [isHovered, isPowerSurging]);

  const effectiveMain = isPowerSurging
    ? flickerState.main
    : isHovered
    ? 1.25
    : Math.max(0.2, Math.min(1.3, flickerState.main + flickerState.jitter));

  const effectiveTapri = isPowerSurging
    ? flickerState.tapri
    : isHovered
    ? 1.25
    : Math.max(0.1, Math.min(1.3, flickerState.tapri + flickerState.jitter));

  const effectiveBloom = isPowerSurging
    ? flickerState.bloom
    : isHovered
    ? 1.35
    : Math.max(0.2, Math.min(1.4, flickerState.bloom + flickerState.jitter));

  return {
    mainIntensity: effectiveMain,
    tapriIntensity: effectiveTapri,
    bloomIntensity: effectiveBloom,
    isHovered,
    setIsHovered,
    isPowerSurging,
    triggerPowerSurge,
  };
}
