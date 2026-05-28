import React, { memo } from "react";

/** Resolve the boolean | number subSteps prop to a concrete count. */
function resolveSubSteps(raw: boolean | number | undefined): number {
  if (raw === true)  return 3;   // auto: 4 sub-divisions per section
  if (!raw)          return 0;   // false | 0 | undefined
  return Math.max(0, Math.floor(raw as number));
}

interface Tick {
  pct: number;
  major: boolean;
}

/** Generate major + optional minor ticks for `sections` equal intervals. */
function buildTicks(sections: number, subSteps: number): Tick[] {
  const ticks: Tick[] = [];
  const segW = sections > 0 ? 100 / sections : 100;

  for (let i = 0; i <= sections; i++) {
    const pct = i * segW;
    ticks.push({ pct, major: true });

    if (subSteps > 0 && i < sections) {
      for (let j = 1; j <= subSteps; j++) {
        ticks.push({ pct: pct + (j / (subSteps + 1)) * segW, major: false });
      }
    }
  }

  return ticks;
}

export interface SliderScaleProps {
  /** Custom evenly-spaced labels (day names, month names, etc.). */
  labels?: string[];
  /** Whether to render ruler tick marks. */
  ruler: boolean;
  /**
   * Minor ticks between each pair of major ticks.
   * Accepts the resolved boolean | number from the parent.
   */
  subSteps?: boolean | number;
  /**
   * Number of major sections when no `labels` are given.
   * Typically `Math.min(20, Math.round((max - min) / step))`.
   */
  sections: number;
}

/**
 * Renders an optional ruler (tick marks) and an optional row of evenly-spaced
 * scale labels below a horizontal slider track.
 *
 * Used internally by RangeSlider and SingleSlider.
 */
const SliderScale = memo(function SliderScale({
  labels,
  ruler,
  subSteps,
  sections,
}: SliderScaleProps) {
  const n       = labels ? labels.length : sections + 1;
  const segs    = Math.max(1, n - 1);
  const minorN  = resolveSubSteps(subSteps);
  const ticks   = ruler ? buildTicks(segs, minorN) : [];
  const hasScale = labels && labels.length > 0;

  if (!ruler && !hasScale) return null;

  return (
    <>
      {ruler && (
        <div className="mrs-ruler" aria-hidden="true">
          {ticks.map((t, i) => (
            <span
              key={i}
              className={t.major ? "mrs-ruler__tick mrs-ruler__tick--major" : "mrs-ruler__tick"}
              style={{ left: `${t.pct}%` }}
            />
          ))}
        </div>
      )}

      {hasScale && (
        <div className="mrs-scale" aria-hidden="true">
          {labels!.map((lbl, i) => {
            const total = labels!.length;
            const pct   = total === 1 ? 50 : (i / (total - 1)) * 100;

            // First label: flush-left; last label: flush-right; others: centered
            let style: React.CSSProperties;
            if (i === 0) {
              style = { left: 0 };
            } else if (i === total - 1) {
              style = { right: 0 };
            } else {
              style = { left: `${pct}%`, transform: "translateX(-50%)" };
            }

            return (
              <span key={i} className="mrs-scale__label" style={style}>
                {lbl}
              </span>
            );
          })}
        </div>
      )}
    </>
  );
});

export default SliderScale;
