import React from 'react';

import TabPanel from './components/TabPanel';
import TabList from './components/TabList';
import Tab from './components/Tab';

describe('Tabs', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(
        <TabList>
          <Tab>tab #1</Tab>
          <Tab selected>tab #2</Tab>
        </TabList>
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render with stretched styles', () => {
      const actual = create(
        <TabList stretched>
          <Tab>tab #1</Tab>
          <Tab selected>tab #2</Tab>
        </TabList>
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines for tablist only', async () => {
      const wrapper = renderToHtml(
        <TabList>
          <Tab>tab #1</Tab>
          <Tab selected>tab #2</Tab>
        </TabList>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });

    it('should meet accessibility guidelines for full usage', async () => {
      const wrapper = renderToHtml(
        <div>
          <TabList>
            <Tab>tab #1</Tab>
            <Tab selected>tab #2</Tab>
          </TabList>
          <TabPanel>Tab content</TabPanel>
        </div>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
