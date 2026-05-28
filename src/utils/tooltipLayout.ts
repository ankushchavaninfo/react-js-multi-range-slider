/**
 * Tooltip collision-resolution utilities.
 *
 * The push-apart algorithm converts percent positions to pixel centers,
 * iteratively moves adjacent tooltips apart until they no longer overlap,
 * clamps positions to the container bounds, then merges any pair of
 * adjacent tooltips that display the same formatted value.
 */

/** Approx character width (px) at font-size 11px / weight 600. */
const CHAR_W  = 7;
/** Horizontal padding inside a tooltip (left + right). */
const H_PAD   = 14;
/** Minimum tooltip width even for very short labels. */
const MIN_W   = 28;
/** Minimum pixel gap between adjacent tooltip edges. */
const TIP_GAP = 6;
/** Default thumb/dial diameter used for edge-correction math. */
const THUMB_W = 18;

/** Rough rendered-width estimate for a tooltip based on its label string. */
function estimateWidth(label: string): number {
  return Math.max(label.length * CHAR_W + H_PAD, MIN_W);
}

/**
 * Convert a percent value [0, 100] to the pixel center of the tooltip above
 * the corresponding thumb, measured from the container's left edge.
 *
 * A native range thumb travels from thumbW/2 px (at 0 %) to
 * containerW - thumbW/2 px (at 100 %) because the browser prevents the
 * thumb from going past the track edges.
 */
function pctToCenter(pct: number, cw: number, thumbW: number): number {
  return (pct / 100) * (cw - thumbW) + thumbW / 2;
}

export interface ResolvedTooltip {
  /** Pixel position of the tooltip center, relative to the container's left edge. */
  centerPx: number;
  /** Formatted label string to display. */
  label: string;
  /** False when this tooltip has been merged into an adjacent one. */
  visible: boolean;
}

/**
 * Compute collision-free tooltip positions for a set of thumbs.
 *
 * @param items      Tooltip descriptors in left-to-right visual order (sorted by percent).
 * @param containerW Pixel width of the slider container.
 * @param thumbW     Thumb diameter in pixels (default 18).
 * @param gap        Minimum pixel gap between adjacent tooltip edges (default 6).
 */
export function computeTooltipLayout(
  items: ReadonlyArray<{ percent: number; label: string }>,
  containerW: number,
  thumbW = THUMB_W,
  gap = TIP_GAP,
): ResolvedTooltip[] {
  const n = items.length;
  if (n === 0) return [];
  if (containerW <= 0) {
    return Array.from(items, it => ({ centerPx: 0, label: it.label, visible: true }));
  }

  const centers = Array.from(items, it => pctToCenter(it.percent, containerW, thumbW));
  const widths  = Array.from(items, it => estimateWidth(it.label));

  // Forward pass: push each tooltip right past the previous one.
  for (let i = 1; i < n; i++) {
    const minPos = centers[i - 1] + widths[i - 1] / 2 + gap + widths[i] / 2;
    if (centers[i] < minPos) centers[i] = minPos;
  }

  // Backward pass: pull each tooltip left past the next one.
  for (let i = n - 2; i >= 0; i--) {
    const maxPos = centers[i + 1] - widths[i + 1] / 2 - gap - widths[i] / 2;
    if (centers[i] > maxPos) centers[i] = maxPos;
  }

  // Clamp first and last tooltips to the container bounds.
  centers[0]     = Math.max(centers[0],     widths[0] / 2);
  centers[n - 1] = Math.min(centers[n - 1], containerW - widths[n - 1] / 2);

  const result: ResolvedTooltip[] = Array.from(items, (it, i) => ({
    centerPx: centers[i],
    label: it.label,
    visible: true,
  }));

  // Merge adjacent tooltips that display the same formatted value.
  // The surviving tooltip is centered between the two original positions.
  for (let i = 0; i < n - 1; i++) {
    if (result[i].visible && items[i].label === items[i + 1].label) {
      result[i] = {
        centerPx: (centers[i] + centers[i + 1]) / 2,
        label: items[i].label,
        visible: true,
      };
      result[i + 1] = { ...result[i + 1], visible: false };
    }
  }

  return result;
}
