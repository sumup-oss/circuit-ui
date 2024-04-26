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

'use client';

import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  type ChangeEvent,
  type FieldsetHTMLAttributes,
  type ForwardedRef,
} from 'react';

import Select, { type SelectProps } from '../Select/index.js';
import Input, { type InputElement, type InputProps } from '../Input/index.js';
import {
  FieldLabelText,
  FieldLegend,
  FieldSet,
  FieldValidationHint,
} from '../Field/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { eachFn } from '../../util/helpers.js';

import { normalizePhoneNumber } from './PhoneNumberInputService.js';
import classes from './PhoneNumberInput.module.css';

export interface PhoneNumberInputProps
  extends Omit<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    'onChange' | 'onBlur'
  > {
  /**
   * A clear and concise description of the input purpose.
   */
  label: string;
  /**
   * Callback when the country code or subscriber number changes. Called with
   * the normalized phone number in the [E.164 format](https://en.wikipedia.org/wiki/E.164),
   * e.g. `+17024181234`.
   */
  onChange?: (phoneNumber: string) => void;
  /**
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid?: boolean;
  /**
   * Triggers warning styles on the component.
   */
  hasWarning?: boolean;
  /**
   * Enables valid styles on the component.
   */
  showValid?: boolean;
  /**
   * Triggers readonly styles on the component.
   */
  readOnly?: boolean;
  /**
   * Makes the input group required.
   */
  required?: boolean;
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * An information, warning or error message, displayed below the input.
   */
  validationHint?: string;
  /**
   * One or more Unicode BCP 47 locale identifiers, e.g. `de-DE` or
   * `['GB', 'en-US']`. Used to localize the country names and determine the
   * preselected country code. Defaults to `navigator.languages`.
   */
  locale?: string | string[];
  /**
   * TODO: Write a description
   */
  countryCode: {
    /**
     * Visually hidden label for visually-impaired users.
     */
    label: string;
    /**
     * TODO: Write a description. See https://en.wikipedia.org/wiki/List_of_country_calling_codes
     */
    options: {
      /**
       * TODO: Write a description
       */
      country: string;
      /**
       * TODO: Write a description
       */
      code: string;
    }[];
    /**
     * Initial country code.
     */
    defaultValue?: string;
    /**
     * TODO: Write a description.
     * TODO: The HTML `select` element doesn't support the `readonly` attribute, so this will need to be implemented using CSS and the `aria-readonly` and/or `disabled` attributes. The element must remain perceivable by screen reader users.
     */
    readonly?: boolean;
    onChange?: SelectProps['onChange'];
    ref?: ForwardedRef<HTMLSelectElement>;
  };
  /**
   * TODO: Write a description
   */
  subscriberNumber: {
    /**
     * Visually hidden label for visually-impaired users.
     */
    label: string;
    /**
     * Initial subscriber number.
     */
    defaultValue?: string;
    onChange?: InputProps['onChange'];
    ref?: ForwardedRef<InputElement>;
  };
}

/**
 * TODO: Write a description
 */
export const PhoneNumberInput = forwardRef<
  HTMLFieldSetElement,
  PhoneNumberInputProps
>(
  (
    {
      label,
      hideLabel,
      countryCode,
      subscriberNumber,
      optionalLabel,
      required,
      invalid,
      hasWarning,
      showValid,
      disabled,
      validationHint,
      onChange,
      'aria-describedby': descriptionId,
      locale,
      ...props
    },
    ref,
  ) => {
    const countryCodeRef = useRef<HTMLSelectElement>(null);
    const subscriberNumberRef = useRef<InputElement>(null);

    const validationHintId = useId();

    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

    const formatCountryName = useCallback(
      (country: string) =>
        // TODO: Check whether Intl.DisplayNames is supported and add fallback logic
        new Intl.DisplayNames(locale, { type: 'region' }).of(country),
      [locale],
    );

    const options = countryCode.options.map(({ code, country }) => {
      const countryName = formatCountryName(country);
      return {
        label: countryName ? `${countryName} (${code})` : code,
        value: code,
      };
    });

    const handleChange = () => {
      if (
        !onChange ||
        !countryCodeRef.current ||
        !subscriberNumberRef.current
      ) {
        return;
      }
      const phoneNumber = normalizePhoneNumber(
        countryCodeRef.current.value,
        subscriberNumberRef.current.value,
      );
      onChange(phoneNumber);
    };

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      if (!isSufficientlyLabelled(label)) {
        throw new AccessibilityError(
          'PhoneNumberInput',
          'The `label` prop is missing or invalid. Pass `hideLabel` if you intend to hide the label visually.',
        );
      }

      if (!isSufficientlyLabelled(countryCode.label)) {
        throw new AccessibilityError(
          'PhoneNumberInput',
          'The `countryCodeLabel` prop is missing or invalid.',
        );
      }

      if (!isSufficientlyLabelled(subscriberNumber.label)) {
        throw new AccessibilityError(
          'PhoneNumberInput',
          'The `subscriberNumberLabel` prop is missing or invalid.',
        );
      }
    }

    return (
      <FieldSet
        aria-describedby={descriptionIds}
        aria-invalid={invalid && 'true'}
        aria-required={required && 'true'}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <FieldLegend>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </FieldLegend>
        <div className={classes.wrapper}>
          <Select
            hideLabel
            autoComplete="tel-country-code"
            invalid={invalid}
            disabled={disabled}
            className={classes['country-code']}
            {...countryCode}
            options={options}
            onChange={eachFn<[ChangeEvent<HTMLSelectElement>]>([
              countryCode.onChange,
              handleChange,
            ])}
            ref={applyMultipleRefs(countryCodeRef, countryCode.ref)}
          />
          <Input
            hideLabel
            autoComplete="tel-national"
            placeholder="123 456789"
            pattern="[0-9]+[0-9 ]+"
            inputMode="tel"
            invalid={invalid}
            disabled={disabled}
            inputClassName={classes['subscriber-number']}
            {...subscriberNumber}
            onChange={eachFn<[ChangeEvent<InputElement>]>([
              subscriberNumber.onChange,
              handleChange,
            ])}
            ref={applyMultipleRefs(subscriberNumberRef, subscriberNumber.ref)}
          />
        </div>
        <FieldValidationHint
          id={validationHintId}
          disabled={disabled}
          invalid={invalid}
          hasWarning={hasWarning}
          showValid={showValid}
          validationHint={validationHint}
        />
      </FieldSet>
    );
  },
);

PhoneNumberInput.displayName = 'PhoneNumberInput';
