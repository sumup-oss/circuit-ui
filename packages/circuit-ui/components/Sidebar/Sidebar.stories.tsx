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

import { useState } from 'react';
import { css } from '@emotion/react';
import { Home, Profile, Sales, Shop } from '@sumup/icons';

import styled from '../../styles/styled.js';
import Button from '../Button';

import { Separator } from './components/Separator';
import { Sidebar, SidebarProps } from './Sidebar';

export default {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  subcomponents: {
    Header: Sidebar.Header,
    NavList: Sidebar.NavList,
    NavItem: Sidebar.NavItem,
    Aggregator: Sidebar.Aggregator,
    Separator: Sidebar.Separator,
    Footer: Sidebar.Footer,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

const Viewport = styled.div`
  min-height: 500px;
`;

export const Base = (args: SidebarProps) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(1);

  return (
    <Viewport>
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          css={css`
            position: absolute;
          `}
        >
          Open sidebar
        </Button>
      )}

      <Sidebar {...args} open={open} onClose={() => setOpen(false)}>
        <Sidebar.Header>Header</Sidebar.Header>
        <Sidebar.NavList>
          <Sidebar.NavItem
            key="home"
            label="Home"
            selected={selected === 1}
            onClick={() => setSelected(1)}
            defaultIcon={<Home />}
            selectedIcon={<Home />}
          />
          <Sidebar.Aggregator
            key="list"
            label="List"
            defaultIcon={<Sales />}
            selectedIcon={<Sales />}
          >
            <Sidebar.NavItem
              label="First"
              selected={selected === 21}
              onClick={() => setSelected(21)}
            />
            <Sidebar.NavItem
              label="Second"
              selected={selected === 22}
              onClick={() => setSelected(22)}
            />
            <Sidebar.NavItem
              label="Third"
              selected={selected === 23}
              onClick={() => setSelected(23)}
            />
          </Sidebar.Aggregator>
          <Sidebar.NavItem
            key="shop"
            label="Shop"
            disabled
            selected={selected === 3}
            defaultIcon={<Shop />}
            selectedIcon={<Shop />}
            onClick={() => setSelected(3)}
          />
          <Separator key="separator" />
          <Sidebar.NavItem
            key="me"
            label="Me"
            selected={selected === 4}
            defaultIcon={<Profile />}
            selectedIcon={<Profile />}
            onClick={() => setSelected(4)}
          />
        </Sidebar.NavList>
        <Sidebar.Footer>Footer</Sidebar.Footer>
      </Sidebar>
    </Viewport>
  );
};

Base.args = {
  closeButtonLabel: 'close-button',
};
