import * as React from "react";

export type MultiRangeSliderValue = {
  min: number;
  max: number;
};

export interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: (value: MultiRangeSliderValue) => void;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  direction?: "ltr" | "rtl";
  step?: number;
  value?: MultiRangeSliderValue;
  defaultValue?: MultiRangeSliderValue;
  onChangeStart?: (value: MultiRangeSliderValue) => void;
  onChangeComplete?: (value: MultiRangeSliderValue) => void;
  minDistance?: number;
  allowOverlap?: boolean;
  disabled?: boolean;
  sliderStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties;
  rangeStyle?: React.CSSProperties;
  thumbStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  trackColor?: string;
  rangeColor?: string;
  thumbColor?: string;
  labelColor?: string;
  ariaLabelMin?: string;
  ariaLabelMax?: string;
}

declare const MultiRangeSlider: React.FC<MultiRangeSliderProps>;

export default MultiRangeSlider;
