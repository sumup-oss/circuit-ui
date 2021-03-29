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

import styled from '@emotion/styled';
import { css } from '@emotion/core';

const getBreakPointStyles = (theme, breakpoint) => {
  const config = theme.grid[breakpoint];

  if (!config) {
    return null;
  }

  return `${theme.mq[breakpoint]} {
    max-width: ${config.maxWidth};
    padding-left: calc(${config.gutter} / 2);
    padding-right: calc(${config.gutter} / 2);
  }`;
};

const baseStyles = ({ theme }) => css`
  label: grid;

  margin: 0 auto;
  width: 100%;

  ${getBreakPointStyles(theme, 'untilKilo')};
  ${getBreakPointStyles(theme, 'kilo')};
  ${getBreakPointStyles(theme, 'mega')};
  ${getBreakPointStyles(theme, 'giga')};
  ${getBreakPointStyles(theme, 'tera')};
`;

/**
 * A basic 12-column grid component.
 */
const Grid = styled('div')(baseStyles);

/**
 * @component
 */
export default Grid;
