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

import { render, userEvent, axe, screen } from '../../util/test-utils';

import { CheckboxGroup } from './CheckboxGroup';

const defaultProps = {
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

describe('CheckboxGroup', () => {
  describe('Styles', () => {
    it('should render with default styles', () => {
      const { container } = render(<CheckboxGroup {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Logic', () => {
    it('should check the selected options', () => {
      const value = ['second', 'third'];
      render(<CheckboxGroup {...defaultProps} value={value} />);
      expect(screen.getByLabelText('Option 1')).not.toHaveAttribute('checked');
      expect(screen.getByLabelText('Option 2')).toHaveAttribute('checked');
      expect(screen.getByLabelText('Option 3')).toHaveAttribute('checked');
    });

    it('should have a required attribute on each option when required is specified', () => {
      render(<CheckboxGroup {...defaultProps} required />);
      expect(screen.getByLabelText('Option 1')).toHaveAttribute('required');
      expect(screen.getByLabelText('Option 2')).toHaveAttribute('required');
      expect(screen.getByLabelText('Option 3')).toHaveAttribute('required');
    });

    it('should call the onChange handler when clicked', async () => {
      const onChange = jest.fn();
      render(<CheckboxGroup {...defaultProps} onChange={onChange} />);

      await userEvent.click(screen.getByLabelText('Option 3'));

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should accept a working ref', () => {
      const tref = createRef<HTMLFieldSetElement>();
      const { container } = render(
        <CheckboxGroup {...defaultProps} ref={tref} />,
      );
      const fieldset = container.querySelector('fieldset');
      expect(tref.current).toBe(fieldset);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<CheckboxGroup {...defaultProps} />);
      const actual = await axe(container);

      expect(actual).toHaveNoViolations();
    });

    describe('Labeling', () => {
      it('should have an accessible name', () => {
        render(<CheckboxGroup {...defaultProps} />);
        const inputEl = screen.getByRole('group');

        expect(inputEl).toHaveAccessibleName(defaultProps.label);
      });

      it('should optionally have an accessible description', () => {
        const description = 'Description';
        render(
          <CheckboxGroup validationHint={description} {...defaultProps} />,
        );
        const inputEl = screen.getByRole('group');

        expect(inputEl).toHaveAccessibleDescription(description);
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
            ,
          </>,
        );
        const inputEl = screen.getByRole('group');

        expect(inputEl).toHaveAttribute(
          'aria-describedby',
          expect.stringContaining(customDescriptionId),
        );
        expect(inputEl).toHaveAccessibleDescription(customDescription);
      });

      it('should accept a custom description in addition to a validationHint', () => {
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
            ,
          </>,
        );
        const inputEl = screen.getByRole('group');

        expect(inputEl).toHaveAttribute(
          'aria-describedby',
          expect.stringContaining(customDescriptionId),
        );
        expect(inputEl).toHaveAccessibleDescription(
          `${customDescription} ${description}`,
        );
      });
    });

    describe('Status messages', () => {
      it('should render an empty live region on mount', () => {
        render(<CheckboxGroup {...defaultProps} />);
        const liveRegionEls = screen.getAllByRole('status');
        const checkboxGroupLiveRegionEl =
          liveRegionEls[liveRegionEls.length - 1];

        expect(checkboxGroupLiveRegionEl).toBeEmptyDOMElement();
      });

      it('should render status messages in a live region', () => {
        const statusMessage = 'Some fields are required';
        render(
          <CheckboxGroup
            invalid
            validationHint={statusMessage}
            {...defaultProps}
          />,
        );
        const liveRegionEls = screen.getAllByRole('status');
        const checkboxGroupLiveRegionEl =
          liveRegionEls[liveRegionEls.length - 1];

        expect(checkboxGroupLiveRegionEl).toHaveTextContent(statusMessage);
      });

      it('should not render descriptions in a live region', () => {
        const statusMessage = 'This field is required';
        render(
          <CheckboxGroup validationHint={statusMessage} {...defaultProps} />,
        );
        const liveRegionEls = screen.getAllByRole('status');
        const checkboxGroupLiveRegionEl =
          liveRegionEls[liveRegionEls.length - 1];

        expect(checkboxGroupLiveRegionEl).toBeEmptyDOMElement();
      });
    });
  });
});
