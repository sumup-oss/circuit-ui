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
  useId,
  useMemo,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type ComponentType,
  type FieldsetHTMLAttributes,
  type ForwardedRef,
  type RefObject,
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

import {
  mapCountryCodeOptions,
  normalizePhoneNumber,
} from './PhoneNumberInputService.js';
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
   * Country code selector details.
   */
  countryCode: {
    /**
     * Visually hidden label for visually-impaired users.
     */
    label: string;
    /**
     * List of country calling codes to be rendered inside the selector
     */
    options: {
      /**
       * Country name in two letter ISO 3166 region code format(https://www.iso.org/iso-3166-country-codes.html)
       */
      country: string;
      /**
       * Country calling codes, see https://en.wikipedia.org/wiki/List_of_country_calling_codes
       */
      code: string;
    }[];
    /**
     * Triggers error styles on the component. Important for accessibility.
     */
    invalid?: boolean;
    /**
     * Initial country code.
     */
    defaultValue?: string;
    /**
     * Triggers readonly styles on the component.
     */
    readonly?: boolean;
    /**
     * Callback when the country code changes.
     */
    onChange?: SelectProps['onChange'];
    /**
     * The ref to the country code selector HTML DOM element.
     */
    ref?: ForwardedRef<HTMLSelectElement | InputElement>;
    /**
     * Render prop that should render a left-aligned overlay icon or element.
     * Receives a className prop.
     */
    renderPrefix?: ComponentType<{
      value?: string | number;
      className?: string;
    }>;
  };
  /**
   * Subscriber number input details.
   */
  subscriberNumber: {
    /**
     * Visually hidden label for visually-impaired users.
     */
    label: string;
    /**
     * Placeholder number for the input.
     */
    placeholder?: string;
    /**
     * Initial subscriber number.
     */
    defaultValue?: string;
    /**
     * Triggers error styles on the component. Important for accessibility.
     */
    invalid?: boolean;
    /**
     * Triggers readonly styles on the component.
     */
    readonly?: boolean;
    /**
     * Callback when the subscriber number changes.
     */
    onChange?: InputProps['onChange'];
    /**
     * The ref to the subscriber number input HTML DOM element.
     */
    ref?: ForwardedRef<InputElement>;
  };
}

/**
 * Provides a straightforward way for users to type their phone number in an
 * accurate, consistent format including the country code and subscriber number.
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
      readOnly,
      'aria-describedby': descriptionId,
      locale,
      ...props
    },
    ref,
  ) => {
    const countryCodeRef = useRef<HTMLSelectElement | InputElement>(null);
    const subscriberNumberRef = useRef<InputElement>(null);

    const validationHintId = useId();

    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

    const options = useMemo(
      () => mapCountryCodeOptions(countryCode.options, locale),
      [countryCode.options, locale],
    );

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

    const handlePaste = (event: ClipboardEvent) => {
      if (
        !countryCodeRef.current ||
        !subscriberNumberRef.current ||
        countryCodeRef.current.disabled ||
        (countryCodeRef.current as HTMLInputElement).readOnly
      ) {
        return;
      }

      const pastedText = event.clipboardData
        .getData('text/plain')
        .trim()
        // Normalize the country code prefix
        .replace(/^00/, '+');

      if (!pastedText) {
        return;
      }

      const hasCountryCode = pastedText.startsWith('+');

      if (!hasCountryCode) {
        return;
      }

      const pastedCountryCode = countryCode.options
        .map((option) => option.code)
        // Match longer, more specific country codes first
        .sort((a, b) => b.length - a.length)
        .find((code) => pastedText.startsWith(code));

      if (!pastedCountryCode) {
        return;
      }

      event.preventDefault();

      const pastedSubscriberNumber = pastedText.split(pastedCountryCode)[1];

      countryCodeRef.current.value = pastedCountryCode;

      // React overwrites the input.value setter. In order to be able to trigger
      // a 'change' event on the input, we need to use the native setter.
      // Adapted from https://stackoverflow.com/a/46012210/4620154
      Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value',
      )?.set?.call(subscriberNumberRef.current, pastedSubscriberNumber);

      countryCodeRef.current.dispatchEvent(
        new Event('change', { bubbles: true }),
      );
      subscriberNumberRef.current.dispatchEvent(
        new Event('change', { bubbles: true }),
      );
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
          {readOnly || countryCode.readonly ? (
            <Input
              hideLabel
              autoComplete="tel-country-code"
              disabled={disabled}
              className={classes['country-code']}
              inputClassName={classes['country-code-input']}
              {...countryCode}
              invalid={invalid || countryCode.invalid}
              readOnly={true}
              onChange={() => {}}
              ref={applyMultipleRefs(
                countryCodeRef as RefObject<InputElement>,
                countryCode.ref as ForwardedRef<InputElement>,
              )}
              renderPrefix={countryCode.renderPrefix}
            />
          ) : (
            <Select
              hideLabel
              autoComplete="tel-country-code"
              disabled={disabled}
              className={classes['country-code']}
              {...countryCode}
              invalid={invalid || countryCode.invalid}
              aria-readonly={true}
              options={options}
              onChange={eachFn<[ChangeEvent<HTMLSelectElement>]>([
                countryCode.onChange,
                handleChange,
              ])}
              ref={applyMultipleRefs(
                countryCodeRef as RefObject<HTMLSelectElement>,
                countryCode.ref as ForwardedRef<HTMLSelectElement>,
              )}
              renderPrefix={countryCode.renderPrefix}
            />
          )}
          <Input
            hideLabel
            autoComplete="tel-national"
            placeholder={subscriberNumber.placeholder}
            pattern="^(?:[0-9]\s?){0,14}[0-9]$"
            inputMode="tel"
            disabled={disabled}
            className={classes['subscriber-number']}
            inputClassName={classes['subscriber-number-input']}
            hasWarning={hasWarning}
            showValid={showValid}
            {...subscriberNumber}
            invalid={invalid || subscriberNumber.invalid}
            readOnly={readOnly || subscriberNumber.readonly}
            onChange={eachFn<[ChangeEvent<InputElement>]>([
              subscriberNumber.onChange,
              handleChange,
            ])}
            onPaste={handlePaste}
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
