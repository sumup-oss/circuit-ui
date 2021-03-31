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

import React from 'react';

import { create, render, renderToHtml, axe } from '../../util/test-utils';

import TextArea from '.';

const DummyElement = (props: { className?: string }) => (
  <div style={{ width: '24px', height: '24px' }} {...props} />
);

describe('TextArea', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<TextArea />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with a prefix when passed the prefix prop', () => {
    const actual = create(
      <TextArea
        renderPrefix={({ className }) => <DummyElement {...{ className }} />}
      />,
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with a suffix when passed the suffix prop', () => {
    const actual = create(
      <TextArea
        renderSuffix={({ className }) => <DummyElement {...{ className }} />}
      />,
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with a Tooltip when passed the validationHint prop', () => {
    const actual = create(<TextArea validationHint="Validation hint" />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with warning styles when passed the hasWarning prop', () => {
    const actual = create(<TextArea hasWarning />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<TextArea invalid />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with valid styles when passed the showValid prop', () => {
    const actual = create(<TextArea showValid />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with readonly styles when passed the readonly prop', () => {
    const actual = create(<TextArea readOnly />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styled when passed the disabled prop', () => {
    const actual = create(<TextArea disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize disabled over error styles', () => {
    const actual = create(<TextArea invalid disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize disabled over warning styles', () => {
    const actual = create(<TextArea hasWarning disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with inline styles when passed the inline prop', () => {
    const actual = create(<TextArea inline />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(<TextArea noMargin />);
    expect(actual).toMatchSnapshot();
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = React.createRef<HTMLInputElement & HTMLTextAreaElement>();
      const { container } = render(<TextArea ref={tref} />);
      const textarea = container.querySelector('textarea');
      expect(tref.current).toBe(textarea);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<TextArea id="textarea" label="Text area" />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
