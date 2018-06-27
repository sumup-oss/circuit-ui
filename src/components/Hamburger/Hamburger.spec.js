import React from 'react';

import Hamburger from './Hamburger';

describe('Hamburger', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Hamburger />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with active styles when passed the isActive prop', () => {
    const actual = create(<Hamburger isActive />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should call the onClick prop when clicked', () => {
    const onClickMock = jest.fn();
    const wrapper = mount(<Hamburger onClick={onClickMock} />);
    wrapper.simulate('click');
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Hamburger />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
