/**
 * Copyright 2019, SumUp Ltd.
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

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';

import { axe, render } from '../../util/test-utils.js';

import { Body } from './Body.js';

describe('Body', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(<Body className={className}>Body</Body>);
    const paragraph = container.querySelector('p');
    expect(paragraph?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLParagraphElement>();
    const { container } = render(<Body ref={ref}>Body</Body>);
    const paragraph = container.querySelector('p');
    expect(ref.current).toBe(paragraph);
  });

  const elements = ['p', 'article', 'div'] as const;
  it.each(elements)('should render as a "%s" element', (as) => {
    const { container } = render(<Body as={as}>{as} Body</Body>);
    const actual = container.querySelector(as);
    expect(actual).toBeVisible();
  });

  it('should render the "highlight" variant as a "strong" element', () => {
    const { container } = render(<Body variant="highlight">Highlight</Body>);
    const actual = container.querySelector('strong');
    expect(actual).toBeVisible();
  });

  it('should render the "quote" variant as a "blockquote" element', () => {
    const { container } = render(<Body variant="quote">Quote</Body>);
    const actual = container.querySelector('blockquote');
    expect(actual).toBeVisible();
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Body>Body</Body>);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
