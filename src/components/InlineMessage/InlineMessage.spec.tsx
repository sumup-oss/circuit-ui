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

import { create, renderToHtml, axe } from '../../util/test-utils';

import { InlineMessage } from './InlineMessage';

describe('InlineMessage', () => {
  /**
   * Style tests.
   */
  it('should render with success styles', () => {
    const actual = create(<InlineMessage variant="success" />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with warning styles', () => {
    const actual = create(<InlineMessage variant="warning" />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with danger styles', () => {
    const actual = create(<InlineMessage variant="danger" />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with giga spacing', () => {
    const actual = create(<InlineMessage variant="danger" size="mega" />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<InlineMessage variant="success" />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
