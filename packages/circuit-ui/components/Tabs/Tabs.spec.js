/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
        </TabList>,
      );
      expect(actual).toMatchSnapshot();
    });

    it('should render with stretched styles', () => {
      const actual = create(
        <TabList stretched>
          <Tab>tab #1</Tab>
          <Tab selected>tab #2</Tab>
        </TabList>,
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('logic', () => {
    it('should switch panels on tab click', () => {
      const { getAllByTestId } = render(
        <Tabs
          items={[
            { id: 'a', tab: 'tab-a', panel: 'panel-a' },
            { id: 'b', tab: 'tab-b', panel: 'panel-b' },
            { id: 'c', tab: 'tab-c', panel: 'panel-c' },
          ]}
        />,
      );

      const tabEls = getAllByTestId('tab-element');
      const panelEls = getAllByTestId('tab-panel');

      expect(panelEls[0]).toBeVisible();
      expect(panelEls[1]).not.toBeVisible();

      act(() => {
        fireEvent.click(tabEls[1]);
      });

      expect(panelEls[0]).not.toBeVisible();
      expect(panelEls[1]).toBeVisible();
    });

    it('should go to the next tab on right press', () => {
      const keyCodeRight = 39;

      const { getAllByTestId } = render(
        <Tabs
          items={[
            { id: 'a', tab: 'tab-a', panel: 'panel-a' },
            { id: 'b', tab: 'tab-b', panel: 'panel-b' },
            { id: 'c', tab: 'tab-c', panel: 'panel-c' },
          ]}
        />,
      );

      const tabEls = getAllByTestId('tab-element');
      const panelEls = getAllByTestId('tab-panel');

      expect(panelEls[0]).toBeVisible();
      expect(panelEls[1]).not.toBeVisible();

      act(() => {
        fireEvent.keyDown(tabEls[0], {
          key: 'ArrowRight',
          code: keyCodeRight,
        });
      });

      expect(panelEls[0]).not.toBeVisible();
      expect(panelEls[1]).toBeVisible();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines for tablist only', async () => {
      const wrapper = renderToHtml(
        <TabList>
          <Tab>tab #1</Tab>
          <Tab selected>tab #2</Tab>
        </TabList>,
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
        </div>,
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
              { id: 'four', tab: 'Tab 4', panel: 'Content 4' },
            ]}
          />
        </div>,
      );
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
