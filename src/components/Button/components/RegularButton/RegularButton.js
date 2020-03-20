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
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { textMega, calculatePadding } from '../../../../styles/style-helpers';

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

const flatStyles = ({ theme, flat, secondary, ...props }) =>
  flat &&
  !secondary &&
  css`
    label: button--flat;
    border-width: 0px;
    box-shadow: 0 0 0 1px rgba(12, 15, 20, 0.02),
      0 2px 2px 0 rgba(12, 15, 20, 0.06), 0 4px 4px 0 rgba(12, 15, 20, 0.06);

    &:active {
      box-shadow: inset 0 4px 8px 0 rgba(12, 15, 20, 0.3);
    }

    &:hover {
      border-width: 0;
    }

    &:active:focus,
    &:hover:focus {
      border-width: 0;
      padding: ${calculatePadding({ theme, flat, secondary, ...props })()};
    }

    &:focus {
      border-width: 2px;
      padding: ${calculatePadding({ theme, flat, secondary, ...props })('2px')};
    }
  `;

const secondaryStyles = ({ theme, secondary, flat, ...props }) =>
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
      padding: ${calculatePadding({ theme, flat, secondary, ...props })('2px')};
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
      padding: ${calculatePadding({ theme, flat, secondary, ...props })()};
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
      padding: ${calculatePadding({ theme, flat, secondary, ...props })('2px')};
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

const ButtonElement = styled('button')`
  ${baseStyles};
  ${primaryStyles};
  ${sizeStyles};
  ${flatStyles};
  ${secondaryStyles};
  ${stretchStyles};
  ${buttonLoadingStyles};
`;

/* eslint-disable react/prop-types */
const RegularButton = ({ components, href, ...props }) => {
  const LinkButtonElement = ButtonElement.withComponent(components.Link);
  return href ? (
    <LinkButtonElement {...{ ...props, href }} />
  ) : (
    <ButtonElement {...props} />
  );
};

export default RegularButton;
export { calculatePadding };
