/**
 * Copyright 2024, SumUp Ltd.
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

import { useState } from 'react';

import {
  CarouselPagination,
  type CarouselPaginationProps,
} from './CarouselPagination.js';
import { Carousel as ExampleCarousel } from './examples/Carousel.js';

export default {
  title: 'Components/CarouselPagination',
  component: CarouselPagination,
};

export const Base = (args: CarouselPaginationProps) => {
  const [currentId, setCurrentId] = useState(args.currentId);

  const slides = args.slides.map((slide) => ({
    ...slide,
    onClick: () => {
      setCurrentId(slide.id);
    },
  }));

  return <CarouselPagination {...args} slides={slides} currentId={currentId} />;
};

Base.args = {
  slides: [
    { id: 'foo', label: 'Foo' },
    { id: 'bar', label: 'Bar' },
    { id: 'baz', label: 'Baz' },
  ],
  currentId: 'foo',
};

export const Carousel = (args: CarouselPaginationProps) => (
  <ExampleCarousel {...args} />
);

Carousel.args = {
  slides: [
    {
      id: 'coffee-transaction',
      label: 'coffee-transaction',
      href: '#coffee-transaction',
      target: '_self',
      image: { src: '/images/sumup-coffee-transaction.jpg', alt: '' },
    },
    {
      id: 'product-catalog',
      label: 'Product catalog',
      href: '#product-catalog',
      target: '_self',
      image: { src: '/images/sumup-product-catalog.jpg', alt: '' },
    },
    {
      id: 'solo-cradle',
      label: 'Solo with cradle',
      href: '#solo-cradle',
      target: '_self',
      image: { src: '/images/sumup-solo-cradle.jpg', alt: '' },
    },
    {
      id: 'solo-printer',
      label: 'Solo printer',
      href: '#solo-printer',
      target: '_self',
      image: { src: '/images/sumup-solo-printer.jpg', alt: '' },
    },
    {
      id: 'tablet-insights',
      label: 'Tablet insights',
      href: '#tablet-insights',
      target: '_self',
      image: { src: '/images/sumup-tablet-insights.jpg', alt: '' },
    },
  ],
  currentId: 'coffee-transaction',
};
Carousel.parameters = {
  chromatic: { disableSnapshot: true },
};
