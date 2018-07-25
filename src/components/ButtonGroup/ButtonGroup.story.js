import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, boolean } from '@storybook/addon-knobs/react';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import ButtonGroup from './';
import Button from '../Button';

storiesOf(`${GROUPS.COMPONENTS}|Button/ButtonGroup`, module)
  .addDecorator(withTests('ButtonGroup'))
  .add(
    'Default ButtonGroup',
    withInfo()(() => (
      <div
        style={{ maxWidth: '500px', width: '100vw', border: '1px dotted #000' }}
      >
        <ButtonGroup
          align={select(
            'Align',
            [ButtonGroup.LEFT, ButtonGroup.CENTER, ButtonGroup.RIGHT],
            ButtonGroup.RIGHT
          )}
          inlineMobile={boolean('Display inline on mobile', false)}
        >
          <Button secondary>Cancel</Button>
          <Button primary>Confirm</Button>
        </ButtonGroup>
      </div>
    ))
  );
