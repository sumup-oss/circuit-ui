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
import isPropValid from '@emotion/is-prop-valid';

import {
  childrenPropType,
  deprecatedPropType
} from '../../util/shared-prop-types';
import { sizes } from '../../styles/constants';

import * as styles from './Text';

export const StyledText = styled('p', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'size'
})`
  ${styles.baseStyles};
  ${styles.sizeStyles};
  ${styles.marginStyles};
  ${styles.boldStyles};
  ${styles.italicStyles};
  ${styles.strikeThroughStyles};
`;

/**
 * The Text component is used for long-form text. Typically with
 * <p>, <div>, <article>, or <section> elements. Capable of rendering
 * using different HTML tags.
 */
const Text = ({ element, as, ...restProps }) => (
  <StyledText {...restProps} as={element || as} />
);

Text.KILO = sizes.KILO;
Text.MEGA = sizes.MEGA;
Text.GIGA = sizes.GIGA;

Text.propTypes = {
  /**
   * Child nodes to be rendered.
   */
  children: childrenPropType,
  /**
   * A Circuit UI body text size.
   */
  size: PropTypes.oneOf([Text.KILO, Text.MEGA, Text.GIGA]),
  /**
   * Optional additional className string to overwrite styles.
   */
  className: PropTypes.string,
  /**
   * Removes the default bottom margin from the text.
   */
  noMargin: PropTypes.bool,
  /**
   * Bolds the text.
   */
  bold: PropTypes.bool,
  /**
   * Bolds the text.
   */
  italic: PropTypes.bool,
  /**
   * Strikes through the text.
   */
  strike: PropTypes.bool,
  /**
   * The HTML element to render.
   */
  as: PropTypes.string,
  /**
   * @deprecated
   * The HTML input element to render.
   */
  element: deprecatedPropType(
    PropTypes.string,
    [
      'Emotion 10 introduced the ability to change the HTML element.',
      'Use the "as" prop instead.'
    ].join(' ')
  )
};

Text.defaultProps = {
  size: Text.MEGA,
  className: '',
  noMargin: false,
  bold: false,
  italic: false,
  children: null
};

/**
 * @component
 */
export default Text;
