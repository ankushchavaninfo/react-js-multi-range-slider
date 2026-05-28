/** @format */

import React, { useCallback, useMemo, useState } from "react";
import {
  RangeSlider,
  SingleSlider,
  VerticalSlider,
  MultiPointSlider,
  CircularSlider,
} from "react-js-multi-range-sliders";
import "./App.css";

/* ─── Helpers ────────────────────────────────────────────────── */

function CodeBlock({ children }) {
  return (
    <pre className="code-block">
      <code>{children}</code>
    </pre>
  );
}

function DemoSection({ id, title, description, code, meta, children, layout }) {
  return (
    <section className={`demo-section${layout ? ` demo-section--${layout}` : ""}`} id={id}>
      <div className="demo-copy">
        <h3>{title}</h3>
        <p>{description}</p>
        {meta != null && <div className="demo-meta">{meta}</div>}
      </div>
      <div className="demo-panel">{children}</div>
      <CodeBlock>{code}</CodeBlock>
    </section>
  );
}

function SectionHeader({ tag, title, description }) {
  return (
    <header className="section-header">
      <span className="demo-kicker">{tag}</span>
      <h2>{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </header>
  );
}

/* ─── App ────────────────────────────────────────────────────── */

export default function App() {
  /* RangeSlider states */
  const [range, setRange]       = useState({ min: 20, max: 70 });
  const [budget, setBudget]     = useState({ min: 120, max: 360 });
  const [hours, setHours]       = useState({ min: 8, max: 18 });
  const [rating, setRating]     = useState({ min: 3, max: 7 });
  const [rtlRange, setRtlRange] = useState({ min: 30, max: 75 });
  const [eventLog, setEventLog] = useState("Move a thumb to see callbacks.");

  /* SingleSlider states */
  const [volume, setVolume]     = useState(65);
  const [opacity, setOpacity]   = useState(80);
  const [price, setPrice]       = useState(240);

  /* VerticalSlider states */
  const [bass, setBass]         = useState(60);
  const [mid, setMid]           = useState(45);
  const [treble, setTreble]     = useState(70);

  /* MultiPointSlider states */
  const [stops, setStops]       = useState([15, 40, 65, 85]);

  /* CircularSlider states */
  const [degrees, setDegrees]   = useState(135);
  const [temp, setTemp]         = useState(22);
  const [progress, setProgress] = useState(65);
  const [knob, setKnob]         = useState(300);

  /* Scale / ruler demo states */
  const [simpleRange,   setSimpleRange]   = useState({ min: 25, max: 75 });
  const [weekRange,     setWeekRange]     = useState({ min: 1,  max: 5  });
  const [dateRange,     setDateRange]     = useState({ min: 22, max: 364 });
  const [timeRange,     setTimeRange]     = useState({ min: 619, max: 719 });
  const [negRange,      setNegRange]      = useState({ min: -0.5, max: 0.5 });
  const [stepRange,     setStepRange]     = useState({ min: 30, max: 60 });

  /* Theme demo states */
  const [tDefault,  setTDefault]  = useState({ min: 25, max: 75 });
  const [tMaterial, setTMaterial] = useState({ min: 20, max: 80 });
  const [tNeum,     setTNeum]     = useState({ min: 30, max: 70 });
  const [tDark,     setTDark]     = useState({ min: 35, max: 65 });

  const noop = useCallback(() => {}, []);
  const install = useMemo(() => "npm install react-js-multi-range-sliders", []);

  return (
    <main className="page-shell">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">React component library</p>
          <h1>react-js-multi-range-sliders</h1>
          <p className="hero-text">
            Single, dual-thumb, vertical, multi-point, and circular range
            selectors — with four themes, tooltips, and full TypeScript support.
            Zero runtime dependencies.
          </p>
          <div className="hero-actions">
            <a href="#range-slider" className="primary-link">View examples</a>
            <a href="#install"      className="secondary-link">Install</a>
          </div>
        </div>
        <div className="hero-demo" aria-label="Live range slider preview">
          <RangeSlider
            min={0}
            max={100}
            value={range}
            onChange={setRange}
            minDistance={5}
            showTooltip
            showLabels
            trackColor="#e2e8f0"
            rangeColor="#2563eb"
            thumbColor="#ffffff"
            labelColor="#1e293b"
            style={{ width: "100%" }}
          />
          <div className="hero-value">
            <span>Selected range</span>
            <strong>{range.min} – {range.max}</strong>
          </div>
          <div className="hero-chips">
            <span className="chip">TypeScript</span>
            <span className="chip">Tree-shakeable</span>
            <span className="chip">4 Themes</span>
            <span className="chip">Accessible</span>
          </div>
        </div>
      </section>

      {/* ── INSTALL ────────────────────────────────────────────── */}
      <section className="quick-start" id="install">
        <div>
          <span className="demo-kicker">Quick start</span>
          <h2>Install and import</h2>
        </div>
        <CodeBlock>{`${install}

// Named imports — tree-shaken by your bundler
import { RangeSlider, SingleSlider, VerticalSlider,
         MultiPointSlider, CircularSlider } from "react-js-multi-range-sliders";

// Per-component import — zero bundler tree-shaking needed
import RangeSlider from "react-js-multi-range-sliders/RangeSlider";`}
        </CodeBlock>
      </section>

      {/* ══════════════════════════════════════════════════════════
          RANGE SLIDER
      ══════════════════════════════════════════════════════════ */}
      <div className="examples-layout" id="range-slider">
        <SectionHeader
          tag="Component"
          title="RangeSlider"
          description="Dual-thumb slider. onChange receives { min, max }."
        />

        <DemoSection
          id="controlled"
          title="Controlled value"
          description="Bind value to React state for full control over the selection."
          meta={<strong>{range.min} – {range.max}</strong>}
          code={`<RangeSlider
  min={0} max={100}
  value={range}
  onChange={setRange}
  minDistance={5}
  showTooltip
/>`}
        >
          <RangeSlider
            min={0} max={100}
            value={range}
            onChange={setRange}
            minDistance={5}
            showTooltip
            showLabels
            trackColor="#e5e7eb"
            rangeColor="#2563eb"
            thumbColor="#ffffff"
            style={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          id="budget"
          title="Default value + step"
          description="Uncontrolled with a step of 10 and a custom label formatter."
          meta={<strong>${budget.min} – ${budget.max}</strong>}
          code={`<RangeSlider
  min={0} max={500} step={10}
  defaultValue={{ min: 120, max: 360 }}
  onChange={setBudget}
  formatLabel={(v) => \`$\${v}\`}
  showTooltip showLabels
/>`}
        >
          <RangeSlider
            min={0} max={500} step={10}
            defaultValue={{ min: 120, max: 360 }}
            onChange={setBudget}
            formatLabel={(v) => `$${v}`}
            showTooltip showLabels
            trackColor="#dbe4ea"
            rangeColor="#0f766e"
            thumbColor="#ffffff"
            style={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          id="booking"
          title="Minimum distance"
          description="minDistance keeps the thumbs at least N steps apart."
          meta={<strong>{hours.min}:00 – {hours.max}:00</strong>}
          code={`<RangeSlider
  min={0} max={24}
  value={hours}
  onChange={setHours}
  minDistance={4}
  formatLabel={(v) => \`\${v}:00\`}
  showTooltip
/>`}
        >
          <RangeSlider
            min={0} max={24}
            value={hours}
            onChange={setHours}
            minDistance={4}
            formatLabel={(v) => `${v}:00`}
            showTooltip showLabels
            trackColor="#e5e7eb"
            rangeColor="#b45309"
            thumbColor="#fff7ed"
            style={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          id="overlap"
          title="Allow overlap"
          description="allowOverlap lets both thumbs meet at the same value."
          meta={<strong>{rating.min} – {rating.max}</strong>}
          code={`<RangeSlider
  min={0} max={10}
  value={rating}
  onChange={setRating}
  allowOverlap
  showTooltip
/>`}
        >
          <RangeSlider
            min={0} max={10}
            value={rating}
            onChange={setRating}
            allowOverlap
            showTooltip showLabels
            trackColor="#e2e8f0"
            rangeColor="#7c3aed"
            thumbColor="#ffffff"
            style={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          id="rtl"
          title="RTL direction"
          description="direction=rtl flips interaction and labels for Arabic / Hebrew layouts."
          meta={<strong>{rtlRange.min} – {rtlRange.max}</strong>}
          code={`<RangeSlider
  min={0} max={100}
  value={rtlRange}
  onChange={setRtlRange}
  direction="rtl"
  showTooltip
/>`}
        >
          <RangeSlider
            min={0} max={100}
            value={rtlRange}
            onChange={setRtlRange}
            direction="rtl"
            showTooltip showLabels
            trackColor="#e5e7eb"
            rangeColor="#db2777"
            thumbColor="#ffffff"
            style={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          id="disabled"
          title="Disabled"
          description="Render a read-only range without removing it from context."
          meta={<strong>25 – 80</strong>}
          code={`<RangeSlider
  min={0} max={100}
  defaultValue={{ min: 25, max: 80 }}
  onChange={noop}
  disabled showLabels
/>`}
        >
          <RangeSlider
            min={0} max={100}
            defaultValue={{ min: 25, max: 80 }}
            onChange={noop}
            disabled showLabels
            trackColor="#e5e7eb"
            rangeColor="#94a3b8"
            thumbColor="#f8fafc"
            style={{ width: "100%" }}
          />
        </DemoSection>

        <section className="demo-section" id="callbacks">
          <div className="demo-copy">
            <h3>Callbacks</h3>
            <p>onChangeStart fires on pointer-down; onChangeComplete fires on release.</p>
            <div className="demo-meta"><strong>{eventLog}</strong></div>
          </div>
          <div className="demo-panel">
            <RangeSlider
              min={0} max={100}
              defaultValue={{ min: 15, max: 85 }}
              onChange={noop}
              onChangeStart={(v) => setEventLog(`Started  ${v.min} – ${v.max}`)}
              onChangeComplete={(v) => setEventLog(`Finished ${v.min} – ${v.max}`)}
              showTooltip showLabels
              trackColor="#e5e7eb"
              rangeColor="#059669"
              thumbColor="#ffffff"
              style={{ width: "100%" }}
            />
          </div>
          <CodeBlock>{`<RangeSlider
  min={0} max={100}
  defaultValue={{ min: 15, max: 85 }}
  onChange={() => {}}
  onChangeStart={(v) => console.log("start", v)}
  onChangeComplete={(v) => console.log("done",  v)}
/>`}</CodeBlock>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SINGLE SLIDER
      ══════════════════════════════════════════════════════════ */}
      <div className="examples-layout" id="single-slider">
        <SectionHeader
          tag="Component"
          title="SingleSlider"
          description="Single thumb. onChange receives a number."
        />

        <DemoSection
          id="volume"
          title="Basic"
          description="Single thumb with min/max labels and a live value display."
          meta={<strong>Volume: {volume}%</strong>}
          code={`import { SingleSlider } from "react-js-multi-range-sliders";

<SingleSlider
  min={0} max={100}
  value={volume}
  onChange={setVolume}
  showLabels
/>`}
        >
          <SingleSlider
            min={0} max={100}
            value={volume}
            onChange={setVolume}
            showLabels
            trackColor="#e5e7eb"
            rangeColor="#2563eb"
            thumbColor="#ffffff"
            style={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          id="opacity"
          title="With tooltip"
          description="showTooltip displays the current value above the thumb while dragging."
          meta={<strong>Opacity: {opacity}%</strong>}
          code={`<SingleSlider
  min={0} max={100}
  value={opacity}
  onChange={setOpacity}
  showTooltip showLabels
  formatLabel={(v) => \`\${v}%\`}
/>`}
        >
          <SingleSlider
            min={0} max={100}
            value={opacity}
            onChange={setOpacity}
            showTooltip showLabels
            formatLabel={(v) => `${v}%`}
            trackColor="#e5e7eb"
            rangeColor="#7c3aed"
            thumbColor="#ffffff"
            style={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          id="price"
          title="Custom label + step"
          description="formatLabel formats both the tooltip and the labels."
          meta={<strong>Max price: ${price}</strong>}
          code={`<SingleSlider
  min={0} max={1000} step={10}
  value={price}
  onChange={setPrice}
  showTooltip showLabels
  formatLabel={(v) => \`$\${v}\`}
  theme="material"
/>`}
        >
          <SingleSlider
            min={0} max={1000} step={10}
            value={price}
            onChange={setPrice}
            showTooltip showLabels
            formatLabel={(v) => `$${v}`}
            theme="material"
            style={{ width: "100%" }}
          />
        </DemoSection>
      </div>

      {/* ══════════════════════════════════════════════════════════
          VERTICAL SLIDER
      ══════════════════════════════════════════════════════════ */}
      <div className="examples-layout" id="vertical-slider">
        <SectionHeader
          tag="Component"
          title="VerticalSlider"
          description="Vertical orientation. Works cross-browser (Chrome, Firefox, Safari)."
        />

        <section className="demo-section demo-section--vertical" id="equalizer">
          <div className="demo-copy">
            <h3>Equalizer</h3>
            <p>Three vertical sliders side by side, each controlling an independent value.</p>
            <div className="demo-meta">
              <strong>Bass {bass} · Mid {mid} · Treble {treble}</strong>
            </div>
          </div>
          <div className="demo-panel demo-panel--vertical">
            <div className="eq-row">
              <div className="eq-channel">
                <VerticalSlider
                  min={0} max={100} height={160}
                  value={bass}
                  onChange={setBass}
                  showTooltip showLabels
                  rangeColor="#2563eb"
                  thumbColor="#ffffff"
                />
                <span className="eq-label">Bass</span>
              </div>
              <div className="eq-channel">
                <VerticalSlider
                  min={0} max={100} height={160}
                  value={mid}
                  onChange={setMid}
                  showTooltip showLabels
                  rangeColor="#7c3aed"
                  thumbColor="#ffffff"
                />
                <span className="eq-label">Mid</span>
              </div>
              <div className="eq-channel">
                <VerticalSlider
                  min={0} max={100} height={160}
                  value={treble}
                  onChange={setTreble}
                  showTooltip showLabels
                  rangeColor="#0f766e"
                  thumbColor="#ffffff"
                />
                <span className="eq-label">Treble</span>
              </div>
            </div>
          </div>
          <CodeBlock>{`import { VerticalSlider } from "react-js-multi-range-sliders";

<VerticalSlider
  min={0} max={100}
  height={160}
  value={bass}
  onChange={setBass}
  showTooltip showLabels
/>`}</CodeBlock>
        </section>

        <section className="demo-section demo-section--vertical" id="vertical-themes">
          <div className="demo-copy">
            <h3>Themes</h3>
            <p>Vertical sliders support all four built-in themes.</p>
          </div>
          <div className="demo-panel demo-panel--vertical">
            <div className="eq-row">
              {[
                { theme: "default",    label: "Default",    val: 50  },
                { theme: "material",   label: "Material",   val: 65  },
                { theme: "neumorphic", label: "Neumorphic", val: 40  },
                { theme: "dark",       label: "Dark",       val: 75  },
              ].map(({ theme, label, val }) => (
                <div className="eq-channel" key={theme}>
                  <VerticalSlider
                    min={0} max={100} height={140}
                    defaultValue={val}
                    onChange={noop}
                    theme={theme}
                    showLabels
                  />
                  <span className="eq-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <CodeBlock>{`<VerticalSlider
  min={0} max={100} height={140}
  defaultValue={65}
  onChange={fn}
  theme="material"   // "default" | "material" | "neumorphic" | "dark"
/>`}</CodeBlock>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MULTI-POINT SLIDER
      ══════════════════════════════════════════════════════════ */}
      <div className="examples-layout" id="multi-point">
        <SectionHeader
          tag="Component"
          title="MultiPointSlider"
          description="N independent thumbs. onChange receives a sorted number[]."
        />

        <DemoSection
          id="price-range"
          title="Four-stop price filter"
          description="Four thumbs divide the range into three coloured segments."
          meta={<strong>{stops.map((v) => `$${v}`).join(" – ")}</strong>}
          code={`import { MultiPointSlider } from "react-js-multi-range-sliders";

<MultiPointSlider
  min={0} max={100}
  values={stops}
  onChange={setStops}
  minDistance={5}
  showTooltip showLabels
/>`}
        >
          <MultiPointSlider
            min={0} max={100}
            values={stops}
            onChange={setStops}
            minDistance={5}
            showTooltip showLabels
            formatLabel={(v) => `$${v}`}
            trackColor="#e5e7eb"
            rangeColor="#2563eb"
            thumbColor="#ffffff"
            style={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          id="multipoint-material"
          title="Material theme"
          description="Three thumbs in material style — fixed, not controlled."
          meta={null}
          code={`<MultiPointSlider
  min={0} max={100}
  defaultValues={[20, 50, 80]}
  onChange={fn}
  minDistance={10}
  showTooltip
  theme="material"
/>`}
        >
          <MultiPointSlider
            min={0} max={100}
            defaultValues={[20, 50, 80]}
            onChange={noop}
            minDistance={10}
            showTooltip showLabels
            theme="material"
            style={{ width: "100%" }}
          />
        </DemoSection>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CIRCULAR SLIDER
      ══════════════════════════════════════════════════════════ */}
      <div className="examples-layout" id="circular-slider">
        <SectionHeader
          tag="Component"
          title="CircularSlider"
          description="SVG radial knob. Draggable with mouse and touch. Keyboard accessible (←→↑↓ Home End)."
        />

        <section className="demo-section demo-section--circular" id="circular-demos">
          <div className="demo-copy">
            <h3>All four themes</h3>
            <p>
              Size, strokeWidth, formatLabel, and all four themes are shown
              here. Full keyboard support — click the knob and use arrow keys.
            </p>
          </div>
          <div className="demo-panel demo-panel--circular">
            <div className="circular-grid">
              <div className="circular-item">
                <CircularSlider
                  min={0} max={360}
                  value={degrees}
                  onChange={setDegrees}
                  size={140}
                  strokeWidth={12}
                  formatLabel={(v) => `${v}°`}
                  showLabel
                  theme="default"
                />
                <span className="circular-label">Default</span>
              </div>
              <div className="circular-item">
                <CircularSlider
                  min={16} max={32}
                  value={temp}
                  onChange={setTemp}
                  size={140}
                  strokeWidth={14}
                  formatLabel={(v) => `${v}°C`}
                  showLabel
                  theme="material"
                />
                <span className="circular-label">Material</span>
              </div>
              <div className="circular-item">
                <CircularSlider
                  min={0} max={100}
                  value={progress}
                  onChange={setProgress}
                  size={140}
                  strokeWidth={14}
                  formatLabel={(v) => `${v}%`}
                  showLabel
                  theme="neumorphic"
                />
                <span className="circular-label">Neumorphic</span>
              </div>
              <div className="circular-item">
                <CircularSlider
                  min={0} max={400}
                  value={knob}
                  onChange={setKnob}
                  size={140}
                  strokeWidth={12}
                  formatLabel={(v) => `${v}W`}
                  showLabel
                  theme="dark"
                />
                <span className="circular-label">Dark</span>
              </div>
            </div>
          </div>
          <CodeBlock>{`import { CircularSlider } from "react-js-multi-range-sliders";

<CircularSlider
  min={0} max={100}
  value={progress}
  onChange={setProgress}
  size={140}
  strokeWidth={14}
  formatLabel={(v) => \`\${v}%\`}
  showLabel
  theme="neumorphic"  // "default" | "material" | "neumorphic" | "dark"
/>`}</CodeBlock>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCALE SLIDER — ruler + labels + subSteps
      ══════════════════════════════════════════════════════════ */}
      <div className="examples-layout" id="scale-slider">
        <SectionHeader
          tag="Feature"
          title="Scale Slider"
          description="Add a ruler and/or evenly-spaced labels below any slider using the labels, ruler, and subSteps props."
        />

        {/* 1 ── Simple range with auto ruler */}
        <DemoSection
          id="scale-simple"
          title="Simple range slider with default values"
          description="ruler automatically generates 20 evenly-spaced tick marks. No custom labels needed."
          meta={<strong>onInput: &nbsp;{simpleRange.min} &nbsp; {simpleRange.max}</strong>}
          code={`<RangeSlider
  min={0} max={100}
  defaultValue={{ min: 25, max: 75 }}
  onChange={setSimpleRange}
  ruler
  showLabels
/>`}
        >
          <RangeSlider
            min={0} max={100}
            defaultValue={{ min: 25, max: 75 }}
            onChange={setSimpleRange}
            ruler
            showLabels
            trackColor="#dde3ea"
            rangeColor="#4a9a4a"
            thumbColor="#ffffff"
            style={{ width: "100%" }}
          />
        </DemoSection>

        {/* 2 ── Week days */}
        <DemoSection
          id="scale-weekdays"
          title="Range slider for week days"
          description="Provide a labels array to render named tick positions. formatLabel maps the index to its label."
          meta={<strong>onInput: &nbsp;{weekRange.min}:{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][weekRange.min]} &nbsp; {weekRange.max}:{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][weekRange.max]}</strong>}
          code={`const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

<RangeSlider
  min={0} max={6} step={1}
  defaultValue={{ min: 1, max: 5 }}
  onChange={setWeekRange}
  labels={DAYS}
  formatLabel={(v) => DAYS[v]}
  showTooltip
  showLabels={false}
/>`}
        >
          {(() => {
            const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            return (
              <RangeSlider
                min={0} max={6} step={1}
                defaultValue={{ min: 1, max: 5 }}
                onChange={setWeekRange}
                labels={DAYS}
                formatLabel={(v) => DAYS[v]}
                showTooltip
                showLabels={false}
                trackColor="#dde3ea"
                rangeColor="#4a9a4a"
                thumbColor="#ffffff"
                style={{ width: "100%" }}
              />
            );
          })()}
        </DemoSection>

        {/* 3 ── Date range */}
        <DemoSection
          id="scale-daterange"
          title="Range slider for date range"
          description="Month labels with a custom formatLabel that converts a day-of-year index to a human-readable date."
          meta={<strong>onInput: &nbsp;{dateRange.min} &nbsp; {dateRange.max}</strong>}
          code={`const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun",
                 "Jul","Aug","Sep","Oct","Nov","Dec"];

// Simple day-of-year → month label helper
const dayLabel = (d) => {
  const mDays = [31,31,28,31,30,31,30,31,31,30,31,30,31];
  let acc = 0;
  for (let m = 0; m < 12; m++) {
    acc += mDays[m];
    if (d <= acc) return MONTHS[m];
  }
  return "Dec";
};

<RangeSlider
  min={0} max={365}
  defaultValue={{ min: 22, max: 364 }}
  onChange={setDateRange}
  labels={MONTHS}
  formatLabel={dayLabel}
  showTooltip
  showLabels={false}
/>`}
        >
          {(() => {
            const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            const mDays  = [31,31,28,31,30,31,30,31,31,30,31,30,31];
            const dayLabel = (d) => {
              let acc = 0;
              for (let m = 0; m < 12; m++) { acc += mDays[m]; if (d <= acc) return MONTHS[m]; }
              return "Dec";
            };
            return (
              <RangeSlider
                min={0} max={365}
                defaultValue={{ min: 22, max: 364 }}
                onChange={setDateRange}
                labels={MONTHS}
                formatLabel={dayLabel}
                showTooltip
                showLabels={false}
                trackColor="#dde3ea"
                rangeColor="#4a9a4a"
                thumbColor="#ffffff"
                style={{ width: "100%" }}
              />
            );
          })()}
        </DemoSection>

        {/* 4 ── Time range with subSteps */}
        <DemoSection
          id="scale-time"
          title="Time-Range with subSteps"
          description="subSteps={true} inserts 3 minor ticks between each hour label (15-minute intervals)."
          meta={<strong>onInput: &nbsp;{Math.floor(timeRange.min/60)}:{String(timeRange.min%60).padStart(2,"0")} &nbsp; {Math.floor(timeRange.max/60)}:{String(timeRange.max%60).padStart(2,"0")}</strong>}
          code={`const HOURS = Array.from({ length: 13 }, (_, i) =>
  String(i).padStart(2,"0") + ":00"
);

const fmtTime = (v) => {
  const h = Math.floor(v / 60);
  const m = v % 60;
  return \`\${String(h).padStart(2,"0")}:\${String(m).padStart(2,"0")}\`;
};

<RangeSlider
  min={0} max={719} step={1}
  defaultValue={{ min: 619, max: 719 }}
  onChange={setTimeRange}
  labels={HOURS}
  subSteps={true}
  formatLabel={fmtTime}
  showTooltip
  showLabels={false}
/>`}
        >
          {(() => {
            const HOURS = Array.from({ length: 13 }, (_, i) => String(i).padStart(2,"0") + ":00");
            const fmtTime = (v) => {
              const h = Math.floor(v / 60);
              const m = v % 60;
              return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
            };
            return (
              <RangeSlider
                min={0} max={719} step={1}
                defaultValue={{ min: 619, max: 719 }}
                onChange={setTimeRange}
                labels={HOURS}
                subSteps={true}
                formatLabel={fmtTime}
                showTooltip
                showLabels={false}
                trackColor="#dde3ea"
                rangeColor="#4a9a4a"
                thumbColor="#ffffff"
                style={{ width: "100%" }}
              />
            );
          })()}
        </DemoSection>

        {/* 5 ── Negative / positive range */}
        <DemoSection
          id="scale-negative"
          title="Negative and positive range"
          description="The ruler works across negative ranges. step={0.1} gives 20 auto ticks between -1 and 1."
          meta={<strong>onInput: &nbsp;{negRange.min.toFixed(1)} &nbsp; {negRange.max.toFixed(1)}</strong>}
          code={`<RangeSlider
  min={-1} max={1} step={0.1}
  defaultValue={{ min: -0.5, max: 0.5 }}
  onChange={setNegRange}
  ruler
  showLabels
  formatLabel={(v) => v.toFixed(1)}
/>`}
        >
          <RangeSlider
            min={-1} max={1} step={0.1}
            defaultValue={{ min: -0.5, max: 0.5 }}
            onChange={setNegRange}
            ruler
            showLabels
            formatLabel={(v) => v.toFixed(1)}
            trackColor="#dde3ea"
            rangeColor="#4a9a4a"
            thumbColor="#ffffff"
            style={{ width: "100%" }}
          />
        </DemoSection>

        {/* 6 ── Step-only snapping */}
        <DemoSection
          id="scale-steponly"
          title="Range slider with step snapping"
          description="step={5} snaps the thumbs to multiples of 5. The ruler tick count auto-adjusts to the step size."
          meta={<strong>onInput: &nbsp;{stepRange.min} &nbsp; {stepRange.max}</strong>}
          code={`<RangeSlider
  min={0} max={100} step={5}
  defaultValue={{ min: 30, max: 60 }}
  onChange={setStepRange}
  ruler
  showLabels
/>`}
        >
          <RangeSlider
            min={0} max={100} step={5}
            defaultValue={{ min: 30, max: 60 }}
            onChange={setStepRange}
            ruler
            showLabels
            trackColor="#dde3ea"
            rangeColor="#4a9a4a"
            thumbColor="#ffffff"
            style={{ width: "100%" }}
          />
        </DemoSection>
      </div>

      {/* ══════════════════════════════════════════════════════════
          THEMES
      ══════════════════════════════════════════════════════════ */}
      <div className="examples-layout" id="themes">
        <SectionHeader
          tag="Feature"
          title="Themes"
          description='Pass theme="default | material | neumorphic | dark" to any component.'
        />

        <section className="demo-section demo-section--themes" id="theme-grid">
          <div className="demo-copy">
            <h3>Four built-in themes</h3>
            <p>Each theme ships with its own colour tokens and focus-visible ring. All tokens can be further overridden with trackColor, rangeColor, and thumbColor.</p>
          </div>
          <div className="demo-panel demo-panel--themes">
            <div className="theme-row">
              {[
                { theme: "default",    label: "Default",    state: tDefault,  setter: setTDefault  },
                { theme: "material",   label: "Material",   state: tMaterial, setter: setTMaterial },
                { theme: "neumorphic", label: "Neumorphic", state: tNeum,     setter: setTNeum     },
                { theme: "dark",       label: "Dark",       state: tDark,     setter: setTDark     },
              ].map(({ theme, label, state, setter }) => (
                <div className={`theme-card theme-card--${theme}`} key={theme}>
                  <span className="theme-card__name">{label}</span>
                  <RangeSlider
                    min={0} max={100}
                    value={state}
                    onChange={setter}
                    showTooltip showLabels
                    theme={theme}
                    style={{ width: "100%" }}
                  />
                  <span className="theme-card__value">
                    {state.min} – {state.max}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <CodeBlock>{`// Any component accepts a theme prop
<RangeSlider theme="dark"       ... />
<SingleSlider theme="material"  ... />
<CircularSlider theme="neumorphic" ... />`}</CodeBlock>
        </section>
      </div>

    </main>
  );
}
