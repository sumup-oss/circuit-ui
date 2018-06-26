import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, select } from '@storybook/addon-knobs';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import List from './List';

const sizes = [List.KILO, List.MEGA, List.GIGA];

storiesOf(`${GROUPS.COMPONENTS}|List`, module)
  .addDecorator(withTests('List'))
  .add(
    'List',
    withInfo()(() => (
      <List size={select('Size', sizes, sizes[0])} ordered={boolean('Ordered')}>
        <li>This is a list</li>
        <li>A very fine list</li>
        <List
          size={select('Size', sizes, sizes[0])}
          ordered={boolean('Ordered')}
        >
          <li>Sometimes a nested list</li>
        </List>
        <li>The kind of list you like</li>
      </List>
    ))
  );
