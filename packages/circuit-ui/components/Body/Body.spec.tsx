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

declare const process: {
  env: { NODE_ENV: string };
};

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

  const deprecatedVariants = [
    [
      'highlight',
      'The "highlight" variant has been deprecated. Use the new `weight` prop instead.',
    ],
    [
      'quote',
      'The "quote" variant has been deprecated. Use custom CSS instead.',
    ],
    [
      'confirm',
      'The "confirm" variant has been deprecated. Use the new `color` prop instead.',
    ],
    [
      'alert',
      'The "alert" variant has been deprecated. Use the new `color` prop instead.',
    ],
    [
      'subtle',
      'The "subtle" variant has been deprecated. Use the new `color` prop instead.',
    ],
  ] as const;
  it.each(
    deprecatedVariants,
  )('[Deprecated variants] should throw an error when a deprecated "%s" variant is passed', (variant, error) => {
    process.env.NODE_ENV = 'development';
    // eslint-disable-next-line circuit-ui/no-deprecated-props
    expect(() => render(<Body variant={variant}>Body</Body>)).toThrow(error);
  });

  const deprecatedSizes = [
    ['one', 'm'],
    ['two', 's'],
  ] as const;
  it.each(
    deprecatedSizes,
  )('[Deprecated sizes] should throw an error when legacy "%s" value is passed to the size prop', (size, alternative) => {
    process.env.NODE_ENV = 'development';
    expect(() => render(<Body size={size}>Body</Body>)).toThrow(
      `[Body] The "${size}" size has been deprecated. Use the "${alternative}" size instead.`,
    );
    process.env.NODE_ENV = 'test';
  });

  const elements = ['p', 'article', 'div'] as const;
  it.each(elements)('should render as a "%s" element', (as) => {
    const { container } = render(<Body as={as}>{as} Body</Body>);
    const actual = container.querySelector(as);
    expect(actual).toBeVisible();
  });

  it('should render the "highlight" variant as a "strong" element', () => {
    // eslint-disable-next-line circuit-ui/no-deprecated-props, circuit-ui/no-renamed-props
    const { container } = render(<Body variant="highlight">Highlight</Body>);
    const actual = container.querySelector('strong');
    expect(actual).toBeVisible();
  });

  it('should render the "quote" variant as a "blockquote" element', () => {
    // eslint-disable-next-line circuit-ui/no-deprecated-props
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
