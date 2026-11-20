import { describe, expect, it } from 'vitest';
import type { ReactElement } from 'react';

import { axe, fireEvent, render, screen } from '../../../../util/test-utils.js';

import { Cell, type CellProps } from './Cell.js';

const children = 'Cell content';
const defaultProps = {
  children,
} satisfies CellProps;

function renderCell(ui: ReactElement) {
  return render(
    <table>
      <tbody>
        <tr>{ui}</tr>
      </tbody>
    </table>,
  );
}

describe('Cell', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    renderCell(<Cell {...defaultProps} className={className} />);
    const cell = screen.getByRole('gridcell');
    expect(cell.className).toContain(className);
  });

  it('should render as a "td" element by default', () => {
    renderCell(<Cell {...defaultProps} />);
    const cell = screen.getByText(defaultProps.children);
    expect(cell).toBeVisible();
  });

  const elements = ['td', 'th'] as const;
  it.each(elements)('should render as a "%s" element', (as) => {
    renderCell(<Cell {...defaultProps} as={as} />);
    const cell = screen.getByText(defaultProps.children);
    expect(cell).toBeVisible();
  });

  it('should render children', () => {
    renderCell(<Cell {...defaultProps} />);
    expect(screen.getByText('Cell content')).toBeVisible();
  });

  it('should have a gridcell role', () => {
    renderCell(<Cell {...defaultProps} />);
    expect(screen.getByRole('gridcell')).toBeVisible();
  });

  it('should allow overriding the role', () => {
    renderCell(<Cell {...defaultProps} as="th" role="columnheader" />);
    expect(screen.getByRole('columnheader')).toBeVisible();
  });

  it('should set tabindex of interactive children to -1', async () => {
    renderCell(
      <Cell {...defaultProps}>
        <button>Button</button>
        <a href="www.sumup.com">Link</a>
      </Cell>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('link')).toHaveAttribute('tabindex', '-1');
  });

  it('should set tabindex of interactive children to 0 when focus and -1 when blurred', async () => {
    renderCell(
      <Cell {...defaultProps}>
        <button>Button</button>
        <a href="www.sumup.com">Link</a>
      </Cell>,
    );
    fireEvent.focus(screen.getByRole('gridcell'));
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('link')).toHaveAttribute('tabindex', '0');
    fireEvent.blur(screen.getByRole('gridcell'));
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('link')).toHaveAttribute('tabindex', '-1');
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = renderCell(<Cell {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
