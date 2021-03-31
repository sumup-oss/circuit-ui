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
import { forwardRef, Ref, FC, HTMLProps, ReactNode } from 'react';
import { css, jsx, InterpolationWithTheme } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import {
  textMega,
  hideVisually,
  inputOutline,
} from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import Label from '../Label';
import ValidationHint from '../ValidationHint';
import { ReturnType } from '../../types/return-type';
import deprecate from '../../util/deprecate';

export interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
  /**
   * A clear and concise description of the input purpose.
   * Will become required in the next major version of Circuit UI.
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
  renderPrefix?: FC<{ className?: string }>;
  /**
   * Render prop that should render a right-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderSuffix?: FC<{ className?: string }>;
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
   * Triggers readonly styles on the component.
   */
  readOnly?: boolean;
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
  hideLabel?: boolean;
  /**
   * Emotion style object to overwrite the input element styles.
   */
  inputStyles?: InterpolationWithTheme<Theme>;
  /**
   * Emotion style object to overwrite the input label element styles.
   */
  labelStyles?: InterpolationWithTheme<Theme>;
  /**
   * The ref to the html dom element
   */
  ref?: Ref<HTMLInputElement & HTMLTextAreaElement>;
}

const containerStyles = () => css`
  label: input__container;
  position: relative;
`;

const InputContainer = styled('div')(containerStyles);

type LabelElProps = Pick<InputProps, 'noMargin'>;

const labelCustomStyles = ({ theme }: StyleProps) => css`
  label: input__label;

  label &:not(label),
  label + &:not(label) {
    margin-top: ${theme.spacings.bit};
  }
`;

const labelNoMarginStyles = ({
  theme,
  noMargin,
}: StyleProps & LabelElProps) => {
  if (!noMargin) {
    deprecate(
      [
        'The default outer spacing in the Input component is deprecated.',
        'Use the `noMargin` prop to silence this warning.',
        'Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
      ].join(' '),
    );

    return css`
      label: input__label--margin;
      margin-bottom: ${theme.spacings.mega};
    `;
  }
  return null;
};

const InputLabel = styled(Label)<LabelElProps>(
  labelCustomStyles,
  labelNoMarginStyles,
);

type InputElProps = InputProps & {
  hasPrefix: boolean;
  hasSuffix: boolean;
};

const inputBaseStyles = ({ theme }: StyleProps) => css`
  label: input;
  -webkit-appearance: none;
  background-color: ${theme.colors.white};
  border: none;
  outline: 0;
  border-radius: 8px;
  padding: calc(${theme.spacings.byte} + 1px) ${theme.spacings.kilo};
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
  disabled,
}: StyleProps & InputElProps) =>
  !disabled &&
  hasWarning &&
  css`
    label: input--warning;
    &:not(:focus)::placeholder {
      color: ${theme.colors.warning};
    }
  `;

const inputInvalidStyles = ({
  theme,
  invalid,
  disabled,
}: StyleProps & InputElProps) =>
  !disabled &&
  invalid &&
  css`
    label: input--error;
    &:not(:focus)::placeholder {
      color: ${theme.colors.danger};
      opacity: 0.5;
    }
  `;

const inputReadonlyStyles = ({ theme, readOnly }: StyleProps & InputElProps) =>
  readOnly &&
  css`
    label: input--readonly;
    background-color: ${theme.colors.n100};
  `;

const inputDisabledStyles = ({ theme, disabled }: StyleProps & InputElProps) =>
  disabled &&
  css`
    label: input--disabled;
    background-color: ${theme.colors.n200};
  `;

const inputTextAlignRightStyles = ({ textAlign }: InputElProps) =>
  textAlign === 'right' &&
  css`
    label: input--right;
    text-align: right;
  `;

const inputPrefixStyles = ({ hasPrefix }: StyleProps & InputElProps) =>
  hasPrefix &&
  css`
    label: input--prefix;
    padding-left: 40px;
  `;

const inputSuffixStyles = ({ hasSuffix }: StyleProps & InputElProps) =>
  hasSuffix &&
  css`
    label: input--suffix;
    padding-right: 40px;
  `;

const InputElement = styled('input')<InputElProps>(
  inputBaseStyles,
  inputWarningStyles,
  inputInvalidStyles,
  inputTextAlignRightStyles,
  inputReadonlyStyles,
  inputDisabledStyles,
  inputPrefixStyles,
  inputSuffixStyles,
  inputOutline,
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
const suffixStyles = (theme: Theme, hasValidationIcon = false) => css`
  label: input__suffix;
  position: absolute;
  top: 1px;
  right: ${hasValidationIcon ? '29px' : '1px'};
  pointer-events: none;
  color: ${theme.colors.n700};
  padding: ${theme.spacings.kilo};
  height: ${theme.spacings.peta};
  width: ${theme.spacings.peta};
  transition: right ${theme.transitions.default};
`;

const labelTextStyles = ({ theme }: StyleProps) => css`
  label: input__label-text;
  display: inline-block;
  margin-bottom: ${theme.spacings.bit};
`;

const labelTextHiddenStyles = ({ hideLabel }: { hideLabel?: boolean }) =>
  hideLabel &&
  css`
    label: input__label-text--hidden;
    ${hideVisually()};
  `;

const LabelText = styled('span')<{ hideLabel?: boolean }>(
  labelTextStyles,
  labelTextHiddenStyles,
);

/**
 * Input component for forms. Takes optional prefix and suffix as render props.
 */
export const Input = forwardRef(
  (
    {
      value,
      renderPrefix: RenderPrefix,
      renderSuffix: RenderSuffix,
      validationHint,
      invalid,
      hasWarning,
      showValid,
      noMargin,
      inline,
      disabled,
      labelStyles,
      inputStyles,
      as,
      label,
      hideLabel,
      id: customId,
      ...props
    }: InputProps,
    ref: InputProps['ref'],
  ): ReturnType => {
    if (!label) {
      deprecate(
        [
          'The label is now built into the Input component.',
          'Use the `label` prop to pass in the label content and',
          'remove the Label component from your code.',
          'The label will become required in the next major version.',
        ].join(' '),
      );
    }

    const id = customId || uniqueId('input_');

    const prefix = RenderPrefix && <RenderPrefix css={prefixStyles} />;
    const suffix = RenderSuffix && <RenderSuffix css={suffixStyles} />;

    const hasPrefix = Boolean(prefix);
    const hasSuffix = Boolean(suffix);

    return (
      <InputLabel
        htmlFor={id}
        inline={inline}
        disabled={disabled}
        noMargin={noMargin}
        as={label ? 'label' : 'div'}
        css={labelStyles}
      >
        {label && <LabelText hideLabel={hideLabel}>{label}</LabelText>}

        <InputContainer>
          {prefix}
          <InputElement
            as={as}
            id={id}
            value={value}
            ref={ref}
            invalid={invalid}
            aria-invalid={invalid}
            disabled={disabled}
            hasWarning={hasWarning}
            hasPrefix={hasPrefix}
            hasSuffix={hasSuffix}
            css={inputStyles}
            {...props}
          />
          {suffix}
        </InputContainer>

        <ValidationHint
          disabled={disabled}
          invalid={invalid}
          hasWarning={hasWarning}
          showValid={showValid}
          validationHint={validationHint}
        />
      </InputLabel>
    );
  },
);

Input.displayName = 'Input';
