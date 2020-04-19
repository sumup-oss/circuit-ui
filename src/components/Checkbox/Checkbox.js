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

import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { hideVisually, size } from 'polished';
import { Check } from '@sumup/icons';

import { disableVisually } from '../../styles/style-helpers';
import { childrenPropType } from '../../util/shared-prop-types';
import { uniqueId } from '../../util/id';
import Tooltip from '../Tooltip';

const labelBaseStyles = ({ theme }) => css`
  label: checkbox__label;
  color: ${theme.colors.n700};
  display: inline-block;
  padding-left: ${theme.spacings.giga};
  position: relative;

  &::before {
    ${size(theme.spacings.mega)};
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
    ${size(theme.spacings.mega)};
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

const labelInvalidStyles = ({ theme, invalid }) =>
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

const labelDisabledStyles = ({ theme, disabled }) =>
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

const inputStyles = ({ theme }) => css`
  label: checkbox__input;
  ${hideVisually()};

  &:focus + label::before {
    border-width: 2px;
    border-color: ${theme.colors.p500};
  }

  &:checked + label > svg {
    transform: translateY(-50%) scale(1, 1);
    opacity: 1;
  }

  &:checked + label::before {
    border-color: ${theme.colors.p500};
  }
`;

const checkboxWrapperBaseStyles = ({ theme }) => css`
  label: checkbox;
  position: relative;

  &:last-of-type {
    margin-bottom: ${theme.spacings.mega};
  }
`;

const tooltipBaseStyles = ({ theme }) => css`
  label: checkbox__tooltip;
  left: -${theme.spacings.kilo};
`;

const CheckboxInput = styled('input')`
  ${inputStyles};
`;

const CheckboxLabel = styled('label')`
  ${labelBaseStyles};
  ${labelDisabledStyles};
  ${labelInvalidStyles};
`;

const CheckboxWrapper = styled('div')`
  ${checkboxWrapperBaseStyles};
`;

const CheckboxTooltip = styled(Tooltip)`
  ${tooltipBaseStyles};
`;

/**
 * Checkbox component for forms.
 */
const Checkbox = ({
  children,
  value,
  id: customId,
  name,
  disabled,
  validationHint,
  className,
  ...props
}) => {
  const id = customId || uniqueId('checkbox_');
  return (
    <CheckboxWrapper className={className}>
      <CheckboxInput
        {...props}
        id={id}
        name={name}
        value={value}
        type="checkbox"
        disabled={disabled}
      />
      <CheckboxLabel {...props} htmlFor={id} disabled={disabled}>
        {children}
        <Check aria-hidden="true" />
      </CheckboxLabel>
      {!disabled && validationHint && (
        <CheckboxTooltip position={Tooltip.TOP} align={Tooltip.RIGHT}>
          {validationHint}
        </CheckboxTooltip>
      )}
    </CheckboxWrapper>
  );
};

Checkbox.propTypes = {
  /**
   * Controles/Toggles the checked state.
   */
  onChange: PropTypes.func,
  /**
   * Value string for input.
   */
  value: PropTypes.string.isRequired,
  /**
   * Child nodes to be rendered as the label.
   */
  children: childrenPropType.isRequired,
  /**
   * The name of the checkbox.
   */
  name: PropTypes.string.isRequired,
  /**
   * A unique ID used to link the input and label.
   */
  id: PropTypes.string,
  /**
   * Triggers checked styles on the component. This is also forwarded as
   * attribute to the <input> element.
   */
  checked: PropTypes.bool,
  /**
   * Triggers error styles on the component.
   */
  invalid: PropTypes.bool,
  /**
   * Triggers disabled styles on the component. This is also forwarded as
   * attribute to the <input> element.
   */
  disabled: PropTypes.bool,
  /**
   * Warning or error message, displayed in a tooltip.
   */
  validationHint: PropTypes.string,
  /**
   * Override styles for the Checkbox component.
   */
  className: PropTypes.string
};

Checkbox.defaultProps = {
  onChange: undefined,
  id: null,
  checked: false,
  value: '',
  invalid: false,
  disabled: false,
  children: null,
  className: ''
};

/**
 * @component
 */
export default Checkbox;
