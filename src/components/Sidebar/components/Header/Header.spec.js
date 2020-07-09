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

import Header from './Header';

describe('Header', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Header />);
      expect(actual).toMatchSnapshot();
    });

    it('should render children', () => {
      const { getByTestId } = render(
        <Header>
          <span data-testid="child">Child</span>
        </Header>,
      );
      const childEl = getByTestId('child');
      expect(childEl).not.toBeNull();
      expect(childEl).toHaveTextContent('Child');
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Header />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
