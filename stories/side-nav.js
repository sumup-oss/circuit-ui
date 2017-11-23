import React from 'react';
import { storiesOf } from '@storybook/react';
import { SideNav, MenuItem } from '..';
import { NavOverviewIcon } from '..';

storiesOf('SideNav', module).add('Side Menu', () => (
  <SideNav expanded={true}>
    <MenuItem isActive={false} icon={<NavOverviewIcon />}>
      Item 1
    </MenuItem>
    <MenuItem isActive={true} icon={<NavOverviewIcon />}>
      Item 2
    </MenuItem>
    <MenuItem isActive={false} icon={<NavOverviewIcon />}>
      Item 3
    </MenuItem>
  </SideNav>
));
