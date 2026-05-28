import React, { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import MultiRangeSlider from "react-multi-range-slider";
import "./styles.css";

function App() {
  const [price, setPrice] = useState({ min: 25, max: 75 });
  const [hours, setHours] = useState({ min: 9, max: 18 });
  const [rating, setRating] = useState({ min: 3, max: 8 });
  const [eventMessage, setEventMessage] = useState("Move the callback slider.");

  const handlePriceChange = useCallback((value) => setPrice(value), []);
  const handleHoursChange = useCallback((value) => setHours(value), []);
  const handleRatingChange = useCallback((value) => setRating(value), []);
  const handleSilentChange = useCallback(() => {}, []);

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">NPM package example</p>
        <h1>react-multi-range-slider</h1>
        <p>
          Dual-thumb range slider examples using the published package import:
          <code> react-multi-range-slider</code>
        </p>
      </section>

      <section className="grid">
        <article className="card">
          <h2>Controlled price range</h2>
          <MultiRangeSlider
            title="Price"
            min={0}
            max={100}
            value={price}
            onChange={handlePriceChange}
            minDistance={5}
            rangeColor="#2563eb"
            trackColor="#e2e8f0"
            thumbColor="#ffffff"
            labelColor="#0f172a"
            sliderStyle={{ width: "100%" }}
          />
          <p className="value">
            ${price.min} - ${price.max}
          </p>
        </article>

        <article className="card">
          <h2>Booking hours</h2>
          <MultiRangeSlider
            title="Time"
            min={0}
            max={24}
            value={hours}
            onChange={handleHoursChange}
            step={1}
            minDistance={3}
            rangeColor="#0f766e"
            trackColor="#dbe4ea"
            thumbColor="#ffffff"
            labelColor="#134e4a"
            sliderStyle={{ width: "100%" }}
          />
          <p className="value">
            {hours.min}:00 - {hours.max}:00
          </p>
        </article>

        <article className="card">
          <h2>Allow overlap</h2>
          <MultiRangeSlider
            title="Rating"
            min={0}
            max={10}
            value={rating}
            onChange={handleRatingChange}
            allowOverlap
            rangeColor="#7c3aed"
            trackColor="#e2e8f0"
            thumbColor="#ffffff"
            labelColor="#4c1d95"
            sliderStyle={{ width: "100%" }}
          />
          <p className="value">
            {rating.min} - {rating.max}
          </p>
        </article>

        <article className="card">
          <h2>RTL direction</h2>
          <MultiRangeSlider
            title="RTL"
            min={0}
            max={100}
            defaultValue={{ min: 30, max: 80 }}
            onChange={handleSilentChange}
            direction="rtl"
            rangeColor="#db2777"
            trackColor="#e5e7eb"
            thumbColor="#ffffff"
            labelColor="#831843"
            sliderStyle={{ width: "100%" }}
          />
        </article>

        <article className="card wide">
          <h2>Callbacks</h2>
          <MultiRangeSlider
            title="Drag events"
            min={0}
            max={100}
            defaultValue={{ min: 20, max: 70 }}
            onChange={handleSilentChange}
            onChangeStart={(value) => setEventMessage(`Start: ${value.min} - ${value.max}`)}
            onChangeComplete={(value) => setEventMessage(`Done: ${value.min} - ${value.max}`)}
            rangeColor="#059669"
            trackColor="#e5e7eb"
            thumbColor="#ffffff"
            labelColor="#064e3b"
            sliderStyle={{ width: "100%" }}
          />
          <p className="value">{eventMessage}</p>
        </article>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
