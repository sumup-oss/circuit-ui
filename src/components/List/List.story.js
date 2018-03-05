import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import List from './List';

storiesOf('List', module)
  .addDecorator(withTests('List'))
  .add(
    'List default',
    withInfo()(() => (
      <List>
        <li>This is a list</li>
        <li>A very fine list</li>
        <List>
          <li>Sometimes a nested list</li>
        </List>
        <li>The kind of list you like</li>
      </List>
    ))
  )
  .add(
    'List ordered',
    withInfo()(() => (
      <List ordered>
        <li>This is a list</li>
        <li>A very fine list</li>
        <List>
          <li>Sometimes a nested list</li>
        </List>
        <li>The kind of list you like</li>
      </List>
    ))
  )
  .add(
    'List kilo',
    withInfo()(() => (
      <List size={List.KILO}>
        <li>This is a list</li>
        <li>A very fine list</li>
        <List size={List.KILO}>
          <li>Sometimes a nested list</li>
        </List>
        <li>The kind of list you like</li>
      </List>
    ))
  )
  .add(
    'List mega',
    withInfo()(() => (
      <List size={List.MEGA}>
        <li>This is a list</li>
        <li>A very fine list</li>
        <List size={List.MEGA}>
          <li>Sometimes a nested list</li>
        </List>
        <li>The kind of list you like</li>
      </List>
    ))
  );
