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

import React from 'react';

import { create, renderToHtml, axe } from '../../util/test-utils';

import { List, ListProps } from './List';

describe('List', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(
      <List>
        <li>List</li>
      </List>,
    );
    expect(actual).toMatchSnapshot();
  });

  const variants: ListProps['variant'][] = ['ordered', 'unordered'];
  it.each(variants)('should render the %s variant', (variant) => {
    const actual = create(
      <List variant={variant}>
        <li>{variant}</li>
      </List>,
    );
    expect(actual).toMatchSnapshot();
  });

  const sizes: ListProps['size'][] = ['kilo', 'mega', 'giga'];
  it.each(sizes)('should render with size %s', (size) => {
    const actual = create(
      <List size={size}>
        <li>{size}</li>
      </List>,
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render a nested list', () => {
    const actual = create(
      <List>
        <li>First level</li>
        <List>
          <li>Second level</li>
        </List>
      </List>,
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(
      <List noMargin>
        <li>no margin</li>
      </List>,
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <List>
        <li>List</li>
      </List>,
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
