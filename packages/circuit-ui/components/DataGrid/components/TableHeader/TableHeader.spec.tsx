import { describe, expect, it, vi } from 'vitest';
import type { ReactElement } from 'react';

import { axe, render, screen, userEvent } from '../../../../util/test-utils.js';
import { utilClasses } from '../../../../styles/utility.js';

import { TableHeader, type TableHeaderProps } from './TableHeader.js';

type Data = {
  name: string;
  age: number;
};

const columns: TableHeaderProps<Data>['columns'] = [
  {
    id: 'name',
    label: 'Name',
    type: { name: 'text' },
  },
  {
    id: 'age',
    label: 'Age',
    type: { name: 'number' },
  },
];

const defaultProps = {
  columns,
} satisfies TableHeaderProps<Data>;

function renderTableHeader(ui: ReactElement) {
  return render(
    <table>
      <thead>{ui}</thead>
    </table>,
  );
}

describe('TableHeader', () => {
  it('should render a column header for each column', () => {
    renderTableHeader(<TableHeader {...defaultProps} />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(columns.length);
  });

  it('should render column labels', () => {
    renderTableHeader(<TableHeader {...defaultProps} />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    expect(screen.getByRole('columnheader', { name: 'Age' })).toBeVisible();
  });

  it('should initially set tabIndex to 0 on the first th', () => {
    renderTableHeader(<TableHeader {...defaultProps} />);
    const headers = screen.getAllByRole('columnheader');
    expect(headers[0]).toHaveAttribute('tabIndex', '0');
    expect(headers[1]).toHaveAttribute('tabIndex', '-1');
  });

  it('should hide the label of the row-actions column visually', () => {
    const columnsWithActions: TableHeaderProps<Data>['columns'] = [
      ...columns,
      {
        id: 'row-actions',
        label: 'Actions',
        type: {
          name: 'row-actions',
          actions: [],
          label: 'Actions',
          labelDescription: (data) => `Actions for user ${data.name}`,
        },
      },
    ];
    renderTableHeader(
      <TableHeader {...defaultProps} columns={columnsWithActions} />,
    );
    const label = screen.getByText('Actions');
    expect(label.className).toContain(utilClasses.hideVisually);
  });

  describe('Sorting', () => {
    const sortableColumns: TableHeaderProps<Data>['columns'] = [
      { ...columns[0], sortable: true },
      columns[1],
    ];

    it('should render a sort button for sortable columns only', () => {
      renderTableHeader(
        <TableHeader
          {...defaultProps}
          columns={sortableColumns}
          onSortChange={vi.fn()}
        />,
      );

      expect(screen.getAllByRole('button')).toHaveLength(1);
      expect(screen.getByRole('button', { name: 'Name' })).toBeVisible();
    });

    it('should not render a sort button without onSortChange', () => {
      renderTableHeader(
        <TableHeader {...defaultProps} columns={sortableColumns} />,
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should mark only the sorted column with aria-sort', () => {
      renderTableHeader(
        <TableHeader
          {...defaultProps}
          columns={sortableColumns}
          sort={{ columnId: 'name', direction: 'descending' }}
          onSortChange={vi.fn()}
        />,
      );

      expect(
        screen.getByRole('columnheader', { name: 'Name' }),
      ).toHaveAttribute('aria-sort', 'descending');
      expect(
        screen.getByRole('columnheader', { name: 'Age' }),
      ).not.toHaveAttribute('aria-sort');
    });

    it('should call onSortChange with the next sorting when clicking the button', async () => {
      const onSortChange = vi.fn();
      renderTableHeader(
        <TableHeader
          {...defaultProps}
          columns={sortableColumns}
          sort={{ columnId: 'name', direction: 'ascending' }}
          onSortChange={onSortChange}
        />,
      );

      await userEvent.click(screen.getByRole('button', { name: 'Name' }));

      expect(onSortChange).toHaveBeenCalledWith({
        columnId: 'name',
        direction: 'descending',
      });
    });

    it('should meet accessibility guidelines', async () => {
      const { container } = renderTableHeader(
        <TableHeader
          {...defaultProps}
          columns={sortableColumns}
          sort={{ columnId: 'name', direction: 'ascending' }}
          onSortChange={vi.fn()}
        />,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = renderTableHeader(<TableHeader {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
