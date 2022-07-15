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

import { create, render, renderToHtml, axe } from '../../util/test-utils';

import Input from '.';

const DummyElement = (props: { className?: string }) => (
  <div style={{ width: '24px', height: '24px' }} {...props} />
);

describe('Input', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Input label="Label" noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with a prefix when passed the prefix prop', () => {
    const actual = create(
      <Input
        renderPrefix={({ className }) => <DummyElement {...{ className }} />}
        label="Label"
        noMargin
      />,
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with a suffix when passed the suffix prop', () => {
    const actual = create(
      <Input
        renderSuffix={({ className }) => <DummyElement {...{ className }} />}
        label="Label"
        noMargin
      />,
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with a Tooltip when passed the validationHint prop', () => {
    const actual = create(
      <Input validationHint="Validation hint" label="Label" noMargin />,
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with warning styles when passed the hasWarning prop', () => {
    const actual = create(<Input hasWarning label="Label" noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<Input invalid label="Label" noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with valid styles when passed the showValid prop', () => {
    const actual = create(<Input showValid label="Label" noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with right aligned text', () => {
    const actual = create(<Input textAlign={'right'} label="Label" noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with readonly styles when passed the readOnly prop', () => {
    const actual = create(<Input readOnly label="Label" noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles when passed the disabled prop', () => {
    const actual = create(<Input disabled label="Label" noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize disabled over error styles', () => {
    const actual = create(<Input invalid disabled label="Label" noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize disabled over warning styles', () => {
    const actual = create(<Input hasWarning disabled label="Label" noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with default spacing when there is no noMargin prop', () => {
    /* @ts-expect-error the noMargin prop is required */
    const actual = create(<Input label="Label" />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with custom styles', () => {
    const actual = create(
      <Input
        css={css`
          border: 1px solid red;
        `}
        inputStyles={css`
          color: red;
        `}
        label="Label"
        noMargin
      />,
    );
    expect(actual).toMatchSnapshot();
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref for input
     */
    it('should accept a working ref', () => {
      const tref = createRef<HTMLInputElement & HTMLTextAreaElement>();
      const { container } = render(<Input ref={tref} label="Label" noMargin />);
      const input = container.querySelector('input');
      expect(tref.current).toBe(input);
    });

    /**
     * Should accept a working ref for textarea
     */
    it('should accept a working ref also for textarea', () => {
      const tref = createRef<HTMLInputElement & HTMLTextAreaElement>();
      const { container } = render(
        <Input as="textarea" ref={tref} label="Label" noMargin />,
      );
      const textarea = container.querySelector('textarea');
      expect(tref.current).toBe(textarea);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Input id="input" label="Label" noMargin />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
