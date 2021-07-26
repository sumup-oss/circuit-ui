/**
 * Copyright 2021, SumUp Ltd.
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

import { render } from '../../util/test-utils';

import { Portal } from './Portal';

describe('Portal', () => {
  it('should append its children to the document body by default', () => {
    const testId = 'children';
    const { getByTestId } = render(
      <Portal>
        <div data-testid={testId} />
      </Portal>,
    );
    const children = getByTestId(testId);

    expect(children).toBeVisible();
    expect(children.parentElement).toEqual(document.body);
  });

  it('should append its children to a custom container', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const testId = 'children';

    const getContainer = jest.fn(() => container);
    const { getByTestId } = render(
      <Portal getContainer={getContainer}>
        <div data-testid={testId} />
      </Portal>,
    );

    const children = getByTestId(testId);

    expect(getContainer).toHaveBeenCalledTimes(1);
    expect(children.parentElement).toEqual(container);
  });
});
