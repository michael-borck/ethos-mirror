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

  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <div
      className="slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="slider-frame">
        <div className="slider-chrome" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <div className="slider-viewport">
          {slides.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className={i === index ? 'active' : ''}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </div>
      <div className="slider-controls">
        <button aria-label="Previous screenshot" onClick={() => go(index - 1)}>
          ‹
        </button>
        <span className="slider-caption">{slides[index].caption}</span>
        <button aria-label="Next screenshot" onClick={() => go(index + 1)}>
          ›
        </button>
      </div>
      <div className="slider-dots" role="tablist" aria-label="Screenshots">
        {slides.map((s, i) => (
          <button
            key={s.src}
            role="tab"
            aria-selected={i === index}
            aria-label={s.caption}
            className={i === index ? 'active' : ''}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
