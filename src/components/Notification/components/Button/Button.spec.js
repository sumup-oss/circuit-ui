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

import { NotificationButton } from '../..';

describe('NotificationButton', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<NotificationButton />);
    expect(actual).toMatchSnapshot();
  });

  it('should render alignment styles when passed the align prop', () => {
    const actual = create(
      <NotificationButton align={NotificationButton.CENTER} />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<NotificationButton />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
