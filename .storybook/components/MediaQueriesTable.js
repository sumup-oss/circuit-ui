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
import { withTheme, ThemeProvider } from 'emotion-theming';
import { light } from '@sumup/design-tokens';

import { Table } from '../../src';

const HEADERS = ['Breakpoint name', 'Query'];

const renderBreakpoint = bp => {
  if (typeof bp === 'number') {
    return `(min-width: ${bp.toString()}px)`;
  }

  return bp;
};

const TableWrapper = withTheme(({ theme }) => (
  <Table
    headers={HEADERS}
    rows={Object.keys(theme.breakpoints).map(bp => [
      bp,
      renderBreakpoint(theme.breakpoints[bp])
    ])}
  />
));

const MediaQueriesTable = () => (
  <ThemeProvider theme={light}>
    <TableWrapper />
  </ThemeProvider>
);

export default MediaQueriesTable;
