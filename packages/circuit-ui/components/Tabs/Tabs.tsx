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

import { Fragment, useState, type KeyboardEvent, type ReactNode } from 'react';

import {
  isArrowLeft,
  isArrowRight,
  isArrowDown,
} from '../../util/key-codes.js';

import { TabList, type TabListProps } from './components/TabList/TabList.js';
import { Tab } from './components/Tab/Tab.js';
import { TabPanel } from './components/TabPanel/TabPanel.js';

export interface TabsProps extends TabListProps {
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
  const [selectedId, setSelectedId] = useState(
    items[initialSelectedIndex >= items.length ? 0 : initialSelectedIndex]?.id,
  );

  const handleTabKeyDown = (event: KeyboardEvent) => {
    const selectedIndex = items.findIndex((item) => item.id === selectedId);

    if (isArrowLeft(event)) {
      const previousIndex = selectedIndex - 1;
      if (previousIndex >= 0) {
        const previousId = items[previousIndex].id;
        setSelectedId(previousId);
        document.getElementById(`tab-${previousId}`)?.focus();
      }
    } else if (isArrowRight(event)) {
      const nextIndex = selectedIndex + 1;
      if (nextIndex <= items.length - 1) {
        const nextId = items[nextIndex].id;
        setSelectedId(nextId);
        document.getElementById(`tab-${nextId}`)?.focus();
      }
    } else if (isArrowDown(event)) {
      document.getElementById(`panel-${selectedId}`)?.focus();
    }
  };

  return (
    <Fragment>
      <TabList {...props}>
        {items.map(({ id, tab }) => (
          <Tab
            key={id}
            data-testid="tab-element"
            selected={selectedId === id}
            onClick={() => setSelectedId(id)}
            id={`tab-${id}`}
            aria-controls={`panel-${id}`}
            onKeyDown={handleTabKeyDown}
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
