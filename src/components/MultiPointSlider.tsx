import React, { memo, useCallback, useEffect, useId, useRef, useState } from "react";
import type { MultiPointSliderProps } from "../types";
import { cx } from "../utils/cx";
import { clamp, toPercent } from "../utils/percent";
import { useChangeListeners } from "../hooks/useChangeListeners";
import { useTooltipLayout } from "../hooks/useTooltipLayout";
import "../styles/index.css";

const MultiPointSlider = memo<MultiPointSliderProps>(function MultiPointSlider({
  min,
  max,
  step = 1,
  values: controlledValues,
  defaultValues,
  onChange,
  onChangeStart,
  onChangeComplete,
  minDistance = 0,
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
  ariaLabels,
}) {
  const groupId = useId();
  const isControlled = controlledValues != null;
  const initial = controlledValues ?? defaultValues ?? [min, max];

  const [internal, setInternal] = useState<number[]>(initial);
  const current = isControlled ? controlledValues : internal;
  const currentRef = useRef<number[]>(current);

  useEffect(() => { currentRef.current = current; }, [current]);
  useEffect(() => {
    if (isControlled) setInternal(controlledValues);
  }, [isControlled, controlledValues]);

  const getVal = useCallback(() => currentRef.current, []);
  const { handleStart, cleanup } = useChangeListeners<number[]>(onChangeComplete, getVal);
  useEffect(() => cleanup, [cleanup]);

  const fmt = formatLabel ?? String;
  const getPercent = useCallback((v: number) => toPercent(v, min, max), [min, max]);

  const handleChange = (index: number, rawValue: number) => {
    const sorted = [...current];
    const lo = index === 0 ? min : sorted[index - 1] + minDistance;
    const hi = index === sorted.length - 1 ? max : sorted[index + 1] - minDistance;
    sorted[index] = clamp(rawValue, lo, hi);
    if (!isControlled) setInternal(sorted);
    onChange(sorted);
  };

  const cssVars = {
    ...(trackColor ? { "--mrs-track-bg": trackColor } : {}),
    ...(rangeColor ? { "--mrs-range-bg": rangeColor } : {}),
    ...(thumbColor ? { "--mrs-thumb-bg": thumbColor, "--mrs-thumb-border": thumbColor } : {}),
    ...(labelColor ? { "--mrs-label-color": labelColor } : {}),
  } as React.CSSProperties;

  // Fill segments between each consecutive pair of thumbs
  const segments = current.slice(0, -1).map((v, i) => ({
    left: getPercent(v),
    width: Math.max(getPercent(current[i + 1]) - getPercent(v), 0),
  }));

  const tipPercents = current.map(v => getPercent(v));
  const tipLabels   = current.map(v => fmt(v));
  const { slots: tipSlots, containerRef: tipContainerRef } = useTooltipLayout(tipPercents, tipLabels);

  return (
    <div
      role="group"
      aria-labelledby={groupId}
      className={cx("mrs-slider", `mrs-theme-${theme}`, { "mrs-slider--disabled": disabled, "mrs-slider--with-tooltip": showTooltip }, className)}
      style={{ ...cssVars, ...style }}
    >
      <span id={groupId} className="mrs-sr-only">
        Multi-point slider, {fmt(min)} to {fmt(max)}, {current.length} thumbs
      </span>

      {showTooltip && (
        <div ref={tipContainerRef} className="mrs-tooltips" aria-hidden="true">
          {tipSlots.map((slot, i) =>
            slot.visible ? (
              <span key={i} className="mrs-tooltip" style={{ left: slot.left }}>
                {slot.label}
              </span>
            ) : null
          )}
        </div>
      )}

      <div className="mrs-track" style={trackStyle}>
        {segments.map((seg, i) => (
          <div
            key={i}
            className="mrs-track__fill"
            style={{ left: `${seg.left}%`, width: `${seg.width}%`, ...rangeStyle }}
          />
        ))}
      </div>

      {current.map((v, i) => (
        <input
          key={i}
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          disabled={disabled}
          onChange={(e) => handleChange(i, +e.target.value)}
          onMouseDown={() => handleStart(onChangeStart)}
          onTouchStart={() => handleStart(onChangeStart)}
          aria-label={ariaLabels?.[i] ?? `Thumb ${i + 1} of ${current.length}`}
          aria-valuenow={v}
          aria-valuemin={i === 0 ? min : current[i - 1]}
          aria-valuemax={i === current.length - 1 ? max : current[i + 1]}
          aria-valuetext={fmt(v)}
          aria-disabled={disabled}
          className="mrs-input"
          style={{ zIndex: 3 + i, ...thumbStyle,
            ...(thumbColor ? { "--mrs-thumb-bg": thumbColor } as React.CSSProperties : {}) }}
        />
      ))}

      {showLabels && (
        <div className="mrs-labels" aria-hidden="true" style={labelStyle}>
          <span className="mrs-label--left">{fmt(current[0])}</span>
          <span className="mrs-label--right">{fmt(current[current.length - 1])}</span>
        </div>
      )}
    </div>
  );
});

export default MultiPointSlider;
