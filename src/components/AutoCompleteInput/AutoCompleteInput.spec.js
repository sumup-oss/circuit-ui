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
  { value: 'Apple', 'data-testid': 'autocomplete-input-option' },
  { value: 'Mango', 'data-testid': 'autocomplete-input-option' },
  { value: 'Banana', 'data-testid': 'autocomplete-input-option' }
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
  it('should filter options as the user types', () => {
    const onChange = jest.fn();
    const onInputValueChange = jest.fn();
    const { getByTestId } = render(
      <AutoCompleteInput
        onChange={onChange}
        onInputValueChange={onInputValueChange}
        options={options}
        data-testid="autocomplete-input"
      />
    );

    const inputEl = getByTestId('autocomplete-input');

    act(() => {
      userEvent.type(inputEl, 'app');
    });

    const optionEl = getByTestId('autocomplete-input-option');

    expect(optionEl).toHaveTextContent('Apple');
    expect(onChange).not.toHaveBeenCalled();
    expect(onInputValueChange).toHaveBeenCalledTimes(3);
  });

  it('should select on option from the list', () => {
    const onChange = jest.fn();
    const { getByTestId, getAllByTestId } = render(
      <AutoCompleteInput
        onChange={onChange}
        options={options}
        data-testid="autocomplete-input"
      />
    );

    const inputEl = getByTestId('autocomplete-input');

    act(() => {
      userEvent.type(inputEl, 'an');
    });

    const optionEls = getAllByTestId('autocomplete-input-option');

    expect(optionEls).toHaveLength(2);

    act(() => {
      userEvent.click(optionEls[0]);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('Mango');
  });

  it('should reset the value when the user clears the field', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const { getByTestId, getAllByTestId } = render(
      <AutoCompleteInput
        onChange={onChange}
        onClear={onClear}
        options={options}
        data-testid="autocomplete-input"
      />
    );

    const inputEl = getByTestId('autocomplete-input');

    act(() => {
      userEvent.type(inputEl, 'an');
    });

    const optionEls = getAllByTestId('autocomplete-input-option');
    const clearEl = getByTestId('input-clear');

    expect(optionEls).toHaveLength(2);

    act(() => {
      userEvent.click(optionEls[0]);
      userEvent.click(clearEl);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('should initialize the selected option', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const initialSelectedItem = options[0].value;
    const { getByTestId } = render(
      <AutoCompleteInput
        initialSelectedItem={initialSelectedItem}
        onChange={onChange}
        onClear={onClear}
        options={options}
        data-testid="autocomplete-input"
      />
    );

    const inputEl = getByTestId('autocomplete-input');

    expect(inputEl.value).toBe(initialSelectedItem);
  });
});
