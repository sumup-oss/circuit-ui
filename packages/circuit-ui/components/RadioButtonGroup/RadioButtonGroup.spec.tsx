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

import { render, userEvent, axe } from '../../util/test-utils';

import { RadioButtonGroup } from './RadioButtonGroup';

describe('RadioButtonGroup', () => {
  const baseProps = {
    options: [
      {
        label: 'Option 1',
        value: 'first',
      },
      {
        label: 'Option 2',
        value: 'second',
      },
      {
        label: 'Option 3',
        value: 'third',
      },
    ],
    onChange: jest.fn(),
    label: 'Choose an option',
  };

  describe('Styles', () => {
    it('should render with default styles', () => {
      const { container } = render(<RadioButtonGroup {...baseProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Logic', () => {
    it('should check the selected option', () => {
      const value = 'second';
      const { getByLabelText } = render(
        <RadioButtonGroup {...baseProps} value={value} />,
      );
      expect(getByLabelText('Option 1')).not.toHaveAttribute('checked');
      expect(getByLabelText('Option 2')).toHaveAttribute('checked');
      expect(getByLabelText('Option 3')).not.toHaveAttribute('checked');
    });

    it('should have a required attribute on each option when required is specified', () => {
      const { getByLabelText } = render(
        <RadioButtonGroup {...baseProps} required />,
      );
      expect(getByLabelText('Option 1')).toHaveAttribute('required');
      expect(getByLabelText('Option 2')).toHaveAttribute('required');
      expect(getByLabelText('Option 3')).toHaveAttribute('required');
    });

    it('should call the change handler when clicked', async () => {
      const onChange = jest.fn();
      const { getByLabelText } = render(
        <RadioButtonGroup {...baseProps} onChange={onChange} />,
      );

      await userEvent.click(getByLabelText('Option 3'));

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should accept a working ref', () => {
      const tref = createRef<HTMLFieldSetElement>();
      const { container } = render(
        <RadioButtonGroup {...baseProps} ref={tref} />,
      );
      const fieldset = container.querySelector('fieldset');
      expect(tref.current).toBe(fieldset);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const value = 'second';
      const { container } = render(
        <RadioButtonGroup {...baseProps} value={value} />,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
