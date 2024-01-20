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

/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import isPropValid from '../../../../styles/is-prop-valid.js';
import styled, { StyleProps } from '../../../../styles/styled.js';
import { isNumber, isString } from '../../../../util/type-check.js';
import { clamp } from '../../../../util/helpers.js';
import { BreakpointOptions, GridValue } from '../types.js';
import { wrapStyles, normalizeToNumber, composeBreakpoints } from '../utils.js';
import { MAX_COL_WIDTH, MIN_COL_SPAN } from '../constants.js';

type Option = string | number;

export interface ColProps {
  /**
   * The amount to skip for a column. If the value is a number/string it will
   * be applied with no media query. If the value is an object it will apply
   * each value based on the key breakpoint, i.e. `{ untilKilo: 6 }` will
   * create a style for the untilKilo media query with a skip of 6 columns.
   * Accepts negative values as well.
   */
  skip?: Option | BreakpointOptions<Option>;
  /**
   * The amount to span for a column. If the value is a number/string it will
   * be applied with no media query. If the value is an object it will apply
   * each value based on the key breakpoint, i.e. `{ untilKilo: 6 }` will
   * create a style for the untilKilo media query with a span of 6 columns.
   */
  span?: Option | BreakpointOptions<Option>;
}

const baseStyles = css`
  box-sizing: border-box;
  float: left;
`;

const createGutterStyles = (theme: Theme, grid: GridValue) => {
  const styles = `
      padding-left: calc(${grid.gutter} / 2);
      padding-right: calc(${grid.gutter} / 2);
    `;
  return wrapStyles(theme, grid.breakpoint, styles);
};

const gutterStyles = ({ theme }: StyleProps) =>
  composeBreakpoints(createGutterStyles, theme, theme.grid);

const createSpanStyles = (
  theme: Theme,
  grid: GridValue,
  span: number | string,
) => {
  const value = normalizeToNumber(span);
  const safeSpan = clamp(value, MIN_COL_SPAN, grid.cols);
  const styles = `
    width: ${(MAX_COL_WIDTH / grid.cols) * safeSpan}%;
  `;
  return wrapStyles(theme, grid.breakpoint, styles);
};

const spanStyles = ({ theme, span = 0 }: StyleProps & ColProps) =>
  isNumber(span) || isString(span)
    ? createSpanStyles(theme, theme.grid.default, span)
    : composeBreakpoints(createSpanStyles, theme, span);

const createSkipStyles = (
  theme: Theme,
  grid: GridValue,
  skip: number | string,
) => {
  const value = normalizeToNumber(skip);
  const safeSkip = clamp(value, grid.cols * -1, grid.cols - 1);
  const styles = `
    left: ${(MAX_COL_WIDTH / grid.cols) * safeSkip}%;
    position: relative;
  `;
  return wrapStyles(theme, grid.breakpoint, styles);
};

const skipStyles = ({ theme, skip = 0 }: StyleProps & ColProps) =>
  isNumber(skip) || isString(skip)
    ? createSkipStyles(theme, theme.grid.default, skip)
    : composeBreakpoints(createSkipStyles, theme, skip);

/**
 * @legacy
 *
 * Content wrapping for the Grid component. Allows sizing based on provided
 * props.
 */
export const Col = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'span',
})<ColProps>(baseStyles, gutterStyles, spanStyles, skipStyles);
