import { useSyncExternalStore } from "react";

function subscribeMedia(query) {
  return (onStoreChange) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onStoreChange);
    return () => mq.removeEventListener("change", onStoreChange);
  };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function skipHeavyFx() {
  if (typeof window === "undefined") return true;
  if (prefersReducedMotion()) return true;
  if (!isFinePointer()) return true;
  const conn = navigator.connection;
  if (conn?.saveData) return true;
  const type = conn?.effectiveType || "";
  if (type.includes("2g")) return true;
  return false;
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMedia("(prefers-reduced-motion: reduce)"),
    prefersReducedMotion,
    () => false
  );
}

export function useFinePointer() {
  return useSyncExternalStore(
    subscribeMedia("(hover: hover) and (pointer: fine)"),
    isFinePointer,
    () => false
  );
}
