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

import { Heading } from './Heading';

describe('Heading', () => {
  /**
   * Style tests.
   */
  const elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  it.each(elements)(
    `should render as %s element, when passed "%s" for the element prop`,
    element => {
      const heading = create(
        <Heading as={element}>{`${element.toUpperCase()} heading`}</Heading>
      );
      expect(heading).toMatchSnapshot();
    }
  );

  const sizes = [
    'kilo',
    'mega',
    'giga',
    'tera',
    'peta',
    'exa',
    'zetta'
  ] as const;
  it.each(sizes)(
    `should render with size %s, when passed "%s" for the size prop`,
    size => {
      const heading = create(
        <Heading {...{ size }}>{`${size} heading`}</Heading>
      );
      expect(heading).toMatchSnapshot();
    }
  );

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(<Heading noMargin />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Heading>Heading</Heading>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
