import React from 'react';
import { withTheme, ThemeProvider } from 'emotion-theming';
import { standard } from '../../../../src/themes';
import Table from '../../../../src/components/Table';

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
  <ThemeProvider theme={standard}>
    <TableWrapper />
  </ThemeProvider>
);

export default MediaQueriesTable;
