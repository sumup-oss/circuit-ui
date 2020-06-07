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

import { childrenPropType } from '../../util/shared-prop-types';
import {
  shadowSingle,
  shadowDouble,
  focusOutline,
  hideVisually
} from '../../styles/style-helpers';
import { uniqueId } from '../../util/id';

const wrapperStyles = ({ theme }) => css`
  label: selector;
  position: relative;
  margin-bottom: ${theme.spacings.mega};
`;

const SelectorWrapper = styled.div(wrapperStyles);

const baseStyles = ({ theme }) => css`
  label: selector__label;
  ${shadowSingle({ theme })};
  display: block;
  cursor: pointer;
  padding: ${theme.spacings.giga};
  border-radius: ${theme.borderRadius.giga};
  background-color: ${theme.colors.white};
  fill: ${theme.colors.n400};
  text-align: center;

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius.giga};
    border: ${theme.borderWidth.kilo} solid ${theme.colors.n500};
    transition: border 0.1s ease-in-out;
  }

  &:hover {
    background-color: ${theme.colors.n100};

    &::before {
      border: ${theme.borderWidth.mega} solid ${theme.colors.n500};
    }
  }
`;

const disabledStyles = ({ disabled, theme }) =>
  disabled &&
  css`
    label: selector__label--disabled;
    color: ${theme.colors.n500};
    cursor: default;
    pointer-events: none;

    &::before {
      border-color: ${theme.colors.n300};
    }
  `;

const SelectorLabel = styled.label(baseStyles, disabledStyles);

const inputStyles = ({ theme }) => css`
  label: selector__input;
  ${hideVisually()};

  &:focus + label::before {
    ${focusOutline({ theme })};
  }

  &:checked + label {
    background-color: ${theme.colors.b100};
    ${shadowDouble({ theme })};

    &::before {
      border: ${theme.borderWidth.mega} solid ${theme.colors.p500};
    }
  }
`;

const SelectorInput = styled.input(inputStyles);

const SelectorComponent = (
  {
    children,
    value,
    id,
    name,
    disabled,
    multiple,
    checked,
    onChange,
    ...props
  },
  ref
) => {
  const inputId = id || uniqueId('selector_');
  const type = multiple ? 'checkbox' : 'radio';
  return (
    <SelectorWrapper {...props}>
      <SelectorInput
        type={type}
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onClick={onChange}
        ref={ref}
      />
      <SelectorLabel htmlFor={inputId} disabled={disabled}>
        {children}
      </SelectorLabel>
    </SelectorWrapper>
  );
};

/**
 * A selector allows users to choose between several mutually-exlusive choices,
 * accompanied by descriptions, possibly with tabular data.
 */
const Selector = React.forwardRef(SelectorComponent);

Selector.propTypes = {
  /**
   * Controles/Toggles the checked state.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Value string for input.
   */
  value: PropTypes.string.isRequired,
  /**
   * Child nodes to be rendered as the label.
   */
  children: childrenPropType.isRequired,
  /**
   * The name of the selector.
   */
  name: PropTypes.string.isRequired,
  /**
   * A unique ID used to link the input and label.
   */
  id: PropTypes.string,
  /**
   * Whether the selector is selected or not.
   */
  checked: PropTypes.bool,
  /**
   * Whether the selector is disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * Whether the user can select multiple options.
   */
  multiple: PropTypes.bool,
  /**
   * The ref to the html dom element
   */
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.oneOf([PropTypes.instanceOf(HTMLInputElement)])
    })
  ])
};

Selector.defaultProps = {
  checked: false,
  disabled: false,
  multiple: false
};

/**
 * @component
 */
export default Selector;
