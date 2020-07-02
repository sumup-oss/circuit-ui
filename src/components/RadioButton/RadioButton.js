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
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import {
  disableVisually,
  hideVisually,
  focusOutline
} from '../../styles/style-helpers';
import { childrenPropType } from '../../util/shared-prop-types';
import { uniqueId } from '../../util/id';

const labelBaseStyles = ({ theme }) => css`
  label: radio-button__label;
  color: ${theme.colors.n700};
  padding-left: ${theme.spacings.giga};
  position: relative;
  cursor: pointer;

  &::before {
    box-sizing: border-box;
    height: ${theme.spacings.mega};
    width: ${theme.spacings.mega};
    box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.12);
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.n500};
    border-radius: 100%;
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: border 0.05s ease-in;
  }

  &::after {
    box-sizing: border-box;
    height: ${theme.spacings.byte};
    width: ${theme.spacings.byte};
    background-color: ${theme.colors.p500};
    border-radius: 100%;
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: ${theme.spacings.bit};
    transform: translateY(-50%) scale(0, 0);
    opacity: 0;
    transition: transform 0.05s ease-in, opacity 0.05s ease-in;
  }
`;

const labelInvalidStyles = ({ theme, invalid }) =>
  invalid &&
  css`
    label: radio-button--error;
    &:not(:focus)::before {
      border-color: ${theme.colors.r500};
      background-color: ${theme.colors.r100};
    }

    &:not(:focus)::after {
      background-color: ${theme.colors.r500};
    }
  `;

const labelDisabledStyles = ({ theme, disabled }) =>
  disabled &&
  css`
    label: radio-button--disabled;
    ${disableVisually()};

    &::before {
      ${disableVisually()};
      border-color: ${theme.colors.n500};
      background-color: ${theme.colors.n100};
    }

    &::after {
      ${disableVisually()};
      background-color: ${theme.colors.n500};
    }
  `;

const inputStyles = ({ theme }) => css`
  label: radio-button__input;

  &:focus + label::before {
    ${focusOutline({ theme })}
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

const RadioButtonInput = styled('input')(hideVisually, inputStyles);

const RadioButtonLabel = styled('label')(
  labelBaseStyles,
  labelDisabledStyles,
  labelInvalidStyles
);

const RadioButtonComponent = (
  { onChange, children, id, name, value, checked, ...props },
  ref
) => {
  const inputId = id || uniqueId('radio-button_');
  return (
    <>
      <RadioButtonInput
        {...props}
        type="radio"
        name={name}
        id={inputId}
        value={value}
        checked={checked}
        onClick={onChange}
        ref={ref}
      />
      <RadioButtonLabel {...props} htmlFor={inputId}>
        {children}
      </RadioButtonLabel>
    </>
  );
};

/**
 * RadioButton component for forms.
 */
const RadioButton = React.forwardRef(RadioButtonComponent);

RadioButton.propTypes = {
  /**
   * Callback used when the user toggles the radio button.
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
   * The name of the radio group that the radio button belongs to.
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
   * The ref to the html dom element
   */
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any
    })
  ])
};

RadioButton.defaultProps = {
  id: null,
  checked: false,
  invalid: false,
  disabled: false,
  children: null,
  ref: undefined
};

/**
 * @component
 */
export default RadioButton;
