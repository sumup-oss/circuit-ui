/**
 * Copyright 2025, SumUp Ltd.
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

import { axe, render, screen } from '../../util/test-utils.js';

import { Flag, type FlagProps } from './Flag.js';

describe('Flag', () => {
  const baseProps: FlagProps = { countryCode: 'FR', alt: 'France' };

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

  it('should render with size 16', () => {
    render(<Flag {...baseProps} size="16" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render with size 24', () => {
    render(<Flag {...baseProps} size="24" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render with size 32', () => {
    render(<Flag {...baseProps} size="32" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Flag {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
