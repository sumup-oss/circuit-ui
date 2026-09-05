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

/** @vitest-environment jsdom */

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';

import { axe, render, screen } from '../../../tests/test-utils.js';

import { Flag, type FlagProps } from './Flag.js';

describe('Flag', () => {
  const baseProps = {
    countryCode: 'FR' as FlagProps['countryCode'],
    alt: 'France',
  };

  it('renders', () => {
    const { container } = render(<Flag {...baseProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Flag {...baseProps} imageClassName={className} />);
    const image = screen.getByRole('img');
    expect(image?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLImageElement>();
    render(<Flag {...baseProps} ref={ref} />);
    const image = screen.getByAltText(baseProps.alt);
    expect(ref.current).toBe(image);
  });

  it('should apply the correct size', () => {
    render(<Flag {...baseProps} size="m" />);
    const image = screen.getByRole('img');
    expect(image.getAttribute('style')).toContain('var(--cui-icon-sizes-m)');
  });

  it('should use correct width when height is provided', () => {
    render(<Flag {...baseProps} height={15} />);
    const image = screen.getByRole('img');
    expect(image.getAttribute('width')).toBe('20px');
  });

  it('should use correct height when width is provided', () => {
    render(<Flag {...baseProps} width={20} />);
    const image = screen.getByRole('img');
    expect(image.getAttribute('height')).toBe('15px');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Flag {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
