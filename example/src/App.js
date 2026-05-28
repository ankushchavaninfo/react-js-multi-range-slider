/** @format */

import React, { useCallback, useMemo, useState } from "react";
import MultiRangeSlider from "react-multi-range-slider";
import "./App.css";

const examples = [
  {
    id: "controlled",
    title: "Controlled value",
    description: "Use value with state when your app owns the selected range.",
    code: `<MultiRangeSlider
  min={0}
  max={100}
  value={range}
  onChange={setRange}
  minDistance={5}
/>`,
  },
  {
    id: "default",
    title: "Default value",
    description: "Use defaultValue when the slider can manage its own state.",
    code: `<MultiRangeSlider
  min={0}
  max={500}
  defaultValue={{ min: 120, max: 360 }}
  onChange={setBudget}
  step={10}
/>`,
  },
  {
    id: "distance",
    title: "Minimum distance",
    description: "Keep the thumbs separated by a required gap.",
    code: `<MultiRangeSlider
  min={0}
  max={24}
  value={hours}
  onChange={setHours}
  minDistance={4}
/>`,
  },
  {
    id: "overlap",
    title: "Allow overlap",
    description: "Allow both thumbs to meet at the same value.",
    code: `<MultiRangeSlider
  min={0}
  max={10}
  value={rating}
  onChange={setRating}
  allowOverlap
/>`,
  },
  {
    id: "rtl",
    title: "RTL direction",
    description: "Flip thumb interaction and labels for right-to-left layouts.",
    code: `<MultiRangeSlider
  min={0}
  max={100}
  value={rtlRange}
  onChange={setRtlRange}
  direction="rtl"
/>`,
  },
  {
    id: "disabled",
    title: "Disabled state",
    description:
      "Show read-only or unavailable ranges without removing context.",
    code: `<MultiRangeSlider
  min={0}
  max={100}
  defaultValue={{ min: 25, max: 80 }}
  onChange={() => {}}
  disabled
/>`,
  },
];

function CodeBlock({ children }) {
  return (
    <pre className="code-block">
      <code>{children}</code>
    </pre>
  );
}

function DemoSection({ example, children, meta }) {
  return (
    <section className="demo-section" id={example.id}>
      <div className="demo-copy">
        <span className="demo-kicker">Example</span>
        <h2>{example.title}</h2>
        <p>{example.description}</p>
        {meta ? <div className="demo-meta">{meta}</div> : null}
      </div>
      <div className="demo-panel">{children}</div>
      <CodeBlock>{example.code}</CodeBlock>
    </section>
  );
}

export default function App() {
  const [range, setRange] = useState({ min: 20, max: 70 });
  const [budget, setBudget] = useState({ min: 120, max: 360 });
  const [hours, setHours] = useState({ min: 8, max: 18 });
  const [rating, setRating] = useState({ min: 3, max: 7 });
  const [rtlRange, setRtlRange] = useState({ min: 30, max: 75 });
  const [eventLog, setEventLog] = useState("Move a thumb to see callbacks.");

  const handleRangeChange = useCallback((value) => setRange(value), []);
  const handleBudgetChange = useCallback((value) => setBudget(value), []);
  const handleHoursChange = useCallback((value) => setHours(value), []);
  const handleRatingChange = useCallback((value) => setRating(value), []);
  const handleRtlChange = useCallback((value) => setRtlRange(value), []);
  const handleEventChange = useCallback(() => {}, []);
  const handleChangeStart = useCallback((value) => {
    setEventLog(`Started at ${value.min} - ${value.max}`);
  }, []);
  const handleChangeComplete = useCallback((value) => {
    setEventLog(`Completed at ${value.min} - ${value.max}`);
  }, []);

  const installCommand = useMemo(
    () => "npm install react-multi-range-slider",
    [],
  );

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">React component</p>
          <h1>react-multi-range-slider</h1>
          <p className="hero-text">
            A dual-thumb range slider for prices, filters, schedules, ratings,
            and accessible form controls.
          </p>
          <div className="hero-actions">
            <a href="#examples" className="primary-link">
              View examples
            </a>
            <a href="#install" className="secondary-link">
              Install
            </a>
          </div>
        </div>
        <div className="hero-demo" aria-label="Live range slider preview">
          <MultiRangeSlider
            title="Live preview"
            min={0}
            max={100}
            value={range}
            onChange={handleRangeChange}
            minDistance={5}
            trackColor="#e2e8f0"
            rangeColor="#2563eb"
            thumbColor="#ffffff"
            labelColor="#1e293b"
            sliderStyle={{ width: "100%" }}
          />
          <div className="hero-value">
            <span>Selected range</span>
            <strong>
              {range.min} - {range.max}
            </strong>
          </div>
        </div>
      </section>

      <section className="quick-start" id="install">
        <div>
          <span className="demo-kicker">Quick start</span>
          <h2>Install and import</h2>
        </div>
        <CodeBlock>{`${installCommand}

import MultiRangeSlider from "react-multi-range-slider";`}</CodeBlock>
      </section>

      <div className="examples-layout" id="examples">
        <DemoSection
          example={examples[0]}
          meta={
            <strong>
              {range.min} - {range.max}
            </strong>
          }
        >
          <MultiRangeSlider
            title="Filter range"
            min={0}
            max={100}
            value={range}
            onChange={handleRangeChange}
            minDistance={5}
            trackColor="#e5e7eb"
            rangeColor="#2563eb"
            thumbColor="#ffffff"
            labelColor="#111827"
            sliderStyle={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          example={examples[1]}
          meta={
            <strong>
              ${budget.min} - ${budget.max}
            </strong>
          }
        >
          <MultiRangeSlider
            title="Budget"
            min={0}
            max={500}
            defaultValue={{ min: 120, max: 360 }}
            onChange={handleBudgetChange}
            step={10}
            trackColor="#dbe4ea"
            rangeColor="#0f766e"
            thumbColor="#ffffff"
            labelColor="#134e4a"
            sliderStyle={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          example={examples[2]}
          meta={
            <strong>
              {hours.min}:00 - {hours.max}:00
            </strong>
          }
        >
          <MultiRangeSlider
            title="Booking window"
            min={0}
            max={24}
            value={hours}
            onChange={handleHoursChange}
            minDistance={4}
            trackColor="#e5e7eb"
            rangeColor="#b45309"
            thumbColor="#fff7ed"
            labelColor="#7c2d12"
            sliderStyle={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          example={examples[3]}
          meta={
            <strong>
              {rating.min} - {rating.max}
            </strong>
          }
        >
          <MultiRangeSlider
            title="Rating"
            min={0}
            max={10}
            value={rating}
            onChange={handleRatingChange}
            allowOverlap
            trackColor="#e2e8f0"
            rangeColor="#7c3aed"
            thumbColor="#ffffff"
            labelColor="#4c1d95"
            sliderStyle={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection
          example={examples[4]}
          meta={
            <strong>
              {rtlRange.min} - {rtlRange.max}
            </strong>
          }
        >
          <MultiRangeSlider
            title="RTL range"
            min={0}
            max={100}
            value={rtlRange}
            onChange={handleRtlChange}
            direction="rtl"
            trackColor="#e5e7eb"
            rangeColor="#db2777"
            thumbColor="#ffffff"
            labelColor="#831843"
            sliderStyle={{ width: "100%" }}
          />
        </DemoSection>

        <DemoSection example={examples[5]} meta={<strong>25 - 80</strong>}>
          <MultiRangeSlider
            title="Unavailable range"
            min={0}
            max={100}
            defaultValue={{ min: 25, max: 80 }}
            onChange={handleEventChange}
            disabled
            trackColor="#e5e7eb"
            rangeColor="#94a3b8"
            thumbColor="#f8fafc"
            labelColor="#475569"
            sliderStyle={{ width: "100%" }}
          />
        </DemoSection>

        <section className="demo-section callbacks-section">
          <div className="demo-copy">
            <span className="demo-kicker">Example</span>
            <h2>Callback events</h2>
            <p>
              Listen for drag start and completion when you need analytics, lazy
              fetches, or form updates.
            </p>
            <div className="demo-meta">
              <strong>{eventLog}</strong>
            </div>
          </div>
          <div className="demo-panel">
            <MultiRangeSlider
              title="Callbacks"
              min={0}
              max={100}
              defaultValue={{ min: 15, max: 85 }}
              onChange={handleEventChange}
              onChangeStart={handleChangeStart}
              onChangeComplete={handleChangeComplete}
              trackColor="#e5e7eb"
              rangeColor="#059669"
              thumbColor="#ffffff"
              labelColor="#064e3b"
              sliderStyle={{ width: "100%" }}
            />
          </div>
          <CodeBlock>{`<MultiRangeSlider
  min={0}
  max={100}
  defaultValue={{ min: 15, max: 85 }}
  onChange={() => {}}
  onChangeStart={(value) => console.log("start", value)}
  onChangeComplete={(value) => console.log("done", value)}
/>`}</CodeBlock>
        </section>
      </div>
    </main>
  );
}
