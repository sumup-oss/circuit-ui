/**
 * Copyright 2019, SumUp Ltd.
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

import { FC, ReactNode, Ref, SelectHTMLAttributes, forwardRef } from 'react';
import { css } from '@emotion/react';
import { ChevronDown, ChevronUp } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import { uniqueId } from '../../util/id';
import styled, { StyleProps } from '../../styles/styled';
import {
  typography,
  hideVisually,
  inputOutline,
} from '../../styles/style-mixins';
import { ReturnType } from '../../types/return-type';
import { useClickEvent, TrackingProps } from '../../hooks/useClickEvent';
import Label from '../Label';
import ValidationHint from '../ValidationHint';

export type SelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
  [key: string]: unknown;
};

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode;
  /**
   * A clear and concise description of the select purpose.
   */
  label: ReactNode;
  /**
   * Name of the select form element.
   */
  name?: string;
  /**
   * Options to select from. Can also be provided with the children prop.
   */
  options?: SelectOption[];
  /**
   * Styles the select as disabled.
   */
  disabled?: boolean;
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid?: boolean;
  /**
   * Currently selected value. Matches the "value" property of
   * the options objects. If value is falsy, Select will render
   * the "placeholder" prop as currently selected.
   */
  value?: string | number;
  /**
   * String to show when no selection is made.
   */
  placeholder?: string;
  /**
   * Trigger inline styles on the component.
   */
  inline?: boolean;
  /**
   * We're moving away from built-in margins. The `noMargin` prop is now
   * required and will be removed in v6 using codemods. Use the `spacing()`
   * mixin to add margin.
   */
  noMargin: true;
  /**
   * Render prop that should render a left-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderPrefix?: FC<{ value?: string | number; className?: string }>;
  /**
   * Warning or error message, displayed below the select.
   */
  validationHint?: string;
  /**
   * Label to indicate that the select is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * Visually hide the label. This should only be used in rare cases and only if the
   * purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * A unique identifier for the input field. If not defined, a randomly generated id is used.
   */
  id?: string;
  /**
   * The ref to the HTML DOM element
   */
  ref?: Ref<HTMLSelectElement>;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

const containerBaseStyles = ({ theme }: StyleProps) => css`
  color: ${theme.colors.n900};
  display: block;
  position: relative;
`;

type ContainerElProps = Pick<SelectProps, 'hideLabel'>;

const containerHideLabelStyles = ({
  theme,
  hideLabel,
}: StyleProps & ContainerElProps) =>
  !hideLabel &&
  css`
    label &,
    label + & {
      margin-top: ${theme.spacings.bit};
    }
  `;

const SelectContainer = styled('div')<ContainerElProps>(
  containerBaseStyles,
  containerHideLabelStyles,
);

type LabelElProps = Pick<SelectProps, 'noMargin' | 'inline'>;

const labelMarginStyles = ({ theme, noMargin }: StyleProps & LabelElProps) => {
  if (!noMargin) {
    if (
      process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      throw new Error(
        'The Select component requires the `noMargin` prop to be passed. Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
      );
    }

    return css`
      margin-bottom: ${theme.spacings.mega};
    `;
  }
  return null;
};

const labelInlineStyles = ({ inline }: LabelElProps) =>
  inline &&
  css`
    display: inline-block;
  `;

const SelectLabel = styled(Label)<LabelElProps>(
  labelMarginStyles,
  labelInlineStyles,
);

type SelectElProps = Omit<SelectProps, 'options' | 'label' | 'noMargin'> & {
  hasPrefix: boolean;
};

const selectBaseStyles = ({ theme }: StyleProps) => css`
  appearance: none;
  cursor: pointer;
  background-color: ${theme.colors.white};
  outline: none;
  border: 0;
  border-radius: ${theme.borderRadius.byte};
  box-shadow: none;
  color: ${theme.colors.n900};
  margin: 0;
  padding-top: ${theme.spacings.kilo};
  padding-right: ${theme.spacings.exa};
  padding-bottom: ${theme.spacings.kilo};
  padding-left: ${theme.spacings.mega};
  position: relative;
  width: 100%;
  z-index: ${theme.zIndex.input};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: box-shadow ${theme.transitions.default},
    padding ${theme.transitions.default};

  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  &::-ms-expand {
    display: none;
  }
`;

const selectInvalidStyles = ({
  theme,
  invalid,
  disabled,
}: StyleProps & SelectElProps) =>
  invalid &&
  !disabled &&
  css`
    padding-right: ${theme.spacings.zetta};
  `;

const selectPrefixStyles = ({ theme, hasPrefix }: StyleProps & SelectElProps) =>
  hasPrefix &&
  css`
    padding-left: ${theme.spacings.exa};
  `;

const SelectElement = styled.select<SelectElProps>(
  typography('one'),
  selectBaseStyles,
  selectInvalidStyles,
  selectPrefixStyles,
  inputOutline,
);

const labelTextStyles = ({ hideLabel }: { hideLabel?: boolean }) =>
  hideLabel && hideVisually();

const LabelText = styled('span')(labelTextStyles);

const optionalLabelStyles = ({ theme }: StyleProps) => css`
  color: ${theme.colors.n700};
`;

const OptionalLabel = styled('span')(optionalLabelStyles);

/**
 * Used with css prop directly, so it does not require prop
 * destructuring.
 */
const prefixStyles = (theme: Theme) => css`
  display: block;
  position: absolute;
  z-index: ${theme.zIndex.input + 1};
  height: ${theme.spacings.exa};
  width: ${theme.spacings.exa};
  padding: ${theme.spacings.mega};
  pointer-events: none;
`;

const iconBaseStyles = ({ theme }: StyleProps) => css`
  color: ${theme.colors.n700};
  display: block;
  z-index: ${theme.zIndex.input + 1};
  pointer-events: none;
  position: absolute;
  height: ${theme.spacings.exa};
  width: ${theme.spacings.exa};
  top: 0;
  right: 0;
  padding: ${theme.spacings.mega};
`;

const iconActiveStyles = () => css`
  select:active ~ & {
    display: none;
  }
`;

const iconInactiveStyles = () => css`
  select:not(:active) ~ & {
    display: none;
  }
`;

const IconActive = styled(ChevronDown)(iconBaseStyles, iconActiveStyles);
const IconInactive = styled(ChevronUp)(iconBaseStyles, iconInactiveStyles);

/**
 * A native select component.
 */
export const Select = forwardRef(
  (
    {
      value,
      defaultValue,
      placeholder,
      disabled,
      noMargin,
      inline,
      invalid,
      required,
      options,
      children,
      renderPrefix: RenderPrefix,
      validationHint,
      optionalLabel,
      label,
      hideLabel,
      className,
      style,
      id: customId,
      onChange,
      tracking,
      ...props
    }: SelectProps,
    ref?: SelectProps['ref'],
  ): ReturnType => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new Error(
        'The Select component is missing a `label` prop. This is an accessibility requirement. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }
    const id = customId || uniqueId('select_');

    const prefix = RenderPrefix && (
      <RenderPrefix css={prefixStyles} value={value} />
    );
    const hasPrefix = Boolean(prefix);

    const handleChange = useClickEvent(onChange, tracking, 'select');

    return (
      <SelectLabel
        className={className}
        style={style}
        htmlFor={id}
        inline={inline}
        disabled={disabled}
        noMargin={noMargin}
      >
        <LabelText hideLabel={hideLabel}>
          {label}
          {optionalLabel && !required ? (
            <OptionalLabel>{` (${optionalLabel})`}</OptionalLabel>
          ) : null}
        </LabelText>

        <SelectContainer hideLabel={hideLabel}>
          {prefix}
          <SelectElement
            id={id}
            value={value}
            ref={ref}
            invalid={invalid}
            aria-invalid={invalid}
            required={required}
            disabled={disabled}
            hasPrefix={hasPrefix}
            defaultValue={defaultValue}
            {...props}
            onChange={handleChange}
          >
            {!value && !defaultValue && (
              /**
               * We need a key here just like when mapping over options.
               * We're prefixing the key with an underscore to avoid clashes
               * with option values.
               */
              <option key="_placeholder" value="">
                {placeholder}
              </option>
            )}
            {children ||
              (options &&
                options.map(({ label: optionLabel, ...rest }) => (
                  <option key={rest.value} {...rest}>
                    {optionLabel}
                  </option>
                )))}
          </SelectElement>
          <IconActive size="16" />
          <IconInactive size="16" />
        </SelectContainer>

        <ValidationHint
          disabled={disabled}
          invalid={invalid}
          validationHint={validationHint}
        />
      </SelectLabel>
    );
  },
);

Select.displayName = 'Select';
