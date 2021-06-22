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

import { Fragment, HTMLProps, Ref, forwardRef } from 'react';
import { css } from '@emotion/core';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../styles/styled';
import {
  disableVisually,
  hideVisually,
  focusOutline,
} from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { useClickHandler } from '../../hooks/useClickHandler';

export interface RadioButtonProps extends HTMLProps<HTMLInputElement> {
  /**
   * Triggers error styles on the component.
   */
  invalid?: boolean;
  /**
   * The ref to the HTML Dom element
   */
  ref?: Ref<HTMLInputElement>;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

type LabelElProps = Pick<RadioButtonProps, 'invalid' | 'disabled'>;

const labelBaseStyles = ({ theme }: StyleProps) => css`
  label: radio-button__label;
  color: ${theme.colors.bodyColor};
  display: inline-block;
  padding-left: 26px;
  position: relative;
  cursor: pointer;

  &::before {
    box-sizing: border-box;
    height: 18px;
    width: 18px;
    box-shadow: 0;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.n500};
    border-radius: 100%;
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: border ${theme.transitions.default};
  }

  &::after {
    box-sizing: border-box;
    height: 10px;
    width: 10px;
    background-color: ${theme.colors.p500};
    border-radius: 100%;
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: ${theme.spacings.bit};
    transform: translateY(-50%) scale(0, 0);
    opacity: 0;
    transition: transform ${theme.transitions.default},
      opacity ${theme.transitions.default};
  }
`;

const labelInvalidStyles = ({ theme, invalid }: StyleProps & LabelElProps) =>
  invalid &&
  css`
    label: radio-button--error;
    &:not(:focus)::before {
      border-color: ${theme.colors.danger};
      background-color: ${theme.colors.r100};
    }

    &:not(:focus)::after {
      background-color: ${theme.colors.danger};
    }
  `;

const labelDisabledStyles = ({ theme, disabled }: StyleProps & LabelElProps) =>
  disabled &&
  css`
    label: radio-button--disabled;
    ${disableVisually()};

    &::before {
      ${disableVisually()};
      border-color: ${theme.colors.n700};
      background-color: ${theme.colors.n200};
    }

    &::after {
      ${disableVisually()};
      background-color: ${theme.colors.n700};
    }
  `;

const RadioButtonLabel = styled('label')<LabelElProps>(
  labelBaseStyles,
  labelDisabledStyles,
  labelInvalidStyles,
);

type InputElProps = Omit<RadioButtonProps, 'tracking'>;

const inputBaseStyles = ({ theme }: StyleProps) => css`
  label: radio-button__input;
  ${hideVisually()};

  &:hover + label::before {
    border-color: ${theme.colors.n700};
  }

  &:focus + label::before {
    ${focusOutline({ theme })};
    border-color: ${theme.colors.p500};
  }

  &:checked + label {
    &::before {
      border-color: ${theme.colors.p500};
    }

    &::after {
      transform: translateY(-50%) scale(1, 1);
      opacity: 1;
    }
  }
`;

const inputInvalidStyles = ({ theme, invalid }: StyleProps & InputElProps) =>
  invalid &&
  css`
    label: radio-button__input--invalid;

    &:hover + label::before,
    &:focus + label::before {
      border-color: ${theme.colors.r700};
    }

    &:checked + label::before {
      border-color: ${theme.colors.danger};
    }
  `;

const RadioButtonInput = styled('input')<InputElProps>(
  inputBaseStyles,
  inputInvalidStyles,
);

/**
 * RadioButton component for forms.
 */
export const RadioButton = forwardRef(
  (
    {
      onChange,
      children,
      label,
      id: customId,
      name,
      value,
      checked,
      invalid,
      disabled,
      tracking,
      className,
      style,
      ...props
    }: RadioButtonProps,
    ref: RadioButtonProps['ref'],
  ) => {
    const id = customId || uniqueId('radio-button_');
    const handleChange = useClickHandler(onChange, tracking, 'radio-button');

    return (
      <Fragment>
        <RadioButtonInput
          {...props}
          type="radio"
          name={name}
          id={id}
          value={value}
          invalid={invalid}
          disabled={disabled}
          checked={checked}
          onClick={handleChange}
          onChange={() => {
            /**
             * Noop to silence React warning:
             * https://github.com/facebook/react/issues/3070#issuecomment-73311114
             * Change is handled by onClick which has better browser support:
             * https://stackoverflow.com/a/5575369/4620154
             */
          }}
          ref={ref}
        />
        <RadioButtonLabel
          htmlFor={id}
          disabled={disabled}
          invalid={invalid}
          className={className}
          style={style}
        >
          {children || label}
        </RadioButtonLabel>
      </Fragment>
    );
  },
);

RadioButton.displayName = 'RadioButton';
