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

import { describe, expect, it } from 'vitest';

import { render, axe, screen } from '../../../../util/test-utils.js';

import { TableBody } from './index.js';

const fixtureRows = [['Foo', 'Bar']];

describe('TableBody', () => {
  it('should render a table cell as the first element on each row with no rowHeaders', () => {
    render(<TableBody rows={fixtureRows} />);
    const tableCell = screen.getByRole('row').children[0];

    expect(tableCell.tagName).toBe('TD');
  });

  it('should render a table header as the first element of each row with rowHeaders', () => {
    render(<TableBody rows={fixtureRows} rowHeaders />);
    const tableCell = screen.getByRole('row').children[0];

    expect(tableCell.tagName).toBe('TH');
  });

  it('should forward additional props to the row', () => {
    const testId = 'row-1-testId';
    const rows = [{ 'cells': ['Foo', 'Bar'], 'data-testid': testId }];
    render(<TableBody rows={rows} />);

    expect(screen.getAllByTestId(testId)).toHaveLength(1);
  });

  it('should forward additional props to the cell', () => {
    const testId = 'cell-1-testId';
    const rows = [[{ 'children': 'Foo', 'data-testid': testId }, 'Bar']];
    render(<TableBody rows={rows} />);

    expect(screen.getAllByTestId(testId)).toHaveLength(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<TableBody rowHeaders rows={fixtureRows} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
