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

/** @jsx jsx */
import React, { FC, ReactNode, Ref, HTMLProps, ChangeEvent } from 'react';
import { css, jsx } from '@emotion/core';
import { ChevronDown, ChevronUp } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';
import { Dispatch as TrackingProps } from '@sumup/collector';

import { uniqueId } from '../../util/id';
import deprecate from '../../util/deprecate';
import styled, { NoTheme, StyleProps } from '../../styles/styled';
import {
  textMega,
  hideVisually,
  inputOutline,
} from '../../styles/style-helpers';
import { ReturnType } from '../../types/return-type';
import useClickHandler from '../../hooks/use-click-handler';
import Label from '../Label';
import ValidationHint from '../ValidationHint';

type Option = {
  value: string | number;
  label: string;
  disabled?: boolean;
  [key: string]: any;
};

export interface SelectProps
  extends Omit<HTMLProps<HTMLSelectElement>, 'label'> {
  children?: ReactNode;
  /**
   * A clear and concise description of the select purpose.
   * Will become required in the next major version of Circuit UI.
   */
  label?: ReactNode;
  /**
   * onChange handler, called when the selection changes.
   */
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  /**
   * Name of the select form element.
   */
  name?: string;
  /**
   * Options to select from. Can also be provided with the children prop.
   */
  options?: Option[];
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
   * Removes the default bottom margin from the select.
   */
  noMargin?: boolean;
  /**
   * Render prop that should render a left-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderPrefix?: FC<{ value?: string | number; className?: string }>;
  /**
   * Warning or error message, displayed in a tooltip.
   */
  validationHint?: string;
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
   * The ref to the html dom element
   */
  ref?: Ref<HTMLSelectElement>;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

const containerBaseStyles = ({ theme }: StyleProps) => css`
  label: select__container;
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
    label: select__container--hide-label;

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

const labelMarginStyles = ({ theme, noMargin }: StyleProps & LabelElProps) =>
  !noMargin &&
  css`
    label: input__label--margin;
    margin-bottom: ${theme.spacings.mega};
  `;

const labelInlineStyles = ({ inline }: LabelElProps) =>
  inline &&
  css`
    label: input__label--inline;
    display: inline-block;
  `;

const SelectLabel = styled(Label)<LabelElProps>(
  labelMarginStyles,
  labelInlineStyles,
);

type SelectElProps = Omit<SelectProps, 'options'> & { hasPrefix: boolean };

const selectBaseStyles = ({ theme }: StyleProps) => css`
  label: select;
  appearance: none;
  cursor: pointer;
  background-color: ${theme.colors.white};
  outline: none;
  border: 0;
  border-radius: ${theme.borderRadius.tera};
  box-shadow: none;
  color: ${theme.colors.n900};
  margin: 0;
  padding-top: calc(${theme.spacings.byte} + 1px);
  padding-right: ${theme.spacings.tera};
  padding-bottom: calc(${theme.spacings.byte} + 1px);
  padding-left: ${theme.spacings.kilo};
  position: relative;
  width: 100%;
  z-index: ${theme.zIndex.select};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: box-shadow ${theme.transitions.default},
    padding ${theme.transitions.default};
  ${textMega({ theme })};

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
    label: select--invalid;
    padding-right: ${theme.spacings.zetta};
  `;

const selectPrefixStyles = ({ theme, hasPrefix }: StyleProps & SelectElProps) =>
  hasPrefix &&
  css`
    label: select--prefix;
    padding-left: ${theme.spacings.peta};
  `;

const SelectElement = styled.select<SelectElProps>(
  selectBaseStyles,
  selectInvalidStyles,
  selectPrefixStyles,
  inputOutline,
);

const labelTextStyles = ({ hideLabel }: { hideLabel?: boolean }) =>
  hideLabel && hideVisually();

const LabelText = styled('span')(labelTextStyles);

/**
 * Used with css prop directly, so it does not require prop
 * destructuring.
 */
const prefixStyles = (theme: Theme) => css`
  label: select__prefix;
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: ${theme.zIndex.select + 1};
  height: ${theme.spacings.peta};
  width: ${theme.spacings.peta};
  padding: ${theme.spacings.kilo};
  pointer-events: none;
`;

const iconBaseStyles = ({ theme }: StyleProps) => css`
  label: select__icon;
  color: ${theme.colors.n700};
  display: block;
  z-index: ${theme.zIndex.select + 1};
  pointer-events: none;
  position: absolute;
  height: ${theme.spacings.peta};
  width: ${theme.spacings.peta};
  top: 1px;
  right: 1px;
  padding: ${theme.spacings.kilo};
`;

const iconActiveStyles = () => css`
  label: select__icon-active;
  select:active ~ & {
    display: none;
  }
`;

const iconInactiveStyles = () => css`
  label: select__icon-inactive;
  select:not(:active) ~ & {
    display: none;
  }
`;

const IconActive = styled(ChevronDown)<NoTheme>(
  iconBaseStyles,
  iconActiveStyles,
);
const IconInactive = styled(ChevronUp)<NoTheme>(
  iconBaseStyles,
  iconInactiveStyles,
);

/**
 * A native select component.
 */
export const Select = React.forwardRef(
  (
    {
      value,
      placeholder = 'Select an option',
      disabled,
      noMargin,
      inline,
      invalid,
      options,
      children,
      renderPrefix: RenderPrefix,
      validationHint,
      label,
      hideLabel,
      className,
      id: customId,
      onChange,
      tracking,
      ...props
    }: SelectProps,
    ref?: SelectProps['ref'],
  ): ReturnType => {
    const id = customId || uniqueId('select_');

    const prefix = RenderPrefix && (
      <RenderPrefix css={prefixStyles} value={value} />
    );
    const hasPrefix = Boolean(prefix);

    const handleChange = useClickHandler(onChange, tracking, 'select');

    if (!label) {
      deprecate(
        [
          'The label is now built into the Select component.',
          'Use the `label` prop to pass in the label content and',
          'remove the Label component from your code.',
          'The label will become required in the next major version.',
        ].join(' '),
      );
    }

    return (
      <SelectLabel
        className={className}
        htmlFor={id}
        inline={inline}
        disabled={disabled}
        noMargin={noMargin}
        as={label ? 'label' : 'span'}
      >
        {label && <LabelText hideLabel={hideLabel}>{label}</LabelText>}

        <SelectContainer hideLabel={hideLabel}>
          {prefix}
          <SelectElement
            id={id}
            value={value}
            ref={ref}
            invalid={invalid}
            aria-invalid={invalid}
            disabled={disabled}
            hasPrefix={hasPrefix}
            {...props}
            onChange={handleChange}
          >
            {!value && (
              <option key="placeholder" value="">
                {placeholder}
              </option>
            )}
            {children ||
              (options &&
                options.map(({ label: labelValue, ...rest }) => (
                  <option key={rest.value} {...rest}>
                    {labelValue}
                  </option>
                )))}
          </SelectElement>
          <IconActive />
          <IconInactive />
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
