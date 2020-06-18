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

import {
  create,
  render,
  act,
  userEvent,
  renderToHtml,
  axe
} from '../../util/test-utils';

import { Selector } from './Selector';

const defaultProps = {
  name: 'name',
  value: 'value',
  onChange: jest.fn()
};

describe('Selector', () => {
  /**
   * Style tests.
   */
  it('should render a default selector', () => {
    const actual = create(<Selector {...defaultProps}>Label</Selector>);
    expect(actual).toMatchSnapshot();
  });
  it('should render a disabled selector', () => {
    const actual = create(
      <Selector {...defaultProps} disabled>
        Label
      </Selector>
    );
    expect(actual).toMatchSnapshot();
  });
  it('should render a checked selector', () => {
    const actual = create(
      <Selector {...defaultProps} checked>
        Label
      </Selector>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render a radio input by default', () => {
    const { getByLabelText } = render(
      <Selector {...defaultProps}>Label</Selector>
    );
    expect(getByLabelText('Label')).toHaveAttribute('type', 'radio');
  });

  it('should render a checkbox input when multiple options can be selected', () => {
    const { getByLabelText } = render(
      <Selector {...defaultProps} multiple>
        Label
      </Selector>
    );
    expect(getByLabelText('Label')).toHaveAttribute('type', 'checkbox');
  });

  /**
   * Logic tests.
   */
  it('should be unchecked by default', () => {
    const { getByLabelText } = render(
      <Selector {...defaultProps}>Label</Selector>
    );
    const inputEl = getByLabelText('Label', {
      exact: false
    });
    expect(inputEl).not.toHaveAttribute('checked');
  });

  it('should call the change handler when clicked', () => {
    const { getByLabelText } = render(
      <Selector {...defaultProps}>Label</Selector>
    );
    const inputEl = getByLabelText('Label', {
      exact: false
    });

    act(() => {
      userEvent.click(inputEl);
    });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = React.createRef<HTMLInputElement>();
      const { container } = render(<Selector {...defaultProps} ref={tref} />);
      const input = container.querySelector('input');
      expect(tref.current).toBe(input);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Selector {...defaultProps}>Label</Selector>);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
