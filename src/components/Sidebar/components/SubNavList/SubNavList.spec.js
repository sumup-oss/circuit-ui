import React from 'react';

import SubNavList from './SubNavList';

describe('SubNavList', () => {
  describe('styles', () => {
    it('should render with default styles when there is a selected child', () => {
      const actual = create(
        <SubNavList>
          <li>Item 1</li>
          <li selected>Item 2</li>
        </SubNavList>
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render with default styles when there is no selected child', () => {
      const actual = create(
        <SubNavList>
          <li>Item 1</li>
          <li>Item 2</li>
        </SubNavList>
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render without children', () => {
      const actual = create(<SubNavList />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <SubNavList>
          <li>Item 1</li>
          <li selected>Item 2</li>
        </SubNavList>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
