import React from 'react';

import Select from '.';
import Label from '../Label';

describe('Select', () => {
  const options = [
    {
      label: 'Option 1',
      value: 1
    },
    {
      label: 'Option 2',
      value: 2
    },
    {
      label: 'Option 3',
      value: 3
    }
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

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="select">
        <Select id="select" {...{ options }} />
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should be disabled when passed the disabled prop', () => {
    const wrapper = shallow(<Select {...{ options }} disabled />)
      .dive()
      .dive();
    const actual = wrapper.find('SelectElement').prop('disabled');
    expect(actual).toBeTruthy();
  });

  it('should show the placeholder when no value is passed', () => {
    const expected = 'Placeholder';
    const wrapper = shallow(<Select {...{ options, placeholder: expected }} />)
      .dive()
      .dive();
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
});
