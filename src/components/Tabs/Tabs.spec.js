import React from 'react';

import TabPanel from './components/TabPanel';
import TabList from './components/TabList';
import Tab from './components/Tab';
import Tabs from './Tabs';

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
    it('should meet accessibility guidelines for stateful usage', async () => {
      const wrapper = renderToHtml(
        <div>
          <Tabs
            items={[
              { id: 'one', tab: 'Tab 1', panel: 'Content 1' },
              { id: 'two', tab: 'Tab 2', panel: 'Content 2' },
              { id: 'three', tab: 'Tab 3', panel: 'Content 3' },
              { id: 'four', tab: 'Tab 4', panel: 'Content 4' }
            ]}
          />
        </div>
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
