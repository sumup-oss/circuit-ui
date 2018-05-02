import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select } from '@storybook/addon-knobs/react';

import withTests from '../../util/withTests';
import Popover from './Popover';
import Button from '../Button';

storiesOf('Popover', module)
  .addDecorator(withTests('Popover'))
  .add(
    'Default Popover',
    withInfo()(() => (
      <div>
        <Popover
          placement={select(
            'Placement',
            ['top', 'right', 'bottom', 'left'],
            'bottom'
          )}
          align={select('Align', ['start', 'end', 'center'], 'start')}
          renderPopover={() => (
            <div
              style={{
                background: '#EEEEEE',
                padding: '10px',
                width: '200px'
              }}
            >
              Example text or more
            </div>
          )}
          renderReference={({ isOpen }) => (
            <Button primary={isOpen} size="kilo">
              Status
            </Button>
          )}
        />
      </div>
    ))
  );
