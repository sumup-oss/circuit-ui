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
import styled from '@emotion/styled';
import { boolean } from '@storybook/addon-knobs';

import Header from '.';
import Hamburguer from '../Hamburger';

const HeaderContainer = styled('div')`
  width: 375px;
  height: auto;
`;

export default {
  title: 'Components|Header',

  parameters: {
    component: Header,
    jest: ['Header']
  }
};

export const header = () => (
  <HeaderContainer>
    <Header title="Title" mobileOnly={boolean('mobileOnly')}>
      <Hamburguer light />
    </Header>
  </HeaderContainer>
);

header.story = {
  name: 'Header'
};
