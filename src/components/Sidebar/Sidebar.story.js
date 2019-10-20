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

import React, { Component } from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs/react';

import Sidebar from '.';

import { ReactComponent as HomeEmpty } from './icons/home-empty.svg';
import { ReactComponent as ListEmpty } from './icons/list-empty.svg';
import { ReactComponent as MeEmpty } from './icons/me-empty.svg';
import { ReactComponent as HomeFull } from './icons/home-full.svg';
import { ReactComponent as ListFull } from './icons/list-full.svg';
import { ReactComponent as MeFull } from './icons/me-full.svg';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 600px;
  width: 400px;
  background-color: white;
`;

class Container extends Component {
  state = { selected: 1 };

  changeSelected = selected => {
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;

    return (
      <SidebarContainer>
        <Sidebar
          open={true}
          onClose={() => null}
          closeButtonLabel="close-button"
        >
          <Sidebar.Header>Header</Sidebar.Header>
          <Sidebar.NavList>
            <Sidebar.NavItem
              label={`Home`}
              selected={selected === 1}
              onClick={() => this.changeSelected(1)}
              defaultIcon={<HomeEmpty />}
              selectedIcon={<HomeFull />}
            />
            <Sidebar.Aggregator
              label={`List`}
              defaultIcon={<ListEmpty />}
              selectedIcon={<ListFull />}
            >
              <Sidebar.NavItem
                label={`First`}
                selected={selected === 4}
                onClick={() => this.changeSelected(4)}
              />
              <Sidebar.NavItem
                label={`Second`}
                selected={selected === 5}
                onClick={() => this.changeSelected(5)}
              />
              <Sidebar.NavItem
                label={`Third`}
                selected={selected === 6}
                onClick={() => this.changeSelected(6)}
              />
            </Sidebar.Aggregator>
            <Sidebar.NavItem
              label={`Me`}
              disabled={boolean('Disabled item', false)}
              selected={selected === 3}
              defaultIcon={<MeEmpty />}
              selectedIcon={<MeFull />}
              onClick={() => this.changeSelected(3)}
            />
          </Sidebar.NavList>
          <Sidebar.Footer>Footer</Sidebar.Footer>
        </Sidebar>
      </SidebarContainer>
    );
  }
}

storiesOf('Components|Sidebar', module)
  .addParameters({ jest: ['Sidebar'] })
  .add('Sidebar', () => <Container />);
