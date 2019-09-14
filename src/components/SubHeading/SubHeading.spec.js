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

import SubHeading from '.';

describe('SubHeading', () => {
  /**
   * Style tests.
   */
  const elements = ['h2', 'h3', 'h4', 'h5', 'h6'];
  elements.forEach(as => {
    it(`should render as ${as.toUpperCase()} element, when passed "${as}" for the element prop`, () => {
      const heading = create(
        <SubHeading as={as}>{`${as.toUpperCase()} heading`}</SubHeading>
      );
      expect(heading).toMatchSnapshot();
    });
  });

  const sizes = ['kilo', 'mega'];
  sizes.forEach(size => {
    it(`should render with size ${size}, when passed "${size}" for the size prop`, () => {
      const heading = create(
        <SubHeading {...{ size }}>{`${size} heading`}</SubHeading>
      );
      expect(heading).toMatchSnapshot();
    });
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(<SubHeading noMargin />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<SubHeading>Sub heading</SubHeading>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
