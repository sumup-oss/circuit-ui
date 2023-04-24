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

import { render, userEvent, axe } from '../../util/test-utils';

import { RadioButtonGroup } from './RadioButtonGroup';

describe('RadioButtonGroup', () => {
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
    onChange: vi.fn(),
    label: 'Choose an option',
  };

  describe('Styles', () => {
    it('should render with default styles', () => {
      const { container } = render(<RadioButtonGroup {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Logic', () => {
    it('should check the selected option', () => {
      const value = 'second';
      const { getByLabelText } = render(
        <RadioButtonGroup {...defaultProps} value={value} />,
      );
      expect(getByLabelText('Option 1')).not.toHaveAttribute('checked');
      expect(getByLabelText('Option 2')).toHaveAttribute('checked');
      expect(getByLabelText('Option 3')).not.toHaveAttribute('checked');
    });

    it('should have a required attribute on each option when required is specified', () => {
      const { getByLabelText } = render(
        <RadioButtonGroup {...defaultProps} required />,
      );
      expect(getByLabelText('Option 1')).toHaveAttribute('required');
      expect(getByLabelText('Option 2')).toHaveAttribute('required');
      expect(getByLabelText('Option 3')).toHaveAttribute('required');
    });

    it('should call the change handler when clicked', async () => {
      const onChange = vi.fn();
      const { getByLabelText } = render(
        <RadioButtonGroup {...defaultProps} onChange={onChange} />,
      );

      await userEvent.click(getByLabelText('Option 3'));

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should accept a working ref', () => {
      const tref = createRef<HTMLFieldSetElement>();
      const { container } = render(
        <RadioButtonGroup {...defaultProps} ref={tref} />,
      );
      const fieldset = container.querySelector('fieldset');
      expect(tref.current).toBe(fieldset);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<RadioButtonGroup {...defaultProps} />);
      const actual = await axe(container);

      expect(actual).toHaveNoViolations();
    });

    describe('Labeling', () => {
      it('should have an accessible name', () => {
        const { getByRole } = render(<RadioButtonGroup {...defaultProps} />);
        const inputEl = getByRole('radiogroup');

        expect(inputEl).toHaveAccessibleName(defaultProps.label);
      });

      it('should optionally have an accessible description', () => {
        const description = 'Description';
        const { getByRole } = render(
          <RadioButtonGroup validationHint={description} {...defaultProps} />,
        );
        const inputEl = getByRole('radiogroup');

        expect(inputEl).toHaveAccessibleDescription(description);
      });

      it('should accept a custom description via aria-describedby', () => {
        const customDescription = 'Custom description';
        const customDescriptionId = 'customDescriptionId';
        const { getByRole } = render(
          <>
            <span id={customDescriptionId}>{customDescription}</span>
            <RadioButtonGroup
              aria-describedby={customDescriptionId}
              {...defaultProps}
            />
            ,
          </>,
        );
        const inputEl = getByRole('radiogroup');

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
        const { getByRole } = render(
          <>
            <span id={customDescriptionId}>{customDescription}</span>
            <RadioButtonGroup
              validationHint={description}
              aria-describedby={customDescriptionId}
              {...defaultProps}
            />
            ,
          </>,
        );
        const inputEl = getByRole('radiogroup');

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
        const { getByRole } = render(<RadioButtonGroup {...defaultProps} />);
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toBeEmptyDOMElement();
      });

      it('should render status messages in a live region', () => {
        const statusMessage = 'This field is required';
        const { getByRole } = render(
          <RadioButtonGroup
            invalid
            validationHint={statusMessage}
            {...defaultProps}
          />,
        );
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toHaveTextContent(statusMessage);
      });

      it('should not render descriptions in a live region', () => {
        const statusMessage = 'This field is required';
        const { getByRole } = render(
          <RadioButtonGroup validationHint={statusMessage} {...defaultProps} />,
        );
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toBeEmptyDOMElement();
      });
    });
  });
});
