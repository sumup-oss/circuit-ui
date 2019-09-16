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

import RestrictedInput from '.';

describe('RestrictedInput', () => {
  it('should only allow whitelisted keys to be entered', () => {
    const { getByTestId } = render(
      <RestrictedInput
        whitelistedKeys={['i', 'u']}
        data-testid="restricted-input"
      />
    );
    const inputEl = getByTestId('restricted-input');

    act(() => {
      userEvent.type(inputEl, 'circuit');
    });

    expect(inputEl.value).toBe('iui');
  });

  /**
   * @deprecated
   */
  it('should only allow filtered keys to be entered [deprecated]', () => {
    const { getByTestId } = render(
      <RestrictedInput
        filteredKeys={['i', 'u']}
        data-testid="restricted-input"
      />
    );
    const inputEl = getByTestId('restricted-input');

    act(() => {
      userEvent.type(inputEl, 'circuit');
    });

    expect(inputEl.value).toBe('iui');
  });

  // TODO: This is difficult to test with react-testing-library.
  it.todo('should force overwrite the focus handler on the input');
});
