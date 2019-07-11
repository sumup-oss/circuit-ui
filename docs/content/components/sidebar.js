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
import Sidebar from '../../../src/components/Sidebar';

const SidebarContainer = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Sidebar open={true} onClose={() => null} closeButtonLabel="close-button">
      <Sidebar.Header>Header</Sidebar.Header>
      <Sidebar.NavList>
        <Sidebar.Aggregator label="Overview">
          <Sidebar.NavItem
            onClick={() => setSelected(0)}
            label="Analytics"
            selected={selected === 0}
          />
          <Sidebar.NavItem
            onClick={() => setSelected(1)}
            label="Payouts and Balances"
            selected={selected === 1}
          />
        </Sidebar.Aggregator>
        <Sidebar.NavItem
          selected={selected === 2}
          onClick={() => setSelected(2)}
          label="Transactions"
        />
        <Sidebar.NavItem
          selected={selected === 3}
          onClick={() => setSelected(3)}
          label="Settings"
        />
      </Sidebar.NavList>
      <Sidebar.Footer>Footer</Sidebar.Footer>
    </Sidebar>
  );
};

export default SidebarContainer;
