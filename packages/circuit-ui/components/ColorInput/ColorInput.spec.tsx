/**
 * Copyright 2024, SumUp Ltd.
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

import { render, axe, screen } from '../../util/test-utils.js';
import type { InputElement } from '../Input/index.js';

import { ColorInput } from './ColorInput.js';

describe('ColorInput', () => {
  const baseProps = { label: 'Car color', pickerLabel: 'Pick car color' };

  it('should forward a ref', () => {
    const ref = createRef<InputElement>();
    const { container } = render(<ColorInput {...baseProps} ref={ref} />);
    const input = container.querySelector("input[type='color']");
    expect(ref.current).toBe(input);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ColorInput {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  describe('Labeling', () => {
    const HEX_SYMBOL = '#';

    it('should have the currency symbol as part of its accessible description', () => {
      render(<ColorInput {...baseProps} />);
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
        HEX_SYMBOL,
      );
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <ColorInput {...baseProps} aria-describedby={customDescriptionId} />
        </>,
      );
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
        `${HEX_SYMBOL} ${customDescription}`,
      );
    });
  });
});
