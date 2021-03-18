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

import { getSpanStyles, getSkipStyles, getBreakPointStyles } from './utils';

const baseStyles = ({ theme, span, skip }) => css`
  label: col;

  box-sizing: border-box;
  float: left;

  ${getBreakPointStyles(theme)};
  ${getSpanStyles(theme, span)};
  ${getSkipStyles(theme, skip)};
`;

/**
 * Content wrapping for the Grid component. Allows sizing based on provided
 * props.
 */
const Col = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'span',
})(baseStyles);

const sizingProp = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number,
  PropTypes.string,
]);

Col.propTypes = {
  /**
   * The amount to skip for a column. If the value is a number/string it will
   * be applied with no media query. If the value is an object it will apply
   * each value based on the key breakpoint, IE:
   * { untilKilo: 6 } will create a style for the untilKilo media query with a
   * skip of 6 columns. Accepts negative values as well.
   */
  skip: sizingProp,
  /**
   * The amount to span for a column. If the value is a number/string it will
   * be applied with no media query. If the value is an object it will apply
   * each value based on the key breakpoint, IE:
   * { untilKilo: 6 } will create a style for the untilKilo media query with a
   * span of 6 columns.
   */
  span: sizingProp,
};

/**
 * @component
 */
export default Col;
