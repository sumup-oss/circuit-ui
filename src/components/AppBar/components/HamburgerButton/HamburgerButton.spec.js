import React from 'react';

import HamburgerButton from './HamburgerButton';

describe('HamburgerButton', () => {
  const props = {
    hamburgerButtonLabel: 'hamburger-label',
    onClick: jest.fn()
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<HamburgerButton {...props} />);
      expect(actual).toMatchSnapshot();
    });
  });

  it('should render the accessibility label', () => {
    const wrapper = shallow(<HamburgerButton {...props} />);
    const actual = wrapper.find('[data-selector="accessibility-label"]');

    expect(actual).toHaveLength(1);
    expect(actual.children().text()).toEqual(props.hamburgerButtonLabel);
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<HamburgerButton />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
