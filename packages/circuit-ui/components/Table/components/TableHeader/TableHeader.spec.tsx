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

import { render, axe } from '../../../../util/test-utils.js';

import TableHeader from './index.js';

const children = 'Foo';

describe('TableHeader', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <TableHeader
        sortParams={{
          sortable: true,
          sortLabel: 'Sort in ascending order',
          isSorted: false,
        }}
        className={className}
      >
        {children}
      </TableHeader>,
    );
    const tableHeader = container.querySelector('th');
    expect(tableHeader?.className).toContain(className);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TableHeader
        sortParams={{
          sortable: true,
          sortLabel: 'Sort in ascending order',
          isSorted: false,
        }}
      >
        {children}
      </TableHeader>,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
