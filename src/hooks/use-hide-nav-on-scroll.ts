"use client";

import { useEffect, useState } from "react";

const MOBILE_MQ = "(max-width: 767px)";

/** On mobile, hide the fixed nav once the user scrolls past the hero edge. */
export function useHideNavOnScroll(threshold = 48) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);

    const update = () => {
      if (!mq.matches) {
        setHidden(false);
        return;
      }
      setHidden(window.scrollY > threshold);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      mq.removeEventListener("change", update);
    };
  }, [threshold]);

  return hidden;
}
