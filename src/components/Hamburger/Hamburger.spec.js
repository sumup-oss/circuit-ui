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

import Hamburger from './Hamburger';

describe('Hamburger', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Hamburger />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with active styles when passed the isActive prop', () => {
    const actual = create(<Hamburger isActive />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should call the onClick prop when clicked', () => {
    const onClickMock = jest.fn();
    const { getByTestId } = render(
      <Hamburger onClick={onClickMock} data-testid="hamburger" />
    );

    act(() => {
      fireEvent.click(getByTestId('hamburger'));
    });

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Hamburger />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
