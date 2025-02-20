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

import { useState, Fragment } from 'react';

import type { TabsProps } from './Tabs.js';

import { Tabs, TabList, TabPanel, Tab } from './index.js';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  subcomponents: { TabList, TabPanel, Tab },
  tags: ['status:under-review'],
  parameters: {
    layout: 'fullscreen',
  },
};

const tabs = [
  { id: 'one', tab: 'Tab 1', panel: 'Content 1' },
  { id: 'two', tab: 'Tab 2', panel: 'Content 2' },
  { id: 'three', tab: 'Tab 3', panel: 'Content 3' },
  { id: 'four', tab: 'Tab 4', panel: 'Content 4' },
];

export const Base = (args: TabsProps) => <Tabs {...args} />;

Base.args = {
  items: tabs,
  stretched: false,
};

export const Links = () => (
  <TabList>
    <Tab selected>Home</Tab>
    <Tab href="https://github.com/sumup-oss/circuit-ui" target="_blank">
      GitHub
    </Tab>
    <Tab
      href="https://www.npmjs.com/package/@sumup-oss/circuit-ui"
      target="_blank"
    >
      NPM
    </Tab>
  </TabList>
);

Links.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const ControlledState = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Fragment>
      <TabList>
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
      <TabPanel>{tabs[selected].panel}</TabPanel>
    </Fragment>
  );
};

ControlledState.parameters = {
  controls: { hideNoControlsWarning: true },
};
