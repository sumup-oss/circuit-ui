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

import { MessageIcon } from '../..';

describe('MessageIcon', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<MessageIcon />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with error icon', () => {
    const actual = create(<MessageIcon type={MessageIcon.ERROR} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with warning icon', () => {
    const actual = create(<MessageIcon type={MessageIcon.WARNING} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with custom icon content', () => {
    const actual = create(
      <MessageIcon>
        <div>Custom content</div>
      </MessageIcon>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<MessageIcon />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
