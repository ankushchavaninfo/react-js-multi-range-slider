import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { computeTooltipLayout } from "../utils/tooltipLayout";
import { thumbOffset } from "../utils/percent";

const THUMB_W = 18;

export interface TooltipSlot {
  left: string;
  label: string;
  visible: boolean;
}

/**
 * Compute collision-free `left` positions for a row of tooltips.
 *
 * Attach `containerRef` to the `.mrs-tooltips` wrapper div.
 * `percents` must be in visual left-to-right order — callers should flip
 * values to `100 - pct` and reorder labels when `direction="rtl"`.
 *
 * On the first render the hook falls back to the standard `calc(p% + offset)`
 * formula (no measurement available yet).  Once the container width is known
 * the push-apart + merge algorithm takes over and all subsequent renders
 * (including rapid drag updates) use pixel positions.
 */
export function useTooltipLayout(
  percents: number[],
  labels: string[],
  thumbW = THUMB_W,
): {
  slots: TooltipSlot[];
  containerRef: RefObject<HTMLDivElement>;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  // Sync container width after every render.
  // React bails out of a re-render when the value is identical, so this is
  // a cheap idempotent read on each drag frame.
  useEffect(() => {
    const el = containerRef.current;
    if (el) setContainerW(el.offsetWidth);
  });

  // Keep width in sync when the slider is resized (e.g. responsive layouts).
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerW(Math.round(entry.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const raw = percents.map((p, i) => ({ percent: p, label: labels[i] }));

  const slots: TooltipSlot[] =
    containerW > 0
      ? computeTooltipLayout(raw, containerW, thumbW).map(r => ({
          left: `${r.centerPx}px`,
          label: r.label,
          visible: r.visible,
        }))
      : raw.map((it, i) => ({
          left: `calc(${it.percent}% + ${thumbOffset(it.percent, thumbW)}px)`,
          label: labels[i],
          visible: true,
        }));

  return { slots, containerRef };
}
