import React from 'react';

import Badge from '.';

describe('Badge', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Badge />);
    expect(actual).toMatchSnapshot();
  });

  it('should have the correct circle styles', () => {
    const actual = create(<Badge circle />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Badge />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
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
