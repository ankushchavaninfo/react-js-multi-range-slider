import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import type { SingleSliderProps } from "../types";
import { cx } from "../utils/cx";
import { thumbOffset, toPercent } from "../utils/percent";
import { useChangeListeners } from "../hooks/useChangeListeners";
import SliderScale from "./SliderScale";
import "../styles/index.css";

const SingleSlider = memo<SingleSliderProps>(function SingleSlider({
  min,
  max,
  step = 1,
  value,
  defaultValue,
  onChange,
  onChangeStart,
  onChangeComplete,
  disabled = false,
  className,
  style,
  theme = "default",
  trackColor,
  rangeColor,
  thumbColor,
  labelColor,
  trackStyle,
  rangeStyle,
  thumbStyle,
  labelStyle,
  showTooltip = false,
  showLabels = true,
  formatLabel,
  labels,
  ruler,
  subSteps,
  ariaLabel,
}) {
  const fillRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<number>(value ?? defaultValue ?? min);

  const isControlled = value != null;
  const [internal, setInternal] = useState<number>(() => value ?? defaultValue ?? min);
  const current = isControlled ? value! : internal;

  useEffect(() => {
    if (isControlled && value != null) setInternal(value);
  }, [isControlled, value]);

  useEffect(() => { currentRef.current = current; }, [current]);

  const getVal = useCallback(() => currentRef.current, []);
  const { handleStart, cleanup } = useChangeListeners<number>(onChangeComplete, getVal);
  useEffect(() => cleanup, [cleanup]);

  const percent = toPercent(current, min, max);

  useEffect(() => {
    if (!fillRef.current) return;
    fillRef.current.style.left = "0%";
    fillRef.current.style.width = `${percent}%`;
  }, [percent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = +e.target.value;
    if (!isControlled) setInternal(next);
    onChange(next);
  };

  const fmt = formatLabel ?? String;

  const cssVars: React.CSSProperties = {
    ...(trackColor ? { "--mrs-track-bg": trackColor } : {}),
    ...(rangeColor ? { "--mrs-range-bg": rangeColor } : {}),
    ...(thumbColor ? { "--mrs-thumb-bg": thumbColor, "--mrs-thumb-border": thumbColor } : {}),
    ...(labelColor ? { "--mrs-label-color": labelColor } : {}),
  } as React.CSSProperties;

  const scaleSections = labels
    ? labels.length - 1
    : Math.max(1, Math.min(20, Math.round((max - min) / step)));
  const showRuler = ruler ?? (labels != null && labels.length > 0);

  return (
    <div
      className={cx("mrs-slider", `mrs-theme-${theme}`, { "mrs-slider--disabled": disabled, "mrs-slider--with-tooltip": showTooltip }, className)}
      style={{ ...cssVars, ...style }}
      aria-disabled={disabled}
    >
      {showTooltip && (
        <div className="mrs-tooltips" aria-hidden="true">
          <span
            className="mrs-tooltip"
            style={{ left: `calc(${percent}% + ${thumbOffset(percent)}px)` }}
          >
            {fmt(current)}
          </span>
        </div>
      )}

      <div className="mrs-track" style={trackStyle}>
        <div ref={fillRef} className="mrs-track__fill" style={rangeStyle} />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        onChange={handleChange}
        onMouseDown={() => handleStart(onChangeStart)}
        onTouchStart={() => handleStart(onChangeStart)}
        aria-label={ariaLabel ?? "Value"}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-valuetext={String(current)}
        className="mrs-input mrs-input--z3"
        style={{ ...thumbStyle,
          ...(thumbColor ? { "--mrs-thumb-bg": thumbColor } as React.CSSProperties : {}) }}
      />

      {showLabels && (
        <div className="mrs-labels" aria-hidden="true" style={labelStyle}>
          <span className="mrs-label--left">{fmt(min)}</span>
          <span className="mrs-label--right">{fmt(max)}</span>
        </div>
      )}

      {(showRuler || (labels && labels.length > 0)) && (
        <SliderScale
          labels={labels}
          ruler={showRuler}
          subSteps={subSteps}
          sections={scaleSections}
        />
      )}
    </div>
  );
});

export default SingleSlider;
