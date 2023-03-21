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

import { InputHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { Checkmark } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled';
import { hideVisually, focusOutline } from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { useClickEvent, TrackingProps } from '../../hooks/useClickEvent';
import { FieldValidationHint, FieldWrapper } from '../FieldAtoms';
import { deprecate } from '../../util/logger';
import { AccessibilityError } from '../../util/errors';
import { applyMultipleRefs } from '../../util/refs';

import { IndeterminateIcon } from './IndeterminateIcon';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * A clear and concise description of the input's purpose.
   */
  label?: string;
  /**
   * Triggers error styles on the component.
   */
  invalid?: boolean;
  /**
   * Triggers indeterminate styles on the component.
   */
  indeterminate?: boolean;
  /**
   * An information or error message, displayed below the checkbox.
   */
  validationHint?: string;
  /**
   * @deprecated
   *
   * Use an `onChange` handler to dispatch user interaction events instead.
   */
  tracking?: TrackingProps;
  /**
   * @deprecated
   *
   * Use the `label` prop instead.
   */
  children?: InputHTMLAttributes<HTMLInputElement>['children'];
}

const labelBaseStyles = css`
  color: var(--cui-fg-normal);
  display: inline-block;
  padding-left: 26px;
  position: relative;
  cursor: pointer;
`;

const CheckboxLabel = styled('label')(labelBaseStyles);

const wrapperBaseStyles = () => css`
  position: relative;
`;

const CheckboxWrapper = styled(FieldWrapper)<CheckboxProps>(wrapperBaseStyles);

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
      onChange,
      label,
      children,
      value,
      'id': customId,
      name,
      disabled,
      validationHint,
      className,
      style,
      invalid,
      tracking,
      indeterminate = false,
      'aria-describedby': descriptionId,
      ...props
    },
    passedRef,
  ) => {
    if (process.env.NODE_ENV !== 'production' && children) {
      deprecate(
        'Checkbox',
        'The `children` prop has been deprecated. Use the `label` prop instead.',
      );
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label &&
      !children
    ) {
      throw new AccessibilityError('Checkbox', 'The `label` prop is missing.');
    }

    const id = customId || uniqueId('checkbox_');
    const validationHintId = uniqueId('validation_hint-');
    const descriptionIds = `${
      descriptionId ? `${descriptionId} ` : ''
    }${validationHintId}`;
    const handleChange = useClickEvent(onChange, tracking, 'checkbox');

    const localRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (!localRef.current) {
        return;
      }

      localRef.current.indeterminate = indeterminate;
      // Because it came from a props, we are keeping the `indeterminate` state even if the `checked` one is changed:
    }, [props.defaultChecked, props.checked, indeterminate]);

    return (
      <CheckboxWrapper className={className} style={style} disabled={disabled}>
        <CheckboxInput
          {...props}
          id={id}
          name={name}
          value={value}
          type="checkbox"
          disabled={disabled}
          invalid={invalid}
          ref={applyMultipleRefs(passedRef, localRef)}
          aria-describedby={descriptionIds}
          onChange={handleChange}
          {...(indeterminate && { 'aria-checked': 'mixed' })}
        />
        <CheckboxLabel htmlFor={id}>
          {label || children}
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
