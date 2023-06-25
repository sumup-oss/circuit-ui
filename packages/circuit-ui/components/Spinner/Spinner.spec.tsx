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

import { render, axe } from '../../util/test-utils.js';

import { Spinner } from './Spinner.js';

describe('Spinner', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(<Spinner className={className} />);
    const button = container.querySelector('span');
    expect(button?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(<Spinner ref={ref} />);
    const span = container.querySelector('span');
    expect(ref.current).toBe(span);
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Spinner />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
