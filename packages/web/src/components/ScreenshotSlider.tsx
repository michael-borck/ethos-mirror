import { useEffect, useState } from 'react';

export interface Slide {
  src: string;
  alt: string;
  caption: string;
}

export default function ScreenshotSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <div
      className="slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <figure key={slide.src} className={`slide${i === index ? ' active' : ''}`}>
          <img src={slide.src} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          <figcaption>{slide.caption}</figcaption>
        </figure>
      ))}
      <div className="slider-dots" role="tablist" aria-label="Screenshots">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            role="tab"
            aria-selected={i === index}
            aria-label={slide.caption}
            className={`slider-dot${i === index ? ' active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
