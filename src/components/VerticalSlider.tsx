import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import type { VerticalSliderProps } from "../types";
import { cx } from "../utils/cx";
import { toPercent } from "../utils/percent";
import { useChangeListeners } from "../hooks/useChangeListeners";
import "../styles/index.css";

const VerticalSlider = memo<VerticalSliderProps>(function VerticalSlider({
  min,
  max,
  step = 1,
  value,
  defaultValue,
  onChange,
  onChangeStart,
  onChangeComplete,
  disabled = false,
  height = 200,
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
    fillRef.current.style.height = `${percent}%`;
  }, [percent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = +e.target.value;
    if (!isControlled) setInternal(next);
    onChange(next);
  };

  const fmt = formatLabel ?? String;
  const heightVal = typeof height === "number" ? `${height}px` : height;

  const cssVars: React.CSSProperties = {
    ...(trackColor ? { "--mrs-track-bg": trackColor } : {}),
    ...(rangeColor ? { "--mrs-range-bg": rangeColor } : {}),
    ...(thumbColor ? { "--mrs-thumb-bg": thumbColor, "--mrs-thumb-border": thumbColor } : {}),
    ...(labelColor ? { "--mrs-label-color": labelColor } : {}),
  } as React.CSSProperties;

  return (
    <div
      className={cx(
        "mrs-slider",
        "mrs-slider--vertical",
        `mrs-theme-${theme}`,
        { "mrs-slider--disabled": disabled },
        className,
      )}
      style={{ height: heightVal, ...cssVars, ...style }}
    >
      {showTooltip && (
        <div
          className="mrs-vtip"
          style={{ bottom: `${percent}%`, transform: "translateY(50%)" }}
          aria-hidden="true"
        >
          <span className="mrs-tooltip mrs-tooltip--vertical">{fmt(current)}</span>
        </div>
      )}

      <div className="mrs-track mrs-track--vertical" style={{ height: heightVal, ...trackStyle }}>
        <div ref={fillRef} className="mrs-track__fill mrs-track__fill--vertical" style={rangeStyle} />
      </div>

      {/*
        orient="vertical" — recognized by Firefox for native vertical rendering.
        writing-mode / direction in CSS handles Chrome/Safari.
      */}
      <input
        type="range"
        // @ts-expect-error – 'orient' is a Firefox-specific non-standard attribute
        orient="vertical"
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
        aria-disabled={disabled}
        aria-orientation="vertical"
        className="mrs-input mrs-input--vertical"
        style={{ height: heightVal, ...thumbStyle,
          ...(thumbColor ? { "--mrs-thumb-bg": thumbColor } as React.CSSProperties : {}) }}
      />

      {showLabels && (
        <div className="mrs-labels mrs-labels--vertical" aria-hidden="true" style={labelStyle}>
          <span className="mrs-label--top">{fmt(max)}</span>
          <span className="mrs-label--bottom">{fmt(min)}</span>
        </div>
      )}
    </div>
  );
});

export default VerticalSlider;
