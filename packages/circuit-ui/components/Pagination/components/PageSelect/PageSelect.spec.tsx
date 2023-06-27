/**
 * Copyright 2020, SumUp Ltd.
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

import { render, fireEvent, axe, screen } from '../../../../util/test-utils.js';

import { PageSelect, PageSelectProps } from './PageSelect.js';

describe('PageSelect', () => {
  const baseProps: PageSelectProps = {
    onChange: vi.fn(),
    label: 'Pagination',
    totalLabel: (total) => `of ${total}`,
    pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    currentPage: 1,
    totalPages: 10,
  };

  it('should call the onChange callback', () => {
    const testId = 'select-page';
    const onChange = vi.fn();
    render(
      <PageSelect {...baseProps} onChange={onChange} data-testid={testId} />,
    );
    const selectEl = screen.getByTestId(testId);

    fireEvent.change(selectEl, { target: { value: '3' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<PageSelect {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
