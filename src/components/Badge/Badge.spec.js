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

import Badge from '.';

describe('Badge', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Badge />);
    expect(actual).toMatchSnapshot();
  });

  describe('rendering color variations', () => {
    it('should render with success colors', () => {
      const actual = create(<Badge color={Badge.SUCCESS} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with warning colors', () => {
      const actual = create(<Badge color={Badge.WARNING} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with danger colors', () => {
      const actual = create(<Badge color={Badge.DANGER} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with primary colors', () => {
      const actual = create(<Badge color={Badge.PRIMARY} />);
      expect(actual).toMatchSnapshot();
    });
  });

  it('should have hover/active styles only when the onClick handler is provided', () => {
    const actual = create(<Badge onClick={() => {}} />);
    expect(actual).toMatchSnapshot();
  });

  it('should have the correct circle styles', () => {
    const actual = create(<Badge circle />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Badge />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should be clickable', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Badge {...{ onClick }} />);
    wrapper.find('div').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
