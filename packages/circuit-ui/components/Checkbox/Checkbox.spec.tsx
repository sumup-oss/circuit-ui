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

import { render, axe, userEvent } from '../../util/test-utils';

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
    const { container } = render(<Checkbox {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with checked styles', () => {
    const { container } = render(<Checkbox checked {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with disabled styles', () => {
    const { container } = render(<Checkbox disabled {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with invalid styles and an error message', () => {
    const { container } = render(
      <Checkbox
        invalid
        validationHint="This field is required."
        {...defaultProps}
      />,
    );
    expect(container).toMatchSnapshot();
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

  it('should call the change handler when clicked', async () => {
    const { getByLabelText } = render(
      <Checkbox {...defaultProps}>Label</Checkbox>,
    );
    const inputEl = getByLabelText('Label', {
      exact: false,
    });

    await userEvent.click(inputEl);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = createRef<HTMLInputElement>();
      const { container } = render(<Checkbox ref={tref} />);
      const checkbox = container.querySelector('input');
      expect(tref.current).toBe(checkbox);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const { container } = render(
      <div>
        <Checkbox {...defaultProps}>Label</Checkbox>
      </div>,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
