import { describe, expect, it } from 'vitest';

import { axe, render, screen } from '../../../../util/test-utils.js';

import { SkeletonGrid, type SkeletonGridProps } from './SkeletonGrid.js';

const defaultProps = {
  itemsPerPage: 3,
  columns: ['name', 'age', 'dateOfBirth', 'allergies'],
  gridId: 'foo',
} satisfies SkeletonGridProps;

describe('SkeletonGrid', () => {
  it('should render a row for each item and a cell for each column', () => {
    render(<SkeletonGrid {...defaultProps} />);

    expect(screen.getAllByRole('row')).toHaveLength(defaultProps.itemsPerPage);
    expect(screen.getAllByRole('cell')).toHaveLength(
      defaultProps.itemsPerPage * defaultProps.columns.length,
    );
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<SkeletonGrid {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
