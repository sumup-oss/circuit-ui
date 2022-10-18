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

import { render, axe } from '../../util/test-utils';

import Select from '.';

describe('Select', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Styles', () => {
    it('should render with default styles', () => {
      const { container } = render(<Select {...{ options }} label="Label" />);
      expect(container).toMatchSnapshot();
    });

    it('should render with a visually-hidden label', () => {
      const { container } = render(
        <Select {...{ options }} label="Label" hideLabel />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with disabled styles when passed the disabled prop', () => {
      const { container } = render(
        <Select {...{ options }} label="Label" disabled />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with invalid styles when passed the invalid prop', () => {
      const { container } = render(
        <Select {...{ options }} label="Label" invalid />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should not render with invalid styles when also passed the disabled prop', () => {
      const { container } = render(
        <Select {...{ options }} label="Label" invalid disabled />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with a tooltip when passed a validation hint', () => {
      const { container } = render(
        <Select
          {...{ options }}
          label="Label"
          validationHint="This field is required."
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with a prefix when passed the prefix prop', () => {
      const DummyElement = (props: { className?: string }) => (
        <div style={{ width: '24px', height: '24px' }} {...props} />
      );
      const { container } = render(
        <Select
          {...{ options }}
          label="Label"
          renderPrefix={({ className }) => (
            <DummyElement className={className} />
          )}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Logic', () => {
    it('should accept the options as children', () => {
      const children = options.map(({ label, ...rest }) => (
        <option key={rest.value} {...rest}>
          {label}
        </option>
      ));
      const { getAllByRole } = render(
        <Select label="Label">{children}</Select>,
      );
      const optionEls = getAllByRole('option');
      expect(optionEls).toHaveLength(
        options.length + 1 /* Options plus placeholder */,
      );
    });

    it('should be disabled when passed the disabled prop', () => {
      const { getByRole } = render(
        <Select options={options} label="Label" disabled />,
      );
      const selectEl = getByRole('combobox');
      expect(selectEl).toBeDisabled();
    });

    it('should show the placeholder when no value or defaultValue is passed', () => {
      const placeholder = 'Placeholder';
      const { getByRole } = render(
        <Select options={options} label="Label" placeholder={placeholder} />,
      );
      const selectEl = getByRole('combobox');
      expect(selectEl.firstChild).toHaveTextContent(placeholder);
    });

    it('should not show the placeholder when a defaultValue is set', () => {
      const placeholder = 'Placeholder';
      const defaultValue = 2;
      const { getByRole } = render(
        <Select
          options={options}
          label="Label"
          placeholder={placeholder}
          defaultValue={defaultValue}
        />,
      );
      const selectEl = getByRole('combobox');
      expect(selectEl.firstChild).not.toHaveTextContent(placeholder);
    });

    it('should not show the placeholder when a value is selected', () => {
      const placeholder = 'Placeholder';
      const value = 2;
      const { getByRole } = render(
        <Select
          options={options}
          label="Label"
          placeholder={placeholder}
          value={value}
        />,
      );
      const selectEl = getByRole('combobox');
      expect(selectEl.firstChild).not.toHaveTextContent(placeholder);
    });

    it('should accept a working ref', () => {
      const tref = createRef<HTMLSelectElement>();
      const { container } = render(<Select ref={tref} label="Label" />);
      const select = container.querySelector('select');
      expect(tref.current).toBe(select);
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(
        <Select {...{ options }} id="select" label="Label" />,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
