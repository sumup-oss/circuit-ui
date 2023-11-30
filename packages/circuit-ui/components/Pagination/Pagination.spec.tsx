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

import { describe, expect, it, vi } from 'vitest';

import { render, axe, userEvent, screen } from '../../util/test-utils.js';

import { Pagination, PaginationProps } from './Pagination.js';

describe('Pagination', () => {
  const baseProps: PaginationProps = {
    onChange: vi.fn(),
    totalPages: 5,
    label: 'Pagination',
    previousLabel: 'Previous',
    nextLabel: 'Next',
    pageLabel: (page) => `Go to page ${page}`,
    totalLabel: (total) => `of ${total}`,
  };

  it('should disable the previous button on the first page', () => {
    render(<Pagination {...baseProps} currentPage={1} />);
    const prevButtonEl = screen.getByLabelText('Previous').closest('button');

    expect(prevButtonEl).toHaveAttribute('aria-disabled', 'true');
  });

  it('should disable the next button on the last page', () => {
    render(<Pagination {...baseProps} currentPage={baseProps.totalPages} />);
    const nextButtonEl = screen.getByLabelText('Next').closest('button');

    expect(nextButtonEl).toHaveAttribute('aria-disabled', 'true');
  });

  it('should go to the previous page', async () => {
    const onChange = vi.fn();
    render(<Pagination {...baseProps} onChange={onChange} currentPage={3} />);

    const prevButtonEl = screen.getByLabelText('Previous');

    await userEvent.click(prevButtonEl);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should go to the next page', async () => {
    const onChange = vi.fn();
    render(<Pagination {...baseProps} onChange={onChange} />);

    const nextButtonEl = screen.getByLabelText('Next');

    await userEvent.click(nextButtonEl);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  describe('with less than 2 pages', () => {
    it('should not render', () => {
      render(<Pagination {...baseProps} totalPages={1} />);
      const list = screen.queryByRole('list');
      const select = screen.queryByRole('combobox');
      expect(list).not.toBeInTheDocument();
      expect(select).not.toBeInTheDocument();
    });
  });

  describe('with 2 to 5 pages', () => {
    const props = { ...baseProps, totalPages: 5 };

    it('should render a page list', () => {
      render(<Pagination {...props} />);
      const list = screen.getByRole('list');
      expect(list).toBeVisible();
    });

    it('should meet accessibility guidelines', async () => {
      const { container } = render(<Pagination {...props} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });

  describe('with more than 5 pages', () => {
    const props = { ...baseProps, totalPages: 10 };

    it('should render a page select', () => {
      render(<Pagination {...props} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeVisible();
    });

    it('should meet accessibility guidelines', async () => {
      const { container } = render(<Pagination {...props} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
