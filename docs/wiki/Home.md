# Welcome to the react-js-multi-range-slider wiki!

React Js MultiRangeSlider component used to select a multi value from a range of values.

This wiki is the home for project guidance, examples, roadmap notes, and contribution details for `react-js-multi-range-sliders`.

## Overview

`react-js-multi-range-sliders` is a reusable React component for selecting a minimum and maximum value from one continuous range. It is useful for price filters, rating filters, time windows, quantity ranges, dashboards, and any UI where users need to choose two values on the same scale.

## Features

- Dual-thumb range selection
- Controlled and uncontrolled usage
- Minimum distance between values
- Optional thumb overlap
- Disabled state
- RTL direction support
- Custom colors and inline styles
- Accessible range inputs with ARIA labels
- Lightweight package output from `lib/MultiRangeSlider.js`

## Installation

```bash
npm install react-js-multi-range-sliders
```

Or with Yarn:

```bash
yarn add react-js-multi-range-sliders
```

## Basic Usage

```jsx
import React from "react";
import MultiRangeSlider from "react-js-multi-range-sliders";

export default function App() {
  return (
    <MultiRangeSlider
      min={0}
      max={100}
      onChange={({ min, max }) => {
        console.log("Selected range:", min, max);
      }}
    />
  );
}
```

## Controlled Usage

Use controlled values when the parent component should own the selected range.

```jsx
import React, { useState } from "react";
import MultiRangeSlider from "react-js-multi-range-sliders";

export default function PriceFilter() {
  const [range, setRange] = useState({ min: 10, max: 80 });

  return (
    <MultiRangeSlider
      min={0}
      max={100}
      value={range}
      onChange={setRange}
      minDistance={5}
    />
  );
}
```

## Variant Code Recipes

Price filter:

```jsx
<MultiRangeSlider
  title="Price"
  min={0}
  max={10000}
  step={100}
  defaultValue={{ min: 1500, max: 6500 }}
  minDistance={500}
  onChange={({ min, max }) => console.log(`$${min} - $${max}`)}
/>
```

Percentage selector:

```jsx
<MultiRangeSlider
  title="Discount"
  min={0}
  max={100}
  step={5}
  defaultValue={{ min: 10, max: 50 }}
  onChange={({ min, max }) => console.log(`${min}% - ${max}%`)}
/>
```

Time window:

```jsx
<MultiRangeSlider
  title="Available hours"
  min={0}
  max={24}
  step={1}
  value={hours}
  onChange={setHours}
  minDistance={2}
/>
```

Rating range:

```jsx
<MultiRangeSlider
  title="Rating"
  min={0}
  max={5}
  step={0.5}
  allowOverlap
  defaultValue={{ min: 3, max: 5 }}
  onChange={({ min, max }) => console.log(min, max)}
/>
```

RTL layout:

```jsx
<MultiRangeSlider
  title="RTL range"
  min={0}
  max={100}
  direction="rtl"
  defaultValue={{ min: 25, max: 75 }}
  onChange={({ min, max }) => console.log(min, max)}
/>
```

Disabled state:

```jsx
<MultiRangeSlider
  title="Read-only range"
  min={0}
  max={100}
  defaultValue={{ min: 25, max: 80 }}
  disabled
  onChange={() => {}}
/>
```

Accessible labels:

```jsx
<MultiRangeSlider
  title="Salary range"
  min={30000}
  max={200000}
  step={5000}
  ariaLabelMin="Minimum salary"
  ariaLabelMax="Maximum salary"
  onChange={({ min, max }) => console.log(min, max)}
/>
```

Callback events:

```jsx
<MultiRangeSlider
  min={0}
  max={100}
  defaultValue={{ min: 20, max: 80 }}
  onChange={(value) => console.log("change", value)}
  onChangeStart={(value) => console.log("start", value)}
  onChangeComplete={(value) => console.log("complete", value)}
/>
```

## Common Props

| Prop | Type | Description |
| --- | --- | --- |
| `min` | `number` | Minimum value of the slider. |
| `max` | `number` | Maximum value of the slider. |
| `onChange` | `function` | Called with `{ min, max }` when values change. |
| `value` | `object` | Controlled value, for example `{ min: 10, max: 80 }`. |
| `defaultValue` | `object` | Initial uncontrolled value. |
| `step` | `number` | Step interval for the range input. |
| `minDistance` | `number` | Minimum gap between the two selected values. |
| `allowOverlap` | `boolean` | Allows both thumbs to select the same value. |
| `disabled` | `boolean` | Disables slider interaction. |
| `direction` | `"ltr"` or `"rtl"` | Sets left-to-right or right-to-left behavior. |

## Styling

You can style the slider with color props and style objects.

```jsx
<MultiRangeSlider
  min={0}
  max={500}
  trackColor="#d1d5db"
  rangeColor="#2563eb"
  thumbColor="#ffffff"
  labelColor="#111827"
  onChange={({ min, max }) => console.log(min, max)}
/>
```

## Package Quality & Security

- Official package name: `react-js-multi-range-sliders`
- Not affiliated with `multi-range-slider-react`
- MIT licensed
- TypeScript declarations included through `lib/MultiRangeSlider.d.ts`
- No runtime `dependencies`; React, ReactDOM, and PropTypes are peer dependencies
- Small API surface with documented props and examples

## Compared With multi-range-slider-react

`multi-range-slider-react` is another package in the same category. This project focuses on a compact React API, MIT licensing, zero runtime dependencies, controlled/uncontrolled usage, RTL support, callback lifecycle events, ARIA label overrides, and direct style/color customization.

Use this package when you want a small dual-thumb React slider with clear examples, package-owned documentation, TypeScript declarations, and no extra runtime dependency chain.

## Local Development

Clone the repository, install dependencies, and build the library.

```bash
git clone https://github.com/ankushchavaninfo/react-js-multi-range-slider.git
cd react-js-multi-range-slider
npm install
npm run build
```

Run the example app:

```bash
cd example
npm install
npm start
```

## Roadmap

- Keep the package API small and stable
- Improve examples for real-world filters and dashboards
- Add more accessibility guidance
- Add more visual customization examples
- Keep generated package output ready for npm publishing

## Contributing

Contributions are welcome. Please keep changes focused, run the build before opening a pull request, and update documentation when behavior or props change.

## Author & Links

- Name: Ankush Chavan
- Website: https://www.ankushchavan.in/
- Repository: https://github.com/ankushchavaninfo/react-js-multi-range-slider

## License

MIT. See [LICENSE](../../LICENSE).
