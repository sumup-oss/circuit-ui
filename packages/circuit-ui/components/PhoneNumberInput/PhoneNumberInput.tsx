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
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type ComponentType,
  type InputHTMLAttributes,
  type ForwardedRef,
  type ReactNode,
  type RefObject,
} from 'react';
import { Flag, type FlagProps } from '@sumup-oss/icons';

import { Select } from '../Select/index.js';
import { Input, type InputProps } from '../Input/index.js';
import {
  FieldLabelText,
  FieldLegend,
  FieldSet,
  FieldValidationHint,
  type FieldSize,
} from '../Field/index.js';
import { clsx } from '../../styles/clsx.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { eachFn } from '../../util/helpers.js';
import { changeInputValue } from '../../util/input-value.js';
import { idx } from '../../util/idx.js';

import {
  getCountryCode,
  getCountryCodeFieldWidth,
  mapCountryCodeOptions,
  normalizePhoneNumber,
  parsePhoneNumber,
  type CountryCodeOption,
  getCountry,
} from './PhoneNumberInputService.js';
import { CountryCodeDropdown } from './CountryCodeDropdown.js';
import classes from './PhoneNumberInput.module.css';

export interface PhoneNumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The normalized phone number in the [E.164 format](https://en.wikipedia.org/wiki/E.164).
   *
   * @example '+17024181234'
   */
  value?: string;
  /**
   * The default normalized phone number in the [E.164 format](https://en.wikipedia.org/wiki/E.164).
   *
   * @example '+17024181234'
   */
  defaultValue?: string;
  /**
   * A clear and concise description of the input purpose.
   */
  label: string;
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
   * When `true`, displays the localised country name in the country code selector using
   * `Intl.DisplayNames`. When `false`, displays the calling codes from
   * `countryCode.options` without localization.
   *
   * @default true
   */
  shouldDisplayCountryNames?: boolean;
  /**
   * Choose from 2 sizes.
   * @default m
   */
  size?: FieldSize;
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
    options: CountryCodeOption[];
    /**
     * When provided, replaces the native country code select with a custom
     * dropdown that renders each option via this render prop.
     */
    renderOption?: (
      option: CountryCodeOption,
      meta: { selected: boolean },
    ) => ReactNode;
    /**
     * Optional SSR-stable label override per option. Used by both the native
     * select and the custom dropdown for accessible option text.
     */
    getOptionLabel?: (option: CountryCodeOption) => string;
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
    onChange?: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    /**
     * The ref to the country code selector HTML DOM element.
     */
    ref?: ForwardedRef<HTMLSelectElement | HTMLInputElement>;
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
    ref?: ForwardedRef<HTMLInputElement>;
  };
}

const DefaultPrefix: ComponentType<{
  value?: string | number;
  className?: string;
}> = ({ value, ...rest }) =>
  value ? (
    <Flag countryCode={value as FlagProps['countryCode']} alt="" {...rest} />
  ) : null;

/**
 * Provides a straightforward way for users to type their phone number in an
 * accurate, consistent format including the country code and subscriber number.
 */
export const PhoneNumberInput = forwardRef<
  HTMLInputElement,
  PhoneNumberInputProps
>(
  (
    {
      label,
      hideLabel,
      value,
      defaultValue,
      countryCode,
      subscriberNumber,
      optionalLabel,
      required,
      invalid,
      hasWarning,
      showValid,
      disabled,
      validationHint,
      readOnly,
      'aria-describedby': descriptionId,
      locale,
      shouldDisplayCountryNames = true,
      size = 'm',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const countryCodeRef = useRef<HTMLSelectElement | HTMLInputElement>(null);
    const subscriberNumberRef = useRef<HTMLInputElement>(null);
    const {
      renderOption,
      getOptionLabel,
      options: countryCodeOptions,
      ...countryCodeFieldProps
    } = countryCode;

    // This state is used to trigger a re-render when selecting a different
    // country with the same country code as the current one (e.g. Canada → USA).
    // When the country codes match, the `value` prop doesn't change
    // (which would normally cause a re-render).
    const [, setVersion] = useState(1);

    const validationHintId = useId();

    const descriptionIds = idx(
      descriptionId,
      validationHint && validationHintId,
    );

    const options = useMemo(
      () =>
        mapCountryCodeOptions(
          countryCodeOptions,
          locale,
          shouldDisplayCountryNames,
          getOptionLabel,
        ),
      [
        countryCodeOptions,
        locale,
        shouldDisplayCountryNames,
        getOptionLabel,
      ],
    );

    const countryCodeFieldWidth = useMemo(
      () =>
        renderOption
          ? getCountryCodeFieldWidth(
              options,
              size,
              Boolean(countryCode.renderPrefix ?? true),
            )
          : undefined,
      [options, size, countryCode.renderPrefix, renderOption],
    );

    const handleChange = () => {
      if (!countryCodeRef.current || !subscriberNumberRef.current) {
        return;
      }

      const selectedCountry = countryCodeRef?.current?.value;
      if (!selectedCountry) {
        return;
      }
      const code = countryCodeOptions.find(
        ({ country }) => country === selectedCountry,
      )?.code;

      if (!code) {
        return;
      }
      const phoneNumber = normalizePhoneNumber(
        code,
        subscriberNumberRef.current.value,
      );

      changeInputValue(hiddenInputRef.current, phoneNumber);
      setVersion((prev) => prev + 1);
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

      event.preventDefault();

      const pastedPhoneNumber = parsePhoneNumber(
        event.clipboardData.getData('text/plain'),
        countryCodeOptions,
        countryCodeRef.current.value,
      );

      if (pastedPhoneNumber.countryCode) {
        changeInputValue(countryCodeRef.current, pastedPhoneNumber.countryCode);
      }
      if (pastedPhoneNumber.subscriberNumber) {
        changeInputValue(
          subscriberNumberRef.current,
          pastedPhoneNumber.subscriberNumber,
        );
      }
    };

    const parsedValue = parsePhoneNumber(
      value,
      countryCodeOptions,
      countryCodeRef.current?.value,
    );
    const parsedDefaultValue = parsePhoneNumber(
      defaultValue,
      countryCodeOptions,
    );

    const selectedCountryCode =
      parsedValue.countryCode ??
      countryCodeRef.current?.value ??
      parsedDefaultValue.countryCode ??
      countryCode.defaultValue;

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
          'The `countryCode.label` prop is missing or invalid.',
        );
      }

      if (!isSufficientlyLabelled(subscriberNumber.label)) {
        throw new AccessibilityError(
          'PhoneNumberInput',
          'The `subscriberNumber.label` prop is missing or invalid.',
        );
      }
    }

    return (
      <FieldSet
        aria-describedby={descriptionIds}
        aria-invalid={invalid && 'true'}
        aria-required={required && 'true'}
        disabled={disabled}
        size={size}
        className={className}
        style={style}
      >
        <FieldLegend>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
        </FieldLegend>
        <div className={clsx(classes.wrapper, classes[size])}>
          <input
            type="text"
            ref={applyMultipleRefs(ref, hiddenInputRef)}
            className={classes.hidden}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={invalid}
            aria-hidden="true"
            tabIndex={-1}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
          {readOnly || countryCode.readonly ? (
            <Input
              hideLabel
              aria-describedby={descriptionIds}
              autoComplete="tel-country-code"
              required={required}
              disabled={disabled}
              size={size}
              className={classes['country-code']}
              inputClassName={classes['country-code-input']}
              {...countryCodeFieldProps}
              value={getCountryCode(
                countryCodeOptions,
                parsedValue.countryCode,
              )}
              defaultValue={getCountryCode(
                countryCodeOptions,
                parsedDefaultValue.countryCode ?? countryCode.defaultValue,
              )}
              invalid={invalid || countryCode.invalid}
              readOnly={true}
              onChange={() => {}}
              ref={applyMultipleRefs(
                countryCodeRef as RefObject<HTMLInputElement>,
                countryCode.ref as ForwardedRef<HTMLInputElement>,
              )}
              renderPrefix={
                (countryCode.renderPrefix as InputProps['renderPrefix']) ??
                (({ value: inputValue, ...rest }) => (
                  <DefaultPrefix
                    value={getCountry(
                      countryCodeOptions,
                      inputValue as string,
                    )}
                    {...rest}
                  />
                ))
              }
            />
          ) : renderOption ? (
            <CountryCodeDropdown
              hideLabel
              aria-describedby={descriptionIds}
              required={required}
              disabled={disabled}
              size={size}
              className={classes['country-code']}
              style={
                countryCodeFieldWidth
                  ? { width: countryCodeFieldWidth }
                  : undefined
              }
              label={countryCode.label}
              options={countryCodeOptions}
              mappedOptions={options}
              value={selectedCountryCode}
              invalid={invalid || countryCode.invalid}
              renderOption={renderOption}
              renderPrefix={countryCode.renderPrefix ?? DefaultPrefix}
              onChange={eachFn<[ChangeEvent<HTMLInputElement>]>([
                countryCode.onChange,
                handleChange,
              ])}
              ref={applyMultipleRefs(
                countryCodeRef as RefObject<HTMLInputElement>,
                countryCode.ref as ForwardedRef<HTMLInputElement>,
              )}
            />
          ) : (
            <Select
              hideLabel
              aria-describedby={descriptionIds}
              autoComplete="tel-country-code"
              required={required}
              disabled={disabled}
              size={size}
              className={classes['country-code']}
              {...countryCodeFieldProps}
              value={parsedValue.countryCode}
              defaultValue={
                parsedDefaultValue.countryCode ?? countryCode.defaultValue
              }
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
              renderPrefix={countryCode.renderPrefix ?? DefaultPrefix}
            />
          )}
          <Input
            hideLabel
            aria-describedby={descriptionIds}
            autoComplete="tel-national"
            placeholder={subscriberNumber.placeholder}
            pattern="^(?:[0-9]\s?){0,14}[0-9]$"
            inputMode="tel"
            required={required}
            disabled={disabled}
            size={size}
            className={classes['subscriber-number']}
            inputClassName={classes['subscriber-number-input']}
            hasWarning={hasWarning}
            showValid={showValid}
            {...subscriberNumber}
            value={parsedValue.subscriberNumber}
            defaultValue={
              parsedDefaultValue.subscriberNumber ??
              subscriberNumber.defaultValue
            }
            invalid={invalid || subscriberNumber.invalid}
            readOnly={readOnly || subscriberNumber.readonly}
            onChange={eachFn<[ChangeEvent<HTMLInputElement>]>([
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
