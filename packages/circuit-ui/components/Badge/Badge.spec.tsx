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
import { createRef, type Ref } from 'react';

import { render, screen, axe } from '../../util/test-utils.js';

import { Badge } from './Badge.js';

describe('Badge', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<Badge className={className}>Badge</Badge>);
    const [badge] = screen.getAllByText('Badge');
    expect(badge).toHaveClass(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref as Ref<HTMLDivElement>}>Badge</Badge>);
    const [badge] = screen.getAllByText('Badge');
    expect(ref.current).toBe(badge);
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Badge />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
