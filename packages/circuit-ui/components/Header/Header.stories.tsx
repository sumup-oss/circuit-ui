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

import Hamburger from '../Hamburger/index.js';

import { Header, HeaderProps } from './Header.js';

export default {
  title: 'Navigation/Header',
  component: Header,
};

export const Base = (args: HeaderProps) => (
  <Header {...args}>
    <Hamburger activeLabel="Close menu" inactiveLabel="Open menu" size="s" />
  </Header>
);

Base.args = {
  title: 'Title',
  mobileOnly: false,
};