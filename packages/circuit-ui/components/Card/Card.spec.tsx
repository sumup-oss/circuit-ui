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

import { render, axe } from '../../util/test-utils.js';

import { Card } from './Card.js';

describe('Card', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const { container } = render(<Card />);
    expect(container).toMatchSnapshot();
  });

  it.each(['mega', 'giga'] as const)(
    'should render with %s spacing styles',
    (spacing) => {
      const { container } = render(<Card spacing={spacing} />);
      expect(container).toMatchSnapshot();
    },
  );

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(<Card className={className} />);
    const card = container.querySelector('div');
    expect(card?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Card ref={ref} />);
    const card = container.querySelector('div');
    expect(ref.current).toBe(card);
  });

  it('should render as a custom element', () => {
    const { container } = render(<Card as="section" />);
    const section = container.querySelector('section');
    expect(section).toBeVisible();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Card />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
