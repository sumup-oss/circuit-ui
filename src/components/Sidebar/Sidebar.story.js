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

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { boolean } from '@storybook/addon-knobs/react';

import docs from './Sidebar.docs.mdx';
import Sidebar from '.';
import Separator from './components/Separator';

import { ReactComponent as HomeEmpty } from './icons/home-empty.svg';
import { ReactComponent as ListEmpty } from './icons/list-empty.svg';
import { ReactComponent as MeEmpty } from './icons/me-empty.svg';
import { ReactComponent as HomeFull } from './icons/home-full.svg';
import { ReactComponent as ListFull } from './icons/list-full.svg';
import { ReactComponent as MeFull } from './icons/me-full.svg';

const Viewport = styled.div`
  height: 100vh;
`;

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    docs: { page: docs },
    jest: ['Sidebar']
  }
};

const SidebarWithState = () => {
  const [selected, setSelected] = useState(1);

  return (
    <Viewport>
      <Sidebar open={true} onClose={() => null} closeButtonLabel="close-button">
        <Sidebar.Header>Header</Sidebar.Header>
        <Sidebar.NavList>
          <Sidebar.NavItem
            key="home"
            label="Home"
            selected={selected === 1}
            onClick={() => setSelected(1)}
            defaultIcon={<HomeEmpty />}
            selectedIcon={<HomeFull />}
          />
          <Sidebar.Aggregator
            key="list"
            selected={selected === 2}
            label="List"
            defaultIcon={<ListEmpty />}
            selectedIcon={<ListFull />}
          >
            <Sidebar.NavItem
              label="First"
              selected={selected === 4}
              onClick={() => setSelected(4)}
            />
            <Sidebar.NavItem
              label="Second"
              selected={selected === 5}
              onClick={() => setSelected(5)}
            />
            <Sidebar.NavItem
              label="Third"
              selected={selected === 6}
              onClick={() => setSelected(6)}
            />
          </Sidebar.Aggregator>
          <Separator />
          <Sidebar.NavItem
            key="me"
            label="Me"
            disabled={boolean('Disabled item', false)}
            selected={selected === 3}
            defaultIcon={<MeEmpty />}
            selectedIcon={<MeFull />}
            onClick={() => setSelected(3)}
          />
        </Sidebar.NavList>
        <Sidebar.Footer>Footer</Sidebar.Footer>
      </Sidebar>
    </Viewport>
  );
};

export const base = () => <SidebarWithState />;
