import React from 'react';

import Toggle from '.';

describe('Toggle', () => {
  /**
   * Stylesheet tests.
   */
  it('should have the correct default styles', () => {
    const actual = create(<Toggle />);
    expect(actual).toMatchSnapshot();
  });

  it('should have the correct on styles', () => {
    const actual = create(<Toggle on />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should call onChange when toggled', () => {
    const onToggle = jest.fn();
    const wrapper = shallow(<Toggle {...{ onToggle }} />);
    wrapper.simulate('click');
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
