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

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { childrenPropType } from '../../util/shared-prop-types';
import { directions } from '../../styles/constants';

const getInlineStyles = theme => css`
  display: flex;
  flex-wrap: nowrap;

  > li:not(:last-of-type) {
    margin-bottom: 0;
    margin-right: ${theme.spacings.mega};
  }
`;

const baseStyles = ({ theme }) => css`
  label: button-group;
  list-style-type: none;
  width: 100%;

  > li {
    &:not(:last-of-type) {
      margin-bottom: ${theme.spacings.mega};
    }

    > * {
      width: 100%;
    }
  }

  ${theme.mq.kilo} {
    ${getInlineStyles(theme)}
  }
`;

const alignmentMap = {
  [directions.LEFT]: 'flex-start',
  [directions.CENTER]: 'center',
  [directions.RIGHT]: 'flex-end'
};

const alignmentStyles = ({ align }) => {
  if (!align) {
    return null;
  }

  const label = `button-group--${align}`;

  return css`
    label: ${label};
    justify-content: ${alignmentMap[align]};
  `;
};

const inlineMobileStyles = ({ theme, inlineMobile }) =>
  inlineMobile &&
  css`
    label: button-group--inline-mobile;

    ${theme.mq.untilKilo} {
      ${getInlineStyles(theme)};
    }
  `;

const ButtonGroupList = styled('ul')(
  baseStyles,
  alignmentStyles,
  inlineMobileStyles
);

/**
 * Groups its Button children into a list and adds margins between.
 */
const ButtonGroup = ({ children, ...props }) => (
  <ButtonGroupList {...props}>
    {Children.map(children, child => (child ? <li>{child}</li> : null))}
  </ButtonGroupList>
);

ButtonGroup.LEFT = directions.LEFT;
ButtonGroup.CENTER = directions.CENTER;
ButtonGroup.RIGHT = directions.RIGHT;

ButtonGroup.propTypes = {
  /**
   * Buttons to group.
   */
  children: childrenPropType.isRequired,
  /**
   * Direction to align the content. Either left/right
   */
  align: PropTypes.oneOf([
    ButtonGroup.LEFT,
    ButtonGroup.CENTER,
    ButtonGroup.RIGHT
  ]),
  /**
   * Whether to display buttons inline on mobile.
   */
  inlineMobile: PropTypes.bool
};

ButtonGroup.defaultProps = {
  align: ButtonGroup.RIGHT,
  inlineMobile: false
};

/**
 * @component
 */
export default ButtonGroup;
