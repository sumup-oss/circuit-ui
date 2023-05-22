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

import {
  render,
  userEvent,
  axe,
  screen,
  fireEvent,
} from '../../util/test-utils';

import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';

const defaultProps: CheckboxGroupProps = {
  label: 'Label',
  name: 'checkbox-group',
  options: [
    { label: 'Option 1', value: 'first' },
    { label: 'Option 2', value: 'second' },
    { label: 'Option 3', value: 'third' },
  ],
};

describe('CheckboxGroup', () => {
  describe('Structure & Semantics', () => {
    it('should not render if the options are empty', () => {
      render(<CheckboxGroup {...defaultProps} options={[]} />);
      const groupEl = screen.queryByRole('group');
      expect(groupEl).toBeNull();
    });

    it('should be initially unchecked by default', () => {
      render(<CheckboxGroup {...defaultProps} />);
      expect(screen.getByLabelText('Option 1')).not.toBeChecked();
      expect(screen.getByLabelText('Option 2')).not.toBeChecked();
      expect(screen.getByLabelText('Option 3')).not.toBeChecked();
    });

    it('should be initially checked (uncontrolled)', () => {
      const defaultValue = ['first', 'second'];
      render(<CheckboxGroup {...defaultProps} defaultValue={defaultValue} />);
      expect(screen.getByLabelText('Option 1')).toBeChecked();
      expect(screen.getByLabelText('Option 2')).toBeChecked();
      expect(screen.getByLabelText('Option 3')).not.toBeChecked();
    });

    it('should be initially checked (controlled)', () => {
      const value = ['first', 'second'];
      render(
        <CheckboxGroup {...defaultProps} value={value} onChange={jest.fn()} />,
      );
      expect(screen.getByLabelText('Option 1')).toBeChecked();
      expect(screen.getByLabelText('Option 2')).toBeChecked();
      expect(screen.getByLabelText('Option 3')).not.toBeChecked();
    });

    it('should have the same name for each option', () => {
      render(<CheckboxGroup {...defaultProps} />);
      expect(screen.getByLabelText('Option 1')).toHaveAttribute(
        'name',
        defaultProps.name,
      );
      expect(screen.getByLabelText('Option 2')).toHaveAttribute(
        'name',
        defaultProps.name,
      );
      expect(screen.getByLabelText('Option 3')).toHaveAttribute(
        'name',
        defaultProps.name,
      );
    });

    it('should have a label (accessible name)', () => {
      render(<CheckboxGroup {...defaultProps} />);
      const groupEl = screen.getByRole('group');
      expect(groupEl).toHaveAccessibleName(defaultProps.label);
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <CheckboxGroup
            aria-describedby={customDescriptionId}
            {...defaultProps}
          />
        </>,
      );
      const groupEl = screen.getByRole('group');
      expect(groupEl).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(customDescriptionId),
      );
      expect(groupEl).toHaveAccessibleDescription(customDescription);
    });

    it('should combine the built-in and custom description', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      const description = 'Description';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <CheckboxGroup
            validationHint={description}
            aria-describedby={customDescriptionId}
            {...defaultProps}
          />
        </>,
      );
      const groupEl = screen.getByRole('group');
      expect(groupEl).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(customDescriptionId),
      );
      expect(groupEl).toHaveAccessibleDescription(
        `${customDescription} ${description}`,
      );
    });
  });

  describe('State & Interactions', () => {
    it('should give precedence to the `value` prop over the `checked` attribute of the individual options', () => {
      const value = ['second'];
      const options = [
        { label: 'Option 1', value: 'first', checked: true },
        { label: 'Option 2', value: 'second', checked: false },
      ];
      render(
        <CheckboxGroup
          {...defaultProps}
          value={value}
          onChange={jest.fn()}
          options={options}
        />,
      );
      expect(screen.getByLabelText('Option 1')).not.toBeChecked();
      expect(screen.getByLabelText('Option 2')).toBeChecked();
    });

    it('should give precedence to the `defaultValue` prop over the `defaultChecked` attribute of the individual options', () => {
      const defaultValue = ['second'];
      const options = [
        { label: 'Option 1', value: 'first', defaultChecked: true },
        { label: 'Option 2', value: 'second', defaultChecked: false },
      ];
      render(
        <CheckboxGroup
          {...defaultProps}
          defaultValue={defaultValue}
          onChange={jest.fn()}
          options={options}
        />,
      );
      expect(screen.getByLabelText('Option 1')).not.toBeChecked();
      expect(screen.getByLabelText('Option 2')).toBeChecked();
    });

    it('should call the change handler when clicked', async () => {
      const onChange = jest.fn();
      render(<CheckboxGroup {...defaultProps} onChange={onChange} />);

      await userEvent.click(screen.getByLabelText('Option 3'));

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call the blur handler when loosing focus', async () => {
      const onBlur = jest.fn();
      render(<CheckboxGroup {...defaultProps} onBlur={onBlur} />);
      const inputEl = screen.getByLabelText('Option 1');

      await userEvent.click(inputEl);
      fireEvent.blur(inputEl);

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('should forward a ref to the group', () => {
      const ref = createRef<HTMLFieldSetElement>();
      render(<CheckboxGroup {...defaultProps} ref={ref} />);
      const groupEl = screen.getByRole('group');
      expect(ref.current).toBe(groupEl);
    });

    it('should disable the options fully', () => {
      render(<CheckboxGroup {...defaultProps} disabled />);
      expect(screen.getByRole('group')).toBeDisabled();
      expect(screen.getByLabelText('Option 1')).toBeDisabled();
      expect(screen.getByLabelText('Option 2')).toBeDisabled();
      expect(screen.getByLabelText('Option 3')).toBeDisabled();
    });

    it('should disable the options partially', () => {
      const options = [
        { label: 'Option 1', value: 'first', disabled: true },
        { label: 'Option 2', value: 'second' },
      ];
      render(<CheckboxGroup {...defaultProps} options={options} />);
      expect(screen.getByRole('group')).not.toBeDisabled();
      expect(screen.getByLabelText('Option 1')).toBeDisabled();
      expect(screen.getByLabelText('Option 2')).not.toBeDisabled();
    });
  });

  describe('Validations', () => {
    it('should announce validation hints to screen reader users', () => {
      const validationHint = 'Some options are required';
      render(
        <CheckboxGroup
          invalid
          validationHint={validationHint}
          {...defaultProps}
        />,
      );
      const liveRegionEls = screen.getAllByRole('status');
      const groupLiveRegionEl = liveRegionEls[liveRegionEls.length - 1];
      expect(groupLiveRegionEl).toHaveTextContent(validationHint);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<CheckboxGroup {...defaultProps} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should render an empty live region on mount', () => {
      render(<CheckboxGroup {...defaultProps} />);
      const liveRegionEls = screen.getAllByRole('status');
      const groupLiveRegionEl = liveRegionEls[liveRegionEls.length - 1];
      expect(groupLiveRegionEl).toBeEmptyDOMElement();
    });

    it('should not render descriptions in a live region', () => {
      const statusMessage = 'This field is required';
      render(
        <CheckboxGroup validationHint={statusMessage} {...defaultProps} />,
      );
      const liveRegionEls = screen.getAllByRole('status');
      const groupLiveRegionEl = liveRegionEls[liveRegionEls.length - 1];
      expect(groupLiveRegionEl).toBeEmptyDOMElement();
    });
  });
});
