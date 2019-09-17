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

import PropTypes from 'prop-types';
import { flow } from 'lodash/fp';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { setStatic } from 'recompose';

import withKeyboardEvents from '../../../../util/withKeyboardEvents';
import withAriaSelected from '../../../../util/withAriaSelected';
import { sizes } from '../../../../styles/constants';
import { shadowBorder } from '../../../../styles/style-helpers';

const { KILO, MEGA, GIGA } = sizes;

const sizeMap = {
  [KILO]: 'kilo',
  [MEGA]: 'mega',
  [GIGA]: 'giga'
};

const baseStyles = ({ theme }) => css`
  label: cardlist__item;

  align-items: center;
  position: relative;
  cursor: pointer;
  border-bottom: ${theme.borderWidth.kilo} solid ${theme.colors.n300};

  &:first-child {
    border-top-left-radius: ${theme.borderRadius.mega};
    border-top-right-radius: ${theme.borderRadius.mega};
  }

  &:last-child {
    border-bottom-left-radius: ${theme.borderRadius.mega};
    border-bottom-right-radius: ${theme.borderRadius.mega};
  }
`;

const paddingStyles = ({ theme, padding }) =>
  padding &&
  css`
    padding: ${theme.spacings[sizeMap[padding]]};
  `;

const selectedStyles = ({ theme, selected }) =>
  selected &&
  css`
    label: cardlist__item--selected;

    background: ${theme.colors.p100};
  `;

const getBorderStyles = theme => css`
  outline: none;

  &::after {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    ${shadowBorder(theme.colors.b500, theme.borderWidth.mega)};
    border-radius: ${theme.borderRadius.mega};
  }
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

const Item = styled('div')(
  baseStyles,
  paddingStyles,
  selectedStyles,
  hoverStyles
);

Item.propTypes = {
  /**
   * When true, shows the item with selected styles.
   */
  selected: PropTypes.bool,
  /**
   * A Circuit UI spacings size.
   */
  padding: PropTypes.oneOf([KILO, MEGA, GIGA]),
  /**
   * Content of the list item.
   */
  children: PropTypes.node.isRequired
};

Item.defaultProps = {
  padding: GIGA,
  selected: false,
  tabIndex: 0
};

/**
 * @component
 */
export default flow(
  withKeyboardEvents,
  withAriaSelected,
  setStatic('KILO', KILO),
  setStatic('MEGA', MEGA),
  setStatic('GIGA', GIGA)
)(Item);
