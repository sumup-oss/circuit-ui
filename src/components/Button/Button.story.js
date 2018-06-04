import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, boolean, text } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Button from '.';

const containerStyles = {
  width: '400px',
  display: 'flex',
  justifyContent: 'center'
};

storiesOf(`${GROUPS.COMPONENTS}|Button`, module)
  .addDecorator(withTests('Button'))
  .add(
    'Button',
    withInfo()(() => (
      <div style={containerStyles}>
        <Button
          primary={boolean('Primary', false)}
          disabled={boolean('Disabled', false)}
          secondary={boolean('Secondary', false)}
          flat={boolean('Flat', false)}
          href={boolean('Link', false) ? '#' : undefined}
          target={boolean('Link', false) ? '_blank' : undefined}
          stretch={boolean('Stretched', false)}
          size={select(
            'Size',
            [Button.KILO, Button.MEGA, Button.GIGA],
            Button.KILO
          )}
        >
          {text('Button Label', 'Button')}
        </Button>
      </div>
    ))
  );
