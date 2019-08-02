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

import TableCell from '.';

const children = 'Foo';

describe('TableCell', () => {
  describe('Style tests', () => {
    it('should render with default styles', () => {
      const actual = create(<TableCell>{children}</TableCell>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with isHovered styles', () => {
      const actual = create(<TableCell isHovered>{children}</TableCell>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with header styles', () => {
      const actual = create(<TableCell header>{children}</TableCell>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with condensed styles', () => {
      const actual = create(<TableCell condensed>{children}</TableCell>);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('Accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<TableCell sortable>{children}</TableCell>);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
