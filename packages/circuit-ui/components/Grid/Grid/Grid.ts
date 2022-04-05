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

import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import styled, { NoTheme, StyleProps } from '../../../styles/styled';
import { GridValue } from '../types';
import { composeBreakpoints, wrapStyles } from '../utils';

const baseStyles = css`
  margin: 0 auto;
  width: 100%;
`;

const createGutterStyles = (theme: Theme, grid: GridValue) => {
  const styles = `
      max-width: ${grid.maxWidth};
      padding-left: calc(${grid.gutter} / 2);
      padding-right: calc(${grid.gutter} / 2);
    `;
  return wrapStyles(theme, grid.breakpoint, styles);
};

const gutterStyles = ({ theme }: StyleProps) =>
  composeBreakpoints(createGutterStyles, theme, theme.grid);

/**
 * A basic 12-column grid component.
 */
export const Grid = styled('div')<NoTheme>(baseStyles, gutterStyles);
