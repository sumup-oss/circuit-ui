/**
 * Copyright 2026, SumUp Ltd.
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

import { SumUpLogo } from './SumUpLogo.js';

describe('SumUpLogo', () => {
  it('should accept a custom label (accessible name)', () => {
    const label = 'Label';
    const { container } = render(<SumUpLogo label={label} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAccessibleName(label);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'custom';
    const { container } = render(<SumUpLogo className={className} />);
    const svg = container.querySelector('svg');
    expect(svg?.classList).toContain(className);
  });

  it('should forward a ref to the SVG', () => {
    const ref = createRef<SVGSVGElement>();
    const { container } = render(<SumUpLogo ref={ref} />);
    const svg = container.querySelector('svg');
    expect(ref.current).toBe(svg);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SumUpLogo />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
