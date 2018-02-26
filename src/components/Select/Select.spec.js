import React, { Fragment } from 'react';

import Select from '.';
import Label from '../Label';

describe('Select', () => {
  const options = (
    <Fragment>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Fragment>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Select>{options}</Select>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles when passed the disabled prop', () => {
    const actual = create(<Select disabled>{options}</Select>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with inline styles when passed the inline prop', () => {
    const actual = create(<Select inline>{options}</Select>);
    expect(actual).toMatchSnapshot();
  });

  it('should render with stretched styles when passed the stretch prop', () => {
    const actual = create(<Select stretch>{options}</Select>);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="select">
        <Select id="select">{options}</Select>
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should be disabled when passed the disabled prop', () => {
    const wrapper = shallow(<Select disabled>{options}</Select>).dive();
    const actual = wrapper.find('SelectElement').prop('disabled');
    expect(actual).toBeTruthy();
  });

  it('should show the placeholder when no value is passed', () => {
    const expected = 'Placeholder';
    const wrapper = shallow(
      <Select {...{ options, placeholder: expected }} />
    ).dive();
    const actual = wrapper
      .find('option')
      .first()
      .text();
    expect(actual).toBe(expected);
  });

  it('should not show the placeholder when a value is selected', () => {
    const wrapper = shallow(<Select value={2}>{options}</Select>);
    const actual = wrapper.find('option [key=0]').length;
    expect(actual).toBe(0);
  });
});
