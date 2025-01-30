/**
 * Copyright 2025, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';

import { useEffect, useRef, useState } from 'react';

import {
  CarouselPagination,
  type CarouselPaginationProps,
} from '../CarouselPagination.js';

import classes from './Carousel.module.css';

type Slide = {
  id: string;
  label: string;
  image?: {
    src: string;
    alt: string;
  };
};

export interface CarouselProps extends CarouselPaginationProps {
  slides: Slide[];
}

export function Carousel({
  currentId: initialCurrentId,
  slides,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentId, setCurrentId] = useState(initialCurrentId || slides[0].id);

  useEffect(() => {
    const trackEl = trackRef.current;

    if (!trackEl) {
      return undefined;
    }

    const handleScroll = () => {
      const { scrollLeft, scrollWidth } = trackEl;
      const index = Math.round((scrollLeft / scrollWidth) * slides.length);

      const id = slides[index]?.id;

      if (currentId !== id) {
        setCurrentId(id);
      }
    };

    trackEl.addEventListener('scroll', handleScroll);

    return () => {
      trackEl.removeEventListener('scroll', handleScroll);
    };
  }, [slides, currentId]);

  return (
    <div className={classes.wrapper}>
      <div ref={trackRef} className={classes.slides}>
        {slides.map((slide) => (
          <div key={slide.id} id={slide.id} className={classes.slide}>
            {slide.image && (
              <img
                src={slide.image.src}
                alt={slide.image.alt}
                loading="lazy"
                className={classes.image}
              />
            )}
          </div>
        ))}
      </div>
      <CarouselPagination slides={slides} currentId={currentId} />
    </div>
  );
}
