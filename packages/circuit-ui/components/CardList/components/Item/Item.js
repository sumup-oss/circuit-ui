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

import { isEnter, isSpacebar } from '../../../../util/key-codes';

const baseStyles = ({ theme }) => css`
  label: cardlist__item;

  align-items: center;
  position: relative;
  cursor: pointer;
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};

  &:first-of-type {
    border-top-left-radius: ${theme.borderRadius.mega};
    border-top-right-radius: ${theme.borderRadius.mega};
  }

  &:last-child {
    border-bottom-left-radius: ${theme.borderRadius.mega};
    border-bottom-right-radius: ${theme.borderRadius.mega};
    border-bottom: none;
  }
`;

const getBorderStyles = (theme) => css`
  outline: none;

  &::after {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    box-shadow: 0px 0px 0px ${theme.borderWidth.mega} ${theme.colors.b500};
    border-radius: ${theme.borderRadius.mega};
  }
`;

const paddingStyles = ({ theme, padding }) =>
  padding &&
  css`
    padding: ${theme.spacings[padding]};
  `;

const selectedStyles = ({ theme, selected }) =>
  selected &&
  css`
    label: cardlist__item--selected;

    background: ${theme.colors.p100};

    ${getBorderStyles(theme)};
  `;

const hoverStyles = ({ theme }) => css`
  @media (hover: hover) {
    &:hover {
      ${getBorderStyles(theme)};
    }
  }

  &:focus {
    ${getBorderStyles(theme)};
  }
`;

const BaseItem = styled('div')(
  baseStyles,
  paddingStyles,
  selectedStyles,
  hoverStyles,
);

const createOnKeyDown = (onClick) => {
  if (!onClick) {
    return null;
  }

  return (event) => {
    // Most clickable HTML elements can also be triggered by pressing the
    // spacebar or enter key.
    if (isEnter(event) || isSpacebar(event)) {
      onClick(event);
    }
  };
};

const Item = (props) => (
  <BaseItem
    aria-selected={props.selected}
    onKeyDown={createOnKeyDown(props.onClick)}
    {...props}
  />
);

Item.propTypes = {
  /**
   * When true, shows the item with selected styles.
   */
  selected: PropTypes.bool,
  /**
   * A Circuit UI spacings size.
   */
  padding: PropTypes.oneOf(['kilo', 'mega', 'giga']),
  /**
   * Content of the list item.
   */
  children: PropTypes.node.isRequired,
};

Item.defaultProps = {
  padding: 'giga',
  selected: false,
  tabIndex: 0,
};

/**
 * @component
 */
export default Item;
