<p align="center">
  <h1 align="center"> <code>react-js-multi-range-sliders</code> </h1>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/react-js-multi-range-sliders">
        <img src="https://img.shields.io/npm/v/react-js-multi-range-sliders.svg" alt="Latest version released on npmjs" />
    </a>
    <a href="https://app.circleci.com/pipelines/github/ankushchavaninfo/react-js-multi-range-slider?branch=main">
        <img src="https://img.shields.io/badge/build-passing-passing.svg" alt="Supported platforms" />
    </a>
    <a href="https://github.com/ankushchavaninfo/react-js-multi-range-sliders">
        <img src="https://img.shields.io/badge/platforms-%20windows%20|%20web-lightgrey.svg" alt="Supported platforms" />
    </a>
    <a href="https://github.com/callstack/react-native-slider/blob/main/LICENSE.md">
        <img src="https://img.shields.io/npm/l/react-js-multi-range-sliders.svg" alt="License" />
    </a>
</p>

<p align="center">
  React Js MultiRangeSlider component used to select a multi value from a range of values.
</p>

---

## Installation

To install this module `cd` to your project directory and enter the following command:

```
npm i react-js-multi-range-sliders
```

or

```
yarn add react-js-multi-range-sliders
```
---

## Usage

The following code presents the basic usage scenario of this library:

```jsx
import MultiRangeSlider from "react-js-multi-range-sliders";

const App = () => {
  return (
    <MultiRangeSlider
      min={0}
      max={100}
      onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
    />
  );
};

export default App;
```

Check out the [example project](https://github.com/ankushchavaninfo/react-js-multi-range-slider.git) for more examples.

---
## Properties

| Property | Description | Type | Required | Platform |
| -------- | ----------- | ---- | -------- | -------- |
| `max` | Initial maximum value of the slider.<br/>Default value is 1. | number | yes | |
| `min` | Initial minimum value of the slider.<br/>Default value is 0. | number | yes | |
| `onChange` | Callback continuously called while the user is dragging the slider. | function | yes | |
| `step` | Step value of the slider. The value should be between 0 and (maximumValue - minimumValue). Default value is 0 | number | No | |
| `value` | Write-only property representing the value of the slider. Can be used to programmaticaly controll the position of the thumb. Entered once at the beginning still acts as an initial value. The value should be between minimumValue and maximumValue, which default to 0 and 1 respectively. Default value is 0.<br/>_This is not a controlled component_, you don't need to update the value during dragging. | number | No | | | |

---

## Browser support

- **Chrome** (latest, mac, windows, iOS, Android)
- **Firefox** (latest, mac, windows)
- **Safari** (latest, mac, iOS)
- **Edge** (latest, windows)

---

## Maintainers

- Mr. Mitesh Godhani
- Mr. Santosh Shinde
- Mr. Sagar Shinde

---

## Contributing

This is how you can spin up the dev environment:

```
git clone https://github.com/ankushchavaninfo/react-js-multi-range-slider.git
cd react-js-multi-range-slider
```
---

## Made with  ❤️ 🙏

`react-js-multi-range-slider` is an open source project and will always remain free to use. If you think it's cool, please star it. if you need any help with these or just want to say [hi!.](https://ankushchavan.com)


## Author

Ankush Chavan 2022, [https://ankushchavan.com](https://ankushchavan.com)

---

## License
ISC
---
---