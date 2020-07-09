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
  renderToHtml,
  axe,
  act,
  userEvent,
} from '../../util/test-utils';

import { Checkbox } from './Checkbox';

const defaultProps = {
  name: 'name',
  onChange: jest.fn(),
};

describe('Checkbox', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Checkbox {...defaultProps} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with checked styles when passed the checked prop', () => {
    const actual = create(<Checkbox checked {...defaultProps} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles when passed the disabled prop', () => {
    const actual = create(<Checkbox disabled {...defaultProps} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<Checkbox invalid {...defaultProps} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with a tooltip when passed a validation hint', () => {
    const actual = create(
      <Checkbox validationHint="This field is required." {...defaultProps} />,
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should be unchecked by default', () => {
    const { getByLabelText } = render(
      <Checkbox {...defaultProps}>Label</Checkbox>,
    );
    const inputEl = getByLabelText('Label', {
      exact: false,
    });
    expect(inputEl).not.toHaveAttribute('checked');
  });

  it('should call the change handler when clicked', () => {
    const { getByLabelText } = render(
      <Checkbox {...defaultProps}>Label</Checkbox>,
    );
    const inputEl = getByLabelText('Label', {
      exact: false,
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
      const { container } = render(<Checkbox ref={tref} />);
      const checkbox = container.querySelector('input');
      expect(tref.current).toBe(checkbox);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <div>
        <Checkbox {...defaultProps}>Label</Checkbox>
      </div>,
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
