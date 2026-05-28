/**
 * Backward-compatible default export.
 * New consumers should import { RangeSlider } or { SingleSlider } directly.
 */
import React from "react";
import type { MultiRangeSliderProps } from "./types";
import RangeSlider from "./components/RangeSlider";
import SingleSlider from "./components/SingleSlider";

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = (props) => {
  if (props.type === "single") {
    const { type: _type, sliderStyle, title: _title, ...rest } = props;
    return (
      <SingleSlider
        {...rest}
        style={sliderStyle ?? rest.style}
      />
    );
  }

  const { type: _type, sliderStyle, title: _title, ...rest } = props;
  return (
    <RangeSlider
      {...rest}
      style={sliderStyle ?? rest.style}
    />
  );
};

export default MultiRangeSlider;
