import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { GROUPS } from '../.././../.storybook/hierarchySeparators';
import Drawer from './Drawer';
import Card from '../Card';
import Button from '../Button';
import State from '../State/State';
import InlineElements from '../InlineElements';

storiesOf(`${GROUPS.COMPONENTS}|Drawer`, module).add(
  'Permanent Drawer',
  withInfo()(() => (
    <State
      initial="left"
      name="anchor"
      updaterName="setAnchor"
      updater={(_, anchor) => anchor}
    >
      {({ setAnchor, anchor }) => (
        <InlineElements>
          <Button onClick={() => setAnchor('left')}>TOGGLE LEFT</Button>
          <Button onClick={() => setAnchor('right')}>TOGGLE RIGHT</Button>
          <Button onClick={() => setAnchor('top')}>TOGGLE TOP</Button>
          <Button onClick={() => setAnchor('bottom')}>TOGGLE BOTTOM</Button>
          <Drawer variant="permanent" anchor={anchor}>
            <Card>Some content</Card>
          </Drawer>
        </InlineElements>
      )}
    </State>
  ))
);
