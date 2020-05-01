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
import isPropValid from '@emotion/is-prop-valid';

import { sizes } from '../../styles/constants';
import { textMega } from '../../styles/style-helpers';
import { useComponents } from '../ComponentsContext';

const { KILO, MEGA, GIGA } = sizes;

const calculatePadding = ({ theme, size: buttonSize }) => (diff = '0px') => {
  const sizeMap = {
    /* eslint-disable max-len */
    [KILO]: `calc(${theme.spacings.bit} - ${diff}) calc(${theme.spacings.mega} - ${diff})`,
    [MEGA]: `calc(${theme.spacings.byte} - ${diff}) calc(${theme.spacings.giga} - ${diff})`,
    [GIGA]: `calc(${theme.spacings.kilo} - ${diff}) calc(${theme.spacings.tera} - ${diff})`
    /* eslint-enable max-len */
  };

  if (!sizeMap[buttonSize] && buttonSize) {
    return null;
  }

  return sizeMap[buttonSize] || sizeMap.mega;
};

const baseStyles = ({ theme, ...props }) => css`
  label: button;
  background-color: ${theme.colors.n100};
  border-color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.mega};
  border-style: solid;
  border-width: 1px;
  box-shadow: inset 0 1px 0 1px rgba(255, 255, 255, 0.06);
  display: block;
  color: ${theme.colors.n700};
  cursor: pointer;
  font-weight: ${theme.fontWeight.bold};
  width: auto;
  height: auto;
  text-align: center;
  text-decoration: none;
  ${textMega({ theme })};

  &:active {
    background-color: ${theme.colors.n300};
    border-color: ${theme.colors.n500};
    box-shadow: inset 0 4px 8px 0 rgba(12, 15, 20, 0.3);
  }

  &:focus {
    border-color: ${theme.colors.n500};
    border-width: 2px;
    outline: 0;
    padding: ${calculatePadding({ theme, ...props })('1px')};
  }

  &:hover {
    background-color: ${theme.colors.n300};
  }

  &:hover,
  &:active {
    border-color: ${theme.colors.n500};
    border-width: 1px;
    padding: ${calculatePadding({ theme, ...props })()};
  }

  &[href] {
    display: inline-block;
  }

  &:disabled,
  &[disabled] {
    opacity: 0.4;
    pointer-events: none;
    user-selectable: none;
  }
`;

const primaryStyles = ({ theme, primary }) =>
  primary &&
  css`
    label: button--primary;
    background-color: ${theme.colors.p500};
    border-color: ${theme.colors.p700};
    color: ${theme.colors.white};

    &:active {
      background-color: ${theme.colors.p700};
      border-color: ${theme.colors.p900};
    }

    &:focus {
      border-color: ${theme.colors.p700};
    }

    &:hover {
      background-color: ${theme.colors.p700};
    }

    &:hover,
    &:active {
      border-color: ${theme.colors.p900};
    }
  `;

const stretchStyles = ({ stretch }) =>
  stretch &&
  css`
    label: button--stretched;
    width: 100%;
    display: block;
  `;

const secondaryStyles = ({ theme, secondary, ...props }) =>
  secondary &&
  css`
    label: button--secondary;
    background-color: transparent;
    border-color: ${theme.colors.n900};
    border-width: 0;
    box-shadow: none;
    color: ${theme.colors.n700};

    &:active {
      background-color: transparent;
      border-color: ${theme.colors.n900};
      border-width: 0;
      box-shadow: none;
    }

    &:focus {
      border-color: ${theme.colors.n900};
      border-width: 2px;
      box-shadow: none;
      padding: ${calculatePadding({ theme, ...props })('2px')};
    }

    &:hover {
      background-color: transparent;
      border-width: 0;
      border-color: ${theme.colors.n900};
    }

    &:active,
    &:hover,
    &:hover:focus,
    &:active:focus {
      padding: ${calculatePadding({ theme, ...props })()};
    }

    &:active,
    &:hover,
    &:focus {
      color: ${theme.colors.n900};
    }

    &:active:focus,
    &:hover:focus {
      border-color: ${theme.colors.n900};
      border-width: 2px;
      box-shadow: none;
      padding: ${calculatePadding({ theme, ...props })('2px')};
    }
  `;

const sizeStyles = props => {
  const { size: buttonSize } = props;
  if (!buttonSize) {
    return null;
  }
  const padding = calculatePadding(props)();
  return css({
    label: `button--${buttonSize}`,
    padding
  });
};

const buttonLoadingStyles = ({ isLoading }) =>
  isLoading &&
  css`
    label: button--loading;
    overflow-y: hidden;
    pointer-events: none;
  `;

const ButtonElement = styled('button', {
  shouldForwardProp: isPropValid
})`
  ${baseStyles};
  ${primaryStyles};
  ${sizeStyles};
  ${secondaryStyles};
  ${stretchStyles};
  ${buttonLoadingStyles};
`;

/**
 * A button component with support for the anchor and button
 * element as well as a button-looking button and a text link.
 */
const Button = ({ href, ...props }) => {
  const { Link } = useComponents();
  const LinkButtonElement = ButtonElement.withComponent(Link);
  return href ? (
    <LinkButtonElement {...{ ...props, href }} />
  ) : (
    <ButtonElement {...props} />
  );
};

Button.KILO = KILO;
Button.MEGA = MEGA;
Button.GIGA = GIGA;

Button.propTypes = {
  /**
   * Should the Button be disabled?
   */
  disabled: PropTypes.bool,
  /**
   * URL the Button should lead to. Causes the Button to render an <a> tag.
   */
  href: PropTypes.string,
  /**
   * Renders a primary button using the brand color.
   */
  primary: PropTypes.bool,
  /**
   * Size of the button. Use the Button's KILO, MEGA, or GIGA properties.
   */
  size: PropTypes.oneOf([Button.KILO, Button.MEGA, Button.GIGA]),
  /**
   * Renders a secondary button.
   */
  secondary: PropTypes.bool,
  /**
   * Trigger stretch (full width) styles on the component.
   */
  stretch: PropTypes.bool,
  /**
   * Link target. Should only be passed, if href is passed, too.
   */
  target: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  href: null,
  primary: false,
  secondary: false,
  size: Button.MEGA,
  stretch: false,
  target: null
};

/**
 * @component
 */
export default Button;
