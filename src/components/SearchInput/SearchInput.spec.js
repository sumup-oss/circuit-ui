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

import React from 'react';
import { identity } from 'lodash/fp';

import SearchInput from '.';
import Label from '../Label';

describe('SearchInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<SearchInput />);
    expect(actual).toMatchSnapshot();
  });

  it('should grey out icon when disabled', () => {
    const actual = create(<SearchInput disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should display a clear icon when not empty and an onClear callback is provided', () => {
    const onClear = jest.fn(identity);

    const actual = create(
      <SearchInput value="search value" onClear={onClear} />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="search">
        <SearchInput id="search" />
        Search
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
