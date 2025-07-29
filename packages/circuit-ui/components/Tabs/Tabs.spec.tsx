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

import { axe, render, screen, userEvent } from '../../util/test-utils.js';

import { TabPanel } from './components/TabPanel/index.js';
import { TabList } from './components/TabList/index.js';
import { Tab } from './components/Tab/index.js';
import { Tabs } from './Tabs.js';

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

    const panelA = screen.getByRole('tabpanel');
    expect(panelA).toHaveAccessibleName('tab-a');

    const tabs = screen.getAllByRole('tab');
    await userEvent.click(tabs[1]);

    const panelB = screen.getByRole('tabpanel');
    expect(panelB).toHaveAccessibleName('tab-b');
  });

  it('should go to the next tab on right arrow press', async () => {
    render(
      <Tabs
        items={[
          { id: 'a', tab: 'tab-a', panel: 'panel-a' },
          { id: 'b', tab: 'tab-b', panel: 'panel-b' },
          { id: 'c', tab: 'tab-c', panel: 'panel-c' },
        ]}
      />,
    );

    await userEvent.keyboard('{Tab}');

    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveFocus();

    const panelA = screen.getByRole('tabpanel');
    expect(panelA).toHaveAccessibleName('tab-a');

    await userEvent.keyboard('{ArrowRight}');

    const panelB = screen.getByRole('tabpanel');
    expect(panelB).toHaveAccessibleName('tab-b');
    expect(tabs[1]).toHaveFocus();
  });

  it('should go to the previous tab on left arrow press', async () => {
    render(
      <Tabs
        initialSelectedIndex={1}
        items={[
          { id: 'a', tab: 'tab-a', panel: 'panel-a' },
          { id: 'b', tab: 'tab-b', panel: 'panel-b' },
          { id: 'c', tab: 'tab-c', panel: 'panel-c' },
        ]}
      />,
    );

    await userEvent.keyboard('{Tab}');

    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveFocus();

    const panelB = screen.getByRole('tabpanel');
    expect(panelB).toHaveAccessibleName('tab-b');

    await userEvent.keyboard('{ArrowLeft}');

    const panelA = screen.getByRole('tabpanel');
    expect(panelA).toHaveAccessibleName('tab-a');
    expect(tabs[0]).toHaveFocus();
  });

  it('should focus the current panel on down arrow press', async () => {
    render(
      <Tabs
        items={[
          { id: 'a', tab: 'tab-a', panel: 'panel-a' },
          { id: 'b', tab: 'tab-b', panel: 'panel-b' },
          { id: 'c', tab: 'tab-c', panel: 'panel-c' },
        ]}
      />,
    );

    await userEvent.keyboard('{Tab}');

    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');

    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveFocus();
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
