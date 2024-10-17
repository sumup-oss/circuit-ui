/**
 * Copyright 2021, SumUp Ltd.
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

import { screen, render, axe, type RenderFn } from '../../util/test-utils.js';
import { Body } from '../Body/index.js';

import { ListItemGroup, type ListItemGroupProps } from './ListItemGroup.js';

describe('ListItemGroup', () => {
  function renderListItemGroup<T>(
    renderFn: RenderFn<T>,
    props: ListItemGroupProps,
  ) {
    return renderFn(<ListItemGroup {...props} />);
  }

  const items = [
    { id: 1, label: 'First item' },
    { id: 2, label: 'Second item' },
    { id: 3, label: 'Third item' },
  ];

  const baseProps = {
    items: items.map((item) => ({
      key: item.id,
      label: item.label,
    })),
    label: 'Group label',
  };

  it('should render a ListItemGroup with a custom label', () => {
    renderListItemGroup(render, {
      ...baseProps,
      label: (
        <Body as="h4" size="s">
          Group label
        </Body>
      ),
    });
    expect(screen.getByText('Group label')).toBeVisible();
  });

  it('should render a ListItemGroup with a details line', () => {
    renderListItemGroup(render, {
      ...baseProps,
      details: 'Group details',
    });
    expect(screen.getByText('Group details')).toBeVisible();
  });

  it('should render a ListItemGroup with a custom details line', () => {
    renderListItemGroup(render, {
      ...baseProps,
      details: <Body size="s">Group details</Body>,
    });
    expect(screen.getByText('Group details')).toBeVisible();
  });

  it('should forward a ref', () => {
    const ref = createRef<any>();
    const { container } = render(<ListItemGroup {...baseProps} ref={ref} />);
    const listItemGroup = container.firstChild;
    expect(ref.current).toBe(listItemGroup);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderListItemGroup(render, {
      ...baseProps,
      label: 'Group label',
      details: 'Group details',
    });
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
