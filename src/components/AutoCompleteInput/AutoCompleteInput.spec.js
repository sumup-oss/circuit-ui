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

import AutoCompleteInput from './AutoCompleteInput';

const options = [
  { value: '1111111111111', 'data-testid': 'autocomplete-input-option' },
  { value: '2222222222222', 'data-testid': 'autocomplete-input-option' },
  { value: '3333333333333', 'data-testid': 'autocomplete-input-option' }
];

describe('AutoCompleteInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <AutoCompleteInput onChange={() => {}} options={options} />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should filter options when input is changed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <AutoCompleteInput
        onChange={onChange}
        options={options}
        data-testid="autocomplete-input"
      />
    );

    const inputEl = getByTestId('autocomplete-input');

    act(() => {
      userEvent.type(inputEl, '222');
    });

    const optionEl = getByTestId('autocomplete-input-option');

    expect(optionEl).toHaveTextContent('2222222222222');
  });
});
