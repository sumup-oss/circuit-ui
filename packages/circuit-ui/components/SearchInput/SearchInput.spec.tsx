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
import { createRef } from 'react';

import { render, axe } from '../../util/test-utils.js';
import type { InputElement } from '../Input/index.js';

import { SearchInput } from './SearchInput.js';

describe('SearchInput', () => {
  const baseProps = { label: 'Search' };

  it('should display a clear icon when not empty and an onClear callback is provided', () => {
    const mockCallback = vi.fn();
    const clearLabel = 'Clear';

    const { getByRole } = render(
      <SearchInput
        {...baseProps}
        value="Search value"
        clearLabel={clearLabel}
        onClear={mockCallback}
        /**
         * We set onChange to silence a warning about adding a `value` without
         * `onChange` or `readOnly`.
         */
        onChange={mockCallback}
      />,
    );
    expect(getByRole('button')).toBeVisible();
  });

  it('should forward a ref', () => {
    const ref = createRef<InputElement>();
    const { container } = render(<SearchInput {...baseProps} ref={ref} />);
    const input = container.querySelector('input');
    expect(ref.current).toBe(input);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SearchInput {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
