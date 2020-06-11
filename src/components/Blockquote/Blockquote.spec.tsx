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

import { create, render, renderToHtml, axe } from '../../util/test-utils';

import { Blockquote } from './Blockquote';

describe('Blockquote', () => {
  const quote = `
  Lorem ipsum dolor amet echo park activated charcoal banjo deep
  crucifix pinterest yr af tumeric literally. Tbh four loko tattooed
  kickstarter artisan.
  `;

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Blockquote>{quote}</Blockquote>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with mega styles', () => {
    const actual = create(<Blockquote size="mega">{quote}</Blockquote>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with giga styles', () => {
    const actual = create(<Blockquote size="giga">{quote}</Blockquote>);
    expect(actual).toMatchSnapshot();
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = React.createRef();
      const { container } = render(
        <Blockquote size="giga" ref={tref}>
          {quote}
        </Blockquote>
      );
      const blockquote = container.querySelector('blockquote');
      expect(tref.current).toBe(blockquote);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Blockquote>{quote}</Blockquote>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
