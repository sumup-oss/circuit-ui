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

'use client';

import { Fragment, type ReactNode } from 'react';

import { TabList, type TabListProps } from './components/TabList/TabList.js';
import { Tab } from './components/Tab/Tab.js';
import { TabPanel } from './components/TabPanel/TabPanel.js';
import { useTabState } from './helper.js';

export interface TabsProps extends Omit<TabListProps, 'as'> {
  /**
   * The index of the initially selected tab.
   *
   * @default 0
   */
  initialSelectedIndex?: number;
  /**
   * A collection of tabs with an id, the tab label, and panel content.
   */
  items: {
    id: string;
    tab: ReactNode;
    panel: ReactNode;
  }[];
}

export function Tabs({ items, initialSelectedIndex = 0, ...props }: TabsProps) {
  const {
    selectedId,
    onTabKeyDown: onKeyDown,
    onTabClick: onClick,
  } = useTabState(
    items.map(({ id }) => id),
    initialSelectedIndex,
  );

  return (
    <Fragment>
      <TabList as="tablist" {...props}>
        {items.map(({ id, tab }) => (
          <Tab
            as="tab"
            key={id}
            id={`tab-${id}`}
            data-testid="tab-element"
            selected={selectedId === id}
            aria-controls={`panel-${id}`}
            onClick={() => onClick(id)}
            onKeyDown={onKeyDown}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      {items.map(({ id, panel }) => (
        <TabPanel
          key={id}
          data-testid="tab-panel"
          id={`panel-${id}`}
          aria-labelledby={`tab-${id}`}
          hidden={selectedId !== id}
        >
          {panel}
        </TabPanel>
      ))}
    </Fragment>
  );
}
