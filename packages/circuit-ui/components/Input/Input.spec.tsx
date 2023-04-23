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

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';
import { css } from '@emotion/react';

import { render, axe } from '../../util/test-utils';

import Input from '.';

const DummyElement = (props: { className?: string }) => (
  <div style={{ width: '24px', height: '24px' }} {...props} />
);

const defaultProps = {
  label: 'Label',
};

describe('Input', () => {
  describe('Styles', () => {
    it('should render with default styles', () => {
      const { container } = render(<Input {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it('should render with a prefix when passed the prefix prop', () => {
      const { container } = render(
        <Input
          renderPrefix={({ className }) => <DummyElement {...{ className }} />}
          {...defaultProps}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with a suffix when passed the suffix prop', () => {
      const { container } = render(
        <Input
          renderSuffix={({ className }) => <DummyElement {...{ className }} />}
          {...defaultProps}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with a description when passed the validationHint prop', () => {
      const { container } = render(
        <Input validationHint="Validation hint" {...defaultProps} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with warning styles when passed the hasWarning prop', () => {
      const { container } = render(<Input hasWarning {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it('should render with invalid styles when passed the invalid prop', () => {
      const { container } = render(<Input invalid {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it('should render with valid styles when passed the showValid prop', () => {
      const { container } = render(<Input showValid {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it('should render with right aligned text', () => {
      const { container } = render(
        <Input textAlign="right" {...defaultProps} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with readonly styles when passed the readOnly prop', () => {
      const { container } = render(<Input readOnly {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it('should render with disabled styles when passed the disabled prop', () => {
      const { container } = render(<Input disabled {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it('should prioritize disabled over error styles', () => {
      const { container } = render(
        <Input invalid disabled {...defaultProps} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should prioritize disabled over warning styles', () => {
      const { container } = render(
        <Input hasWarning disabled {...defaultProps} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with custom styles', () => {
      const { container } = render(
        <Input
          css={css`
            border: 1px solid red;
          `}
          inputStyles={css`
            color: red;
          `}
          {...defaultProps}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Logic', () => {
    it('should accept a working ref for an input element', () => {
      const tref = createRef<HTMLInputElement & HTMLTextAreaElement>();
      const { container } = render(<Input ref={tref} {...defaultProps} />);
      const input = container.querySelector('input');
      expect(tref.current).toBe(input);
    });

    it('should accept a working ref for a textarea element', () => {
      const tref = createRef<HTMLInputElement & HTMLTextAreaElement>();
      const { container } = render(
        <Input as="textarea" ref={tref} {...defaultProps} />,
      );
      const textarea = container.querySelector('textarea');
      expect(tref.current).toBe(textarea);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<Input {...defaultProps} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    describe('Labeling', () => {
      it('should have an accessible name', () => {
        const { getByRole } = render(<Input {...defaultProps} />);
        const inputEl = getByRole('textbox');

        expect(inputEl).toHaveAccessibleName(defaultProps.label);
      });

      it('should optionally have an accessible description', () => {
        const description = 'Description';
        const { getByRole } = render(
          <Input validationHint={description} {...defaultProps} />,
        );
        const inputEl = getByRole('textbox');

        expect(inputEl).toHaveAccessibleDescription(description);
      });

      it('should accept a custom description via aria-describedby', () => {
        const customDescription = 'Custom description';
        const customDescriptionId = 'customDescriptionId';
        const { getByRole } = render(
          <>
            <span id={customDescriptionId}>{customDescription}</span>
            <Input aria-describedby={customDescriptionId} {...defaultProps} />,
          </>,
        );
        const inputEl = getByRole('textbox');

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
            <Input
              validationHint={description}
              aria-describedby={customDescriptionId}
              {...defaultProps}
            />
            ,
          </>,
        );
        const inputEl = getByRole('textbox');

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
        const { getByRole } = render(<Input {...defaultProps} />);
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toBeEmptyDOMElement();
      });

      it('should render status messages in a live region', () => {
        const statusMessage = 'This field is required';
        const { getByRole } = render(
          <Input invalid validationHint={statusMessage} {...defaultProps} />,
        );
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toHaveTextContent(statusMessage);
      });

      it('should not render descriptions in a live region', () => {
        const statusMessage = 'This field is required';
        const { getByRole } = render(
          <Input validationHint={statusMessage} {...defaultProps} />,
        );
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toBeEmptyDOMElement();
      });
    });
  });
});
