/**
 * Copyright 2025, SumUp Ltd.
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

import { Tab } from '../Tab/Tab.js';

import { TabList } from './TabList.js';

export default {
  title: 'Navigation/Tabs/TabList',
  component: TabList,
  tags: ['status:internal'],
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Base = () => (
  <TabList>
    <Tab id="tab-1" aria-controls="panel-1">
      Button
    </Tab>
    <Tab id="tab-2" aria-controls="panel-2">
      Button
    </Tab>
    <Tab id="tab-3" selected aria-controls="panel-3">
      Button
    </Tab>
  </TabList>
);

export const Navigation = () => (
  <TabList as="navigation">
    <Tab as="listitem" id="tab-1">
      Button
    </Tab>
    <Tab as="listitem" id="tab-2">
      Button
    </Tab>
    <Tab as="listitem" id="tab-3" selected>
      Button
    </Tab>
  </TabList>
);
