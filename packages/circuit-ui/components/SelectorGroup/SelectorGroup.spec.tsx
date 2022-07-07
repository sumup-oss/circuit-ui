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

import { createRef } from 'react';

import { axe, render, screen } from '../../util/test-utils';

import { SelectorGroup } from './SelectorGroup';
import { MultipleLines } from './SelectorGroup.stories';

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
    const actual = render(<SelectorGroup {...defaultProps} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should check the selected option', () => {
    const value = 'second';
    render(<SelectorGroup {...defaultProps} value={value} />);
    expect(screen.getByLabelText('Option 1')).not.toHaveAttribute('checked');
    expect(screen.getByLabelText('Option 2')).toHaveAttribute('checked');
    expect(screen.getByLabelText('Option 3')).not.toHaveAttribute('checked');
  });

  it('should check the selected options', () => {
    const value = ['second', 'third'];
    render(<SelectorGroup {...defaultProps} value={value} multiple />);
    expect(screen.getByLabelText('Option 1')).not.toHaveAttribute('checked');
    expect(screen.getByLabelText('Option 2')).toHaveAttribute('checked');
    expect(screen.getByLabelText('Option 3')).toHaveAttribute('checked');
  });

  it('should accept a working ref', () => {
    const tref = createRef<HTMLFieldSetElement>();
    const { container } = render(
      <SelectorGroup {...defaultProps} ref={tref} />,
    );
    const fieldset = container.querySelector('fieldset');
    expect(tref.current).toBe(fieldset);
  });

  it('should render with horizontal layout by default', () => {
    const actual = render(<SelectorGroup {...defaultProps} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render all selectors with the same height', () => {
    const actual = render(<MultipleLines />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const value = 'second';
    const { container } = render(
      <SelectorGroup {...defaultProps} value={value} />,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
