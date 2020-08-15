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

import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import Hamburger from '../Hamburger';

import Header from '.';

export default {
  title: 'Components/Header',
  component: Header,
};

export const base = () => (
  <Header title="Title" mobileOnly={boolean('mobileOnly')}>
    <Hamburger size="kilo" />
  </Header>
);
