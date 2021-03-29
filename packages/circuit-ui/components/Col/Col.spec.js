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

import Col from '.';

describe('Col', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Col />);
    expect(actual).toMatchSnapshot();
  });

  describe('default breakpoint', () => {
    it('should render with span based styles', () => {
      const actual = create(<Col span="6" />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with span/skip based styles', () => {
      const actual = create(<Col span="6" skip="6" />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('mobile breakpoint', () => {
    it('should render with span based styles', () => {
      const actual = create(<Col span={{ default: 6, kilo: 12 }} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with span/skip based styles', () => {
      const actual = create(
        <Col span={{ default: 6, kilo: 12 }} skip={{ default: 6, kilo: 3 }} />,
      );
      expect(actual).toMatchSnapshot();
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Col />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
