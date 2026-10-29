import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// A small dot that trails the mouse.
// - grows and turns see-through over links and buttons
// - hides itself over anything marked with data-cursor-hide (like the code window)
function CursorFollower() {
  const dotRef = useRef(null);

  useGSAP(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;

    const dot = dotRef.current;
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });

    // quickTo is built for values that update on every mouse move
    const moveX = gsap.quickTo(dot, "x", { duration: 0.45, ease: "power3" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.45, ease: "power3" });

    // "hidden" | "normal" | "grow": we only animate when the state actually changes
    let state = "hidden";

    function applyState(next) {
      if (next === state) return;
      state = next;

      if (next === "hidden") {
        gsap.to(dot, { opacity: 0, scale: 1, duration: 0.2, overwrite: "auto" });
      } else if (next === "grow") {
        gsap.to(dot, { opacity: 0.35, scale: 3, duration: 0.3, overwrite: "auto" });
      } else {
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.3, overwrite: "auto" });
      }
    }

    function handleMove(event) {
      moveX(event.clientX);
      moveY(event.clientY);

      const target = event.target;
      if (target.closest("[data-cursor-hide]")) {
        applyState("hidden");
      } else if (target.closest("a, button, [data-cursor]")) {
        applyState("grow");
      } else {
        applyState("normal");
      }
    }

    function handleLeaveWindow() {
      applyState("hidden");
    }

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeaveWindow);
    };
  });

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] h-3 w-3 rounded-full bg-accent-500"
    />
  );
}

export default CursorFollower;