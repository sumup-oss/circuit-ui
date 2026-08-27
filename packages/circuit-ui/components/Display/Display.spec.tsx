/**
 * Copyright 2021, SumUp Ltd.
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

import { render, axe } from '../../util/test-utils.js';

import { Display } from './Display.jsx';

declare const process: {
  env: { NODE_ENV: string };
};

describe('Display', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <Display as="h2" className={className}>
        Display
      </Display>,
    );
    const headline = container.querySelector('h2');
    expect(headline?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLHeadingElement>();
    const { container } = render(
      <Display as="h2" ref={ref}>
        Display
      </Display>,
    );
    const headline = container.querySelector('h2');
    expect(ref.current).toBe(headline);
  });

  it('should throw an error if the as props is missing', () => {
    process.env.NODE_ENV = 'development';
    // @ts-expect-error for testing purposes
    expect(() => render(<Display>Body</Display>)).toThrow(
      'The `as` prop is required.',
    );
    process.env.NODE_ENV = 'test';
  });

  const deprecatedSizes = [
    ['one', 'l'],
    ['two', 'm'],
    ['three', 'm'],
    ['four', 's'],
  ] as const;
  it.each(
    deprecatedSizes,
  )('[Deprecated sizes] should throw an error when legacy "%s" value is passed to the size prop', (size, alternative) => {
    process.env.NODE_ENV = 'development';
    expect(() =>
      render(
        <Display as="h2" size={size}>
          Body
        </Display>,
      ),
    ).toThrow(
      `The "${size}" size has been deprecated. Use the "${alternative}" size instead.`,
    );
    process.env.NODE_ENV = 'test';
  });

  const deprecatedWeights = ['regular', 'semibold'] as const;
  it.each(
    deprecatedWeights,
  )('[Deprecated weights] should throw an error when legacy "%s" value is passed to the size prop', (weight) => {
    process.env.NODE_ENV = 'development';
    expect(() =>
      render(
        <Display as="h2" weight={weight}>
          Body
        </Display>,
      ),
    ).toThrow(
      `[Display] The "${weight}" weight has been deprecated. Use the "bold" or "black" weights instead.`,
    );
    process.env.NODE_ENV = 'test';
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Display as="h2">Display</Display>);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
