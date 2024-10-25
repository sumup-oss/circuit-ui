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

import { describe, expect, it, vi } from 'vitest';

import { render } from '../../../util/test-utils';

import { SingleDayPicker } from './index';

const props = {
  onDateChange: vi.fn(),
  onFocusChange: vi.fn(),
  id: 'date',
  date: null,
  focused: false,
};

describe('SingleDayPicker', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const SkipTypescriptChecks = SingleDayPicker as any;
    const { container } = render(<SkipTypescriptChecks {...props} />);
    expect(container).toMatchSnapshot();
  });
});
