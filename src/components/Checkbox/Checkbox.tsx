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

import React, { HTMLProps, Ref } from 'react';
import { css } from '@emotion/core';
import { Check } from '@sumup/icons';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../styles/styled';
import {
  disableVisually,
  hideVisually,
  focusOutline
} from '../../styles/style-helpers';
import { uniqueId } from '../../util/id';
import Tooltip from '../Tooltip';
import useClickHandler from '../../hooks/use-click-handler';

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
   * The ref to the html dom element
   */
  ref?: Ref<HTMLInputElement>;
}

type LabelElProps = Pick<CheckboxProps, 'invalid' | 'disabled'>;

const labelBaseStyles = ({ theme }: StyleProps) => css`
  label: checkbox__label;
  color: ${theme.colors.n700};
  display: inline-block;
  padding-left: ${theme.spacings.giga};
  position: relative;
  cursor: pointer;

  &::before {
    height: ${theme.spacings.mega};
    width: ${theme.spacings.mega};
    box-sizing: border-box;
    box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.12);
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.n500};
    border-radius: 3px;
    content: '';
    display: block;
    position: absolute;
    top: ${theme.spacings.kilo};
    left: 0;
    transform: translateY(-50%);
    transition: border 0.05s ease-in, background-color 0.05s ease-in;
  }

  svg {
    height: ${theme.spacings.mega};
    width: ${theme.spacings.mega};
    padding: 2px;
    box-sizing: border-box;
    color: ${theme.colors.p500};
    display: block;
    line-height: 0;
    opacity: 0;
    position: absolute;
    top: ${theme.spacings.kilo};
    left: 0;
    transform: translateY(-50%) scale(0, 0);
    transition: transform 0.05s ease-in, opacity 0.05s ease-in;
  }
`;

const labelInvalidStyles = ({ theme, invalid }: StyleProps & LabelElProps) =>
  invalid &&
  css`
    label: checkbox--error;
    &:not(:focus)::before {
      border-color: ${theme.colors.r500};
      background-color: ${theme.colors.r100};
    }

    &:not(:focus) svg {
      color: ${theme.colors.r500};
    }
  `;

const labelDisabledStyles = ({ theme, disabled }: StyleProps & LabelElProps) =>
  disabled &&
  css`
    label: checkbox--disabled;
    ${disableVisually()};

    &::before {
      ${disableVisually()};
      border-color: ${theme.colors.n500};
      background-color: ${theme.colors.n100};
    }

    & svg {
      ${disableVisually()};
      color: ${theme.colors.n500};
    }
  `;

const CheckboxLabel = styled('label')<LabelElProps>(
  labelBaseStyles,
  labelDisabledStyles,
  labelInvalidStyles
);

const checkboxWrapperStyles = ({ theme }: StyleProps) => css`
  label: checkbox;
  position: relative;

  &:last-of-type {
    margin-bottom: ${theme.spacings.mega};
  }
`;

const CheckboxWrapper = styled('div')<{}>(checkboxWrapperStyles);

type InputElProps = Omit<CheckboxProps, 'tracking'>;

const inputStyles = ({ theme }: StyleProps) => css`
  label: checkbox__input;
  ${hideVisually()};

  &:focus + label::before {
    ${focusOutline({ theme })};
  }

  &:checked + label > svg {
    transform: translateY(-50%) scale(1, 1);
    opacity: 1;
  }

  &:checked + label::before {
    border-color: ${theme.colors.p500};
  }
`;

const CheckboxInput = styled('input')<InputElProps>(inputStyles);

const tooltipStyles = ({ theme }: StyleProps) => css`
  label: checkbox__tooltip;
  left: -${theme.spacings.kilo};
`;

const CheckboxTooltip = styled(Tooltip)<{}>(tooltipStyles);

const CheckboxComponent = (
  {
    children,
    value,
    id: customId,
    name,
    disabled,
    validationHint,
    className,
    invalid,
    tracking,
    ...props
  }: CheckboxProps,
  ref: CheckboxProps['ref']
) => {
  const id = customId || uniqueId('checkbox_');
  const handleChange = useClickHandler(props.onChange, tracking, 'checkbox');

  return (
    <CheckboxWrapper className={className}>
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
      <CheckboxLabel htmlFor={id} disabled={disabled} invalid={invalid}>
        {children}
        <Check aria-hidden="true" />
      </CheckboxLabel>
      {!disabled && validationHint && (
        // TODO: Reenable typechecks once Tooltip has been migrated to TypeScript.
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        <CheckboxTooltip position={'top'} align={'right'}>
          {validationHint}
        </CheckboxTooltip>
      )}
    </CheckboxWrapper>
  );
};

/**
 * Checkbox component for forms.
 */
export const Checkbox = React.forwardRef(CheckboxComponent);
