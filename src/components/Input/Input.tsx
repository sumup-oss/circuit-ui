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

import React, { FC, HTMLProps, ReactNode } from 'react';
import { css, InterpolationWithTheme } from '@emotion/core';
import { find, identity } from 'lodash/fp';
import { CircleCheckmark, CircleWarning, CircleCross } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import {
  textMega,
  disableVisually,
  hideVisually,
  inputOutline
} from '../../styles/style-helpers';

import Tooltip from '../Tooltip';
import Label from '../Label';
import { uniqueId } from '../../util/id';

export interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
  /**
   * A clear and concise description of the input purpose.
   */
  label?: ReactNode;
  /**
   * The HTML input element to render.
   */
  as?: 'input' | 'textarea';
  /**
   * A unique identifier for the input field. If not defined, a randomly generated id is used.
   */
  id?: string;
  /**
   * Render prop that should render a left-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderPrefix?: FC<{ value?: string | number; className?: string }>;
  /**
   * Render prop that should render a right-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderSuffix?: FC<{ value?: string | number; className?: string }>;
  /**
   * Warning or error message, displayed in a tooltip.
   */
  validationHint?: string;
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
   * Triggers optional styles on the component.
   */
  optional?: boolean;
  /**
   * Trigger inline styles on the component.
   */
  inline?: boolean;
  /**
   * Removes the default bottom margin from the input.
   */
  noMargin?: boolean;
  /**
   * Aligns text in the input
   */
  textAlign?: 'left' | 'right';
  /**
   * Visually hide the label. This should only be used in rare cases and only if the
   * purpose of the field can be inferred from other context.
   */
  labelVisuallyHidden?: boolean;
  /**
   * Emotion style object to overwrite the <input> element styles.
   */
  inputStyles?: InterpolationWithTheme<Theme>;
  /**
   * Emotion style object to overwrite the input wrapper element styles.
   */
  wrapperStyles?: InterpolationWithTheme<Theme>;
  /**
   * The ref to the html dom element
   */
  ref?: React.Ref<HTMLInputElement & HTMLTextAreaElement>;
}

const containerBaseStyles = ({ theme }: StyleProps) => css`
  label: input__container;
  color: ${theme.colors.n900};
  display: block;
  position: relative;
  margin-bottom: ${theme.spacings.mega};

  label > &,
  label + & {
    margin-top: ${theme.spacings.bit};
  }
`;

const containerDisabledStyles = ({ disabled }: InputProps) =>
  disabled &&
  css`
    label: input__container--disabled;
    ${disableVisually()};
  `;

const containerInlineStyles = ({ theme, inline }: StyleProps & InputProps) =>
  inline &&
  css`
    label: input__container--inline;
    display: inline-block;
    margin-right: ${theme.spacings.mega};
  `;

const containerNoMarginStyles = ({ noMargin }: InputProps) =>
  noMargin &&
  css`
    label: input__container--no-margin;
    margin-bottom: 0;
  `;

const InputContainer = styled('div')<InputProps>(
  containerBaseStyles,
  containerNoMarginStyles,
  containerDisabledStyles,
  containerInlineStyles
);

type InputElProps = InputProps & { hasPrefix: boolean; hasSuffix: boolean };

const inputBaseStyles = ({ theme }: StyleProps) => css`
  label: input;
  background-color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
  transition: box-shadow ${theme.transitions.default},
    padding ${theme.transitions.default};
  width: 100%;
  margin: 0;
  ${textMega({ theme })};

  &::placeholder {
    color: ${theme.colors.n500};
    transition: color ${theme.transitions.default};
  }
`;

const inputWarningStyles = ({
  theme,
  hasWarning,
  disabled
}: StyleProps & InputElProps) =>
  !disabled &&
  hasWarning &&
  css`
    label: input--warning;
    &:not(:focus)::placeholder {
      color: ${theme.colors.y500};
    }
  `;

const inputInvalidStyles = ({
  theme,
  invalid,
  disabled
}: StyleProps & InputElProps) =>
  !disabled &&
  invalid &&
  css`
    label: input--error;
    &:not(:focus)::placeholder {
      color: ${theme.colors.r300};
    }
  `;

const inputOptionalStyles = ({ theme, optional }: StyleProps & InputElProps) =>
  optional &&
  css`
    label: input--optional;
    background-color: ${theme.colors.n100};
  `;

const inputTextAlignRightStyles = ({ textAlign }: InputElProps) =>
  textAlign === 'right' &&
  css`
    label: input--right;
    text-align: right;
  `;

const inputPrefixStyles = ({ theme, hasPrefix }: StyleProps & InputElProps) =>
  hasPrefix &&
  css`
    label: input--prefix;
    padding-left: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

const inputSuffixStyles = ({ theme, hasSuffix }: StyleProps & InputElProps) =>
  hasSuffix &&
  css`
    label: input--suffix;
    padding-right: calc(
      ${theme.spacings.kilo} + ${theme.spacings.mega} + ${theme.spacings.kilo}
    );
  `;

const InputElement = styled('input')<InputElProps>(
  inputBaseStyles,
  inputOptionalStyles,
  inputWarningStyles,
  inputInvalidStyles,
  inputTextAlignRightStyles,
  inputPrefixStyles,
  inputSuffixStyles,
  inputOutline
);

/**
 * Used with css prop directly, so it does not require prop
 * destructuring.
 */
const prefixStyles = (theme: Theme) => css`
  label: input__prefix;
  position: absolute;
  top: 1px;
  left: 1px;
  pointer-events: none;
  color: ${theme.colors.n700};
  padding: ${theme.spacings.kilo};
  height: ${theme.spacings.peta};
  width: ${theme.spacings.peta};
`;

/**
 * Used with css prop directly, so it does not require prop
 * destructuring.
 */
const suffixStyles = (theme: Theme) => css`
  label: input__suffix;
  position: absolute;
  top: 1px;
  right: 1px;
  pointer-events: none;
  color: ${theme.colors.n700};
  padding: ${theme.spacings.kilo};
  height: ${theme.spacings.peta};
  width: ${theme.spacings.peta};
`;

const tooltipBaseStyles = css`
  label: input__tooltip;
  right: 1px;
`;

const labelTextStyles = ({ visuallyHidden }: { visuallyHidden?: boolean }) =>
  visuallyHidden && hideVisually();

const LabelText = styled('span')(labelTextStyles);

const InputTooltip = styled(Tooltip as any)(tooltipBaseStyles);

type ValidationIconProps = Pick<
  InputProps,
  'invalid' | 'hasWarning' | 'showValid' | 'disabled'
> & { className?: string };

const validationIconBaseStyles = ({ theme }: StyleProps) => css`
  opacity: 0;
  transition: opacity ${theme.transitions.default};
`;

const validationIconActiveStyles = ({
  invalid,
  hasWarning,
  showValid
}: ValidationIconProps) =>
  (invalid || hasWarning || showValid) &&
  css`
    opacity: 1;
  `;

const ValidationIconWrapper = styled('div')<ValidationIconProps>(
  validationIconBaseStyles,
  validationIconActiveStyles
);

const colorMap = {
  error: 'danger',
  warning: 'warning',
  valid: 'success'
} as const;

const iconStyles = (variant: 'error' | 'warning' | 'valid') => (
  theme: Theme
) => css`
  label: ${`input__validation-${variant}`};
  display: block;
  height: 100%;
  width: 100%;
  color: ${theme.colors[colorMap[variant]]};
`;

const ValidationIcon = ({
  invalid,
  hasWarning,
  showValid,
  disabled,
  className
}: ValidationIconProps) => {
  if (disabled) {
    return null;
  }

  const icons = [
    invalid && <CircleCross role="img" css={iconStyles('error')} />,
    hasWarning && <CircleWarning role="img" css={iconStyles('warning')} />,
    showValid && <CircleCheckmark role="img" css={iconStyles('valid')} />
  ];

  const icon = find(identity, icons);

  return (
    <ValidationIconWrapper {...{ invalid, hasWarning, showValid, className }}>
      {icon || null}
    </ValidationIconWrapper>
  );
};

function InputComponent(
  {
    children,
    renderPrefix: RenderPrefix,
    renderSuffix: RenderSuffix,
    validationHint,
    invalid,
    hasWarning,
    showValid,
    noMargin,
    inline,
    disabled,
    wrapperStyles,
    inputStyles,
    as,
    label,
    labelVisuallyHidden,
    id: customId,
    ...props
  }: InputProps,
  ref: InputProps['ref']
) {
  const id = customId || uniqueId('input_');

  const prefix = RenderPrefix && <RenderPrefix css={prefixStyles} />;
  const suffix = RenderSuffix ? (
    <RenderSuffix css={suffixStyles} />
  ) : (
    <ValidationIcon
      css={suffixStyles}
      {...{ invalid, hasWarning, showValid, disabled }}
    />
  );

  const main = (
    <InputContainer
      {...{
        noMargin,
        inline,
        disabled,
        css: wrapperStyles
      }}
    >
      {prefix}

      <InputElement
        {...{
          ...props,
          invalid,
          disabled,
          hasWarning,
          ref,
          as,
          hasPrefix: !!prefix,
          hasSuffix: !!suffix,
          css: inputStyles,
          id
        }}
        aria-invalid={invalid}
      />
      {suffix}
      {!disabled && validationHint && (
        <InputTooltip position={'top'} align={'left'}>
          {validationHint}
        </InputTooltip>
      )}
      {children}
    </InputContainer>
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
 * Input component for forms. Takes optional prefix and suffix as render props.
 */
export const Input = React.forwardRef(InputComponent);
