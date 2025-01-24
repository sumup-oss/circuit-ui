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

import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import { render, screen } from '../../util/test-utils.js';

import { CarouselPagination } from './CarouselPagination.js';

describe('CarouselPagination', () => {
  const baseProps = {
    slides: [
      { id: 'foo', label: 'Foo' },
      { id: 'bar', label: 'Bar' },
      { id: 'baz', label: 'Baz' },
    ],
    currentId: 'foo',
  };

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<CarouselPagination {...baseProps} className={className} />);
    const list = screen.getByRole('list');
    expect(list?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLUListElement>();
    render(<CarouselPagination {...baseProps} ref={ref} />);
    const list = screen.getByRole('list');
    expect(ref.current).toBe(list);
  });

  it('should render as buttons when the slides have onClick handlers', () => {
    const slides = [
      { id: 'foo', label: 'Foo', onClick: vi.fn() },
      { id: 'bar', label: 'Bar', onClick: vi.fn() },
      { id: 'baz', label: 'Baz', onClick: vi.fn() },
    ];
    render(<CarouselPagination {...baseProps} slides={slides} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(slides.length);
  });

  it('should render as links when the slides have href attributes', () => {
    const slides = [
      { id: 'foo', label: 'Foo', href: '#foo', onClick: vi.fn() },
      { id: 'bar', label: 'Bar', href: '#bar', onClick: vi.fn() },
      { id: 'baz', label: 'Baz', href: '#baz', onClick: vi.fn() },
    ];
    render(<CarouselPagination {...baseProps} slides={slides} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(slides.length);
  });

  it('should mark the current active item', () => {
    const slides = [
      { id: 'foo', label: 'Foo', href: '#foo' },
      { id: 'bar', label: 'Bar', href: '#bar' },
      { id: 'baz', label: 'Baz', href: '#baz' },
    ];
    render(<CarouselPagination {...baseProps} slides={slides} />);
    const currentSlide = screen.getByRole('link', { name: /foo/i });
    expect(currentSlide).toHaveAttribute('aria-current');
  });

  it('should mark the current active item with the provided type', () => {
    const slides = [
      { id: 'foo', label: 'Foo', href: '#foo' },
      { id: 'bar', label: 'Bar', href: '#bar' },
      { id: 'baz', label: 'Baz', href: '#baz' },
    ];
    render(<CarouselPagination {...baseProps} slides={slides} type="page" />);
    const currentSlide = screen.getByRole('link', { name: /foo/i });
    expect(currentSlide).toHaveAttribute('aria-current', 'page');
  });
});
