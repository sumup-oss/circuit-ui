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

import { axe, render, userEvent } from '../../util/test-utils';

import { Checkbox } from './Checkbox';

const defaultProps = {
  name: 'name',
  onChange: jest.fn(),
};

describe('Checkbox', () => {
  // ResizeObserver Mock
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const { container } = render(<Checkbox noMargin {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with checked styles when passed the checked prop', () => {
    const { container } = render(
      <Checkbox noMargin checked {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with disabled styles when passed the disabled prop', () => {
    const { container } = render(
      <Checkbox noMargin disabled {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const { container } = render(
      <Checkbox noMargin invalid {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with default spacing when there is no noMargin prop', () => {
    /* @ts-expect-error the noMargin prop is required */
    const { container } = render(<Checkbox {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with a tooltip when passed a validation hint', () => {
    const { container } = render(
      <Checkbox
        noMargin
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
      <Checkbox noMargin {...defaultProps}>
        Label
      </Checkbox>,
    );
    const inputEl = getByLabelText('Label', {
      exact: false,
    });
    expect(inputEl).not.toHaveAttribute('checked');
  });

  it('should call the change handler when clicked', async () => {
    const { getByLabelText } = render(
      <Checkbox noMargin {...defaultProps}>
        Label
      </Checkbox>,
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
      const { container } = render(<Checkbox noMargin ref={tref} />);
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
        <Checkbox noMargin {...defaultProps}>
          Label
        </Checkbox>
      </div>,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
