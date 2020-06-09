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

import React, { FC, ReactNode, Ref, HTMLProps, ChangeEvent } from 'react';
import { css } from '@emotion/core';
import { SelectExpand, CircleCross } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import { uniqueId } from '../../util/id';
import deprecate from '../../util/deprecate';
import styled, { StyleProps } from '../../styles/styled';
import {
  textMega,
  disableVisually,
  hideVisually,
  inputOutline
} from '../../styles/style-helpers';
import { ReturnType } from '../../types/return-type';

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
   * A clear and concise description of the input purpose.
   */
  label?: ReactNode;
  /**
   * Visually hide the label. This should only be used in rare cases and only if the
   * purpose of the field can be inferred from other context.
   */
  labelVisuallyHidden?: boolean;
  /**
   * A unique identifier for the input field. If not defined, a randomly generated id is used.
   */
  id?: string;
  /**
   * The ref to the html dom element
   */
  ref?: Ref<HTMLSelectElement>;
}

type ContainerElProps = Pick<SelectProps, 'noMargin' | 'disabled' | 'inline'>;

const containerBaseStyles = ({ theme }: StyleProps) => css`
  label: select__container;
  color: ${theme.colors.n900};
  display: block;
  position: relative;
  margin-bottom: ${theme.spacings.mega};

  label > &,
  label + & {
    margin-top: ${theme.spacings.bit};
  }
`;

const containerDisabledStyles = ({ disabled }: ContainerElProps) =>
  disabled &&
  css`
    label: select__container--disabled;
    ${disableVisually()};
  `;

const containerInlineStyles = ({
  theme,
  inline
}: StyleProps & ContainerElProps) =>
  inline &&
  css`
    label: select__container--inline;
    display: inline-block;
    margin-right: ${theme.spacings.mega};
  `;

const containerNoMarginStyles = ({ noMargin }: ContainerElProps) =>
  noMargin &&
  css`
    label: select__container--no-margin;
    margin-bottom: 0;
  `;

const SelectContainer = styled('div')<ContainerElProps>(
  containerBaseStyles,
  containerNoMarginStyles,
  containerDisabledStyles,
  containerInlineStyles
);

type SelectElProps = Omit<SelectProps, 'options'> & { hasPrefix: boolean };

const selectBaseStyles = ({ theme }: StyleProps) => css`
  label: select;
  appearance: none;
  cursor: pointer;
  background-color: ${theme.colors.white};
  outline: none;
  border: 0;
  border-radius: 8px;
  box-shadow: none;
  color: ${theme.colors.n900};
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
`;

const selectInvalidStyles = ({
  theme,
  invalid,
  disabled
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
  inputOutline
);

const labelTextStyles = ({ visuallyHidden }: { visuallyHidden?: boolean }) =>
  visuallyHidden && hideVisually();

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

type SuffixElProps = Pick<SelectProps, 'invalid'>;

const suffixBaseStyles = ({ theme }: StyleProps) => css`
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

const suffixInvalidStyles = ({ theme, invalid }: StyleProps & SuffixElProps) =>
  invalid &&
  css`
    label: select__icon--invalid;
    right: ${theme.spacings.giga};
  `;

const SelectIcon = styled(SelectExpand)<SuffixElProps>(
  suffixBaseStyles,
  suffixInvalidStyles
);

const InvalidIcon = styled(CircleCross)<SuffixElProps>`
  ${suffixBaseStyles};
  color: ${p => p.theme.colors.danger};
`;

function SelectComponent(
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
    labelVisuallyHidden,
    id: customId,
    ...props
  }: SelectProps,
  ref?: SelectProps['ref']
): ReturnType {
  const id = customId || uniqueId('select_');

  const prefix = RenderPrefix && (
    <RenderPrefix css={prefixStyles} value={value} />
  );
  const showInvalid = !disabled && invalid;

  if (!label) {
    deprecate(
      [
        'The label is now built into the Select component.',
        'Use the `label` prop to pass in the label content and',
        'remove the Label component from your code.',
        'The label will become required in the next major version'
      ].join(' ')
    );
  }

  const main = (
    <SelectContainer {...{ noMargin, inline, disabled }}>
      {prefix}
      <SelectElement
        {...{
          ...props,
          invalid,
          value,
          disabled,
          hasPrefix: Boolean(prefix),
          id,
          ref
        }}
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
      <SelectIcon invalid={showInvalid} />
      {showInvalid && <InvalidIcon />}
      {validationHint && (
        <ValidationHint invalid={invalid}>{validationHint}</ValidationHint>
      )}
    </SelectContainer>
  );

  return label ? (
    <Label htmlFor={id} inline={inline}>
      <LabelText visuallyHidden={labelVisuallyHidden}>{label}</LabelText>
      {main}
    </Label>
  ) : (
    main
  );
}

/**
 * A native select component.
 */
export const Select = React.forwardRef(SelectComponent);
