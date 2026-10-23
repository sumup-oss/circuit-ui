import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { createRef } from 'react';

import {
  axe,
  render,
  screen,
  userEvent,
  within,
} from '../../util/test-utils.js';
import { useMedia } from '../../hooks/useMedia/index.js';

import { DataGrid, type DataGridProps } from './DataGrid.js';
import { columns, type Member, members } from './fixtures.js';
import type { MobileConfig } from './types.js';

vi.mock('../../hooks/useMedia/index.js');

const mobileConfig = {
  slots: {
    label: 'full_name',
    details: 'age',
    trailingLabel: 'subscriptionPrice',
  },
} satisfies MobileConfig<Member>;

const defaultProps = {
  columns,
  data: members,
  label: 'Members',
  formattingLocale: 'en-US',
} satisfies DataGridProps<Member>;

describe('DataGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useMedia as Mock).mockReturnValue(false);
  });

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<DataGrid {...defaultProps} className={className} />);

    expect(screen.getByRole('grid').className).toContain(className);
  });

  it('should forward the ref to the table element', () => {
    const ref = createRef<HTMLTableElement>();
    render(<DataGrid {...defaultProps} ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('grid'));
  });

  it('should render with caption', () => {
    render(<DataGrid {...defaultProps} />);

    expect(
      screen.getByRole('grid', { name: defaultProps.label }),
    ).toBeInTheDocument();
  });

  it('should render a column header for each column', () => {
    render(<DataGrid {...defaultProps} />);

    expect(screen.getAllByRole('columnheader')).toHaveLength(columns.length);
    expect(
      screen.getByRole('columnheader', { name: 'Full Name' }),
    ).toBeVisible();
    expect(screen.getByRole('columnheader', { name: 'Age' })).toBeVisible();
  });

  it('should render a row for each data item', () => {
    render(<DataGrid {...defaultProps} />);

    // The header row is rendered inside the table body.
    expect(screen.getAllByRole('row')).toHaveLength(members.length + 1);
  });

  it('should render formatted cell content', () => {
    render(<DataGrid {...defaultProps} />);

    expect(screen.getByText('Jane Doe')).toBeVisible();
    expect(screen.getByText('John Smith')).toBeVisible();
    expect(screen.getByText('32')).toBeVisible();
    expect(screen.getByText('Active')).toBeVisible();
    expect(screen.getByText('Cancelled')).toBeVisible();
    expect(screen.getByText('€39.99')).toBeVisible();
    expect(screen.getByLabelText('Yes')).toBeVisible();
    expect(screen.getByLabelText('No')).toBeVisible();
  });

  it('should set the column and row counts', () => {
    render(<DataGrid {...defaultProps} />);

    const table = screen.getByRole('grid', { name: 'Members' });
    expect(table).toHaveAttribute('aria-colcount', String(columns.length));
    expect(table).toHaveAttribute('aria-rowcount', String(members.length));
  });

  it('should render as a table by default', () => {
    render(<DataGrid {...defaultProps} />);

    expect(screen.getByRole('grid', { name: 'Members' })).toBeVisible();
  });

  it('should render as a grid when role is "grid"', () => {
    render(<DataGrid {...defaultProps} role="grid" />);

    expect(screen.getByRole('grid', { name: 'Members' })).toBeVisible();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('should format values with the formatting locale', () => {
    render(<DataGrid {...defaultProps} formattingLocale="de-DE" />);

    expect(screen.getByText('39,99 €')).toBeVisible();
  });

  it('should place initial tab focus on the first header cell', async () => {
    render(<DataGrid {...defaultProps} />);
    const [firstHeader, secondHeader] = screen.getAllByRole('columnheader');

    expect(firstHeader).toHaveAttribute('tabIndex', '0');
    expect(secondHeader).toHaveAttribute('tabIndex', '-1');

    await userEvent.tab();

    expect(firstHeader).toHaveFocus();
  });

  it('should query the default mobile breakpoint', () => {
    render(<DataGrid {...defaultProps} />);

    expect(useMedia).toHaveBeenCalledWith('(max-width: 768px)');
  });

  it('should query a custom mobile breakpoint', () => {
    render(<DataGrid {...defaultProps} mobileBreakpoint={1024} />);

    expect(useMedia).toHaveBeenCalledWith('(max-width: 1024px)');
  });

  describe('keyboard navigation', () => {
    it('should move focus to the right and back to the left', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader, secondHeader] = screen.getAllByRole('columnheader');

      await userEvent.tab();
      await userEvent.keyboard('{ArrowRight}');

      expect(secondHeader).toHaveFocus();
      expect(secondHeader).toHaveAttribute('tabIndex', '0');
      expect(firstHeader).toHaveAttribute('tabIndex', '-1');

      await userEvent.keyboard('{ArrowLeft}');

      expect(firstHeader).toHaveFocus();
      expect(firstHeader).toHaveAttribute('tabIndex', '0');
      expect(secondHeader).toHaveAttribute('tabIndex', '-1');
    });

    it('should move focus down into the first row and back up', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader] = screen.getAllByRole('columnheader');
      const firstDataCell = within(screen.getAllByRole('row')[1]).getAllByRole(
        'gridcell',
      )[0];

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');

      expect(firstDataCell).toHaveFocus();
      expect(firstDataCell).toHaveAttribute('tabIndex', '0');
      expect(firstHeader).toHaveAttribute('tabIndex', '-1');

      await userEvent.keyboard('{ArrowUp}');

      expect(firstHeader).toHaveFocus();
      expect(firstHeader).toHaveAttribute('tabIndex', '0');
    });

    it('should not move focus left of the first column', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader] = screen.getAllByRole('columnheader');

      await userEvent.tab();
      await userEvent.keyboard('{ArrowLeft}');

      expect(firstHeader).toHaveFocus();
      expect(firstHeader).toHaveAttribute('tabIndex', '0');
    });

    it('should not move focus above the header row', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader] = screen.getAllByRole('columnheader');

      await userEvent.tab();
      await userEvent.keyboard('{ArrowUp}');

      expect(firstHeader).toHaveFocus();
      expect(firstHeader).toHaveAttribute('tabIndex', '0');
    });

    it('should not move focus below the last row', async () => {
      render(<DataGrid {...defaultProps} />);
      const lastRowCell = within(
        screen.getAllByRole('row')[members.length],
      ).getAllByRole('gridcell')[0];

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');

      expect(lastRowCell).toHaveFocus();

      await userEvent.keyboard('{ArrowDown}');

      expect(lastRowCell).toHaveFocus();
      expect(lastRowCell).toHaveAttribute('tabIndex', '0');
    });

    it('should move focus to the last column with End and back with Home', async () => {
      render(<DataGrid {...defaultProps} />);
      const firstRowCells = within(screen.getAllByRole('row')[1]).getAllByRole(
        'gridcell',
      );
      const firstCell = firstRowCells[0];
      const lastCell = firstRowCells[columns.length - 1];

      await userEvent.tab();
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{End}');

      expect(lastCell).toHaveFocus();
      expect(lastCell).toHaveAttribute('tabIndex', '0');
      expect(firstCell).toHaveAttribute('tabIndex', '-1');

      await userEvent.keyboard('{Home}');

      expect(firstCell).toHaveFocus();
      expect(firstCell).toHaveAttribute('tabIndex', '0');
      expect(lastCell).toHaveAttribute('tabIndex', '-1');
    });

    it('should not move focus when pressing Home in the first column', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader] = screen.getAllByRole('columnheader');

      await userEvent.tab();
      await userEvent.keyboard('{Home}');

      expect(firstHeader).toHaveFocus();
      expect(firstHeader).toHaveAttribute('tabIndex', '0');
    });

    it('should not move focus when pressing End in the last column', async () => {
      render(<DataGrid {...defaultProps} />);
      const lastHeader =
        screen.getAllByRole('columnheader')[columns.length - 1];

      await userEvent.tab();
      await userEvent.keyboard('{End}');
      await userEvent.keyboard('{End}');

      expect(lastHeader).toHaveFocus();
      expect(lastHeader).toHaveAttribute('tabIndex', '0');
    });

    it('should move focus to the last cell with Control+End and back with Control+Home', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader] = screen.getAllByRole('columnheader');
      const lastCell = within(
        screen.getAllByRole('row')[members.length],
      ).getAllByRole('gridcell')[columns.length - 1];

      await userEvent.tab();
      await userEvent.keyboard('{Control>}{End}{/Control}');

      expect(lastCell).toHaveFocus();
      expect(lastCell).toHaveAttribute('tabIndex', '0');
      expect(firstHeader).toHaveAttribute('tabIndex', '-1');

      await userEvent.keyboard('{Control>}{Home}{/Control}');

      expect(firstHeader).toHaveFocus();
      expect(firstHeader).toHaveAttribute('tabIndex', '0');
      expect(lastCell).toHaveAttribute('tabIndex', '-1');
    });

    it('should not move focus when pressing Control+Home on the first cell', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader] = screen.getAllByRole('columnheader');

      await userEvent.tab();
      await userEvent.keyboard('{Control>}{Home}{/Control}');

      expect(firstHeader).toHaveFocus();
      expect(firstHeader).toHaveAttribute('tabIndex', '0');
    });

    it('should not move focus when pressing Control+End on the last cell', async () => {
      render(<DataGrid {...defaultProps} />);
      const lastCell = within(
        screen.getAllByRole('row')[members.length],
      ).getAllByRole('gridcell')[columns.length - 1];

      await userEvent.tab();
      await userEvent.keyboard('{Control>}{End}{/Control}');
      await userEvent.keyboard('{Control>}{End}{/Control}');

      expect(lastCell).toHaveFocus();
      expect(lastCell).toHaveAttribute('tabIndex', '0');
    });

    it('should move focus down five rows with PageDown and back with PageUp', async () => {
      const data = Array.from({ length: 12 }, () => members[0]);
      render(<DataGrid {...defaultProps} data={data} />);
      const secondHeader = screen.getAllByRole('columnheader')[1];
      const fifthRowCell = within(screen.getAllByRole('row')[5]).getAllByRole(
        'gridcell',
      )[1];
      const tenthRowCell = within(screen.getAllByRole('row')[10]).getAllByRole(
        'gridcell',
      )[1];

      await userEvent.tab();
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{PageDown}');

      expect(fifthRowCell).toHaveFocus();
      expect(fifthRowCell).toHaveAttribute('tabIndex', '0');
      expect(secondHeader).toHaveAttribute('tabIndex', '-1');

      await userEvent.keyboard('{PageDown}');

      expect(tenthRowCell).toHaveFocus();
      expect(tenthRowCell).toHaveAttribute('tabIndex', '0');
      expect(fifthRowCell).toHaveAttribute('tabIndex', '-1');

      await userEvent.keyboard('{PageUp}');

      expect(fifthRowCell).toHaveFocus();
      expect(fifthRowCell).toHaveAttribute('tabIndex', '0');
      expect(tenthRowCell).toHaveAttribute('tabIndex', '-1');
    });

    it('should clamp PageDown and PageUp to the last and first rows', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader] = screen.getAllByRole('columnheader');
      const lastRowCell = within(
        screen.getAllByRole('row')[members.length],
      ).getAllByRole('gridcell')[0];

      await userEvent.tab();
      await userEvent.keyboard('{PageDown}');

      expect(lastRowCell).toHaveFocus();
      expect(lastRowCell).toHaveAttribute('tabIndex', '0');
      expect(firstHeader).toHaveAttribute('tabIndex', '-1');

      await userEvent.keyboard('{PageUp}');

      expect(firstHeader).toHaveFocus();
      expect(firstHeader).toHaveAttribute('tabIndex', '0');
      expect(lastRowCell).toHaveAttribute('tabIndex', '-1');
    });

    it('should not move focus above the header row when pressing PageUp', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader] = screen.getAllByRole('columnheader');

      await userEvent.tab();
      await userEvent.keyboard('{PageUp}');

      expect(firstHeader).toHaveFocus();
      expect(firstHeader).toHaveAttribute('tabIndex', '0');
    });

    it('should not move focus below the last row when pressing PageDown', async () => {
      render(<DataGrid {...defaultProps} />);
      const lastRowCell = within(
        screen.getAllByRole('row')[members.length],
      ).getAllByRole('gridcell')[0];

      await userEvent.tab();
      await userEvent.keyboard('{PageDown}');

      expect(lastRowCell).toHaveFocus();

      await userEvent.keyboard('{PageDown}');

      expect(lastRowCell).toHaveFocus();
      expect(lastRowCell).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('mouse navigation', () => {
    it('should move focus to the clicked cell', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader] = screen.getAllByRole('columnheader');
      const target = within(screen.getAllByRole('row')[2]).getAllByRole(
        'gridcell',
      )[1];

      await userEvent.click(target);

      expect(target).toHaveFocus();
      expect(target).toHaveAttribute('tabIndex', '0');
      expect(firstHeader).toHaveAttribute('tabIndex', '-1');
    });

    it('should keep focus when the active cell is clicked again', async () => {
      render(<DataGrid {...defaultProps} />);
      const [firstHeader] = screen.getAllByRole('columnheader');

      await userEvent.click(firstHeader);

      expect(firstHeader).toHaveFocus();
      expect(firstHeader).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('on narrow viewports', () => {
    beforeEach(() => {
      (useMedia as Mock).mockReturnValue(true);
    });

    it('should render a list from the mobile config', () => {
      render(<DataGrid {...defaultProps} mobileConfig={mobileConfig} />);

      expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      expect(screen.getByRole('list')).toBeVisible();
      expect(screen.getAllByRole('listitem')).toHaveLength(members.length);
      expect(screen.getByText('Members')).toBeVisible();
      expect(screen.getByText('Jane Doe')).toBeVisible();
      expect(screen.getByText('John Smith')).toBeVisible();
      expect(screen.getByText('32')).toBeVisible();
      expect(screen.getByText('€39.99')).toBeVisible();
    });

    it('should keep the table when no mobile config is provided', () => {
      render(<DataGrid {...defaultProps} />);

      expect(screen.getByRole('grid', { name: 'Members' })).toBeVisible();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should call onClick when list item is clicked', async () => {
      const onListItemClick = vi.fn();
      render(
        <DataGrid
          {...defaultProps}
          mobileConfig={{ ...mobileConfig, onClick: onListItemClick }}
        />,
      );
      expect(screen.getByRole('list')).toBeVisible();
      expect(screen.getByText('John Smith')).toBeVisible();

      await userEvent.click(screen.getByText('John Smith'));
      expect(onListItemClick).toHaveBeenCalledExactlyOnceWith(
        expect.any(Object),
        defaultProps.data[1],
      );
    });
  });

  it('should keep the table on wide viewports when a mobile config is provided', () => {
    render(<DataGrid {...defaultProps} mobileConfig={mobileConfig} />);

    expect(screen.getByRole('grid', { name: 'Members' })).toBeVisible();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<DataGrid {...defaultProps} role="grid" />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
