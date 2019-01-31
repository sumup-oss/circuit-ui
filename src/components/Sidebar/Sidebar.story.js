import React, { Component } from 'react';
import { range } from 'lodash/fp';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import withTests from '../../util/withTests';
import Sidebar from '.';

class SidebarContainer extends Component {
  state = { selectedItem: 0 };

  handleNavItemClick = index => {
    this.setState({ selectedItem: index });
  };

  render() {
    return (
      <div style={{ height: '600px' }}>
        <Sidebar>
          <Sidebar.Header>Header</Sidebar.Header>
          <Sidebar.NavList>
            {range(1, 5).map((value, i) => (
              <Sidebar.NavItem
                key={i}
                selected={this.state.selectedItem === i}
                onClick={() => this.handleNavItemClick(i)}
              >
                Item #{i}
              </Sidebar.NavItem>
            ))}
          </Sidebar.NavList>
        </Sidebar>
      </div>
    );
  }
}

storiesOf(`${GROUPS.COMPONENTS}|Sidebar`, module)
  .addDecorator(withTests('Sidebar'))
  .add('Sidebar', withInfo()(() => <SidebarContainer />));
