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

import { render, axe, userEvent, screen } from '../../../../util/test-utils.js';

import SortArrow from './index.js';

describe('SortArrow', () => {
  it('should render with both arrows styles', () => {
    const { container } = render(<SortArrow label="Sort" />);
    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });

  it('should render with ascending arrow styles', () => {
    const { container } = render(
      <SortArrow label="Sort" direction="ascending" />,
    );
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('should render with descending arrow styles', () => {
    const { container } = render(
      <SortArrow label="Sort" direction="descending" />,
    );
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('should call the onClick callback', async () => {
    const onClick = vi.fn();
    render(<SortArrow label="Sort" onClick={onClick} data-testid="sort" />);
    await userEvent.click(screen.getByTestId('sort'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SortArrow label="Sort" />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
