/**
 * Copyright 2024, SumUp Ltd.
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

import { describe, it } from 'vitest';

import { render, axe } from '../../util/test-utils.js';

import { Calendar } from './Calendar.js';

describe('Calendar', () => {
  const baseProps = {
    prevMonthButtonLabel: 'Previous month',
    nextMonthButtonLabel: 'Next month',
  };

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Calendar {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
