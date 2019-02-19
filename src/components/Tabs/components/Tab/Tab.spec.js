import React from 'react';

import Tab from './Tab';

describe('Tab', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Tab>content</Tab>);
      expect(actual).toMatchSnapshot();
    });

    it('should render with selected styles', () => {
      const actual = create(<Tab selected>content</Tab>);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Tab />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
