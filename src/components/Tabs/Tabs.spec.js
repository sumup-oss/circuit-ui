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

  describe('logic', () => {
    it('should switch panels on  tab click', () => {
      const wrapper = shallow(
        <Tabs
          items={[
            { id: 'a', tab: 'tab-a', panel: 'panel-a' },
            { id: 'b', tab: 'tab-b', panel: 'panel-b' },
            { id: 'c', tab: 'tab-c', panel: 'panel-c' }
          ]}
        />
      );

      wrapper
        .find('Tab[id="tab-b"]')
        .last()
        .simulate('click');

      expect(
        wrapper
          .find('[panel-b]')
          .last()
          .prop('hidden')
      ).toBeFalsy();
    });

    it('should go to the next tab on right press', () => {
      const keyCodeRight = 39;
      const wrapper = shallow(
        <Tabs
          items={[
            { id: 'a', tab: 'tab-a', panel: 'panel-a' },
            { id: 'b', tab: 'tab-b', panel: 'panel-b' },
            { id: 'c', tab: 'tab-c', panel: 'panel-c' }
          ]}
        />
      );

      wrapper
        .find('Tab[id="tab-a"]')
        .last()
        .simulate('keyDown', { keyCode: keyCodeRight });

      expect(wrapper.find('[id="panel-b"]').prop('hidden')).toBeFalsy();
    });

    it('should go to the next tab on right press', () => {
      const keyCodeLeft = 37;
      const wrapper = shallow(
        <Tabs
          initialSelectedIndex={1}
          items={[
            { id: 'a', tab: 'tab-a', panel: 'panel-a' },
            { id: 'b', tab: 'tab-b', panel: 'panel-b' },
            { id: 'c', tab: 'tab-c', panel: 'panel-c' }
          ]}
        />
      );

      wrapper
        .find('Tab[id="tab-b"]')
        .last()
        .simulate('keyDown', { keyCode: keyCodeLeft });

      expect(wrapper.find('[id="panel-a"]').prop('hidden')).toBeFalsy();
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
