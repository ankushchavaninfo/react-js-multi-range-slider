import type React from "react";

export type Theme = "default" | "material" | "neumorphic" | "dark";
export type Direction = "ltr" | "rtl";

export interface BaseSliderProps {
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  theme?: Theme;
  // colors
  trackColor?: string;
  rangeColor?: string;
  thumbColor?: string;
  labelColor?: string;
  // style overrides
  trackStyle?: React.CSSProperties;
  rangeStyle?: React.CSSProperties;
  thumbStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  // display
  showTooltip?: boolean;
  showLabels?: boolean;
  formatLabel?: (value: number) => string;
  // scale / ruler
  /** Evenly-spaced text labels rendered below the slider (e.g. day names, month names). */
  labels?: string[];
  /**
   * Show ruler tick marks below the track.
   * Defaults to `true` when a `labels` array is provided, `false` otherwise.
   */
  ruler?: boolean;
  /**
   * Number of minor tick marks to insert between each pair of major ticks.
   * Pass `true` to use the default of 3 minor ticks (4 sub-divisions per section).
   * Pass `false` or `0` to show major ticks only.
   */
  subSteps?: boolean | number;
}

// ─── Single ────────────────────────────────────────────────────────────────

export interface SingleSliderProps extends BaseSliderProps {
  value?: number;
  defaultValue?: number;
  onChange: (value: number) => void;
  onChangeStart?: (value: number) => void;
  onChangeComplete?: (value: number) => void;
  ariaLabel?: string;
}

// ─── Range (dual-thumb) ────────────────────────────────────────────────────

export type RangeValue = { min: number; max: number };

export interface RangeSliderProps extends BaseSliderProps {
  value?: RangeValue;
  defaultValue?: RangeValue;
  onChange: (value: RangeValue) => void;
  onChangeStart?: (value: RangeValue) => void;
  onChangeComplete?: (value: RangeValue) => void;
  minDistance?: number;
  allowOverlap?: boolean;
  direction?: Direction;
  ariaLabelMin?: string;
  ariaLabelMax?: string;
}

// ─── Vertical ──────────────────────────────────────────────────────────────

export interface VerticalSliderProps extends BaseSliderProps {
  value?: number;
  defaultValue?: number;
  onChange: (value: number) => void;
  onChangeStart?: (value: number) => void;
  onChangeComplete?: (value: number) => void;
  height?: number | string;
  ariaLabel?: string;
}

// ─── MultiPoint (N thumbs) ─────────────────────────────────────────────────

export interface MultiPointSliderProps extends BaseSliderProps {
  values: number[];
  defaultValues?: number[];
  onChange: (values: number[]) => void;
  onChangeStart?: (values: number[]) => void;
  onChangeComplete?: (values: number[]) => void;
  minDistance?: number;
  ariaLabels?: string[];
}

// ─── Circular ──────────────────────────────────────────────────────────────

export interface CircularSliderProps {
  min: number;
  max: number;
  value?: number;
  defaultValue?: number;
  onChange: (value: number) => void;
  onChangeStart?: (value: number) => void;
  onChangeComplete?: (value: number) => void;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  thumbColor?: string;
  labelColor?: string;
  disabled?: boolean;
  step?: number;
  showLabel?: boolean;
  formatLabel?: (value: number) => string;
  ariaLabel?: string;
  theme?: Theme;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Backward-compat MultiRangeSlider ──────────────────────────────────────

export type MultiRangeSliderValue = RangeValue;

export interface MultiSliderProps extends RangeSliderProps {
  type?: "multi";
  // keep legacy prop names
  sliderStyle?: React.CSSProperties;
  title?: string;
  ariaLabelMin?: string;
  ariaLabelMax?: string;
}

export interface LegacySingleSliderProps extends SingleSliderProps {
  type: "single";
  sliderStyle?: React.CSSProperties;
  title?: string;
}

export type MultiRangeSliderProps = MultiSliderProps | LegacySingleSliderProps;
