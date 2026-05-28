import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import type { CircularSliderProps } from "../types";
import { cx } from "../utils/cx";
import { clamp } from "../utils/percent";
import "../styles/index.css";

// Arc spans 270° starting from the bottom-left (like a clock dial)
const START_ANGLE = -225;
const SWEEP = 270;

function valueToAngle(value: number, min: number, max: number): number {
  return START_ANGLE + ((value - min) / (max - min)) * SWEEP;
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, fromDeg: number, toDeg: number): string {
  const s = polarToXY(cx, cy, r, fromDeg);
  const e = polarToXY(cx, cy, r, toDeg);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

function pointerAngle(
  e: MouseEvent | TouchEvent,
  svgRect: DOMRect,
  cx: number,
): number | null {
  const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
  const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
  const x = clientX - svgRect.left - cx;
  const y = clientY - svgRect.top - cx;
  // atan2 in SVG space; offset +90 converts to our arc origin
  let deg = (Math.atan2(y, x) * 180) / Math.PI + 90;
  // Map into [0, 360)
  if (deg < 0) deg += 360;
  // Our arc: START_ANGLE (-225) → +45° in standard angle space.
  // After +360 shift: 135° → 405°. Normalize to arc.
  const arcStart = (START_ANGLE + 360) % 360; // 135
  let normalized = deg - arcStart;
  if (normalized < 0) normalized += 360;
  if (normalized > SWEEP) return null; // outside arc
  return normalized;
}

const THEME_COLORS = {
  default:    { track: "#e2e8f0", progress: "#3b82f6", thumb: "#ffffff", label: "#64748b" },
  material:   { track: "#e0e0e0", progress: "#6200ea", thumb: "#6200ea", label: "#424242" },
  neumorphic: { track: "#d1d9e6", progress: "#6c63ff", thumb: "#e0e5ec", label: "#5a6270" },
  dark:       { track: "#334155", progress: "#38bdf8", thumb: "#0f172a", label: "#94a3b8" },
} as const;

const CircularSlider = memo<CircularSliderProps>(function CircularSlider({
  min,
  max,
  value,
  defaultValue,
  onChange,
  onChangeStart,
  onChangeComplete,
  size = 160,
  strokeWidth = 12,
  trackColor,
  progressColor,
  thumbColor,
  labelColor,
  disabled = false,
  step = 1,
  showLabel = true,
  formatLabel,
  ariaLabel,
  theme = "default",
  className,
  style,
}) {
  const isControlled = value != null;
  const [internal, setInternal] = useState<number>(() => value ?? defaultValue ?? min);
  const current = isControlled ? value! : internal;
  const currentRef = useRef(current);
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => { currentRef.current = current; }, [current]);
  useEffect(() => {
    if (isControlled && value != null) setInternal(value);
  }, [isControlled, value]);

  const center = size / 2;
  const radius = (size - strokeWidth) / 2 - 4;
  const thumbR = strokeWidth * 0.8;
  const endAngle = valueToAngle(current, min, max);

  const tc = THEME_COLORS[theme] ?? THEME_COLORS.default;
  const resolvedTrack    = trackColor    ?? tc.track;
  const resolvedProgress = progressColor ?? tc.progress;
  const resolvedThumb    = thumbColor    ?? tc.thumb;
  const resolvedLabel    = labelColor    ?? tc.label;

  const fmt = formatLabel ?? String;

  const snap = useCallback(
    (v: number) => Math.round(v / step) * step,
    [step],
  );

  const commit = useCallback(
    (v: number) => {
      const snapped = clamp(snap(v), min, max);
      if (!isControlled) setInternal(snapped);
      onChange(snapped);
    },
    [isControlled, onChange, snap, min, max],
  );

  // ── Pointer drag ──────────────────────────────────────────────────────────

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dragging.current || !svgRef.current) return;
      if ("touches" in e) e.preventDefault(); // stop scroll during drag
      const rect = svgRef.current.getBoundingClientRect();
      const normalized = pointerAngle(e, rect, center);
      if (normalized == null) return;
      commit(min + (normalized / SWEEP) * (max - min));
    },
    [center, commit, min, max],
  );

  const handleUp = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchend", handleUp);
      onChangeComplete?.(currentRef.current);
    },
    [handleMove, onChangeComplete],
  );

  const handleThumbDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      dragging.current = true;
      onChangeStart?.(currentRef.current);
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("mouseup", handleUp);
      document.addEventListener("touchend", handleUp);
    },
    [disabled, onChangeStart, handleMove, handleUp],
  );

  // ── Keyboard ──────────────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const big = step * 10;
      let next = currentRef.current;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = clamp(next + step, min, max);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = clamp(next - step, min, max);
          break;
        case "PageUp":
          next = clamp(next + big, min, max);
          break;
        case "PageDown":
          next = clamp(next - big, min, max);
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      commit(next);
    },
    [disabled, step, min, max, commit],
  );

  // ── Cleanup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchend", handleUp);
    };
  }, [handleMove, handleUp]);

  const trackPath    = arcPath(center, center, radius, START_ANGLE, START_ANGLE + SWEEP);
  const progressArc  = arcPath(center, center, radius, START_ANGLE, endAngle);
  const thumbPos     = polarToXY(center, center, radius, endAngle);

  return (
    <div
      ref={rootRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel ?? "Circular slider"}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={current}
      aria-valuetext={fmt(current)}
      aria-disabled={disabled}
      className={cx("mrs-circular", `mrs-theme-${theme}`, { "mrs-circular--disabled": disabled }, className)}
      style={{ width: size, height: size, "--mrs-label-color": resolvedLabel, ...style } as React.CSSProperties}
      onKeyDown={handleKeyDown}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
      >
        {/* Background arc */}
        <path
          d={trackPath}
          fill="none"
          stroke={resolvedTrack}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={progressArc}
          fill="none"
          stroke={resolvedProgress}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Draggable thumb */}
        <circle
          cx={thumbPos.x}
          cy={thumbPos.y}
          r={thumbR}
          fill={resolvedThumb}
          stroke={resolvedProgress}
          strokeWidth={2.5}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.25))",
            outline: "none",
          }}
          onMouseDown={handleThumbDown}
          onTouchStart={handleThumbDown}
          aria-hidden="true"
        />
      </svg>

      {showLabel && (
        <div className="mrs-circular__label" aria-hidden="true" style={{ color: resolvedLabel }}>
          {fmt(current)}
          <span className="mrs-circular__sublabel">
            {fmt(min)}–{fmt(max)}
          </span>
        </div>
      )}
    </div>
  );
});

export default CircularSlider;
