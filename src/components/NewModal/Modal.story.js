import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { GROUPS } from '../.././../.storybook/hierarchySeparators';
import State from '../State/State';
import Modal from './Modal';
import Button from '../Button';
import Card from '../Card';

storiesOf(`${GROUPS.COMPONENTS}|NewModal`, module)
  //   .addDecorator(withTests('SideNavItem'))
  .add(
    'NewModal',
    withInfo()(() => (
      <State
        initial={false}
        name="opened"
        updaterName="toggle"
        updater={opened => !opened}
      >
        {({ toggle, opened }) => (
          <div>
            <Button onClick={toggle}>Open Modal</Button>
            <Modal open={opened} onClose={toggle}>
              <Card>test</Card>
            </Modal>
          </div>
        )}
      </State>
    ))
  );
