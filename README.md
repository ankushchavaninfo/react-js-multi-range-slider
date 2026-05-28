<!-- @format -->

<p align="center">
  <img src="docs/images/logo.svg" alt="react-js-multi-range-sliders logo" width="96" height="96"/>
</p>

<p align="center">
  <img src="docs/images/banner.svg" alt="react-js-multi-range-sliders — 5 slider types, 4 themes, TypeScript, zero deps" width="768"/>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-js-multi-range-sliders">
    <img src="https://img.shields.io/npm/v/react-js-multi-range-sliders.svg" alt="npm version" />
  </a>
  <a href="https://github.com/ankushchavaninfo/react-js-multi-range-slider/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/react-js-multi-range-sliders.svg" alt="MIT License" />
  </a>
  <img src="https://img.shields.io/badge/TypeScript-ready-3178c6.svg" alt="TypeScript" />
  <img src="https://img.shields.io/badge/ESM%20%2B%20CJS-tree--shakeable-22c55e.svg" alt="Tree-shakeable" />
  <img src="https://img.shields.io/badge/zero-runtime--deps-f97316.svg" alt="Zero deps" />
</p>

<p align="center">
  <strong>React Smart Range Selectors</strong> — single, dual-thumb, vertical, multi-point,
  and circular sliders in one package. Four built-in themes, tooltips, RTL, full keyboard
  navigation, complete TypeScript support, and zero runtime dependencies.
</p>

<p align="center">
  <a href="https://codesandbox.io/s/github/ankushchavaninfo/react-js-multi-range-slider/tree/main/example" target="_blank" rel="noopener noreferrer">
    <img alt="Open in CodeSandbox" src="https://codesandbox.io/static/img/play-codesandbox.svg" height="32"/>
  </a>
</p>

---

## Components at a glance

| Component | Description | `onChange` value |
|---|---|---|
| `RangeSlider` | Dual-thumb horizontal | `{ min: number; max: number }` |
| `SingleSlider` | Single-thumb horizontal | `number` |
| `VerticalSlider` | Single-thumb vertical | `number` |
| `MultiPointSlider` | N-thumb horizontal | `number[]` (sorted) |
| `CircularSlider` | SVG radial / knob | `number` |

---

## Install

```bash
npm install react-js-multi-range-sliders
```

**Peer dependencies** (install once if not already present):

```bash
npm install react react-dom
```

---

## Import

```tsx
// Named imports — bundler tree-shakes unused components automatically
import {
  RangeSlider,
  SingleSlider,
  VerticalSlider,
  MultiPointSlider,
  CircularSlider,
} from "react-js-multi-range-sliders";

// Per-component import — zero bundler tree-shaking needed
import RangeSlider    from "react-js-multi-range-sliders/RangeSlider";
import CircularSlider from "react-js-multi-range-sliders/CircularSlider";
```

Styles are **injected automatically** when a component is imported — no separate CSS file needed.

---

## RangeSlider

<p align="center">
  <img src="docs/images/demo-range.svg" alt="RangeSlider — dual thumb with tooltips" width="640"/>
</p>

```tsx
import { useState } from "react";
import { RangeSlider } from "react-js-multi-range-sliders";

function PriceFilter() {
  const [range, setRange] = useState({ min: 100, max: 400 });

  return (
    <RangeSlider
      min={0}
      max={500}
      step={10}
      value={range}
      onChange={setRange}
      minDistance={20}
      showTooltip
      showLabels
      formatLabel={(v) => `$${v}`}
      theme="default"
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `min` ✱ | `number` | — | Minimum bound |
| `max` ✱ | `number` | — | Maximum bound |
| `onChange` ✱ | `(v: RangeValue) => void` | — | Called on every change |
| `value` | `RangeValue` | — | Controlled value |
| `defaultValue` | `RangeValue` | — | Uncontrolled initial value |
| `step` | `number` | `1` | Step interval |
| `minDistance` | `number` | `1` | Min gap between thumbs |
| `allowOverlap` | `boolean` | `false` | Allow thumbs to meet |
| `direction` | `"ltr" \| "rtl"` | `"ltr"` | Layout direction |
| `disabled` | `boolean` | `false` | Read-only state |
| `theme` | `Theme` | `"default"` | Visual theme |
| `showTooltip` | `boolean` | `false` | Tooltip above each thumb |
| `showLabels` | `boolean` | `true` | Value labels below track |
| `formatLabel` | `(v: number) => string` | `String` | Custom label/tooltip text |
| `onChangeStart` | `(v: RangeValue) => void` | — | Fires on pointer-down |
| `onChangeComplete` | `(v: RangeValue) => void` | — | Fires on pointer-up |
| `trackColor` | `string` | — | Track background |
| `rangeColor` | `string` | — | Highlighted range fill |
| `thumbColor` | `string` | — | Thumb fill |
| `labelColor` | `string` | — | Label / tooltip text |
| `trackStyle` | `CSSProperties` | — | Inline style for track |
| `rangeStyle` | `CSSProperties` | — | Inline style for fill |
| `thumbStyle` | `CSSProperties` | — | Inline style for thumbs |
| `labelStyle` | `CSSProperties` | — | Inline style for labels |
| `ariaLabelMin` | `string` | `"Minimum value"` | ARIA label, min thumb |
| `ariaLabelMax` | `string` | `"Maximum value"` | ARIA label, max thumb |
| `labels` | `string[]` | — | Evenly-spaced tick labels (e.g. day or month names) |
| `ruler` | `boolean` | `true` when `labels` set | Show ruler tick marks below the track |
| `subSteps` | `boolean \| number` | `false` | Minor ticks between major ticks (`true` = 3) |

---

## SingleSlider

<p align="center">
  <img src="docs/images/demo-single.svg" alt="SingleSlider — single thumb with tooltip" width="640"/>
</p>

```tsx
import { SingleSlider } from "react-js-multi-range-sliders";

<SingleSlider
  min={0}
  max={100}
  defaultValue={40}
  onChange={(v) => console.log(v)}  // v is number
  showTooltip
  showLabels
  formatLabel={(v) => `${v}%`}
  theme="material"
/>
```

Same base props as `RangeSlider` (including `labels`, `ruler`, `subSteps`). Additional prop:

| Prop | Type | Default | Description |
|---|---|---|---|
| `ariaLabel` | `string` | `"Value"` | ARIA label for the thumb |

---

## VerticalSlider

<p align="center">
  <img src="docs/images/demo-vertical.svg" alt="VerticalSlider — three channels equalizer" width="360"/>
</p>

```tsx
import { VerticalSlider } from "react-js-multi-range-sliders";

function Equalizer() {
  const [bass, setBass] = useState(60);
  const [mid,  setMid]  = useState(40);
  const [high, setHigh] = useState(75);

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <VerticalSlider min={0} max={100} height={180} value={bass} onChange={setBass} showTooltip />
      <VerticalSlider min={0} max={100} height={180} value={mid}  onChange={setMid}  showTooltip />
      <VerticalSlider min={0} max={100} height={180} value={high} onChange={setHigh} showTooltip />
    </div>
  );
}
```

Additional prop:

| Prop | Type | Default | Description |
|---|---|---|---|
| `height` | `number \| string` | `200` | Track height (px or CSS string) |

Cross-browser: `writing-mode: vertical-lr` (Chrome / Safari / Edge) + `orient="vertical"` attribute (Firefox).

---

## MultiPointSlider

<p align="center">
  <img src="docs/images/demo-multipoint.svg" alt="MultiPointSlider — four thumbs with coloured segments" width="640"/>
</p>

Three or more thumbs. `onChange` receives a **sorted** `number[]`.

```tsx
import { MultiPointSlider } from "react-js-multi-range-sliders";

function PriceTiers() {
  const [stops, setStops] = useState([16, 38, 62, 82]);

  return (
    <MultiPointSlider
      min={0}
      max={100}
      values={stops}
      onChange={setStops}
      minDistance={5}
      showTooltip
      showLabels
      formatLabel={(v) => `$${v}`}
    />
  );
}
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `values` ✱ | `number[]` | — | Controlled thumb values (sorted) |
| `defaultValues` | `number[]` | `[min, max]` | Uncontrolled initial values |
| `onChange` ✱ | `(v: number[]) => void` | — | Called on every change |
| `minDistance` | `number` | `0` | Min gap between adjacent thumbs |
| `ariaLabels` | `string[]` | — | ARIA label per thumb |

---

## CircularSlider

<p align="center">
  <img src="docs/images/demo-circular.svg" alt="CircularSlider — four themes side by side" width="580"/>
</p>

SVG radial knob spanning a 270° arc. **Mouse, touch, and keyboard** supported:
`←` `→` `↑` `↓` `Home` `End` `PageUp` `PageDown`.

```tsx
import { CircularSlider } from "react-js-multi-range-sliders";

<CircularSlider
  min={0}
  max={100}
  defaultValue={65}
  onChange={(v) => console.log(v)}
  size={160}
  strokeWidth={14}
  showLabel
  formatLabel={(v) => `${v}%`}
  theme="dark"
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `min` ✱ | `number` | — | Minimum bound |
| `max` ✱ | `number` | — | Maximum bound |
| `onChange` ✱ | `(v: number) => void` | — | Called on every change |
| `value` | `number` | — | Controlled value |
| `defaultValue` | `number` | — | Uncontrolled initial value |
| `size` | `number` | `160` | Diameter in px |
| `strokeWidth` | `number` | `12` | Track and progress stroke width |
| `trackColor` | `string` | — | Background arc colour |
| `progressColor` | `string` | — | Progress arc colour |
| `thumbColor` | `string` | — | Draggable circle fill |
| `showLabel` | `boolean` | `true` | Centre value label |
| `formatLabel` | `(v: number) => string` | `String` | Custom label text |
| `step` | `number` | `1` | Step interval |
| `disabled` | `boolean` | `false` | Read-only state |
| `theme` | `Theme` | `"default"` | Visual theme |
| `ariaLabel` | `string` | `"Circular slider"` | ARIA label |
| `onChangeStart` | `(v: number) => void` | — | Fires on pointer-down |
| `onChangeComplete` | `(v: number) => void` | — | Fires on pointer-up |

---

## Scale Slider — ruler, labels & subSteps

`RangeSlider` and `SingleSlider` both support an optional ruler (tick marks) and an
evenly-spaced label row below the track.

<p align="center">
  <img src="docs/images/demo-scale-simple.svg"   alt="Simple range with ruler" width="640"/><br/>
  <img src="docs/images/demo-scale-weekdays.svg"  alt="Week-day labels" width="640"/><br/>
  <img src="docs/images/demo-scale-daterange.svg" alt="Month labels for date range" width="640"/><br/>
  <img src="docs/images/demo-scale-timerange.svg" alt="Time range with subSteps minor ticks" width="640"/><br/>
  <img src="docs/images/demo-scale-negative.svg"  alt="Negative-to-positive range" width="640"/><br/>
  <img src="docs/images/demo-scale-steponly.svg"  alt="Step-snapping range" width="640"/>
</p>

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `ruler` | `boolean` | `true` when `labels` set | Render tick marks below the track |
| `labels` | `string[]` | — | Array of label strings placed at evenly-spaced positions |
| `subSteps` | `boolean \| number` | `false` | Minor ticks between each pair of major ticks. `true` = 3 minor ticks (4 sub-divisions); any `number` uses that count explicitly |

### Examples

**1. Simple range with auto ruler**

```tsx
<RangeSlider
  min={0} max={100}
  defaultValue={{ min: 25, max: 75 }}
  onChange={setRange}
  ruler
  showLabels
/>
```

The `ruler` prop auto-generates up to 20 evenly-spaced major ticks based on
`Math.min(20, (max - min) / step)`.

---

**2. Week-day range with named labels**

```tsx
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

<RangeSlider
  min={0} max={6} step={1}
  defaultValue={{ min: 1, max: 5 }}
  onChange={setWeekRange}
  labels={DAYS}
  formatLabel={(v) => DAYS[v]}   // tooltip and value display
  showTooltip
  showLabels={false}             // hide redundant number labels
/>
```

`labels` sets both the ruler tick count and the text shown below each tick.
Pair it with `formatLabel` to customise the tooltip / current-value text.

---

**3. Date range with month markers**

```tsx
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec"];

<RangeSlider
  min={0} max={365}
  defaultValue={{ min: 22, max: 364 }}
  onChange={setDateRange}
  labels={MONTHS}
  formatLabel={(v) => {
    const date = new Date(2022, 0, v + 1);
    return date.toLocaleDateString("en-GB", { day:"numeric", month:"short" });
  }}
  showTooltip
  showLabels={false}
/>
```

---

**4. Time range with sub-step minor ticks**

```tsx
const HOURS = Array.from({ length: 13 }, (_, i) =>
  String(i).padStart(2, "0") + ":00"
);

const fmtTime = (v: number) => {
  const h = Math.floor(v / 60);
  const m = v % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
};

<RangeSlider
  min={0} max={719} step={1}
  defaultValue={{ min: 619, max: 719 }}
  onChange={setTimeRange}
  labels={HOURS}
  subSteps={true}          // 3 minor ticks per section = 15-min intervals
  formatLabel={fmtTime}
  showTooltip
  showLabels={false}
/>
```

`subSteps={true}` inserts 3 minor ticks (default) between each pair of major ticks.
Pass a number to use a custom count, e.g. `subSteps={1}` for half-way ticks.

---

**5. Negative / positive range**

```tsx
<RangeSlider
  min={-1} max={1} step={0.1}
  defaultValue={{ min: -0.5, max: 0.5 }}
  onChange={setRange}
  ruler
  showLabels
  formatLabel={(v) => v.toFixed(1)}
/>
```

The ruler works across negative ranges. `step={0.1}` → 20 auto major ticks.

---

**6. Step-snapping range**

```tsx
<RangeSlider
  min={0} max={100} step={5}
  defaultValue={{ min: 30, max: 60 }}
  onChange={setRange}
  ruler
  showLabels
/>
```

The ruler tick count adjusts to the step size automatically:
`sections = Math.min(20, (100 - 0) / 5)` = 20 sections → 21 ticks at 0, 5, 10 … 100.
Native `<input type="range" step="5">` enforces the snapping.

---

## Themes

<p align="center">
  <img src="docs/images/demo-themes.svg" alt="Four built-in themes — default, material, neumorphic, dark" width="640"/>
</p>

| `theme` | Description |
|---|---|
| `"default"` | Clean light — white thumb, blue accent |
| `"material"` | Material Design — 2 px track, purple accent |
| `"neumorphic"` | Soft 3-D shadows on grey background |
| `"dark"` | Dark background, cyan accent |

```tsx
<RangeSlider    theme="dark"       min={0} max={100} onChange={fn} />
<SingleSlider   theme="material"   min={0} max={100} onChange={fn} />
<VerticalSlider theme="neumorphic" min={0} max={100} onChange={fn} />
<CircularSlider theme="dark"       min={0} max={360} onChange={fn} />
```

---

## Custom colours

Colour props override the active theme token:

```tsx
<RangeSlider
  min={0} max={100}
  onChange={fn}
  trackColor="#f1f5f9"
  rangeColor="#f59e0b"
  thumbColor="#fffbeb"
  labelColor="#78350f"
/>
```

---

## Tooltips

```tsx
<RangeSlider
  min={0} max={500} step={5}
  onChange={fn}
  showTooltip
  formatLabel={(v) => `$${v}`}
/>

<SingleSlider
  min={0} max={100}
  onChange={fn}
  showTooltip
  formatLabel={(v) => `${v}%`}
/>
```

---

## Callbacks

```tsx
<RangeSlider
  min={0} max={100}
  onChange={(v) => setRange(v)}           // every pointer move
  onChangeStart={(v)    => logStart(v)}   // pointer down
  onChangeComplete={(v) => save(v)}       // pointer up / release
/>
```

---

## TypeScript

All props are fully typed. Import types as needed:

```ts
import type {
  Theme,
  Direction,
  RangeValue,
  RangeSliderProps,
  SingleSliderProps,
  VerticalSliderProps,
  MultiPointSliderProps,
  CircularSliderProps,
} from "react-js-multi-range-sliders";
```

---

## Accessibility

- Every `input[type=range]` carries `aria-label`, `aria-valuemin`, `aria-valuemax`,
  `aria-valuenow`, `aria-valuetext`, and `aria-disabled`.
- Dual-thumb and multi-point sliders are wrapped in `role="group"` with a
  visually hidden label.
- `CircularSlider` exposes `role="slider"` and responds to standard keyboard keys
  (`← → ↑ ↓ Home End PageUp PageDown`).
- Vertical sliders set `aria-orientation="vertical"` and `orient="vertical"` (Firefox).
- Focus rings use `focus-visible` so they appear only during keyboard navigation.

---

## Tree-shaking

The package ships **CommonJS + ESM** dual output. Modern bundlers
(webpack 5, Vite, Rollup, Next.js) automatically tree-shake unused components.

```
lib/
  index.js / .mjs            — full library (CJS / ESM)
  RangeSlider.js / .mjs      — per-component subpath imports
  SingleSlider.js / .mjs
  VerticalSlider.js / .mjs
  MultiPointSlider.js / .mjs
  CircularSlider.js / .mjs
  *.d.ts / *.d.mts            — TypeScript declarations (auto-generated)
```

`"sideEffects": ["**/*.css"]` is declared so bundlers preserve the style-injection
code for used components and drop it for unused ones.

---

## Backward compatibility

Code written for v0.2 continues to work unchanged:

```tsx
// Default import still works
import MultiRangeSlider from "react-js-multi-range-sliders";

<MultiRangeSlider min={0} max={100} onChange={fn} />
<MultiRangeSlider type="single" min={0} max={100} onChange={fn} />
```

---

## Live demo

Try all five components in the browser:

<a href="https://codesandbox.io/s/github/ankushchavaninfo/react-js-multi-range-slider/tree/main/example" target="_blank" rel="noopener noreferrer">
  <img alt="Open in CodeSandbox" src="https://codesandbox.io/static/img/play-codesandbox.svg" height="32"/>
</a>

---

## License

MIT © [Ankush Chavan](https://github.com/ankushchavaninfo)
