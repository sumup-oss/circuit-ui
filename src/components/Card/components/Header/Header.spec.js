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

import { CardHeader } from '../..';

describe('CardHeader', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CardHeader />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CardHeader />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should render a close button when an onClose prop is passed', () => {
    const { getByTestId } = render(<CardHeader onClose={() => {}} />);
    const actual = getByTestId('header-close');
    expect(actual).not.toBeNull();
  });

  it('should call the onClose prop when the close button is clicked', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(<CardHeader onClose={onClose} />);

    act(() => {
      fireEvent.click(getByTestId('header-close'));
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
