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

import { createRef } from 'react';

import { create, renderToHtml, axe, render } from '../../util/test-utils';

import { Headline } from './Headline';

describe('Headline', () => {
  /**
   * Style tests.
   */
  const elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
  it.each(elements)('should render as %s element', (element) => {
    const headline = create(
      <Headline noMargin as={element}>{`${element} headline`}</Headline>,
    );
    expect(headline).toMatchSnapshot();
  });

  const sizes = ['one', 'two', 'three', 'four'] as const;
  it.each(sizes)('should render with size %s', (size) => {
    const headline = create(
      <Headline noMargin as="h2" {...{ size }}>{`${size} headline`}</Headline>,
    );
    expect(headline).toMatchSnapshot();
  });

  it('should render with default spacing when there is no noMargin prop', () => {
    /* @ts-expect-error the noMargin prop is required */
    const actual = create(<Headline as="h2">Headline</Headline>);
    expect(actual).toMatchSnapshot();
  });

  it('should accept a working ref for a headline', () => {
    const tref = createRef<HTMLHeadingElement>();
    const { container } = render(
      <Headline noMargin as="h2" ref={tref}>
        Headline
      </Headline>,
    );
    const headline = container.querySelector('h2');
    expect(tref.current).toBe(headline);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Headline noMargin as="h2">
        Headline
      </Headline>,
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
