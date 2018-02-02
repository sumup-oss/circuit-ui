import React from 'react';

import Badge from '.';

describe('Badge', () => {
  /**
   * Style tests.
   */
  it('should have the correct styles', () => {
    const actual = create(<Badge />);
    expect(actual).toMatchSnapshot();
  });

  it('should have the correct circular styles', () => {
    const actual = create(<Badge circular />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should be clickable', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Badge {...{ onClick }} />);
    wrapper.find('div').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
