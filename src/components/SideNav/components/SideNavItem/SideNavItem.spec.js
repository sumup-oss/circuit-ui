import React from 'react';

import SideNavItem from './SideNavItem';

import FavoriteIcon from '../icons/favorite.svg';

describe('SideNavItem', () => {
  describe('style tests', () => {
    it('should render with default styles', () => {
      const actual = create(
        <SideNavItem icon={FavoriteIcon}>Label</SideNavItem>
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render with active styles', () => {
      const actual = create(
        <SideNavItem isActive icon={FavoriteIcon}>
          Label
        </SideNavItem>
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('logic tests', () => {
    it('should not render an icon when no icon is passed', () => {
      const wrapper = shallow(<SideNavItem isActive>Label</SideNavItem>).dive();
      const actual = wrapper.find('IconWrapper');
      expect(actual).toBeEmpty();
    });
  });

  describe('accessibility tests', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <SideNavItem icon={FavoriteIcon}>Label</SideNavItem>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
