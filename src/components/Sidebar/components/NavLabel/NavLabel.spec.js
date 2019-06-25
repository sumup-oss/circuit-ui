import React from 'react';

import NavLabel from './NavLabel';

describe('NavLabel', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = mount(<NavLabel>Item 01</NavLabel>);
      expect(actual).toMatchSnapshot();
    });

    it('should render and match snapshot when visible', () => {
      const actual = mount(<NavLabel visible>Item 01</NavLabel>);
      expect(actual).toMatchSnapshot();
    });

    it('should render and match snapshot when secondary', () => {
      const actual = mount(
        <NavLabel visible secondary>
          Item 01
        </NavLabel>
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<NavLabel>Item 01</NavLabel>);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
