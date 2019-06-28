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

import ButtonGroup from '.';

describe('ButtonGroup', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<ButtonGroup />);
    expect(actual).toMatchSnapshot();
  });

  describe('Center aligment', () => {
    it('should render with center alignment styles', () => {
      const actual = create(<ButtonGroup align={ButtonGroup.CENTER} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('Left aligment', () => {
    it('should render with left alignment styles', () => {
      const actual = create(<ButtonGroup align={ButtonGroup.LEFT} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('No margin bottom', () => {
    it('should render without margin bottom styles', () => {
      const actual = create(<ButtonGroup noMargin />);
      expect(actual).toMatchSnapshot();
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<ButtonGroup />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
