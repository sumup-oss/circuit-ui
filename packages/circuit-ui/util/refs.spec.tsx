/**
 * Copyright 2022, SumUp Ltd.
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

import { useRef } from 'react';

import { render, newRenderHook } from './test-utils';
import { applyMultipleRefs } from './refs';

describe('applyMultipleRefs function', () => {
  test("should populate a reference's `current` member'", () => {
    const {
      result: { current: refAsObject },
    } = newRenderHook(() => useRef<HTMLDivElement>());

    render(<div ref={applyMultipleRefs(refAsObject)} />);
    expect(refAsObject.current).toMatchInlineSnapshot('<div />');
  });

  test("should call a ref if it's a function", () => {
    const refAsFunction = jest.fn();

    render(<div ref={applyMultipleRefs(refAsFunction)} />);

    const lastCall = refAsFunction.mock.calls[0] as JSX.Element[];
    expect(lastCall[0]).toMatchInlineSnapshot('<div />');
  });

  test('should allow multiple refs as arguments', () => {
    const {
      result: { current: refAsObject },
    } = newRenderHook(() => useRef<HTMLDivElement>());

    const refAsFunction = jest.fn();

    render(<div ref={applyMultipleRefs(refAsObject, refAsFunction)} />);

    expect(refAsObject.current).toMatchInlineSnapshot('<div />');
    expect(refAsFunction).toBeCalled();
  });
});
