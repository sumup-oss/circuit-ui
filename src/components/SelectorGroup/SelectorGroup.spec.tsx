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

import { create, render, renderToHtml, axe } from '../../util/test-utils';

import { SelectorGroup } from './SelectorGroup';

describe('SelectorGroup', () => {
  const defaultProps = {
    onChange: jest.fn(),
    value: '',
    label: 'Choose an option',
    options: [
      {
        children: 'Option 1',
        value: 'first',
      },
      {
        children: 'Option 2',
        value: 'second',
      },
      {
        children: 'Option 3',
        value: 'third',
      },
    ],
  };

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<SelectorGroup {...defaultProps} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should check the selected option', () => {
    const value = 'second';
    const { getByLabelText } = render(
      <SelectorGroup {...defaultProps} value={value} />,
    );
    expect(getByLabelText('Option 1')).not.toHaveAttribute('checked');
    expect(getByLabelText('Option 2')).toHaveAttribute('checked');
    expect(getByLabelText('Option 3')).not.toHaveAttribute('checked');
  });

  it('should check the selected options', () => {
    const value = ['second', 'third'];
    const { getByLabelText } = render(
      <SelectorGroup {...defaultProps} value={value} multiple />,
    );
    expect(getByLabelText('Option 1')).not.toHaveAttribute('checked');
    expect(getByLabelText('Option 2')).toHaveAttribute('checked');
    expect(getByLabelText('Option 3')).toHaveAttribute('checked');
  });

  it('should accept a working ref', () => {
    const tref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <SelectorGroup {...defaultProps} ref={tref} />,
    );
    const div = container.querySelector('div');
    expect(tref.current).toBe(div);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const value = 'second';
    const wrapper = renderToHtml(
      <SelectorGroup {...defaultProps} value={value} />,
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
