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
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  House,
  HouseFilled,
  Person,
  PersonFilled,
  Transactions,
  TransactionsFilled,
  ShoppingCart,
  ShoppingCartFilled
} from '@sumup/icons';

import Button from '../Button';
import docs from './Sidebar.docs.mdx';
import Sidebar from '.';
import Separator from './components/Separator';

const Viewport = styled.div`
  height: 100vh;
  width: 100vw;
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
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(1);

  return (
    <>
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

      <Viewport>
        <Sidebar
          open={open}
          onClose={() => setOpen(false)}
          closeButtonLabel="close-button"
        >
          <Sidebar.Header>Header</Sidebar.Header>
          <Sidebar.NavList>
            <Sidebar.NavItem
              key="home"
              label="Home"
              selected={selected === 1}
              onClick={() => setSelected(1)}
              defaultIcon={<House size="large" />}
              selectedIcon={<HouseFilled size="large" />}
            />
            <Sidebar.Aggregator
              key="list"
              selected={selected === 2}
              label="List"
              defaultIcon={<Transactions size="large" />}
              selectedIcon={<TransactionsFilled size="large" />}
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
              defaultIcon={<ShoppingCart size="large" />}
              selectedIcon={<ShoppingCartFilled size="large" />}
              onClick={() => setSelected(3)}
            />
            <Separator key="separator" />
            <Sidebar.NavItem
              key="me"
              label="Me"
              selected={selected === 4}
              defaultIcon={<Person size="large" />}
              selectedIcon={<PersonFilled size="large" />}
              onClick={() => setSelected(4)}
            />
          </Sidebar.NavList>
          <Sidebar.Footer>Footer</Sidebar.Footer>
        </Sidebar>
      </Viewport>
    </>
  );
};

export const base = () => <SidebarWithState />;
