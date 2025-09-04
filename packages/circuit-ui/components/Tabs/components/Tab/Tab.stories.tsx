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

import { Tab } from './Tab.js';

export default {
  title: 'Navigation/Tabs/Tab',
  component: Tab,
  tags: ['status:internal'],
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Base = () => (
  <div>
    <Tab>Button</Tab>
    <Tab href="#link">Link</Tab>
    <Tab selected>Selected</Tab>
  </div>
);
