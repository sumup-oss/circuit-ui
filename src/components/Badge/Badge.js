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
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { size } from 'polished';
import { values } from 'lodash/fp';

import { subHeadingKilo } from '../../styles/style-helpers';
import { colorNames } from '../../styles/constants';

const COLOR_MAP = {
  [colorNames.SUCCESS]: {
    default: 'g500',
    hover: 'g700',
    active: 'g900'
  },
  [colorNames.WARNING]: {
    default: 'y500',
    hover: 'y700',
    active: 'y900'
  },
  [colorNames.DANGER]: {
    default: 'r500',
    hover: 'r700',
    active: 'r900'
  },
  [colorNames.PRIMARY]: {
    default: 'b500',
    hover: 'b700',
    active: 'b900'
  },
  [colorNames.NEUTRAL]: {
    default: 'n500',
    hover: 'n700',
    active: 'n900'
  }
};

const colorStyles = ({ theme, color, onClick }) => {
  const currentColor = COLOR_MAP[color];

  if (!currentColor) {
    return null;
  }

  return css`
    label: ${`badge--${color}`};
    background-color: ${theme.colors[currentColor.default]};
    ${onClick &&
      `
      &:hover {
        background-color: ${theme.colors[currentColor.hover]};
      }

      &:active {
        background-color: ${theme.colors[currentColor.active]};
      }
    `};
  `;
};

const baseStyles = ({ theme, onClick }) => css`
  label: badge;
  border-radius: 100px;
  color: ${theme.colors.white};
  cursor: ${onClick ? 'pointer' : 'default'};
  display: inline-block;
  padding: 0 ${theme.spacings.byte};
  ${subHeadingKilo({ theme })};
  font-weight: ${theme.fontWeight.bold};
  text-transform: uppercase;
  user-select: none;
  text-align: center;
`;

const circleStyles = ({ circle }) =>
  circle &&
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    ${size(24)};
  `;

/**
 * A badge for displaying update notifications etc.
 */
const Badge = styled('div')`
  ${baseStyles};
  ${colorStyles};
  ${circleStyles};
`;

Badge.propTypes = {
  /**
   * Callback for the click event.
   */
  onClick: PropTypes.func,
  /**
   * Ensures text is centered and the badge looks like a circle.
   */
  circle: PropTypes.bool,
  color: PropTypes.oneOf(values(colorNames))
};

Badge.NEUTRAL = colorNames.NEUTRAL;
Badge.PRIMARY = colorNames.PRIMARY;
Badge.SUCCESS = colorNames.SUCCESS;
Badge.WARNING = colorNames.WARNING;
Badge.DANGER = colorNames.DANGER;

Badge.defaultProps = {
  circle: false,
  color: Badge.NEUTRAL
};

/**
 * @component
 */
export default Badge;
