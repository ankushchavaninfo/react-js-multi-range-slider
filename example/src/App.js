/** @format */

import React, { useState } from "react";
import MultiRangeSlider from "../../src/MultiRangeSlider";

export default function App() {
  const [range, setRange] = useState({ min: 20, max: 70 });

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h2>MultiRangeSlider — Example</h2>
      <MultiRangeSlider
        min={0}
        max={100}
        value={range}
        onChange={(v) => setRange(v)}
        onChangeStart={(v) => console.log("start", v)}
        onChangeComplete={(v) => console.log("done", v)}
        step={1}
        minDistance={5}
        trackColor="#f0f0f0"
        rangeColor="#007bff"
        thumbColor="#ffffff"
        labelColor="#333"
        sliderStyle={{ width: 360 }}
      />

      <p style={{ marginTop: 20 }}>
        Selected: {range.min} — {range.max}
      </p>

      <h3>RTL example</h3>
      <MultiRangeSlider min={0} max={100} onChange={() => {}} direction="rtl" />
    </div>
  );
}
