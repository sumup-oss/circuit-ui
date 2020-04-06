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
import { cleanup, fireEvent } from '@testing-library/react';

import AutoCompleteTags from '.';

const defaultProps = {
  availableTags: [
    'test1@sumup.com',
    'test2@sumup.com',
    'test3@sumup.com',
    'test4@sumup.com'
  ],
  placeholder: 'Search by email',
  selectedTags: ['test1@sumup.com'],
  onChange: jest.fn()
};

describe('AutoCompleteTags', () => {
  afterEach(cleanup);
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<AutoCompleteTags availableTags={[]} />);
    expect(actual).toMatchSnapshot();
  });

  it('should display selected tags ', () => {
    const { getByTestId, getByText } = render(
      <AutoCompleteTags {...defaultProps} />
    );
    expect(getByTestId('autocomplete-tags-selected')).not.toBeNull();
    expect(getByText('test1@sumup.com')).toBeVisible();
  });

  it('should handle changes in selected tags ', () => {
    const { getByTestId, queryByTestId } = render(
      <AutoCompleteTags {...defaultProps} />
    );
    const closeIcon = getByTestId('tag-close');

    fireEvent.click(closeIcon);

    expect(defaultProps.onChange).toHaveBeenCalledWith([]);
    expect(queryByTestId('autocomplete-tags-selected')).toBeNull();
  });
});
