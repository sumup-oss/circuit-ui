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

import { useState, type ReactNode } from 'react';

import {
  TabList,
  type TabItem,
  type TabListProps,
} from './components/TabList/TabList.js';
import { TabPanel } from './components/TabPanel/TabPanel.js';

export interface TabsProps extends Omit<TabListProps, 'as' | 'tabs'> {
  /**
   * A collection of tabs with an id, the tab label, and panel content.
   */
  items: (TabItem & { panel: ReactNode })[];
}

export function Tabs({
  items,
  initialSelectedIndex = 0,
  onTabChange,
  ...props
}: TabsProps) {
  const ids = items.map(({ id }) => id);
  const [selectedId, setSelectedId] = useState(ids[initialSelectedIndex]);

  const handleTabChange = (id: string) => {
    setSelectedId(id);
    onTabChange?.(id);
  };

  return (
    <>
      <TabList
        as="tablist"
        tabs={items.map(({ id, tab }) => ({ id, tab }))}
        initialSelectedIndex={initialSelectedIndex}
        onTabChange={handleTabChange}
        {...props}
      />
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
    </>
  );
}
