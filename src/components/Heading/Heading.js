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

import { childrenPropType } from '../../util/shared-prop-types';
import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA, TERA, PETA, EXA, ZETTA } = sizes;

const mobileSizeMap = {
  [KILO]: KILO,
  [MEGA]: MEGA,
  [GIGA]: MEGA,
  [TERA]: GIGA,
  [PETA]: TERA,
  [EXA]: PETA,
  [ZETTA]: PETA
};

const baseStyles = ({ theme }) => css`
  label: heading;
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacings.giga};
`;

const sizeStyles = ({ theme, size }) =>
  size &&
  css`
    label: ${`heading--${size}`};
    font-size: ${theme.typography.headings[mobileSizeMap[size]].fontSize};
    line-height: ${theme.typography.headings[mobileSizeMap[size]].lineHeight};

    ${theme.mq.kilo} {
      font-size: ${theme.typography.headings[size].fontSize};
      line-height: ${theme.typography.headings[size].lineHeight};
    }
  `;

const noMarginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: heading--no-margin;
    margin-bottom: 0;
  `;

const HeadingElement = styled('h2', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'size'
})`
  ${baseStyles};
  ${sizeStyles};
  ${noMarginStyles};
`;

/**
 * A flexible heading component capable of rendering using any HTML heading tag.
 */
const Heading = props => <HeadingElement {...props} />;

Heading.KILO = KILO;
Heading.MEGA = MEGA;
Heading.GIGA = GIGA;
Heading.TERA = TERA;
Heading.PETA = PETA;
Heading.EXA = EXA;
Heading.ZETTA = ZETTA;

Heading.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
  /**
   * A Circuit UI heading size.
   */
  size: PropTypes.oneOf([
    Heading.KILO,
    Heading.MEGA,
    Heading.GIGA,
    Heading.TERA,
    Heading.PETA,
    Heading.EXA,
    Heading.ZETTA
  ]),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * Removes the default bottom margin from the heading.
   */
  noMargin: PropTypes.bool,
  /**
   * The HTML heading element to render.
   */
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

Heading.defaultProps = {
  as: 'h2',
  size: Heading.PETA,
  className: '',
  noMargin: false,
  children: null
};

/**
 * @component
 */
export default Heading;
