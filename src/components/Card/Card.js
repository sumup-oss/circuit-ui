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
import isPropValid from '@emotion/is-prop-valid';

import { childrenPropType } from '../../util/shared-prop-types';
import {
  shadowSingle,
  shadowDouble,
  shadowTriple,
} from '../../styles/style-helpers';

const baseStyles = ({ theme }) => css`
  label: card;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.mega};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const shadowStyles = ({ theme, shadow }) => {
  if (!shadow) {
    return null;
  }
  const shadowOptions = {
    single: shadowSingle,
    double: shadowDouble,
    triple: shadowTriple,
  };
  return css`
    label: ${`card--shadow-${shadow}`};
    ${shadowOptions[shadow]({ theme })};
  `;
};

const spacingStyles = ({ theme, spacing }) => {
  if (!spacing) {
    return null;
  }
  const spacings = {
    mega: `
      ${theme.spacings.mega} ${theme.spacings.mega}
    `,
    giga: `
      ${theme.spacings.mega} ${theme.spacings.giga}
    `,
  };
  return css`
    label: ${`card--spacing-${spacing}`};
    padding: ${spacings[spacing]};
  `;
};

/**
 * Card component that is used for displaying content on a grid.
 */
const Card = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'spacing',
})(baseStyles, shadowStyles, spacingStyles);

Card.propTypes = {
  /**
   * The shadow depth of the Card.
   */
  shadow: PropTypes.oneOf(['single', 'double', 'triple']),
  /**
   * The padding of the Card.
   */
  spacing: PropTypes.oneOf(['mega', 'giga']),
  /**
   * Content to be rendered inside the Card.
   */
  children: childrenPropType,
};

Card.defaultProps = {
  spacing: 'giga',
  shadow: 'single',
};

/**
 * @component
 */
export default Card;
