import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import * as knobs from '@storybook/addon-knobs/react';

import { GROUPS } from '../.././../../../.storybook/hierarchySeparators';
import withTests from '../../../../util/withTests';
import SideNavItem from './SideNavItem';

import FavoriteIcon from '../icons/favorite.svg';

storiesOf(`${GROUPS.NAVIGATION}|SideNavItem`, module)
  .addDecorator(withTests('SideNavItem'))
  .add(
    'SideNavItem',
    withInfo()(() => (
      <div style={{ width: '248px', backgroundColor: '#aaa', padding: '24px' }}>
        <SideNavItem isActive={knobs.boolean('isACtive')} icon={FavoriteIcon}>
          Referals
        </SideNavItem>
      </div>
    ))
  );
