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

import { PaymentMethod, type PaymentMethodProps } from './PaymentMethod.js';

describe('PaymentMethod', () => {
  const baseProps: PaymentMethodProps = { name: 'visa', alt: 'Visa' };

  it('renders', () => {
    const { container } = render(<PaymentMethod {...baseProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the icon for the given payment method', () => {
    render(<PaymentMethod {...baseProps} />);
    const image = screen.getByAltText('Visa');
    expect(image.getAttribute('src')).toContain('visa_24');
  });

  it('should merge a custom class name', () => {
    const className = 'foo';
    render(<PaymentMethod {...baseProps} className={className} />);
    const image = screen.getByAltText(baseProps.alt);
    expect(image?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLImageElement>();
    render(<PaymentMethod {...baseProps} ref={ref} />);
    const image = screen.getByAltText(baseProps.alt);
    expect(ref.current).toBe(image);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<PaymentMethod {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
