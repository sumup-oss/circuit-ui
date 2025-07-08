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

import { describe, it, vi, expect } from 'vitest';
import { createRef } from 'react';

import { axe, render, screen, userEvent } from '../../util/test-utils.js';

import {
  PhoneNumberInput,
  type PhoneNumberInputProps,
} from './PhoneNumberInput.js';

const countryCodeMap: { [key: string]: string } = {
  CA: '+1',
  US: '+1',
  DE: '+49',
};

const defaultProps = {
  ref: createRef<HTMLInputElement>(),
  label: 'Phone number',
  countryCode: {
    label: 'Country code',
    defaultValue: 'CA',
    options: Object.keys(countryCodeMap).map((key) => ({
      country: key,
      code: countryCodeMap[key],
    })),
  },
  subscriberNumber: {
    label: 'Subscriber number',
  },
};

function getHiddenInput(container: HTMLElement) {
  return container.querySelectorAll('input')[0];
}

describe('PhoneNumberInput', () => {
  it('should merge a custom class name with the default ones', () => {
    const props = {
      ...defaultProps,
      className: 'foo',
    };
    render(<PhoneNumberInput {...props} />);
    const fieldset = screen.getByRole('group');
    expect(fieldset.className).toContain(props.className);
  });

  it('should forward a ref to the hidden input', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(
      <PhoneNumberInput {...defaultProps} ref={ref} />,
    );
    const input = getHiddenInput(container);
    expect(ref.current).toBe(input);
  });

  it('should forward a ref to the country code selector', () => {
    const ref = createRef<HTMLSelectElement>();
    const props = {
      ...defaultProps,
      countryCode: { ...defaultProps.countryCode, ref },
    };
    render(<PhoneNumberInput {...props} />);
    const select = screen.getByLabelText('Country code');
    expect(ref.current).toBe(select);
  });

  it('should forward a ref to the country code input', () => {
    const ref = createRef<HTMLSelectElement>();
    const props = {
      ...defaultProps,
      countryCode: { ...defaultProps.countryCode, ref },
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByLabelText('Country code');
    expect(ref.current).toBe(input);
  });

  it('should forward a ref to the subscriber number input', () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      ...defaultProps,
      subscriberNumber: { ...defaultProps.subscriberNumber, ref },
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByLabelText(/Subscriber number/);
    expect(ref.current).toBe(input);
  });

  describe('semantics', () => {
    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <PhoneNumberInput
            {...defaultProps}
            aria-describedby={customDescriptionId}
          />
        </>,
      );
      const countryCode = screen.getByLabelText('Country code');
      const subscriberNumber = screen.getByLabelText('Subscriber number');
      expect(countryCode).toHaveAccessibleDescription(customDescription);
      expect(subscriberNumber).toHaveAccessibleDescription(customDescription);
    });

    it('should render as disabled', async () => {
      render(<PhoneNumberInput {...defaultProps} disabled />);

      const countryCode = screen.getByLabelText('Country code');
      const subscriberNumber = screen.getByLabelText('Subscriber number');
      expect(countryCode).toBeDisabled();
      expect(subscriberNumber).toBeDisabled();
    });

    it('should render as read-only', async () => {
      render(<PhoneNumberInput {...defaultProps} readOnly />);
      const countryCode = screen.getByLabelText('Country code');
      const subscriberNumber = screen.getByLabelText('Subscriber number');
      expect(countryCode).toHaveAttribute('readonly');
      expect(subscriberNumber).toHaveAttribute('readonly');
    });

    it('should render as required', async () => {
      render(<PhoneNumberInput {...defaultProps} required />);
      const countryCode = screen.getByLabelText('Country code');
      const subscriberNumber = screen.getByLabelText('Subscriber number');
      expect(countryCode).toBeRequired();
      expect(subscriberNumber).toBeRequired();
    });
  });

  it('should display a default value', () => {
    const props = {
      ...defaultProps,
      defaultValue: '+4912345678',
    };
    const { container } = render(<PhoneNumberInput {...props} />);
    const input = getHiddenInput(container);
    const countryCode = screen.getByLabelText('Country code');
    const subscriberNumber = screen.getByLabelText(/Subscriber number/);
    expect(input).toHaveValue('+4912345678');
    expect(countryCode).toHaveValue('DE');
    expect(subscriberNumber).toHaveValue('12345678');
  });

  it('should display an initial value', () => {
    const props = {
      ...defaultProps,
      value: '+4912345678',
    };
    const { container } = render(<PhoneNumberInput {...props} />);
    const input = getHiddenInput(container);
    const countryCode = screen.getByLabelText('Country code');
    const subscriberNumber = screen.getByLabelText(/Subscriber number/);
    expect(input).toHaveValue('+4912345678');
    expect(countryCode).toHaveValue('DE');
    expect(subscriberNumber).toHaveValue('12345678');
  });

  it('should update the displayed value', () => {
    const { container, rerender } = render(
      <PhoneNumberInput {...defaultProps} value="+4912345678" />,
    );
    rerender(<PhoneNumberInput {...defaultProps} value="+112345678" />);
    const input = getHiddenInput(container);
    const countryCode = screen.getByLabelText('Country code');
    const subscriberNumber = screen.getByLabelText(/Subscriber number/);
    expect(input).toHaveValue('+112345678');
    expect(countryCode).toHaveValue('CA');
    expect(subscriberNumber).toHaveValue('12345678');
  });

  it('should call onChange when there is a change', async () => {
    const onChange = vi.fn();
    const props = {
      ...defaultProps,
      onChange,
    };
    render(<PhoneNumberInput {...props} />);
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'DE');
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('should call countryCode onChange when there is a change in the country code', async () => {
    const onChange = vi.fn();
    const props = {
      ...defaultProps,
      countryCode: {
        ...defaultProps.countryCode,
        onChange,
      },
    };
    render(<PhoneNumberInput {...props} />);
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'DE');
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('should call subscriberNumber onChange when there is a change in the subscriber number', async () => {
    const onChange = vi.fn();
    const props = {
      ...defaultProps,
      subscriberNumber: {
        ...defaultProps.subscriberNumber,
        onChange,
      },
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByLabelText(/Subscriber number/);
    await userEvent.type(input, '1');
    expect(onChange).toHaveBeenCalledOnce();
  });

  it.each(['+4912345678', '004912345678'])(
    'should set the country code and subscriber number when pasting a full phone number',
    async (phoneNumber) => {
      const props = {
        ...defaultProps,
        onChange: vi.fn(),
        subscriberNumber: {
          ...defaultProps.subscriberNumber,
          onChange: vi.fn(),
        },
        countryCode: {
          ...defaultProps.countryCode,
          onChange: vi.fn(),
        },
      };
      render(<PhoneNumberInput {...props} />);
      const input = screen.getByLabelText(/Subscriber number/);
      await userEvent.click(input);
      await userEvent.paste(phoneNumber);
      expect(props.ref.current).toHaveValue('+4912345678');
      expect(props.onChange).toHaveBeenCalledTimes(2);
      expect(props.countryCode.onChange).toHaveBeenCalledOnce();
      expect(props.subscriberNumber.onChange).toHaveBeenCalledOnce();
    },
  );

  it('should set only the subscriber number when pasting a phone number without country code', async () => {
    const props = {
      ...defaultProps,
      onChange: vi.fn(),
      subscriberNumber: {
        ...defaultProps.subscriberNumber,
        onChange: vi.fn(),
      },
      countryCode: {
        ...defaultProps.countryCode,
        onChange: vi.fn(),
      },
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByLabelText(/Subscriber number/);
    await userEvent.click(input);
    await userEvent.paste('012345678');
    expect(props.ref.current).toHaveValue('+112345678');
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.countryCode.onChange).not.toHaveBeenCalled();
    expect(props.subscriberNumber.onChange).toHaveBeenCalledOnce();
  });

  it('should flag the input field as valid when a valid phone number is entered', () => {
    const props = {
      ...defaultProps,
      subscriberNumber: {
        ...defaultProps.subscriberNumber,
        defaultValue: '123 456789',
      },
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByLabelText(/Subscriber number/);
    expect(input).toBeValid();
  });

  it('should flag the subscriber number field as invalid when the pattern is not matching', () => {
    const props = {
      ...defaultProps,
      subscriberNumber: {
        ...defaultProps.subscriberNumber,
        defaultValue: '1234567891011121314151617',
      },
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByLabelText(/Subscriber number/);
    expect(input).toBeInvalid();
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<PhoneNumberInput {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it('should set aria-describedby when there is an error message', () => {
    const props = {
      ...defaultProps,
      validationHint: 'This is an error message',
    };
    render(<PhoneNumberInput {...props} />);
    const fieldset = screen.getByRole('group');
    expect(fieldset).toHaveAttribute('aria-describedby');
  });

  it('should throw accessibility error when the field is not sufficiently labelled', () => {
    const props = {
      ...defaultProps,
      label: undefined,
    } as unknown as PhoneNumberInputProps;
    // Silence the console.error output and switch to development mode to throw the error
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    process.env.NODE_ENV = 'development';
    expect(() => render(<PhoneNumberInput {...props} />)).toThrow();
    process.env.NODE_ENV = 'test';
    vi.restoreAllMocks();
  });

  it('should throw accessibility error when the countryCode label is not sufficiently labelled', () => {
    const props = {
      ...defaultProps,
      countryCode: {
        ...defaultProps.countryCode,
        label: undefined,
      },
    } as unknown as PhoneNumberInputProps;
    // Silence the console.error output and switch to development mode to throw the error
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    process.env.NODE_ENV = 'development';
    expect(() => render(<PhoneNumberInput {...props} />)).toThrow();
    process.env.NODE_ENV = 'test';
    vi.restoreAllMocks();
  });

  it('should throw accessibility error when the subscriberNumber label is not sufficiently labelled', () => {
    const props = {
      ...defaultProps,
      subscriberNumber: {
        ...defaultProps.subscriberNumber,
        label: undefined,
      },
    } as unknown as PhoneNumberInputProps;
    // Silence the console.error output and switch to development mode to throw the error
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    process.env.NODE_ENV = 'development';
    expect(() => render(<PhoneNumberInput {...props} />)).toThrow();
    process.env.NODE_ENV = 'test';
    vi.restoreAllMocks();
  });
});
