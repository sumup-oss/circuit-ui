import React, { Fragment } from 'react';

import Select from '.';
import Label from '../Label';

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

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="select">
        <Select {...{ options }} id="select" />
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should accept the options as children', () => {
    const children = (
      <Fragment>
        {options.map(({ label, ...rest }) => (
          <option key={rest.value} {...rest}>
            {label}
          </option>
        ))}
      </Fragment>
    );
    const wrapper = shallow(<Select disabled>{children}</Select>);
    const actual = wrapper.find('select').prop('disabled');
    expect(actual).toBeTruthy();
  });

  it('should be disabled when passed the disabled prop', () => {
    const wrapper = shallow(<Select {...{ options }} disabled />);
    const actual = wrapper.find('select').prop('disabled');
    expect(actual).toBeTruthy();
  });

  it('should show the placeholder when no value is passed', () => {
    const expected = 'Placeholder';
    const wrapper = shallow(<Select {...{ options, placeholder: expected }} />);
    const actual = wrapper
      .find('option')
      .first()
      .text();
    expect(actual).toBe(expected);
  });

  it('should not show the placeholder when a value is selected', () => {
    const wrapper = shallow(<Select {...{ options }} value={2} />);
    const actual = wrapper.find('option [key=0]').length;
    expect(actual).toBe(0);
  });

  it('should render with a prefix when passed the prefix prop', () => {
    const DummyElement = () => (
      <div style={{ width: '24px', height: '24px' }} />
    );
    const actual = create(
      <Select
        {...{ options }}
        renderPrefix={({ className }) => <DummyElement {...{ className }} />}
      />
    );
    expect(actual).toMatchSnapshot();
  });
});
