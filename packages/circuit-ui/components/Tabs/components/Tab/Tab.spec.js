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

import Tab from './Tab';

describe('Tab', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Tab>content</Tab>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with selected styles', () => {
      const actual = create(<Tab selected>content</Tab>);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should accept a working ref', () => {
      const tref = React.createRef();
      const { container } = render(<Tab ref={tref} />);
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
    });
  });
});
