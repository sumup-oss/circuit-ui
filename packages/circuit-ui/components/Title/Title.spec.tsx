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

import { create, renderToHtml, axe } from '../../util/test-utils.js';

import { Title } from './Title.js';

describe('Title', () => {
  /**
   * Style tests.
   */
  const elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
  it.each(elements)('should render as %s element', (element) => {
    const title = create(<Title as={element}>{`${element} Title`}</Title>);
    expect(title).toMatchSnapshot();
  });

  const sizes = ['one', 'two', 'three', 'four'] as const;
  it.each(sizes)('should render with size %s', (size) => {
    const title = create(
      <Title as="h2" {...{ size }}>{`${size} Title`}</Title>,
    );
    expect(title).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Title as="h2">Title</Title>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
