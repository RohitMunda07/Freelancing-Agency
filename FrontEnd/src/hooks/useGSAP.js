import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Runs `setupFn(gsap)` inside a gsap.context so every tween/ScrollTrigger
// created inside it is automatically cleaned up on unmount or when deps change.
export function useGSAP(setupFn, deps = []) {
  const ctxRef = useRef(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => setupFn(gsap));
    return () => ctxRef.current && ctxRef.current.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
