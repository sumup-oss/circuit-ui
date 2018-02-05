import React from 'react';

import Switch from '.';

describe('Switch', () => {
  /**
   * Stylesheet tests.
   */
  it('should have the correct default styles', () => {
    const actual = create(<Switch />);
    expect(actual).toMatchSnapshot();
  });

  it('should have the correct on styles', () => {
    const actual = create(<Switch on />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should call onChange when toggled', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Switch {...{ onToggle }} />);
    wrapper.simulate('click');
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
