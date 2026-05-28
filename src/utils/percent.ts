export const toPercent = (value: number, min: number, max: number): number =>
  Math.round(((value - min) / (max - min)) * 100);

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** Thumb offset correction so tooltip/label tracks the thumb precisely */
export const thumbOffset = (percent: number, thumbWidth = 18): number =>
  thumbWidth / 2 - (percent / 100) * thumbWidth;
