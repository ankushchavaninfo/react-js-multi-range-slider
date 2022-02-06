# react-js-multi-range-slider

[![npm version](https://img.shields.io/npm/react-js-multi-range-slider.svg?style=flat-square)](https://www.npmjs.com/package/react-js-multi-range-slider)
[![npm downloads](https://img.shields.io/npm/dm/react-js-multi-range-slider.svg?style=flat-square)](https://www.npmjs.com/package/react-js-multi-range-slider)


## Installation

```
npm i react-js-multi-range-slider
```

## Usage

```jsx
import MultiRangeSlider from "react-js-multi-range-slider";

const App = () => {
  return (
    <MultiRangeSlider
      min={0}
      max={100}
      onChange={({ min, max }) => 
      console.log(`min = ${min}, max = ${max}`)
      }
    />
  );
};

export default App;
```

## Browser support

- **Chrome** (latest, mac, windows, iOS, Android)
- **Firefox** (latest, mac, windows)
- **Safari** (latest, mac, iOS)
- **Edge** (latest, windows)

## Contributing

This is how you can spin up the dev environment:

```
git clone https://github.com/ankushchavaninfo/react-js-multi-range-slider.git
cd react-js-multi-range-slider
npm run start
```

## Shoutouts 🙏

Big big shoutout to **[Ankush Chavan](https://ankushchavan.com/)** for donating the `react-js-multi-range-slider` npm handle! ❤️

## Author

Ankush Chavan 2022, [ankushchavan.com](https://ankushchavan.com)
