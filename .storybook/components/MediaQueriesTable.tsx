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

import { useTheme, ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';
import { Table } from '@sumup/circuit-ui';

const HEADERS = ['Breakpoint name', 'Query'];

const TableWrapper = () => {
  const theme = useTheme();
  return (
    <Table
      headers={HEADERS}
      rows={Object.keys(theme.breakpoints).map((bp) => [
        bp,
        theme.breakpoints[bp],
      ])}
    />
  );
};

const MediaQueriesTable = () => (
  <ThemeProvider theme={light}>
    <TableWrapper />
  </ThemeProvider>
);

export default MediaQueriesTable;
