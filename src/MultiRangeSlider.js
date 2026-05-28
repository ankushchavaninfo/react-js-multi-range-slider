/** @format */

import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";

const MultiRangeSlider = ({
  title = "Multi Range Slider",
  min,
  max,
  onChange,
  className,
  style,
  direction = "ltr",
  step = 1,
  value,
  defaultValue,
  onChangeStart,
  onChangeComplete,
  minDistance = 1,
  allowOverlap = false,
  disabled = false,
  sliderStyle,
  trackStyle,
  rangeStyle: customRangeStyle,
  thumbStyle,
  labelStyle: customLabelStyle,
  trackColor,
  rangeColor,
  thumbColor,
  labelColor,
  ariaLabelMin,
  ariaLabelMax,
}) => {
  const isRtl = direction === "rtl";
  const range = useRef(null);
  const activeThumbRef = useRef(null);
  const listenersRef = useRef(false);
  const currentRangeRef = useRef({
    min: defaultValue?.min ?? min,
    max: defaultValue?.max ?? max,
  });

  const isControlled = value != null && typeof value === "object";
  const [internalMin, setInternalMin] = useState(() => value?.min ?? defaultValue?.min ?? min);
  const [internalMax, setInternalMax] = useState(() => value?.max ?? defaultValue?.max ?? max);

  const currentMin = isControlled ? value.min : internalMin;
  const currentMax = isControlled ? value.max : internalMax;

  useEffect(() => {
    if (isControlled && value) {
      if (value.min !== undefined) {
        setInternalMin(value.min);
      }
      if (value.max !== undefined) {
        setInternalMax(value.max);
      }
    }
  }, [isControlled, value]);

  useEffect(() => {
    currentRangeRef.current = { min: currentMin, max: currentMax };
  }, [currentMin, currentMax]);

  const getPercent = useCallback(
    (valueToConvert) => Math.round(((valueToConvert - min) / (max - min)) * 100),
    [min, max],
  );

  useEffect(() => {
    if (!range.current) {
      return;
    }

    const minPercent = getPercent(currentMin);
    const maxPercent = getPercent(currentMax);

    range.current.style.left = `${minPercent}%`;
    range.current.style.width = `${Math.max(maxPercent - minPercent, 0)}%`;
  }, [currentMin, currentMax, getPercent]);

  useEffect(() => {
    onChange({ min: currentMin, max: currentMax });
  }, [currentMin, currentMax, onChange]);

  const handleChangeEnd = useCallback(() => {
    if (!activeThumbRef.current) {
      return;
    }

    activeThumbRef.current = null;

    if (listenersRef.current) {
      document.removeEventListener("mouseup", handleChangeEnd);
      document.removeEventListener("touchend", handleChangeEnd);
      listenersRef.current = false;
    }

    if (typeof onChangeComplete === "function") {
      onChangeComplete(currentRangeRef.current);
    }
  }, [onChangeComplete]);

  const handleChangeStart = useCallback(
    (thumbName) => {
      activeThumbRef.current = thumbName;

      if (typeof onChangeStart === "function") {
        onChangeStart(currentRangeRef.current);
      }

      if (!listenersRef.current) {
        document.addEventListener("mouseup", handleChangeEnd);
        document.addEventListener("touchend", handleChangeEnd);
        listenersRef.current = true;
      }
    },
    [onChangeStart, handleChangeEnd],
  );

  useEffect(() => {
    return () => {
      if (listenersRef.current) {
        document.removeEventListener("mouseup", handleChangeEnd);
        document.removeEventListener("touchend", handleChangeEnd);
      }
    };
  }, [handleChangeEnd]);

  const normalizedMinDistance = Math.max(0, minDistance);

  const handleMinChange = (event) => {
    const rawValue = +event.target.value;
    const limit = allowOverlap ? 0 : normalizedMinDistance;
    const nextMin = Math.max(min, Math.min(rawValue, currentMax - limit));

    if (!isControlled) {
      setInternalMin(nextMin);
    }

    onChange({ min: nextMin, max: currentMax });
    event.target.value = nextMin.toString();
  };

  const handleMaxChange = (event) => {
    const rawValue = +event.target.value;
    const limit = allowOverlap ? 0 : normalizedMinDistance;
    const nextMax = Math.min(max, Math.max(rawValue, currentMin + limit));

    if (!isControlled) {
      setInternalMax(nextMax);
    }

    onChange({ min: currentMin, max: nextMax });
    event.target.value = nextMax.toString();
  };

  const rtlThumbStyle = isRtl ? { transform: "scaleX(-1)" } : undefined;
  const rtlLabelStyle = isRtl ? { transform: "scaleX(-1)" } : undefined;
  const sliderVars = {
    ...(trackColor ? { "--track-color": trackColor } : {}),
    ...(rangeColor ? { "--range-color": rangeColor } : {}),
    ...(labelColor ? { "--label-color": labelColor } : {}),
  };

  return (
    <div
      className={classnames(className || "container", {
        "multi-range-slider--disabled": disabled,
      })}
      style={style}
    >
      <strong>{title}</strong>
      <br />
      <div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMin}
          disabled={disabled}
          onMouseDown={() => handleChangeStart("min")}
          onTouchStart={() => handleChangeStart("min")}
          aria-label={ariaLabelMin || "Minimum value"}
          aria-valuemin={min}
          aria-valuemax={currentMax}
          aria-valuenow={currentMin}
          aria-valuetext={String(currentMin)}
          aria-disabled={disabled}
          onChange={handleMinChange}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": currentMin > max - 100,
            "thumb--disabled": disabled,
          })}
          style={{
            ...rtlThumbStyle,
            ...thumbStyle,
            ...(thumbColor ? { "--thumb-color": thumbColor } : {}),
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMax}
          disabled={disabled}
          onMouseDown={() => handleChangeStart("max")}
          onTouchStart={() => handleChangeStart("max")}
          aria-label={ariaLabelMax || "Maximum value"}
          aria-valuemin={currentMin}
          aria-valuemax={max}
          aria-valuenow={currentMax}
          aria-valuetext={String(currentMax)}
          aria-disabled={disabled}
          onChange={handleMaxChange}
          className={classnames("thumb thumb--zindex-4", {
            "thumb--disabled": disabled,
          })}
          style={{
            ...rtlThumbStyle,
            ...thumbStyle,
            ...(thumbColor ? { "--thumb-color": thumbColor } : {}),
          }}
        />

        <div className="slider" style={{ ...sliderVars, ...sliderStyle }}>
          <div className="slider__track" style={trackStyle} />
          <div ref={range} className="slider__range" style={customRangeStyle} />
          <div className="slider__left-value" style={{ ...customLabelStyle, ...rtlLabelStyle }}>
            {isRtl ? currentMax : currentMin}
          </div>
          <div className="slider__right-value" style={{ ...customLabelStyle, ...rtlLabelStyle }}>
            {isRtl ? currentMin : currentMax}
          </div>
        </div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  direction: PropTypes.oneOf(["ltr", "rtl"]),
  step: PropTypes.number,
  value: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  defaultValue: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  onChangeStart: PropTypes.func,
  onChangeComplete: PropTypes.func,
  minDistance: PropTypes.number,
  allowOverlap: PropTypes.bool,
  disabled: PropTypes.bool,
  sliderStyle: PropTypes.object,
  trackStyle: PropTypes.object,
  rangeStyle: PropTypes.object,
  thumbStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  trackColor: PropTypes.string,
  rangeColor: PropTypes.string,
  thumbColor: PropTypes.string,
  labelColor: PropTypes.string,
  ariaLabelMin: PropTypes.string,
  ariaLabelMax: PropTypes.string,
};

export default MultiRangeSlider;
