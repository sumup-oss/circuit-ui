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

import { InputHTMLAttributes, Ref, forwardRef } from 'react';
import { css } from '@emotion/react';
import { Checkmark } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled';
import {
  disableVisually,
  hideVisually,
  focusOutline,
} from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { useClickEvent, TrackingProps } from '../../hooks/useClickEvent';
import Tooltip from '../Tooltip';
import { DeprecationError } from '../../util/errors';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Triggers error styles on the component.
   */
  invalid?: boolean;
  /**
   * Warning or error message, displayed in a tooltip.
   */
  validationHint?: string;
  /**
   * We're moving away from built-in margins. The `noMargin` prop is now
   * required and will be removed in v6 using codemods. Use the `spacing()`
   * mixin to add margin.
   */
  noMargin: true;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * The ref to the HTML DOM element.
   */
  ref?: Ref<HTMLInputElement>;
}

type LabelElProps = Pick<CheckboxProps, 'disabled'>;

const labelBaseStyles = ({ theme }: StyleProps) => css`
  color: ${theme.colors.bodyColor};
  display: inline-block;
  padding-left: 26px;
  position: relative;
  cursor: pointer;
`;

const labelDisabledStyles = ({ disabled }: LabelElProps) =>
  disabled && disableVisually;

const CheckboxLabel = styled('label')<LabelElProps>(
  labelBaseStyles,
  labelDisabledStyles,
);

type WrapperElProps = Pick<CheckboxProps, 'noMargin'>;

const wrapperBaseStyles = () => css`
  position: relative;
`;

const wrapperNoMarginStyles = ({
  theme,
  noMargin,
}: StyleProps & WrapperElProps) =>
  !noMargin &&
  css`
    &:last-of-type {
      margin-bottom: ${theme.spacings.mega};
    }
  `;

const CheckboxWrapper = styled('div')<WrapperElProps>(
  wrapperBaseStyles,
  wrapperNoMarginStyles,
);

type InputElProps = Omit<CheckboxProps, 'tracking'>;

const inputBaseStyles = ({ theme }: StyleProps) => css`
  ${hideVisually()};

  & + label::before {
    height: 18px;
    width: 18px;
    box-sizing: border-box;
    box-shadow: 0;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.n500};
    border-radius: 3px;
    content: '';
    display: block;
    position: absolute;
    top: ${theme.spacings.kilo};
    left: 0;
    transform: translateY(-50%);
    transition: border ${theme.transitions.default},
      background-color ${theme.transitions.default};
  }

  & + label svg {
    height: 18px;
    width: 18px;
    padding: 2px;
    box-sizing: border-box;
    color: ${theme.colors.white};
    display: block;
    line-height: 0;
    opacity: 0;
    position: absolute;
    top: ${theme.spacings.kilo};
    left: 0;
    transform: translateY(-50%) scale(0, 0);
    transition: transform ${theme.transitions.default},
      opacity ${theme.transitions.default};
  }

  &:hover + label::before {
    border-color: ${theme.colors.n700};
  }

  &:focus + label::before {
    ${focusOutline(theme)};
    border-color: ${theme.colors.p500};
  }

  &:focus:not(:focus-visible) + label::before {
    box-shadow: none;
    border-color: ${theme.colors.n500};
  }

  &:checked:focus:not(:focus-visible) + label::before {
    border-color: ${theme.colors.p500};
  }

  &:checked + label > svg {
    transform: translateY(-50%) scale(1, 1);
    opacity: 1;
  }

  &:checked + label::before {
    border-color: ${theme.colors.p500};
    background-color: ${theme.colors.p500};
  }
`;

const inputInvalidStyles = ({ theme, invalid }: StyleProps & InputElProps) =>
  invalid &&
  css`
    & + label::before {
      border-color: ${theme.colors.alert};
      background-color: ${theme.colors.r100};
    }

    &:hover + label::before,
    &:focus + label::before {
      border-color: ${theme.colors.r700};
    }

    &:checked + label::before {
      border-color: ${theme.colors.alert};
      background-color: ${theme.colors.alert};
    }
  `;

const inputDisabledStyles = ({ theme, disabled }: StyleProps & InputElProps) =>
  disabled &&
  css`
    & + label::before {
      ${disableVisually()}
      border-color: ${theme.colors.n700};
      background-color: ${theme.colors.n200};
    }
  `;

const CheckboxInput = styled('input')<InputElProps>(
  inputBaseStyles,
  inputInvalidStyles,
  inputDisabledStyles,
);

/**
 * Checkbox component for forms.
 */
export const Checkbox = forwardRef(
  (
    {
      onChange,
      children,
      value,
      id: customId,
      name,
      disabled,
      validationHint,
      className,
      style,
      invalid,
      noMargin,
      tracking,
      ...props
    }: CheckboxProps,
    ref: CheckboxProps['ref'],
  ) => {
    if (
      process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !noMargin
    ) {
      throw new DeprecationError(
        'Checkbox',
        'The `noMargin` prop is required since v5. Read more at https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md#runtime-errors-for-missing-nomargin-props.',
      );
    }

    const id = customId || uniqueId('checkbox_');
    const handleChange = useClickEvent(onChange, tracking, 'checkbox');

    return (
      <>
        {!disabled && validationHint && (
          <Tooltip text={validationHint} placement="top-end" />
        )}
        <CheckboxWrapper
          className={className}
          style={style}
          noMargin={noMargin}
        >
          {/* @ts-expect-error the noMargin prop is required */}
          <CheckboxInput
            {...props}
            id={id}
            name={name}
            value={value}
            type="checkbox"
            disabled={disabled}
            invalid={invalid}
            ref={ref}
            onChange={handleChange}
          />
          <CheckboxLabel htmlFor={id} disabled={disabled}>
            {children}
            <Checkmark aria-hidden="true" />
          </CheckboxLabel>
        </CheckboxWrapper>
      </>
    );
  },
);

Checkbox.displayName = 'Checkbox';
