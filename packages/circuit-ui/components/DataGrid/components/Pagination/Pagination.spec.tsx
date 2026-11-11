import { beforeEach, describe, expect, it, vi } from 'vitest';

import { axe, render, screen, userEvent } from '../../../../util/test-utils.js';

import { Pagination } from './Pagination.js';
import type { PaginationConfig } from '../../types.js';
import { CircuitError } from '../../../../util/errors.js';

declare const process: {
  env: { NODE_ENV: string };
};

const onPageChange = vi.fn();
const onItemsPerPageChange = vi.fn();

const defaultProps = {
  currentPage: 2,
  itemsPerPage: 10,
  itemsPerPageLabel: 'Items per page',
  nextPageLabel: 'Next page',
  previousPageLabel: 'Previous page',
  totalPages: 5,
  onPageChange,
  onItemsPerPageChange,
} satisfies PaginationConfig;

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the items per page selector', () => {
    render(<Pagination {...defaultProps} />);

    const select = screen.getByRole('combobox', {
      name: defaultProps.itemsPerPageLabel,
    });

    expect(select).toBeVisible();
    expect(select).toHaveValue(String(defaultProps.itemsPerPage));
    expect(
      screen.getByText(defaultProps.itemsPerPageLabel, { selector: 'p' }),
    ).toBeVisible();
  });

  it('should render the default page size options', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByRole('option', { name: '10' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '25' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '50' })).toBeInTheDocument();
  });

  it('should render custom page size options', () => {
    const options = [
      { label: '5', value: 5 },
      { label: '15', value: 15 },
    ];
    render(<Pagination {...defaultProps} itemsPerPage={5} options={options} />);
    expect(screen.getAllByRole('option')).toHaveLength(options.length);
    expect(screen.getByRole('option', { name: '5' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '15' })).toBeInTheDocument();
  });

  it("should throw an error if itemsPerPage isn't one of the options", () => {
    process.env.NODE_ENV = 'development';
    const expectedError = new CircuitError(
      'DataGrid Pagination',
      'The `itemsPerPage` value must be one of the provided options`',
    );

    expect(() =>
      render(<Pagination {...defaultProps} itemsPerPage={5} />),
    ).toThrow(expectedError);
    process.env.NODE_ENV = 'test';
  });

  it('should render the current page and total', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText('2 of 5')).toBeVisible();
  });

  it('should disable the previous button on the first page', async () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const previousButton = screen.getByRole('button', {
      name: defaultProps.previousPageLabel,
    });

    expect(previousButton).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(previousButton);

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('should disable the next button on the last page', async () => {
    render(
      <Pagination {...defaultProps} currentPage={defaultProps.totalPages} />,
    );

    const nextButton = screen.getByRole('button', {
      name: defaultProps.nextPageLabel,
    });

    expect(nextButton).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(nextButton);

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('should go to the previous page', async () => {
    render(<Pagination {...defaultProps} />);

    await userEvent.click(
      screen.getByRole('button', { name: defaultProps.previousPageLabel }),
    );

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(defaultProps.currentPage - 1);
  });

  it('should go to the next page', async () => {
    render(<Pagination {...defaultProps} />);

    await userEvent.click(
      screen.getByRole('button', { name: defaultProps.nextPageLabel }),
    );

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(defaultProps.currentPage + 1);
  });

  it('should update the page size and reset to the first page', async () => {
    render(<Pagination {...defaultProps} />);

    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: defaultProps.itemsPerPageLabel }),
      '25',
    );

    expect(onItemsPerPageChange).toHaveBeenCalledTimes(1);
    expect(onItemsPerPageChange).toHaveBeenCalledWith(25);
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Pagination {...defaultProps} />);

    const actual = await axe(container);

    expect(actual).toHaveNoViolations();
  });
});
