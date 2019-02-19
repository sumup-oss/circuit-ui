import React from 'react';

import Tabs from './Tabs';
import Tab from './components/Tab';

describe('Tabs', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(
        <Tabs>
          <Tab>tab #1</Tab>
          <Tab selected>tab #2</Tab>
        </Tabs>
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render with stretched styles', () => {
      const actual = create(
        <Tabs stretched>
          <Tab>tab #1</Tab>
          <Tab selected>tab #2</Tab>
        </Tabs>
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(
        <Tabs stretched>
          <Tab>tab #1</Tab>
          <Tab selected>tab #2</Tab>
        </Tabs>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
