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

import { createRef } from 'react';

import { create, render, renderToHtml, axe } from '../../util/test-utils';

import SearchInput from '.';

describe('SearchInput', () => {
  const baseProps = { label: 'Search' };

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<SearchInput {...baseProps} />);
    expect(actual).toMatchSnapshot();
  });

  it('should grey out icon when disabled', () => {
    const actual = create(<SearchInput {...baseProps} disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should display a clear icon when not empty and an onClear callback is provided', () => {
    const mockCallback = jest.fn();
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
    expect(getByRole('button')).toHaveTextContent(clearLabel);
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = createRef<HTMLInputElement & HTMLTextAreaElement>();
      const { container } = render(<SearchInput {...baseProps} ref={tref} />);
      const input = container.querySelector('input');
      expect(tref.current).toBe(input);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<SearchInput {...baseProps} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
