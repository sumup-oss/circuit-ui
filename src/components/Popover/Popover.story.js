import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select } from '@storybook/addon-knobs/react';

import withTests from '../../util/withTests';
import Popover from './Popover';
import Button from '../Button';

const positions = [Popover.TOP, Popover.BOTTOM, Popover.LEFT, Popover.RIGHT];
const alignments = [Popover.START, Popover.END, Popover.CENTER];

storiesOf('Popover', module)
  .addDecorator(withTests('Popover'))
  .add(
    'Default Popover',
    withInfo()(() => (
      <div>
        <Popover
          position={select('position', positions, Popover.BOTTOM)}
          align={select('align', alignments, Popover.START)}
          renderPopover={() => (
            <div
              style={{
                background: '#EEEEEE',
                padding: '10px',
                width: '200px'
              }}
            >
              Popover Content
            </div>
          )}
          renderReference={({ isOpen }) => (
            <Button primary={isOpen} size={Button.KILO}>
              Button
            </Button>
          )}
        />
      </div>
    ))
  );
