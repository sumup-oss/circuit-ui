import React from 'react';
import { storiesOf } from '@storybook/react';
import { SideNav, MenuItem } from '..';
import { NavOverviewIcon } from '..';

storiesOf('SideNav', module).add('Side Menu', () => <Navigation />);

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'overview'
    };
  }

  setActive = item => () => {
    this.setState({ active: item });
  };

  render() {
    return (
      <SideNav expanded={true} activeItem={this.state.active}>
        <MenuItem
          icon={<NavOverviewIcon />}
          name="overview"
          select={this.setActive}
        >
          Item 1
        </MenuItem>
        <MenuItem
          icon={<NavOverviewIcon />}
          name="overview1"
          select={this.setActive}
        >
          Item 2
        </MenuItem>
        <MenuItem
          icon={<NavOverviewIcon />}
          name="overview2"
          select={this.setActive}
        >
          Item 3
        </MenuItem>
      </SideNav>
    );
  }
}
