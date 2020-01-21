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
import { sizes } from '../../styles/constants';

const { KILO, MEGA } = sizes;

const baseStyles = ({ theme }) => css`
  label: sub-heading;
  text-transform: uppercase;
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacings.kilo};
`;

const sizeStyles = ({ theme, size }) =>
  size &&
  css`
    label: ${`sub-heading--${size}`};
    font-size: ${theme.typography.subHeadings[size].fontSize};
    line-height: ${theme.typography.subHeadings[size].lineHeight};
  `;

const noMarginStyles = ({ noMargin }) =>
  noMargin &&
  css`
    label: sub-heading--no-margin;
    margin-bottom: 0;
  `;

const SubHeadingElement = styled('h3')(baseStyles, sizeStyles, noMarginStyles);

/**
 * A flexible subheading component capable of rendering using any HTML heading
 * tag, except h1.
 */

const SubHeading = props => <SubHeadingElement {...props} />;

SubHeading.KILO = KILO;
SubHeading.MEGA = MEGA;

SubHeading.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
  /**
   * A Circuit UI sub-heading size.
   */
  size: PropTypes.oneOf([SubHeading.KILO, SubHeading.MEGA]),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * Removes the default bottom margin from the subheading.
   */
  noMargin: PropTypes.bool,
  /**
   * The HTML heading element to render.
   */
  as: PropTypes.oneOf(['h2', 'h3', 'h4', 'h5', 'h6'])
};

SubHeading.defaultProps = {
  size: SubHeading.KILO,
  className: '',
  noMargin: false,
  children: null
};

/**
 * @component
 */
export default SubHeading;
