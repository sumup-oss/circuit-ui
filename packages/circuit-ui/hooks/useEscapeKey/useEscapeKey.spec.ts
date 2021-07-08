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

import { renderHook, actHook, userEvent } from '../../util/test-utils';

import { useEscapeKey } from './useEscapeKey';

describe('useEscapeKey', () => {
  it('should call the callback when the escape key is pressed', () => {
    const callback = jest.fn();
    renderHook(() => useEscapeKey(callback));

    actHook(() => {
      userEvent.keyboard('{esc}');
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback when the hook is inactive', () => {
    const callback = jest.fn();
    renderHook(() => useEscapeKey(callback, false));

    actHook(() => {
      userEvent.keyboard('{esc}');
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
