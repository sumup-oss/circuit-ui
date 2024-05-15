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
import type { InputElement } from '../Input/Input.js';

import {
  PhoneNumberInput,
  type PhoneNumberInputProps,
} from './PhoneNumberInput.js';

const countryCodeMap: { [key: string]: string } = {
  '+1': 'US',
  '+49': 'DE',
};

const defaultProps = {
  label: 'Phone number',
  countryCode: {
    label: 'Country code',
    defaultValue: '+1',
    options: Object.keys(countryCodeMap).map((key) => ({
      country: countryCodeMap[key],
      code: key,
    })),
  },
  subscriberNumber: {
    label: 'Subscriber number',
  },
};

describe('PhoneNumberInput', () => {
  it('Should forward a ref to the country code selector', () => {
    const ref = createRef<HTMLSelectElement>();
    const props = {
      ...defaultProps,
      countryCode: { ...defaultProps.countryCode, ref },
    };
    const { container } = render(<PhoneNumberInput {...props} />);
    const select = container.querySelector('select');
    expect(ref.current).toBe(select);
  });

  it('Should forward a ref to the subscriber number input', () => {
    const ref = createRef<InputElement>();
    const props = {
      ...defaultProps,
      subscriberNumber: { ...defaultProps.subscriberNumber, ref },
    };
    const { container } = render(<PhoneNumberInput {...props} />);
    const input = container.querySelector('input');
    expect(ref.current).toBe(input);
  });

  it('Should call onChange when there is a change', async () => {
    const onChange = vi.fn();
    const props = {
      ...defaultProps,
      onChange,
    };
    render(<PhoneNumberInput {...props} />);
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '+49');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should call countryCode onChange when there is a change in the country code', async () => {
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
    await userEvent.selectOptions(select, '+49');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should call subscriberNumber onChange when there is a change in the subscriber number', async () => {
    const onChange = vi.fn();
    const props = {
      ...defaultProps,
      subscriberNumber: {
        ...defaultProps.subscriberNumber,
        onChange,
      },
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '1');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should flag the input field as valid when a valid phone number is entered', () => {
    const props = {
      ...defaultProps,
      subscriberNumber: {
        ...defaultProps.subscriberNumber,
        value: '123 456789',
      },
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeValid();
  });

  it('Should flag the input field as invalid when the pattern is not matching', () => {
    const props = {
      ...defaultProps,
      subscriberNumber: {
        ...defaultProps.subscriberNumber,
        value: '1234567891011121314151617',
      },
    };
    render(<PhoneNumberInput {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInvalid();
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<PhoneNumberInput {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it('Should set aria-describedby when there is an error message', () => {
    const props = {
      ...defaultProps,
      errorMessage: 'This is an error message',
    };
    render(<PhoneNumberInput {...props} />);
    const fieldset = screen.getByRole('group');
    expect(fieldset).toHaveAttribute('aria-describedby');
  });

  it('Should throw accessibility error when the label is not sufficiently labelled and the hideLabel prop is not set', () => {
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

  it('Should throw accessibility error when the countryCode label is not sufficiently labelled', () => {
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

  it('Should throw accessibility error when the subscriberNumber label is not sufficiently labelled', () => {
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
