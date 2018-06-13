import React from 'react';

import SideNav from './SideNav';

describe('SideNav', () => {
  describe('rendered styles', () => {
    it('should render with default styles', () => {
      const actual = create(
        <SideNav>
          <span>One</span>
        </SideNav>
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('component logic', () => {
    it('should show a header when passsed', () => {
      // Component with header
      const wrapperWith = shallow(
        <SideNav header={<div data-test="header">Foobar</div>}>
          <span>Hello</span>
        </SideNav>
      );
      const actualWith = wrapperWith.find('div[data-test="header"]');
      expect(actualWith).not.toBeEmpty();

      // Component without header
      const wrapperWithout = shallow(
        <SideNav>
          <span data-test="header">Hello</span>
        </SideNav>
      );
      const actualWithout = wrapperWithout.find('NavHeader');

      expect(actualWithout).toBeEmpty();
    });

    describe('showing navigation items', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(
          <SideNav>
            <span data-test="item">One</span>
            <span data-test="item">Two</span>
          </SideNav>
        );
      });

      it('should show its children in a list', () => {
        const actualChildren = wrapper.find('span[data-test="item"]');
        expect(actualChildren).toHaveLength(2);
      });

      // TODO: find a nicer way to test this?
      it('should show children in a list', () => {
        const children = wrapper.find('span[data-test="item"]');
        const listItems = children.map(child =>
          child
            .parent()
            .dive()
            .find('li')
        );
        listItems.forEach(item => {
          const actual = item.find('li');
          expect(actual).toHaveLength(1);
        });
      });
    });
  });

  describe('component accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <SideNav>
          <span>One</span>
        </SideNav>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
