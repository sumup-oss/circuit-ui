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

import { List } from './List.js';

describe('List', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <List className={className}>
        <li>List</li>
      </List>,
    );
    const list = container.querySelector('ul');
    expect(list?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLOListElement>();
    const { container } = render(
      <List ref={ref}>
        <li>List</li>
      </List>,
    );
    const list = container.querySelector('ul');
    expect(ref.current).toBe(list);
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(
      <List>
        <li>List</li>
      </List>,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
