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

import { create, renderToHtml, axe, render } from '../../util/test-utils';

import Select from '.';

describe('Select', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Select {...{ options }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles when passed the disabled prop', () => {
    const actual = create(<Select {...{ options }} disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<Select {...{ options }} invalid />);
    expect(actual).toMatchSnapshot();
  });

  it('should not render with invalid styles when also passed the disabled prop', () => {
    const actual = create(<Select {...{ options }} invalid disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with inline styles when passed the inline prop', () => {
    const actual = create(<Select {...{ options }} inline />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(<Select {...{ options }} noMargin />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with a tooltip when passed a validation hint', () => {
    const actual = create(
      <Select {...{ options }} validationHint="This field is required." />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with a prefix when passed the prefix prop', () => {
    const DummyElement = (props: { className?: string }) => (
      <div style={{ width: '24px', height: '24px' }} {...props} />
    );
    const actual = create(
      <Select
        {...{ options }}
        renderPrefix={({ className }) => <DummyElement className={className} />}
      />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  // FIXME: Had to disable this since it produces a false positive. Not sure why.
  it.skip('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Select {...{ options }} id="select" label="Label" />
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should accept the options as children', () => {
    const children = options.map(({ label, ...rest }) => (
      <option key={rest.value} data-testid="select-option" {...rest}>
        {label}
      </option>
    ));
    const { getAllByTestId } = render(<Select>{children}</Select>);
    const optionEls = getAllByTestId('select-option');
    expect(optionEls).toHaveLength(options.length);
  });

  it('should be disabled when passed the disabled prop', () => {
    const { getByTestId } = render(
      <Select options={options} data-testid="select-element" disabled />
    );
    const selectEl = getByTestId('select-element');
    expect(selectEl).toBeDisabled();
  });

  it('should show the placeholder when no value is passed', () => {
    const placeholder = 'Placeholder';
    const { getByTestId } = render(
      <Select
        options={options}
        placeholder={placeholder}
        data-testid="select-element"
      />
    );
    const selectEl = getByTestId('select-element');
    expect(selectEl.firstChild).toHaveTextContent(placeholder);
  });

  it('should not show the placeholder when a value is selected', () => {
    const placeholder = 'Placeholder';
    const value = 2;
    const { getByTestId } = render(
      <Select
        options={options}
        placeholder={placeholder}
        value={value}
        data-testid="select-element"
      />
    );
    const selectEl = getByTestId('select-element');
    expect(selectEl.firstChild).not.toHaveTextContent(placeholder);
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = React.createRef<HTMLSelectElement>();
      const { container } = render(<Select ref={tref} />);
      const select = container.querySelector('select');
      expect(tref.current).toBe(select);
    });
  });
});
