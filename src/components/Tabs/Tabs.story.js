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

import React, { useState, Fragment } from 'react';
import * as knobs from '@storybook/addon-knobs/react';

import docs from './Tabs.docs.mdx';
import { Tabs, TabList, TabPanel, Tab } from '.';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: { page: docs }
  }
};

const tabs = [
  { id: 'one', tab: 'Tab 1', panel: 'Content 1' },
  { id: 'two', tab: 'Tab 2', panel: 'Content 2' },
  { id: 'three', tab: 'Tab 3', panel: 'Content 3' },
  { id: 'four', tab: 'Tab 4', panel: 'Content 4' }
];

const TabsWithState = props => {
  const [selected, setSelected] = useState(0);

  return (
    <Fragment>
      <TabList {...props}>
        {tabs.map(({ tab }, index) => (
          <Tab
            key={tab}
            selected={index === selected}
            onClick={() => setSelected(index)}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      <TabPanel>{tabs[selected].content}</TabPanel>
    </Fragment>
  );
};

export const base = () => <Tabs items={tabs} />;

export const links = () => (
  <TabList>
    <Tab selected>Home</Tab>
    <Tab as="a" href="https://www.google.com" target="_blank">
      Page #1
    </Tab>
    <Tab as="a" href="https://www.google.com" target="_blank">
      Page #2
    </Tab>
  </TabList>
);

export const controlledState = () => (
  <TabsWithState stretched={knobs.boolean('stretched', false)} />
);
