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

import { create, render, userEvent } from '../../../../util/test-utils';

import { Switch } from './Switch';

const defaultProps = {
  checkedLabel: 'on',
  uncheckedLabel: 'off',
};

describe('Switch', () => {
  /**
   * Stylesheet tests.
   */
  it('should have the correct default styles', () => {
    const actual = create(<Switch {...defaultProps} />);
    expect(actual).toMatchSnapshot();
  });

  it('should have the correct on styles', () => {
    const actual = create(<Switch {...defaultProps} checked />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should call the change handler when toggled', async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Switch {...defaultProps} onChange={onChange} data-testid="switch" />,
    );
    await userEvent.click(getByTestId('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = createRef<HTMLButtonElement>();
      const { container } = render(<Switch {...defaultProps} ref={tref} />);
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
    });
  });
});
