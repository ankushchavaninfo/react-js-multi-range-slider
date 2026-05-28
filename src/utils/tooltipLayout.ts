/**
 * Tooltip collision-resolution utilities.
 *
 * The push-apart algorithm converts percent positions to pixel centers,
 * resolves overlaps, clamps to container bounds (while keeping gap
 * constraints intact), then merges adjacent tooltips with the same label.
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
 * Algorithm (7 steps, resolves all edge cases):
 *   1. Forward pass  — push each tooltip right past the previous one
 *   2. Backward pass — pull each tooltip left past the next one
 *   3. Clamp RIGHT edge
 *   4. Backward pass — pull preceding tooltips left after right-clamp
 *   5. Clamp LEFT edge
 *   6. Forward pass  — push following tooltips right after left-clamp
 *   7. Final RIGHT clamp cleanup
 *
 * Why 7 steps: clamping one edge invalidates the gap constraint set by
 * the previous pass, so each clamp must be followed by a corrective pass
 * in the opposite direction.
 *
 * @param items      Tooltip descriptors in left-to-right visual order.
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

  /** Minimum center-to-center distance between tooltip i and j. */
  const minDist = (i: number, j: number) => widths[i] / 2 + gap + widths[j] / 2;

  // ── Step 1: Forward pass ──────────────────────────────────────────────────
  // Push each tooltip right to clear the one before it.
  for (let i = 1; i < n; i++) {
    const need = centers[i - 1] + minDist(i - 1, i);
    if (centers[i] < need) centers[i] = need;
  }

  // ── Step 2: Backward pass ─────────────────────────────────────────────────
  // Pull each tooltip left to clear the one after it.
  for (let i = n - 2; i >= 0; i--) {
    const maxP = centers[i + 1] - minDist(i, i + 1);
    if (centers[i] > maxP) centers[i] = maxP;
  }

  // ── Step 3: Clamp RIGHT edge ──────────────────────────────────────────────
  // The last tooltip must not overflow the right side of the container.
  centers[n - 1] = Math.min(centers[n - 1], containerW - widths[n - 1] / 2);

  // ── Step 4: Backward pass after right-clamp ───────────────────────────────
  // The right-clamp may have pushed center[n-1] LEFT, breaking the gap
  // constraint with center[n-2].  Pull all preceding tooltips left.
  for (let i = n - 2; i >= 0; i--) {
    const maxP = centers[i + 1] - minDist(i, i + 1);
    if (centers[i] > maxP) centers[i] = maxP;
  }

  // ── Step 5: Clamp LEFT edge ───────────────────────────────────────────────
  // The first tooltip must not overflow the left side of the container.
  centers[0] = Math.max(centers[0], widths[0] / 2);

  // ── Step 6: Forward pass after left-clamp ────────────────────────────────
  // The left-clamp may have pushed center[0] RIGHT, breaking the gap
  // constraint with center[1].  Push all following tooltips right.
  for (let i = 1; i < n; i++) {
    const need = centers[i - 1] + minDist(i - 1, i);
    if (centers[i] < need) centers[i] = need;
  }

  // ── Step 7: Final right-clamp cleanup ─────────────────────────────────────
  // In extremely narrow containers the last tooltip may have been pushed
  // outside the right edge by step 6.  Re-clamp it one last time.
  centers[n - 1] = Math.min(centers[n - 1], containerW - widths[n - 1] / 2);

  // ── Build result & merge ──────────────────────────────────────────────────
  const result: ResolvedTooltip[] = Array.from(items, (it, i) => ({
    centerPx: centers[i],
    label: it.label,
    visible: true,
  }));

  for (let i = 0; i < n - 1; i++) {
    if (!result[i].visible) continue;

    const sameLabel = items[i].label === items[i + 1].label;
    // Remaining gap between these two after all passes (negative = still overlapping).
    const remainingGap = centers[i + 1] - centers[i] - widths[i] / 2 - widths[i + 1] / 2;
    // Merge when values are identical OR when the container is too narrow to
    // separate them (safety net for extreme cases).
    const shouldMerge = sameLabel || remainingGap < 0;

    if (shouldMerge) {
      const mergedLabel = sameLabel
        ? items[i].label
        : `${items[i].label} – ${items[i + 1].label}`;
      result[i] = {
        centerPx: (centers[i] + centers[i + 1]) / 2,
        label: mergedLabel,
        visible: true,
      };
      result[i + 1] = { ...result[i + 1], visible: false };
    }
  }

  return result;
}
