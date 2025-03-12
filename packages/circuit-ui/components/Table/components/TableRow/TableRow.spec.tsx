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

import { TableRow } from './index.js';

const children = 'Foo';

describe('TableRow', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <TableRow className={className}>{children}</TableRow>,
    );
    const element = container.querySelector('tr');
    expect(element?.className).toContain(className);
  });

  it('should call the onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<TableRow onClick={onClick}>{children}</TableRow>);
    const rowEl = screen.getByRole('row');

    rowEl.focus();
    await userEvent.click(rowEl);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['space', '{ }'],
    ['enter', '{Enter}'],
  ])('should call onClick when %s key is pressed', async (_, key) => {
    const onClick = vi.fn();
    render(<TableRow onClick={onClick}>{children}</TableRow>);
    const rowEl = screen.getByRole('row');

    rowEl.focus();
    await userEvent.keyboard(key);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<TableRow>{children}</TableRow>);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
