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

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';

import { render, axe } from '../../../../util/test-utils.js';

import { Row } from './Row.js';

describe('Row', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const { container } = render(<Row />);
    expect(container).toMatchSnapshot();
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Row ref={ref} />);
    const element = container.querySelector('div');
    expect(ref.current).toBe(element);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Row />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
