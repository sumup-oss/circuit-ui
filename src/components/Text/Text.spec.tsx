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

import { Text, TextProps } from './Text';

describe('Text', () => {
  /**
   * Style tests.
   */

  it('should render with default styles', () => {
    const actual = create(<Text>Text</Text>);
    expect(actual).toMatchSnapshot();
  });

  const elements = ['p', 'article', 'div'];
  it.each(elements)('should render as %s element', (as) => {
    const actual = create(<Text as={as}>{`${as.toUpperCase()} text`}</Text>);
    expect(actual).toMatchSnapshot();
  });

  const sizes: TextProps['size'][] = ['kilo', 'mega', 'giga'];
  it.each(sizes)('should render with size %s', (size) => {
    const actual = create(<Text size={size}>{`${size as string} text`}</Text>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(<Text noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should render bold text when passed the bold prop', () => {
    const actual = create(<Text bold />);
    expect(actual).toMatchSnapshot();
  });

  it('should render italic text when passed the italic prop', () => {
    const actual = create(<Text italic />);
    expect(actual).toMatchSnapshot();
  });

  it('should render struck through text when passed the strike prop', () => {
    const actual = create(<Text strike />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Text>Text</Text>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
