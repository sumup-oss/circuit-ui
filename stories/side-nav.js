import React from 'react';
import { storiesOf } from '@storybook/react';
import { SideNav, MenuItem } from '..';
import { NavOverviewIcon } from '..';

storiesOf('SideNav', module).add('Side Menu', () => <Navigation />);

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'item 1'
    };
  }

  render() {
    return (
      <SideNav expanded={true} onClick={this.setExpanded}>
        <MenuItem
          icon={<NavOverviewIcon />}
          isActive={this.state.activeItem === 'item 1'}
          onClick={() => {
            this.setState({ activeItem: 'item 1' });
          }}
        >
          Item 1
        </MenuItem>
        <MenuItem
          icon={<NavOverviewIcon />}
          isActive={this.state.activeItem === 'item 2'}
          onClick={() => {
            this.setState({ activeItem: 'item 2' });
          }}
        >
          Item 2
        </MenuItem>
        <MenuItem
          icon={<NavOverviewIcon />}
          isActive={this.state.activeItem === 'item 3'}
          onClick={() => {
            this.setState({ activeItem: 'item 3' });
          }}
        >
          Item 3
        </MenuItem>
      </SideNav>
    );
  }
}
