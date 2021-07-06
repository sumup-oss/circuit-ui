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

import { HTMLProps, Ref, forwardRef } from 'react';
import { css } from '@emotion/core';
import { Check } from '@sumup/icons';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../styles/styled';
import {
  disableVisually,
  hideVisually,
  focusOutline,
} from '../../styles/style-mixins';
import { uniqueId } from '../../util/id';
import { useClickHandler } from '../../hooks/useClickHandler';
import Tooltip from '../Tooltip';

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  /**
   * Triggers error styles on the component.
   */
  invalid?: boolean;
  /**
   * Warning or error message, displayed in a tooltip.
   */
  validationHint?: string;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * The ref to the HTML Dom element
   */
  ref?: Ref<HTMLInputElement>;
}

type LabelElProps = Pick<CheckboxProps, 'invalid' | 'disabled'>;

const labelBaseStyles = ({ theme }: StyleProps) => css`
  label: checkbox__label;
  color: ${theme.colors.bodyColor};
  display: inline-block;
  padding-left: 26px;
  position: relative;
  cursor: pointer;

  &::before {
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

  svg {
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
`;

const labelInvalidStyles = ({ theme, invalid }: StyleProps & LabelElProps) =>
  invalid &&
  css`
    label: checkbox--error;
    &:not(:focus)::before {
      border-color: ${theme.colors.danger};
      background-color: ${theme.colors.r100};
    }
  `;

const labelDisabledStyles = ({ disabled, theme }: StyleProps & LabelElProps) =>
  disabled &&
  css`
    label: checkbox--disabled;
    ${disableVisually()};

    &::before {
      ${disableVisually()};
      border-color: ${theme.colors.n700};
      background-color: ${theme.colors.n200};
    }
  `;

const CheckboxLabel = styled('label')<LabelElProps>(
  labelBaseStyles,
  labelDisabledStyles,
  labelInvalidStyles,
);

const wrapperBaseStyles = () => css`
  label: checkbox;
  position: relative;
`;

const CheckboxWrapper = styled('div')(wrapperBaseStyles);

type InputElProps = Omit<CheckboxProps, 'tracking'>;

const inputBaseStyles = ({ theme }: StyleProps) => css`
  label: checkbox__input;
  ${hideVisually()};

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

  &:focus-visible + label::before {
    ${focusOutline(theme)};
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
    label: checkbox__input--invalid;

    &:hover + label::before,
    &:focus + label::before {
      border-color: ${theme.colors.r700};
    }

    &:checked + label::before {
      border-color: ${theme.colors.danger};
      background-color: ${theme.colors.danger};
    }
  `;

const CheckboxInput = styled('input')<InputElProps>(
  inputBaseStyles,
  inputInvalidStyles,
);

const tooltipStyles = ({ theme }: StyleProps) => css`
  label: checkbox__tooltip;
  left: -${theme.spacings.kilo};
`;

const CheckboxTooltip = styled(Tooltip)(tooltipStyles);

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
      tracking,
      ...props
    }: CheckboxProps,
    ref: CheckboxProps['ref'],
  ) => {
    const id = customId || uniqueId('checkbox_');
    const handleChange = useClickHandler(onChange, tracking, 'checkbox');

    return (
      <CheckboxWrapper className={className} style={style}>
        <CheckboxInput
          {...props}
          id={id}
          name={name}
          value={value}
          type="checkbox"
          disabled={disabled}
          invalid={invalid}
          ref={ref}
          onClick={handleChange}
          onChange={() => {
            /**
             * Noop to silence React warning:
             * https://github.com/facebook/react/issues/3070#issuecomment-73311114
             * Change is handled by onClick which has better browser support:
             * https://stackoverflow.com/a/5575369/4620154
             */
          }}
        />
        <CheckboxLabel htmlFor={id} disabled={disabled} invalid={invalid}>
          {children}
          <Check aria-hidden="true" />
        </CheckboxLabel>
        {!disabled && validationHint && (
          // TODO: Reenable typechecks once Tooltip has been migrated to TypeScript.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <CheckboxTooltip position={'top'} align={'right'}>
            {validationHint}
          </CheckboxTooltip>
        )}
      </CheckboxWrapper>
    );
  },
);

Checkbox.displayName = 'Checkbox';
