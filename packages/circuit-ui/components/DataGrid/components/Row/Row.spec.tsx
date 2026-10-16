import { describe, expect, it } from 'vitest';
import type { ReactElement } from 'react';

import { axe, render, screen } from '../../../../util/test-utils.js';

import { Row, type RowProps } from './Row.js';
import type { Column } from '../../types.js';

type Data = {
  name: string;
  age: number;
};

const data: Data = {
  name: 'Ada Lovelace',
  age: 36,
};

const columns: RowProps<Data>['columns'] = [
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

const columnWithGetValue: Column<Data> = {
  ...columns[0],
  getValue: (value) => value.name.split(' ')[0],
};

const defaultProps = {
  columns,
  data,
  rowIndex: 0,
  formattingLocale: 'en-US',
} satisfies RowProps<Data>;

function renderRow(ui: ReactElement) {
  return render(
    <table>
      <tbody>{ui}</tbody>
    </table>,
  );
}

describe('Row', () => {
  it('should render a cell for each column', () => {
    renderRow(<Row {...defaultProps} />);
    expect(screen.getAllByRole('gridcell')).toHaveLength(columns.length);
  });

  it('should render formatted cell content from data', () => {
    renderRow(<Row {...defaultProps} />);
    expect(screen.getByText(data.name)).toBeVisible();
    expect(screen.getByText(String(data.age))).toBeVisible();
  });

  it('should render formatted cell content of column with `getValue()` from data', () => {
    renderRow(<Row {...defaultProps} {...{ columns: [columnWithGetValue] }} />);
    expect(screen.getByText('Ada')).toBeVisible();
  });

  it('should use a custom render function when provided', () => {
    const customColumns: RowProps<Data>['columns'] = [
      {
        id: 'name',
        label: 'Name',
        type: { name: 'custom', render: ({ name, age }) => `${name} (${age})` },
      },
    ];
    renderRow(<Row {...defaultProps} columns={customColumns} />);
    expect(screen.getByText('Ada Lovelace (36)')).toBeVisible();
  });

  it('should set aria-colindex on each cell', () => {
    renderRow(<Row {...defaultProps} />);
    const cells = screen.getAllByRole('gridcell');
    cells.forEach((cell, index) => {
      expect(cell).toHaveAttribute('aria-colindex', String(index + 1));
    });
  });

  it('should set tabIndex to -1 on all cells when isCurrentY is false', () => {
    renderRow(<Row {...defaultProps} />);
    const cells = screen.getAllByRole('gridcell');
    cells.forEach((cell) => {
      expect(cell).toHaveAttribute('tabIndex', '-1');
    });
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = renderRow(<Row {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
