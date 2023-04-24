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

import { render, axe, userEvent } from '../../util/test-utils.jsx';

import { Checkbox } from './Checkbox';

const defaultProps = {
  label: 'Label',
  onChange: vi.fn(),
};

describe('Checkbox', () => {
  describe('Styles', () => {
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
  });

  describe('Logic', () => {
    it('should be unchecked by default', () => {
      const { getByRole } = render(<Checkbox {...defaultProps} />);
      const inputEl = getByRole('checkbox');

      expect(inputEl).not.toHaveAttribute('checked');
    });

    it('should call the change handler when clicked', async () => {
      const { getByRole } = render(<Checkbox {...defaultProps} />);
      const inputEl = getByRole('checkbox');

      await userEvent.click(inputEl);

      expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    });

    it('should accept a working ref', () => {
      const tref = createRef<HTMLInputElement>();
      const { getByRole } = render(<Checkbox ref={tref} {...defaultProps} />);
      const inputEl = getByRole('checkbox');

      expect(tref.current).toBe(inputEl);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<Checkbox {...defaultProps} />);
      const actual = await axe(container);

      expect(actual).toHaveNoViolations();
    });

    describe('Labeling', () => {
      it('should have an accessible name', () => {
        const { getByRole } = render(<Checkbox {...defaultProps} />);
        const inputEl = getByRole('checkbox');

        expect(inputEl).toHaveAccessibleName(defaultProps.label);
      });

      it('should optionally have an accessible description', () => {
        const description = 'Description';
        const { getByRole } = render(
          <Checkbox validationHint={description} {...defaultProps} />,
        );
        const inputEl = getByRole('checkbox');

        expect(inputEl).toHaveAccessibleDescription(description);
      });

      it('should accept a custom description via aria-describedby', () => {
        const customDescription = 'Custom description';
        const customDescriptionId = 'customDescriptionId';
        const { getByRole } = render(
          <>
            <span id={customDescriptionId}>{customDescription}</span>
            <Checkbox
              aria-describedby={customDescriptionId}
              {...defaultProps}
            />
            ,
          </>,
        );
        const inputEl = getByRole('checkbox');

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
            <Checkbox
              validationHint={description}
              aria-describedby={customDescriptionId}
              {...defaultProps}
            />
            ,
          </>,
        );
        const inputEl = getByRole('checkbox');

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
        const { getByRole } = render(<Checkbox {...defaultProps} />);
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toBeEmptyDOMElement();
      });

      it('should render status messages in a live region', () => {
        const statusMessage = 'This field is required';
        const { getByRole } = render(
          <Checkbox invalid validationHint={statusMessage} {...defaultProps} />,
        );
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toHaveTextContent(statusMessage);
      });

      it('should not render descriptions in a live region', () => {
        const statusMessage = 'This field is required';
        const { getByRole } = render(
          <Checkbox validationHint={statusMessage} {...defaultProps} />,
        );
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toBeEmptyDOMElement();
      });
    });
  });
});
