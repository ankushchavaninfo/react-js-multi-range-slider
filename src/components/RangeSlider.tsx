import React, {
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { RangeSliderProps, RangeValue } from "../types";
import { cx } from "../utils/cx";
import { clamp, thumbOffset, toPercent } from "../utils/percent";
import { useChangeListeners } from "../hooks/useChangeListeners";
import "../styles/index.css";

const RangeSlider = memo<RangeSliderProps>(function RangeSlider({
  min,
  max,
  step = 1,
  value,
  defaultValue,
  onChange,
  onChangeStart,
  onChangeComplete,
  minDistance = 1,
  allowOverlap = false,
  direction = "ltr",
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
  ariaLabelMin,
  ariaLabelMax,
}) {
  const groupId = useId();
  const isRtl = direction === "rtl";
  const fillRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<RangeValue>({ min: 0, max: 0 });

  const isControlled = value != null;
  const [iMin, setIMin] = useState(() => value?.min ?? defaultValue?.min ?? min);
  const [iMax, setIMax] = useState(() => value?.max ?? defaultValue?.max ?? max);

  const cMin = isControlled ? value!.min : iMin;
  const cMax = isControlled ? value!.max : iMax;

  useEffect(() => {
    if (isControlled && value) {
      setIMin(value.min);
      setIMax(value.max);
    }
  }, [isControlled, value]);

  useEffect(() => {
    currentRef.current = { min: cMin, max: cMax };
  }, [cMin, cMax]);

  const getVal = useCallback(() => currentRef.current, []);
  const { handleStart, cleanup } = useChangeListeners<RangeValue>(onChangeComplete, getVal);
  useEffect(() => cleanup, [cleanup]);

  const getPercent = useCallback((v: number) => toPercent(v, min, max), [min, max]);

  useEffect(() => {
    if (!fillRef.current) return;
    const lo = getPercent(cMin);
    const hi = getPercent(cMax);
    if (isRtl) {
      fillRef.current.style.right = `${lo}%`;
      fillRef.current.style.left  = "auto";
    } else {
      fillRef.current.style.left  = `${lo}%`;
      fillRef.current.style.right = "auto";
    }
    fillRef.current.style.width = `${Math.max(hi - lo, 0)}%`;
  }, [cMin, cMax, getPercent, isRtl]);

  const gap = allowOverlap ? 0 : Math.max(0, minDistance);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = clamp(+e.target.value, min, cMax - gap);
    if (!isControlled) setIMin(next);
    onChange({ min: next, max: cMax });
    e.target.value = String(next);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = clamp(+e.target.value, cMin + gap, max);
    if (!isControlled) setIMax(next);
    onChange({ min: cMin, max: next });
    e.target.value = String(next);
  };

  const fmt = formatLabel ?? String;
  const pMin = getPercent(cMin);
  const pMax = getPercent(cMax);

  const cssVars = {
    ...(trackColor ? { "--mrs-track-bg": trackColor } : {}),
    ...(rangeColor ? { "--mrs-range-bg": rangeColor } : {}),
    ...(thumbColor ? { "--mrs-thumb-bg": thumbColor, "--mrs-thumb-border": thumbColor } : {}),
    ...(labelColor ? { "--mrs-label-color": labelColor } : {}),
  } as React.CSSProperties;

  const rtlInput: React.CSSProperties = isRtl ? { transform: "scaleX(-1)" } : {};
  const thumbVars = thumbColor ? { "--mrs-thumb-bg": thumbColor } as React.CSSProperties : {};

  return (
    <div
      role="group"
      aria-labelledby={groupId}
      className={cx(
        "mrs-slider",
        `mrs-theme-${theme}`,
        { "mrs-slider--disabled": disabled },
        className,
      )}
      style={{ ...cssVars, ...style }}
    >
      {/* Visually hidden label for screen readers */}
      <span id={groupId} className="mrs-sr-only">
        Range slider, {fmt(min)} to {fmt(max)}
      </span>

      {showTooltip && (
        <div className="mrs-tooltips" aria-hidden="true">
          <span
            className="mrs-tooltip"
            style={{ left: `calc(${pMin}% + ${thumbOffset(pMin)}px)` }}
          >
            {fmt(cMin)}
          </span>
          <span
            className="mrs-tooltip"
            style={{ left: `calc(${pMax}% + ${thumbOffset(pMax)}px)` }}
          >
            {fmt(cMax)}
          </span>
        </div>
      )}

      <div className="mrs-track" style={trackStyle}>
        <div ref={fillRef} className="mrs-track__fill" style={rangeStyle} />
      </div>

      {/* min thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={cMin}
        disabled={disabled}
        onChange={handleMinChange}
        onMouseDown={() => handleStart(onChangeStart)}
        onTouchStart={() => handleStart(onChangeStart)}
        aria-label={ariaLabelMin ?? "Minimum value"}
        aria-valuemin={min}
        aria-valuemax={cMax}
        aria-valuenow={cMin}
        aria-valuetext={fmt(cMin)}
        aria-disabled={disabled}
        className={cx("mrs-input", {
          "mrs-input--z3": true,
          "mrs-input--z5": cMin > max - 100,
        })}
        style={{ ...rtlInput, ...thumbStyle, ...thumbVars }}
      />

      {/* max thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={cMax}
        disabled={disabled}
        onChange={handleMaxChange}
        onMouseDown={() => handleStart(onChangeStart)}
        onTouchStart={() => handleStart(onChangeStart)}
        aria-label={ariaLabelMax ?? "Maximum value"}
        aria-valuemin={cMin}
        aria-valuemax={max}
        aria-valuenow={cMax}
        aria-valuetext={fmt(cMax)}
        aria-disabled={disabled}
        className="mrs-input mrs-input--z4"
        style={{ ...rtlInput, ...thumbStyle, ...thumbVars }}
      />

      {showLabels && (
        <div className="mrs-labels" aria-hidden="true" style={labelStyle}>
          <span className="mrs-label--left">{fmt(isRtl ? cMax : cMin)}</span>
          <span className="mrs-label--right">{fmt(isRtl ? cMin : cMax)}</span>
        </div>
      )}
    </div>
  );
});

export default RangeSlider;
