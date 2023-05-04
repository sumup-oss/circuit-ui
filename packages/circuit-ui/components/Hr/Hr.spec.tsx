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

import { Hr } from './Hr.js';

describe('Hr', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const { container } = render(<Hr />);
    expect(container).toMatchSnapshot();
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(<Hr className={className} />);
    const hr = container.querySelector('hr');
    expect(hr?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLHRElement>();
    const { container } = render(<Hr ref={ref} />);
    const hr = container.querySelector('hr');
    expect(ref.current).toBe(hr);
  });

  it('should render as a custom element', () => {
    const { container } = render(<Hr as="span" />);
    const span = container.querySelector('span');
    expect(span).toBeVisible();
  });
  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Hr />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
