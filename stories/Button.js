import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from './util/withTests';
import { Button } from '../src/components/Button';

storiesOf('Button', module)
  .addDecorator(withTests('Button'))
  .add('Button', withInfo()(() => <Button>Button</Button>))
  .add('Button disabled', withInfo()(() => <Button disabled>Disabled</Button>))
  .add(
    'Button secondary',
    withInfo()(() => <Button type="secondary">Secondary</Button>)
  )
  .add(
    'Button secondary disabled',
    withInfo()(() => (
      <Button type="secondary" disabled>
        Secondary disabled
      </Button>
    ))
  )
  .add('Link Button', withInfo()(() => <Button href="#">Link</Button>))
  .add('Flat Button', withInfo()(() => <Button flat>Flat</Button>))
  .add(
    'Flat Button secondary',
    withInfo()(() => (
      <Button type="secondary" flat>
        Flat Button
      </Button>
    ))
  )
  .add(
    'Flat Button secondary disabled',
    withInfo()(() => (
      <Button type="secondary" flat disabled>
        Flat Button
      </Button>
    ))
  );
