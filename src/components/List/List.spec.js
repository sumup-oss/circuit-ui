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

import List from '.';

describe('List', () => {
  /**
   * Style tests.
   */
  it('should render a default unordered List', () => {
    const list = create(
      <List>
        <li>Hi there</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render a kilo unordered List', () => {
    const list = create(
      <List size={List.KILO}>
        <li>Hi there</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render a mega unordered List', () => {
    const list = create(
      <List size={List.MEGA}>
        <li>Hi there</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render a giga unordered List', () => {
    const list = create(
      <List size={List.GIGA}>
        <li>Hi there</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render nested unordered lists', () => {
    const list = create(
      <List>
        <li>Hi there</li>
        <List>
          <li>Hi there</li>
        </List>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render an ordered list', () => {
    const list = create(
      <List ordered>
        <li>Hi</li>
        <li>It is me</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(
      <List noMargin>
        <li>Hi</li>
      </List>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <List>
        <li>Hi there</li>
      </List>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
