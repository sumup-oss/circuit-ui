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

import {
  CARD_SCHEMES,
  CardScheme,
  type CardSchemeProps,
} from './CardScheme.js';

describe('CardScheme', () => {
  const baseProps: CardSchemeProps = { name: 'visa', alt: 'Visa' };

  it('exports the list of supported card schemes', () => {
    expect(CARD_SCHEMES).toContain('visa');
  });

  it('renders', () => {
    const { container } = render(<CardScheme {...baseProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the icon for the given card scheme', () => {
    render(<CardScheme {...baseProps} />);
    const image = screen.getByAltText('Visa');
    expect(image.getAttribute('src')).toContain('visa_32');
  });

  it('should merge a custom class name', () => {
    const className = 'foo';
    render(<CardScheme {...baseProps} className={className} />);
    const image = screen.getByAltText(baseProps.alt);
    expect(image?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLImageElement>();
    render(<CardScheme {...baseProps} ref={ref} />);
    const image = screen.getByAltText(baseProps.alt);
    expect(ref.current).toBe(image);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<CardScheme {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
