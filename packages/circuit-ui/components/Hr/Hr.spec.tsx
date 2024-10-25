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

import { render, axe, screen } from '../../util/test-utils';

import { Hr } from './Hr';

describe('Hr', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Hr className={className} />);
    const hr = screen.getByRole('separator', { hidden: true });
    expect(hr?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLHRElement>();
    render(<Hr ref={ref} />);
    const hr = screen.getByRole('separator', { hidden: true });
    expect(ref.current).toBe(hr);
  });

  it('should render as a custom element', () => {
    const { container } = render(<Hr as="span" />);
    const span = container.querySelector('span');
    expect(span).toBeVisible();
  });

  it('should be hidden from the accessibility tree by default', () => {
    render(<Hr />);
    const hr = screen.getByRole('separator', { hidden: true });
    expect(hr).toHaveAttribute('aria-hidden', 'true');
  });

  it('should be visible to the accessibility tree', () => {
    render(<Hr aria-hidden="false" />);
    const hr = screen.getByRole('separator');
    expect(hr).toHaveAttribute('aria-hidden', 'false');
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Hr />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
