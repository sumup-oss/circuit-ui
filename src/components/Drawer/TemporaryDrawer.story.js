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
  'Temporary Drawer',
  withInfo()(() => (
    <State
      initial={false}
      name="isOpen"
      updaterName="toggle"
      updater={open => !open}
    >
      {({ toggle, isOpen }) => (
        <State
          initial="left"
          name="anchor"
          updaterName="setAnchor"
          updater={(_, anchor) => {
            toggle();
            return anchor;
          }}
        >
          {({ setAnchor, anchor }) => (
            <InlineElements>
              <Button onClick={() => setAnchor('left')}>OPEN LEFT</Button>
              <Button onClick={() => setAnchor('right')}>OPEN RIGHT</Button>
              <Button onClick={() => setAnchor('top')}>OPEN TOP</Button>
              <Button onClick={() => setAnchor('bottom')}>OPEN BOTTOM</Button>
              <Drawer anchor={anchor} open={isOpen} onClose={toggle}>
                <Card>Some content</Card>
              </Drawer>
            </InlineElements>
          )}
        </State>
      )}
    </State>
  ))
);
