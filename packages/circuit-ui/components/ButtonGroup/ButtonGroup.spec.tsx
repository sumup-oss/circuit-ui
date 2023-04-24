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

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';

import { create, render, renderToHtml, axe } from '../../util/test-utils.jsx';

import { ButtonGroup, ButtonGroupProps } from './ButtonGroup';

describe('ButtonGroup', () => {
  const defaultProps: ButtonGroupProps = {
    actions: {
      primary: {
        children: 'Continue',
      },
      secondary: {
        children: 'Cancel',
      },
    },
  };

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<ButtonGroup {...defaultProps} />);

    expect(actual).toMatchSnapshot();
  });

  it.each(['center', 'left', 'right'] as const)(
    'should render aligned to the %s',
    (align) => {
      const actual = create(<ButtonGroup {...defaultProps} align={align} />);

      expect(actual).toMatchSnapshot();
    },
  );

  /**
   * Logic tests
   */
  it('should accept a working ref', () => {
    const tref = createRef<HTMLDivElement>();
    const { container } = render(<ButtonGroup {...defaultProps} ref={tref} />);
    const div = container.querySelector('div');
    expect(tref.current).toBe(div);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<ButtonGroup {...defaultProps} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
