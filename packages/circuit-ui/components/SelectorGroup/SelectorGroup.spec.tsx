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

import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import {
  axe,
  fireEvent,
  render,
  screen,
  userEvent,
} from '../../util/test-utils.js';

import { SelectorGroup, type SelectorGroupProps } from './SelectorGroup.js';

const defaultProps: SelectorGroupProps = {
  label: 'label',
  name: 'selector-group',
  options: [
    { label: 'Option 1', value: 'first' },
    { label: 'Option 2', value: 'second' },
    { label: 'Option 3', value: 'third' },
  ],
};

describe('SelectorGroup', () => {
  describe('Structure & Semantics', () => {
    it('should not render if the options are empty', () => {
      render(<SelectorGroup {...defaultProps} options={[]} />);
      const groupEl = screen.queryByRole('radiogroup');
      expect(groupEl).toBeNull();
    });

    it('should be initially unchecked by default', () => {
      render(<SelectorGroup {...defaultProps} />);
      expect(screen.getByLabelText('Option 1')).not.toBeChecked();
      expect(screen.getByLabelText('Option 2')).not.toBeChecked();
      expect(screen.getByLabelText('Option 3')).not.toBeChecked();
    });

    it('should be initially checked (uncontrolled)', () => {
      const defaultValue = 'first';
      render(<SelectorGroup {...defaultProps} defaultValue={defaultValue} />);
      expect(screen.getByLabelText('Option 1')).toBeChecked();
      expect(screen.getByLabelText('Option 2')).not.toBeChecked();
      expect(screen.getByLabelText('Option 3')).not.toBeChecked();
    });

    it('should be initially checked (controlled)', () => {
      const value = 'second';
      render(
        <SelectorGroup {...defaultProps} value={value} onChange={vi.fn()} />,
      );
      expect(screen.getByLabelText('Option 1')).not.toBeChecked();
      expect(screen.getByLabelText('Option 2')).toBeChecked();
      expect(screen.getByLabelText('Option 3')).not.toBeChecked();
    });

    it('should have the same name for each option', () => {
      render(<SelectorGroup {...defaultProps} />);
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
      render(<SelectorGroup {...defaultProps} />);
      const groupEl = screen.getByRole('radiogroup');
      expect(groupEl).toHaveAccessibleName(defaultProps.label);
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <SelectorGroup
            aria-describedby={customDescriptionId}
            {...defaultProps}
          />
        </>,
      );
      const groupEl = screen.getByRole('radiogroup');
      expect(groupEl).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(customDescriptionId),
      );
      expect(groupEl).toHaveAccessibleDescription(customDescription);
    });
  });

  describe('State & Interactions', () => {
    it('should give precedence to the `value` prop over the `checked` attribute of the individual options', () => {
      const value = 'second';
      const options = [
        { label: 'Option 1', value: 'first', checked: true },
        { label: 'Option 2', value: 'second', checked: false },
      ];
      render(
        <SelectorGroup
          {...defaultProps}
          value={value}
          onChange={vi.fn()}
          options={options}
        />,
      );
      expect(screen.getByLabelText('Option 1')).not.toBeChecked();
      expect(screen.getByLabelText('Option 2')).toBeChecked();
    });

    it('should give precedence to the `defaultValue` prop over the `defaultChecked` attribute of the individual options', () => {
      const defaultValue = 'second';
      const options = [
        { label: 'Option 1', value: 'first', defaultChecked: true },
        { label: 'Option 2', value: 'second', defaultChecked: false },
      ];
      render(
        <SelectorGroup
          {...defaultProps}
          defaultValue={defaultValue}
          onChange={vi.fn()}
          options={options}
        />,
      );
      expect(screen.getByLabelText('Option 1')).not.toBeChecked();
      expect(screen.getByLabelText('Option 2')).toBeChecked();
    });

    it('should call the change handler when clicked', async () => {
      const onChange = vi.fn();
      render(<SelectorGroup {...defaultProps} onChange={onChange} />);

      await userEvent.click(screen.getByLabelText('Option 3'));

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call the blur handler when loosing focus', async () => {
      const onBlur = vi.fn();
      render(<SelectorGroup {...defaultProps} onBlur={onBlur} />);
      const inputEl = screen.getByLabelText('Option 1');

      await userEvent.click(inputEl);
      fireEvent.blur(inputEl);

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('should forward a ref to the group', () => {
      const ref = createRef<HTMLFieldSetElement>();
      render(<SelectorGroup {...defaultProps} ref={ref} />);
      const groupEl = screen.getByRole('radiogroup');
      expect(ref.current).toBe(groupEl);
    });

    it('should disable the options fully', () => {
      render(<SelectorGroup {...defaultProps} disabled />);
      expect(screen.getByRole('radiogroup')).toBeDisabled();
      expect(screen.getByLabelText('Option 1')).toBeDisabled();
      expect(screen.getByLabelText('Option 2')).toBeDisabled();
      expect(screen.getByLabelText('Option 3')).toBeDisabled();
    });

    it('should disable the options partially', () => {
      const options = [
        { label: 'Option 1', value: 'first', disabled: true },
        { label: 'Option 2', value: 'second' },
      ];
      render(<SelectorGroup {...defaultProps} options={options} />);
      expect(screen.getByRole('radiogroup')).not.toBeDisabled();
      expect(screen.getByLabelText('Option 1')).toBeDisabled();
      expect(screen.getByLabelText('Option 2')).not.toBeDisabled();
    });
  });

  describe('Validations', () => {
    it.todo('should announce validation hints to screen reader users');
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const defaultValue = 'second';
      const { container } = render(
        <SelectorGroup {...defaultProps} defaultValue={defaultValue} />,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should have no violations (multiple)', async () => {
      const defaultValue = ['second'];
      const { container } = render(
        <SelectorGroup
          {...defaultProps}
          defaultValue={defaultValue}
          multiple
        />,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it.todo('should render an empty live region on mount');

    it.todo('should render status messages in a live region');

    it.todo('should not render descriptions in a live region');
  });
});
