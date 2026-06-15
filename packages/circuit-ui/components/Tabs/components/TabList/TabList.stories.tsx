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
  <TabList
    tabs={[
      { id: '1', tab: 'Button' },
      { id: '2', tab: 'Button' },
      { id: '3', tab: 'Button' },
    ]}
    initialSelectedIndex={2}
  />
);

export const Navigation = () => (
  <TabList
    as="navigation"
    tabs={[
      { id: 'home', tab: 'Home', href: '/home' },
      { id: 'about', tab: 'About', href: '/about' },
      { id: 'contact', tab: 'Contact', href: '/contact' },
    ]}
    initialSelectedIndex={2}
  />
);
