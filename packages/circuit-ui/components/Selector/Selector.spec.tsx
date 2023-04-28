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

import { render, userEvent, screen, axe } from '../../util/test-utils';

import { Selector } from './Selector';

const defaultProps = {
  name: 'name',
  value: 'value',
  onChange: jest.fn(),
  label: 'Label',
};

describe('Selector', () => {
  /**
   * Style tests.
   */
  it('should render a default selector', () => {
    const { container } = render(<Selector {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  it('should render a disabled selector', () => {
    const { container } = render(<Selector {...defaultProps} disabled />);
    expect(container).toMatchSnapshot();
  });
  it('should render a checked selector', () => {
    const { container } = render(<Selector {...defaultProps} checked />);
    expect(container).toMatchSnapshot();
  });

  it('should render a radio input by default', () => {
    render(<Selector {...defaultProps} />);
    expect(screen.getByLabelText('Label')).toHaveAttribute('type', 'radio');
  });

  it('should render a checkbox input when multiple options can be selected', () => {
    render(<Selector {...defaultProps} multiple />);
    expect(screen.getByLabelText('Label')).toHaveAttribute('type', 'checkbox');
  });

  /**
   * Logic tests.
   */
  it('should be unchecked by default', () => {
    render(<Selector {...defaultProps} />);
    const inputEl = screen.getByLabelText('Label', {
      exact: false,
    });
    expect(inputEl).not.toHaveAttribute('checked');
  });

  it('should call the change handler when clicked', async () => {
    render(<Selector {...defaultProps} />);
    const inputEl = screen.getByLabelText('Label', {
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
      const { container } = render(<Selector {...defaultProps} ref={tref} />);
      const input = container.querySelector('input');
      expect(tref.current).toBe(input);
    });

    it('should accept a custom description via aria-describedby', () => {
      const description = 'Description';
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <Selector
            aria-describedby={customDescriptionId}
            description={description}
            {...defaultProps}
          />
          ,
        </>,
      );
      const inputEl = screen.getByLabelText('Label', {
        exact: false,
      });

      expect(inputEl).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(customDescriptionId),
      );
      expect(inputEl).toHaveAccessibleDescription(
        `${customDescription} ${description}`,
      );
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const { container } = render(
      <Selector {...defaultProps} description="Description" />,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
