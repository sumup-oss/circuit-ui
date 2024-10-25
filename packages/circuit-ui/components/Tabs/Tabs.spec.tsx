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

import { describe, expect, it } from 'vitest';

import { axe, render, screen, userEvent } from '../../util/test-utils';

import { TabPanel } from './components/TabPanel/index';
import { TabList } from './components/TabList/index';
import { Tab } from './components/Tab/index';
import { Tabs } from './Tabs';

describe('Tabs', () => {
  it('should switch panels on tab click', async () => {
    render(
      <Tabs
        items={[
          { id: 'a', tab: 'tab-a', panel: 'panel-a' },
          { id: 'b', tab: 'tab-b', panel: 'panel-b' },
          { id: 'c', tab: 'tab-c', panel: 'panel-c' },
        ]}
      />,
    );

    const tabEls = screen.getAllByTestId('tab-element');
    const panelEls = screen.getAllByTestId('tab-panel');

    expect(panelEls[0]).toBeVisible();
    expect(panelEls[1]).not.toBeVisible();

    await userEvent.click(tabEls[1]);

    expect(panelEls[0]).not.toBeVisible();
    expect(panelEls[1]).toBeVisible();
  });

  it('should go to the next tab on right press', async () => {
    render(
      <Tabs
        items={[
          { id: 'a', tab: 'tab-a', panel: 'panel-a' },
          { id: 'b', tab: 'tab-b', panel: 'panel-b' },
          { id: 'c', tab: 'tab-c', panel: 'panel-c' },
        ]}
      />,
    );

    const tabEls = screen.getAllByTestId('tab-element');
    const panelEls = screen.getAllByTestId('tab-panel');

    expect(panelEls[0]).toBeVisible();
    expect(panelEls[1]).not.toBeVisible();

    await userEvent.type(tabEls[0], '{arrowright}');

    expect(panelEls[0]).not.toBeVisible();
    expect(panelEls[1]).toBeVisible();
  });

  it('should have no accessibility violations for tablist only', async () => {
    const { container } = render(
      <TabList>
        <Tab>tab #1</Tab>
        <Tab selected>tab #2</Tab>
      </TabList>,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it('should have no accessibility violations for full usage', async () => {
    const { container } = render(
      <div>
        <TabList>
          <Tab>tab #1</Tab>
          <Tab selected>tab #2</Tab>
        </TabList>
        <TabPanel>Tab content</TabPanel>
      </div>,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it('should have no accessibility violations for stateful usage', async () => {
    const { container } = render(
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
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
