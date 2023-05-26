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
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  useRef,
} from 'react';
import { css } from '@emotion/react';
import { Checkmark } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled.js';
import { hideVisually, focusOutline } from '../../styles/style-mixins.js';
import { FieldValidationHint, FieldWrapper } from '../FieldAtoms/index.js';
import { AccessibilityError } from '../../util/errors.js';
import { applyMultipleRefs } from '../../util/refs.js';

import { IndeterminateIcon } from './IndeterminateIcon.js';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * A clear and concise description of the input's purpose.
   */
  label: string;
  /**
   * Marks the input as invalid.
   */
  invalid?: boolean;
  /**
   * Marks the input as indeterminate. This is presentational only, the value
   * of an indeterminate checkbox is not included in form submissions.
   */
  indeterminate?: boolean;
  /**
   * An information or error message, displayed below the checkbox.
   */
  validationHint?: string;
  children?: never;
}

const labelBaseStyles = css`
  color: var(--cui-fg-normal);
  display: inline-block;
  padding-left: 26px;
  position: relative;
  cursor: pointer;
`;

const CheckboxLabel = styled('label')(labelBaseStyles);

type WrapperElProps = Pick<CheckboxProps, 'className' | 'style' | 'disabled'>;

const wrapperBaseStyles = () => css`
  position: relative;
`;

const CheckboxWrapper = styled(FieldWrapper)<WrapperElProps>(wrapperBaseStyles);

type InputElProps = Pick<CheckboxProps, 'invalid' | 'disabled'>;

const inputBaseStyles = ({ theme }: StyleProps) => css`
  ${hideVisually()};

  & + label::before {
    height: 18px;
    width: 18px;
    box-sizing: border-box;
    box-shadow: 0;
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
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
    color: var(--cui-fg-on-strong);
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
    border-color: var(--cui-border-accent-hovered);
  }

  &:focus + label::before {
    ${focusOutline()};
    border-color: var(--cui-border-accent);
  }

  &:focus:not(:focus-visible) + label::before {
    box-shadow: none;
    border-color: var(--cui-border-normal);
  }

  &:checked:focus:not(:focus-visible) + label::before,
  &:indeterminate:focus:not(:focus-visible) + label::before {
    border-color: var(--cui-border-accent);
  }

  &:checked:not(:indeterminate) + label > svg[data-symbol='checked'],
  &:indeterminate + label > svg[data-symbol='indeterminate'] {
    transform: translateY(-50%) scale(1, 1);
    opacity: 1;
  }

  &:checked + label::before,
  &:indeterminate + label::before {
    border-color: var(--cui-border-accent);
    background-color: var(--cui-bg-accent-strong);
  }

  &:checked:disabled + label::before,
  &:checked[disabled] + label::before,
  &:indeterminate:disabled + label::before,
  &:indeterminate[disabled] + label::before {
    border-color: var(--cui-border-accent-disabled);
    background-color: var(--cui-bg-accent-strong-disabled);
  }
`;

const inputInvalidStyles = ({ invalid }: InputElProps) =>
  invalid &&
  css`
    & + label::before {
      border-color: var(--cui-border-danger);
      background-color: var(--cui-bg-danger);
    }

    &:hover + label::before,
    &:focus + label::before {
      border-color: var(--cui-border-danger-hovered);
    }

    &:checked + label::before,
    &:indeterminate + label::before {
      border-color: var(--cui-border-danger);
      background-color: var(--cui-bg-danger-strong);
    }

    &:checked:disabled + label::before,
    &:indeterminate:disabled + label::before,
    &:checked[disabled] + label::before,
    &:indeterminate[disabled] + label::before {
      border-color: var(--cui-border-danger-disabled);
      background-color: var(--cui-bg-danger-strong-disabled);
    }
  `;

const inputDisabledStyles = () =>
  css`
    &:disabled + label,
    &[disabled] + label {
      pointer-events: none;
      color: var(--cui-fg-normal-disabled);
    }
    &:disabled + label::before,
    &[disabled] + label::before {
      border-color: var(--cui-border-normal-disabled);
      background-color: var(--cui-bg-normal-disabled);
    }

    &:disabled:checked + label::before,
    &[disabled]:checked + label::before {
      border-color: var(--cui-border-accent-disabled);
      background-color: var(--cui-bg-accent-strong-disabled);
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
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      value,
      'id': customId,
      name,
      disabled,
      validationHint,
      className,
      style,
      invalid,
      indeterminate = false,
      'aria-describedby': descriptionId,
      ...props
    },
    passedRef,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (localRef.current) {
        localRef.current.indeterminate = indeterminate;
      }
      // Because it came from a props, we are keeping the `indeterminate` state even if the `checked` one is changed:
    }, [props.checked, indeterminate]);

    const id = useId();
    const checkboxId = customId || id;
    const validationHintId = useId();
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError('Checkbox', 'The `label` prop is missing.');
    }

    return (
      <CheckboxWrapper className={className} style={style} disabled={disabled}>
        <CheckboxInput
          {...props}
          id={checkboxId}
          name={name}
          value={value}
          type="checkbox"
          disabled={disabled}
          invalid={invalid}
          ref={applyMultipleRefs(passedRef, localRef)}
          aria-describedby={descriptionIds}
          aria-checked={indeterminate ? 'mixed' : undefined}
        />
        <CheckboxLabel htmlFor={id}>
          {label}
          <Checkmark aria-hidden="true" data-symbol="checked" />
          <IndeterminateIcon aria-hidden="true" data-symbol="indeterminate" />
        </CheckboxLabel>
        <FieldValidationHint
          id={validationHintId}
          disabled={disabled}
          invalid={invalid}
          validationHint={validationHint}
        />
      </CheckboxWrapper>
    );
  },
);

Checkbox.displayName = 'Checkbox';
