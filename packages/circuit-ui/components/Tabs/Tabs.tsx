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

import {
  createRef,
  Fragment,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

import {
  isArrowLeft,
  isArrowRight,
  isArrowDown,
} from '../../util/key-codes.js';

import { TabList, type TabListProps } from './components/TabList/index.js';
import { Tab } from './components/Tab/index.js';
import { TabPanel } from './components/TabPanel/index.js';

export interface TabsProps extends TabListProps {
  /**
   * The index of the initially selected tab.
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

export function Tabs({ initialSelectedIndex = 0, items, ...props }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

  const tabPanelsRefs = createRefs(items.length);

  const handleTabKeyDown = (event: KeyboardEvent) => {
    if (isArrowLeft(event)) {
      const previousTab = Math.max(0, selectedIndex - 1);
      setSelectedIndex(previousTab);
    } else if (isArrowRight(event)) {
      const nextTab = Math.min(items.length - 1, selectedIndex + 1);
      setSelectedIndex(nextTab);
    } else if (isArrowDown(event)) {
      const panelRef = tabPanelsRefs[selectedIndex].current;
      if (panelRef) {
        panelRef.focus();
      }
    }
  };

  return (
    <Fragment>
      <TabList {...props}>
        {items.map(({ id, tab }, index) => (
          <Tab
            key={id}
            selected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
            id={`tab-${id}`}
            aria-controls={`panel-${id}`}
            onKeyDown={handleTabKeyDown}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      {items.map(({ id, panel }, index) => (
        <TabPanel
          key={id}
          id={`panel-${id}`}
          aria-labelledby={`tab-${id}`}
          hidden={selectedIndex !== index}
          ref={tabPanelsRefs[index]}
        >
          {panel}
        </TabPanel>
      ))}
    </Fragment>
  );
}

function createRefs(length: number) {
  return Array.from(Array(length).keys()).map(() =>
    createRef<HTMLDivElement>(),
  );
}
