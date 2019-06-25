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
import { range } from 'lodash/fp';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';
import Sidebar from '.';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 600px;
  width: 400px;
  background-color: white;
`;

class Container extends Component {
  state = { selected: 0 };

  changeSelected = selected => {
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;
    const open = boolean('Open', true);

    return (
      <SidebarContainer>
        <Sidebar
          open={open}
          onClose={() => null}
          closeButtonLabel="close-button"
        >
          <Sidebar.Header>Header</Sidebar.Header>
          <Sidebar.NavList>
            <Sidebar.Aggregator label={`Item #${1}`}>
              <Sidebar.NavItem
                onClick={() => this.changeSelected(4)}
                label={`Sub Item #${1}`}
                selected={Number(selected) === 4}
              />
              <Sidebar.NavItem
                onClick={() => this.changeSelected(5)}
                label={`Sub Item #${2}`}
                selected={Number(selected) === 5}
              />
              <Sidebar.NavItem
                onClick={() => this.changeSelected(6)}
                label={`Sub Item #${3}`}
                selected={Number(selected) === 6}
              />
            </Sidebar.Aggregator>
            {range(2, 4).map(i => (
              <Sidebar.NavItem
                key={i}
                selected={i === Number(selected)}
                onClick={() => this.changeSelected(i)}
                label={`Item #${i}`}
              />
            ))}
          </Sidebar.NavList>
          <Sidebar.Footer>Footer</Sidebar.Footer>
        </Sidebar>
      </SidebarContainer>
    );
  }
}

storiesOf(`${GROUPS.COMPONENTS}|Sidebar`, module)
  .addDecorator(withTests('Sidebar'))
  .add('Sidebar', withInfo()(() => <Container />));
