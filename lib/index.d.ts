export { default as SingleSlider } from './SingleSlider.js';
export { default as RangeSlider } from './RangeSlider.js';
export { default as VerticalSlider } from './VerticalSlider.js';
export { default as MultiPointSlider } from './MultiPointSlider.js';
export { default as CircularSlider } from './CircularSlider.js';
import { a as MultiRangeSliderProps } from './types-DRIPRCza.js';
export { B as BaseSliderProps, C as CircularSliderProps, D as Direction, L as LegacySingleSliderProps, M as MultiPointSliderProps, b as MultiRangeSliderValue, c as MultiSliderProps, R as RangeSliderProps, d as RangeValue, S as SingleSliderProps, T as Theme, V as VerticalSliderProps } from './types-DRIPRCza.js';
import React from 'react';

/**
 * Backward-compatible default export.
 * New consumers should import { RangeSlider } or { SingleSlider } directly.
 */

declare const MultiRangeSlider: React.FC<MultiRangeSliderProps>;

export { MultiRangeSliderProps, MultiRangeSlider as default };
