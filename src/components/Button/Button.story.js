/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

const containerStyles = {
  width: '400px',
  display: 'flex',
  justifyContent: 'center'
};

storiesOf('Components|Button', module)
  .addParameters({ component: Button })
  .addParameters({ jest: ['Button'] })
  .add('Button', () => (
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
  .add('Plain Button', () => (
    <Button
      plain
      primary={boolean('Primary', false)}
      onClick={action('onClick')}
      size={select(
        'Size',
        [Button.KILO, Button.MEGA, Button.GIGA],
        Button.MEGA
      )}
      href={boolean('href', false) ? 'http://www.google.com' : undefined}
    >
      Button Link
    </Button>
  ));
