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
import { css } from '@emotion/react';

import { render, axe } from '../../util/test-utils';

import Input from '.';

const DummyElement = (props: { className?: string }) => (
  <div style={{ width: '24px', height: '24px' }} {...props} />
);

describe('Input', () => {
  describe('Styles', () => {
    it('should render with default styles', () => {
      const { container } = render(<Input label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should render with a prefix when passed the prefix prop', () => {
      const { container } = render(
        <Input
          renderPrefix={({ className }) => <DummyElement {...{ className }} />}
          label="Label"
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with a suffix when passed the suffix prop', () => {
      const { container } = render(
        <Input
          renderSuffix={({ className }) => <DummyElement {...{ className }} />}
          label="Label"
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with a description when passed the validationHint prop', () => {
      const { container } = render(
        <Input validationHint="Validation hint" label="Label" />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with warning styles when passed the hasWarning prop', () => {
      const { container } = render(<Input hasWarning label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should render with invalid styles when passed the invalid prop', () => {
      const { container } = render(<Input invalid label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should render with valid styles when passed the showValid prop', () => {
      const { container } = render(<Input showValid label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should render with right aligned text', () => {
      const { container } = render(<Input textAlign="right" label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should render with readonly styles when passed the readOnly prop', () => {
      const { container } = render(<Input readOnly label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should render with disabled styles when passed the disabled prop', () => {
      const { container } = render(<Input disabled label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should prioritize disabled over error styles', () => {
      const { container } = render(<Input invalid disabled label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should prioritize disabled over warning styles', () => {
      const { container } = render(<Input hasWarning disabled label="Label" />);
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
          label="Label"
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Logic', () => {
    it('should accept a working ref for an input element', () => {
      const tref = createRef<HTMLInputElement & HTMLTextAreaElement>();
      const { container } = render(<Input ref={tref} label="Label" />);
      const input = container.querySelector('input');
      expect(tref.current).toBe(input);
    });

    it('should accept a working ref for a textarea element', () => {
      const tref = createRef<HTMLInputElement & HTMLTextAreaElement>();
      const { container } = render(
        <Input as="textarea" ref={tref} label="Label" />,
      );
      const textarea = container.querySelector('textarea');
      expect(tref.current).toBe(textarea);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<Input id="input" label="Label" />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
