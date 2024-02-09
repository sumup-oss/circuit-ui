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
import { ChangeEvent, createRef, useState } from 'react';

import { render, userEvent, axe } from '../../util/test-utils.js';
import type { InputElement } from '../Input/index.js';

import { PercentageInput, PercentageInputProps } from './PercentageInput.js';

const defaultProps = {
  locale: 'de-DE',
  label: 'Discount',
};

describe('PercentageInput', () => {
  it('should forward a ref', () => {
    const ref = createRef<InputElement>();
    const { getByRole } = render(
      <PercentageInput {...defaultProps} ref={ref} />,
    );
    const input = getByRole('textbox');
    expect(ref.current).toBe(input);
  });

  it('should format an en-GB amount', async () => {
    const { getByRole } = render(
      <PercentageInput {...defaultProps} locale="en-GB" />,
    );

    const input = getByRole('textbox') as HTMLInputElement;

    await userEvent.type(input, '1234');

    expect(input.value).toBe('1,234');
  });

  it('should format an de-DE amount', async () => {
    const { getByRole } = render(
      <PercentageInput {...defaultProps} locale="de-DE" />,
    );

    const input = getByRole('textbox') as HTMLInputElement;

    await userEvent.type(input, '1234');

    expect(input.value).toBe('1.234');
  });

  it('should format an amount with decimals', async () => {
    const { getByRole } = render(
      <PercentageInput {...defaultProps} decimalScale={2} />,
    );

    const input = getByRole('textbox') as HTMLInputElement;

    await userEvent.type(input, '1234,56');

    expect(input.value).toBe('1.234,56');
  });

  it('should format an amount in a controlled input with an initial numeric value', async () => {
    const ControlledPercentageInput = () => {
      const [value, setValue] = useState<PercentageInputProps['value']>(1234);
      return (
        <PercentageInput
          {...defaultProps}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
        />
      );
    };
    const { getByRole } = render(<ControlledPercentageInput />);

    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('1.234');

    await userEvent.clear(input);
    await userEvent.type(input, '1234');

    expect(input.value).toBe('1.234');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<PercentageInput {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  describe('Labeling', () => {
    const PERCENT_SYMBOL = '%';
    /**
     * Note: further labeling logic is covered by the underlying `Input` component.
     */
    it('should have the currency symbol as part of its accessible description', () => {
      const { getByRole } = render(<PercentageInput {...defaultProps} />);
      expect(getByRole('textbox')).toHaveAccessibleDescription(PERCENT_SYMBOL);
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      const { getByRole } = render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <PercentageInput
            {...defaultProps}
            aria-describedby={customDescriptionId}
          />
        </>,
      );
      expect(getByRole('textbox')).toHaveAccessibleDescription(
        `${PERCENT_SYMBOL} ${customDescription}`,
      );
    });
  });
});