import React, { Component } from 'react';
import styled from 'react-emotion';
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
            <Sidebar.NavItem
              selected={Number(selected) === 10}
              onClick={() => this.changeSelected(10)}
              label={`Item #${10}`}
            >
              <Sidebar.NavItem
                secondary
                onClick={() => this.changeSelected(11)}
                label={`Sub Item #${11}`}
                selected={Number(selected) === 11}
              />
              <Sidebar.NavItem
                secondary
                onClick={() => this.changeSelected(12)}
                label={`Sub Item #${12}`}
                selected={Number(selected) === 12}
              />
              <Sidebar.NavItem
                secondary
                onClick={() => this.changeSelected(13)}
                label={`Sub Item #${13}`}
                selected={Number(selected) === 13}
              />
            </Sidebar.NavItem>
            {range(1, 9).map(i => (
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
