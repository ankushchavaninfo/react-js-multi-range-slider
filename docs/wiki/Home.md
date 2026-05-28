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

## License

MIT. See [LICENSE](../../LICENSE).
