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

import {
  forwardRef,
  Ref,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from 'react';
import { css, Interpolation } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import { typography, inputOutline } from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import {
  FieldWrapper,
  FieldLabel,
  FieldLabelText,
  FieldValidationHint,
} from '../FieldAtoms';
import { ReturnType } from '../../types/return-type';
import { AccessibilityError, DeprecationError } from '../../util/errors';

export type InputElement = HTMLInputElement & HTMLTextAreaElement;
type CircuitInputHTMLAttributes = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;
export interface InputProps extends CircuitInputHTMLAttributes {
  /**
   * A clear and concise description of the input purpose.
   */
  label: ReactNode;
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
  renderPrefix?: ({ className }: { className?: string }) => JSX.Element | null;
  /**
   * Render prop that should render a right-aligned overlay icon or element.
   * Receives a className prop.
   */
  renderSuffix?: ({ className }: { className?: string }) => JSX.Element | null;
  /**
   * Warning or error message, displayed below the input.
   */
  validationHint?: string;
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
   * We're moving away from built-in margins. The `noMargin` prop is now
   * required and will be removed in v6 using codemods. Use the `spacing()`
   * mixin to add margin.
   */
  noMargin: true;
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
  inputStyles?: Interpolation<Theme>;
  /**
   * The ref to the HTML DOM element
   */
  ref?: Ref<InputElement>;
}

const wrapperStyles = () => css`
  position: relative;
`;

const InputWrapper = styled('div')(wrapperStyles);

type InputElProps = Omit<InputProps, 'label' | 'noMargin'> & {
  hasPrefix: boolean;
  hasSuffix: boolean;
};

const inputBaseStyles = ({ theme }: StyleProps) => css`
  -webkit-appearance: none;
  background-color: ${theme.colors.white};
  border: none;
  outline: 0;
  border-radius: ${theme.borderRadius.byte};
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  transition: box-shadow ${theme.transitions.default},
    padding ${theme.transitions.default};
  width: 100%;
  margin: 0;

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
    &:not(:focus)::placeholder {
      color: ${theme.colors.notify};
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
    &:not(:focus)::placeholder {
      color: ${theme.colors.alert};
      opacity: 0.5;
    }
  `;

const inputReadonlyStyles = ({ theme, readOnly }: StyleProps & InputElProps) =>
  readOnly &&
  css`
    background-color: ${theme.colors.n100};
  `;

const inputDisabledStyles = ({ theme, disabled }: StyleProps & InputElProps) =>
  disabled &&
  css`
    background-color: ${theme.colors.n200};
  `;

const inputTextAlignRightStyles = ({ textAlign }: InputElProps) =>
  textAlign === 'right' &&
  css`
    text-align: right;
  `;

const inputPrefixStyles = ({ theme, hasPrefix }: StyleProps & InputElProps) =>
  hasPrefix &&
  css`
    padding-left: ${theme.spacings.exa};
  `;

const inputSuffixStyles = ({ theme, hasSuffix }: StyleProps & InputElProps) =>
  hasSuffix &&
  css`
    padding-right: ${theme.spacings.exa};
  `;

const StyledInput = styled('input')<InputElProps>(
  typography('one'),
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
  position: absolute;
  pointer-events: none;
  color: ${theme.colors.n700};
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  height: ${theme.spacings.exa};
  width: ${theme.spacings.exa};
`;

/**
 * Used with css prop directly, so it does not require prop
 * destructuring.
 */
const suffixStyles = (theme: Theme) => css`
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
  color: ${theme.colors.n700};
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  height: ${theme.spacings.exa};
  width: ${theme.spacings.exa};
  transition: right ${theme.transitions.default};
`;

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
      optionalLabel,
      required,
      invalid,
      hasWarning,
      showValid,
      noMargin,
      disabled,
      inputStyles,
      as,
      label,
      hideLabel,
      id: customId,
      className,
      style,
      ...props
    }: InputProps,
    ref: InputProps['ref'],
  ): ReturnType => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      props.type !== 'hidden' &&
      !label
    ) {
      throw new AccessibilityError(
        'Input',
        'The `label` prop is missing. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }
    if (
      process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !noMargin
    ) {
      throw new DeprecationError(
        'Input',
        'The `noMargin` prop is required since v5. Read more at https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md#runtime-errors-for-missing-nomargin-props.',
      );
    }

    const id = customId || uniqueId('input_');

    const prefix = RenderPrefix && <RenderPrefix css={prefixStyles} />;
    const suffix = RenderSuffix && <RenderSuffix css={suffixStyles} />;

    const hasPrefix = Boolean(prefix);
    const hasSuffix = Boolean(suffix);

    return (
      <FieldWrapper
        className={className}
        style={style}
        disabled={disabled}
        noMargin={noMargin}
      >
        <FieldLabel htmlFor={id}>
          <FieldLabelText
            label={label}
            hideLabel={hideLabel}
            optionalLabel={optionalLabel}
            required={required}
          />
          <InputWrapper>
            {prefix}
            <StyledInput
              as={as}
              id={id}
              value={value}
              ref={ref}
              invalid={invalid}
              aria-invalid={invalid}
              required={required}
              disabled={disabled}
              hasWarning={hasWarning}
              hasPrefix={hasPrefix}
              hasSuffix={hasSuffix}
              css={inputStyles}
              {...props}
            />
            {suffix}
          </InputWrapper>
          <FieldValidationHint
            disabled={disabled}
            invalid={invalid}
            hasWarning={hasWarning}
            showValid={showValid}
            validationHint={validationHint}
          />
        </FieldLabel>
      </FieldWrapper>
    );
  },
);

Input.displayName = 'Input';
