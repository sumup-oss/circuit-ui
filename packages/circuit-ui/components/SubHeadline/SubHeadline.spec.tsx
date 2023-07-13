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

import { axe, render } from '../../util/test-utils.js';

import { SubHeadline } from './SubHeadline.js';

describe('SubHeadline', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <SubHeadline as="h2" className={className}>
        SubHeadline
      </SubHeadline>,
    );
    const headline = container.querySelector('h2');
    expect(headline?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLHeadingElement>();
    const { container } = render(
      <SubHeadline as="h2" ref={ref}>
        SubHeadline
      </SubHeadline>,
    );
    const headline = container.querySelector('h2');
    expect(ref.current).toBe(headline);
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<SubHeadline as="h3">Subheading</SubHeadline>);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
