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

import { Toggle } from './Toggle';

const defaultProps = {
  label: 'Label',
  explanation: 'A longer explanation',
  labelChecked: 'on',
  labelUnchecked: 'off',
};

describe('Toggle', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Toggle {...defaultProps} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(<Toggle {...defaultProps} noMargin />);
    expect(actual).toMatchSnapshot();
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = React.createRef<HTMLButtonElement>();
      const { container } = render(<Toggle {...defaultProps} ref={tref} />);
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
    });
  });

  /**
   * Accessibility tests.
   * See https://inclusive-components.design/toggle-button/
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Toggle {...defaultProps} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
