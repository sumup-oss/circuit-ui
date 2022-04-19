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

import { create, renderToHtml, axe } from '../../util/test-utils';

import { ButtonGroup, ButtonGroupProps } from './ButtonGroup';

describe('ButtonGroup', () => {
  /**
   * Style tests.
   */
  const props: ButtonGroupProps = {
    actions: {
      primary: {
        children: 'Look again',
        onClick: jest.fn(),
      },
      secondary: {
        children: 'Go elsewhere',
        href: 'https://sumup.com',
      },
    },
  };
  it('should render with default styles', () => {
    const actual = create(<ButtonGroup {...props} />);

    expect(actual).toMatchSnapshot();
  });

  describe('Center aligment', () => {
    it('should render with center alignment styles', () => {
      const actual = create(<ButtonGroup align={'center'} {...props} />);

      expect(actual).toMatchSnapshot();
    });
  });

  describe('Left aligment', () => {
    it('should render with left alignment styles', () => {
      const actual = create(<ButtonGroup align={'left'} {...props} />);

      expect(actual).toMatchSnapshot();
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<ButtonGroup align={'center'} {...props} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
