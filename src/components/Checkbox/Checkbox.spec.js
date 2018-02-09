import React from 'react';

import Checkbox from '.';

const selector = 'pw';

describe('Checkbox', () => {
  /**
   * Stylesheet tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Checkbox {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with checked styles when passed the checked prop', () => {
    const actual = create(<Checkbox checked {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles when passed the disabled prop', () => {
    const actual = create(<Checkbox disabled {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<Checkbox invalid {...{ selector }} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should be unchecked by default', () => {
    const wrapper = shallow(<Checkbox {...{ selector }} />);
    const actual = wrapper.find('CheckboxInput').props().checked;
    expect(actual).toBeFalsy();
  });

  it('should call onToggle when toggled', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Checkbox {...{ onToggle }} />);
    const label = wrapper.find('CheckboxLabel');
    label.simulate('click');
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
