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

import { render, axe, userEvent, screen } from '../../../../util/test-utils.js';

import { PageList, PageListProps } from './PageList.js';

describe('PageList', () => {
  const baseProps: PageListProps = {
    onChange: vi.fn(),
    pageLabel: (page) => `Go to page ${page}`,
    pages: [1, 2, 3],
    currentPage: 1,
  };

  it('should call the onChange callback', async () => {
    const onChange = vi.fn();
    render(<PageList {...baseProps} onChange={onChange} />);
    const pageFour = screen.getByText('3');

    await userEvent.click(pageFour);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<PageList {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
