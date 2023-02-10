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

import { Fragment, InputHTMLAttributes, Ref, forwardRef } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import {
  disableVisually,
  hideVisually,
  focusOutline,
} from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { useClickEvent, TrackingProps } from '../../hooks/useClickEvent';
import { AccessibilityError } from '../../util/errors';

export interface RadioButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * A clear and concise description of the option's purpose.
   */
  label: string;
  /**
   * Triggers error styles on the component.
   */
  invalid?: boolean;
  /**
   * The ref to the HTML DOM element
   */
  ref?: Ref<HTMLInputElement>;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

type LabelElProps = Pick<RadioButtonProps, 'invalid' | 'disabled'>;

const labelBaseStyles = ({ theme }: StyleProps) => css`
  color: var(--cui-fg-normal);
  display: inline-block;
  padding-left: 26px;
  position: relative;
  cursor: pointer;

  &::before {
    box-sizing: border-box;
    height: 18px;
    width: 18px;
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
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
    background-color: var(--cui-fg-accent);
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

const labelInvalidStyles = ({ invalid }: LabelElProps) =>
  invalid &&
  css`
    &:not(:focus)::before {
      border-color: var(--cui-border-danger);
      background-color: var(--cui-bg-danger);
    }

    &:not(:focus)::after {
      background-color: var(--cui-fg-danger);
    }
  `;

const labelDisabledStyles = ({ disabled }: LabelElProps) =>
  disabled &&
  css`
    ${disableVisually()};

    &::before {
      ${disableVisually()};
      border-color: var(--cui-border-strong-disabled);
      background-color: var(--cui-bg-normal-disabled);
    }

    &::after {
      ${disableVisually()};
      background-color: var(--cui-fg-on-strong);
    }
  `;

const RadioButtonLabel = styled('label')<LabelElProps>(
  labelBaseStyles,
  labelDisabledStyles,
  labelInvalidStyles,
);

type InputElProps = Pick<RadioButtonProps, 'invalid'>;

const inputBaseStyles = ({ theme }: StyleProps) => css`
  ${hideVisually()};

  &:hover + label::before {
    border-color: var(--cui-border-normal-hovered);
  }

  &:focus + label::before {
    ${focusOutline(theme)};
    border-color: var(--cui-border-accent);
  }

  &:focus:not(:focus-visible) + label::before {
    box-shadow: none;
    border-color: var(--cui-border-normal);
  }

  &:checked:focus:not(:focus-visible) + label::before {
    border-color: var(--cui-border-accent);
  }

  &:checked + label {
    &::before {
      border-color: var(--cui-border-accent);
    }

    &::after {
      transform: translateY(-50%) scale(1, 1);
      opacity: 1;
    }
  }
`;

const inputInvalidStyles = ({ invalid }: InputElProps) =>
  invalid &&
  css`
    &:hover + label::before,
    &:focus + label::before {
      border-color: var(--cui-border-danger-hovered);
    }

    &:checked + label::before {
      border-color: var(--cui-border-danger);
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
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError(
        'RadioButton',
        'The `label` prop is missing.',
      );
    }
    const id = customId || uniqueId('radio-button_');
    const handleChange = useClickEvent(onChange, tracking, 'radio-button');

    return (
      <Fragment>
        <RadioButtonInput
          {...props}
          type="radio"
          name={name}
          id={id}
          value={value}
          invalid={invalid}
          aria-invalid={invalid && 'true'}
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
          ref={ref}
        />
        <RadioButtonLabel
          htmlFor={id}
          disabled={disabled}
          invalid={invalid}
          className={className}
          style={style}
        >
          {label}
        </RadioButtonLabel>
      </Fragment>
    );
  },
);

RadioButton.displayName = 'RadioButton';
