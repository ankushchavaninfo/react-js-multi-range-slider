// Named exports — use these for new code
export { default as SingleSlider } from "./components/SingleSlider";
export { default as RangeSlider } from "./components/RangeSlider";
export { default as VerticalSlider } from "./components/VerticalSlider";
export { default as MultiPointSlider } from "./components/MultiPointSlider";
export { default as CircularSlider } from "./components/CircularSlider";

// Types
export type {
  Theme,
  Direction,
  BaseSliderProps,
  SingleSliderProps,
  RangeSliderProps,
  RangeValue,
  VerticalSliderProps,
  MultiPointSliderProps,
  CircularSliderProps,
  // backward compat aliases
  MultiRangeSliderValue,
  MultiRangeSliderProps,
  MultiSliderProps,
  LegacySingleSliderProps,
} from "./types";

// Default export — backward compatible with v0.2.x
export { default } from "./MultiRangeSlider";
