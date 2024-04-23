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

import { afterAll, describe, expect, it, vi, type Mock } from 'vitest';

import { render } from '../../util/test-utils.js';

import Step from './Step.js';
import { useStep } from './hooks/useStep.js';

vi.mock('./hooks/useStep', () => ({ useStep: vi.fn(() => ({})) }));

describe('Step', () => {
  afterAll(() => {
    vi.resetModules();
  });

  it('should throw error without children as a function', () => {
    const expectedError = new Error(
      '[Step] The `children` prop must be a function.',
    );

    // @ts-expect-error We're testing for this error.
    expect(() => render(<Step />)).toThrow(expectedError);
    expect(() =>
      render(
        <Step>
          {/* @ts-expect-error We're testing for this error. */}
          <div />
        </Step>,
      ),
    ).toThrow(expectedError);
  });

  it('should pass state and helpers to children', () => {
    const data = { step: 1, previousStep: 0 };
    const children = vi.fn(() => <div />);

    (useStep as Mock).mockReturnValue(data);

    render(<Step>{children}</Step>);

    expect(children).toHaveBeenCalledTimes(1);
    expect(children).toHaveBeenCalledWith(data);
  });
});
