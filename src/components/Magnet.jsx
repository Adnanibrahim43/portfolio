import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Wrap any element in <Magnet> and it gets pulled toward the cursor when you hover near it.
// The outer box stays still and detects the mouse; the inner box does the moving.
function Magnet({ children, strength = 0.35 }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useGSAP(
    () => {
      const canHover = window.matchMedia("(hover: hover)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!canHover || reducedMotion) return;

      const outer = outerRef.current;
      const inner = innerRef.current;

      function handleMove(event) {
        const box = outer.getBoundingClientRect();
        const offsetX = event.clientX - (box.left + box.width / 2);
        const offsetY = event.clientY - (box.top + box.height / 2);

        gsap.to(inner, {
          x: offsetX * strength,
          y: offsetY * strength,
          duration: 0.4,
          ease: "power3.out",
        });
      }

      function handleLeave() {
        gsap.to(inner, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
      }

      outer.addEventListener("mousemove", handleMove);
      outer.addEventListener("mouseleave", handleLeave);

      return () => {
        outer.removeEventListener("mousemove", handleMove);
        outer.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: outerRef }
  );

  return (
    // The padding enlarges the hover zone; the negative margin cancels it so layout doesn't change
    <div ref={outerRef} className="-m-3 inline-block p-3">
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

export default Magnet;