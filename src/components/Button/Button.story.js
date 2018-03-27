import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Button from '.';

const stretchedContainerStyles = { width: '400px' };
const stretchedContainerTopButtonStyles = { marginBottom: '18px' };

storiesOf('Button', module)
  .addDecorator(withTests('Button'))
  .add('Button', withInfo()(() => <Button>Button</Button>))
  .add('Button disabled', withInfo()(() => <Button disabled>Disabled</Button>))
  .add('Button primary', withInfo()(() => <Button primary>Primary</Button>))
  .add(
    'Button primary disabled',
    withInfo()(() => (
      <Button primary disabled>
        Primary
      </Button>
    ))
  )
  .add(
    'Button secondary',
    withInfo()(() => <Button secondary>Flat Button</Button>)
  )
  .add(
    'Button secondary disabled',
    withInfo()(() => (
      <Button secondary disabled>
        Secondary disabled
      </Button>
    ))
  )
  .add('Flat Button', withInfo()(() => <Button flat>Flat</Button>))
  .add(
    'Flat Button disabled',
    withInfo()(() => (
      <Button flat disabled>
        Flat
      </Button>
    ))
  )
  .add(
    'Flat Button primary',
    withInfo()(() => (
      <Button primary flat>
        Flat Button
      </Button>
    ))
  )
  .add(
    'Flat Button secondary',
    withInfo()(() => (
      <Button secondary flat>
        Flat Button
      </Button>
    ))
  )
  .add(
    'Flat Button secondary disabled',
    withInfo()(() => (
      <Button secondary flat disabled>
        Flat Button
      </Button>
    ))
  )
  .add('Link Button', withInfo()(() => <Button href="#">Link</Button>))
  .add(
    'Stretched Button',
    withInfo()(() => (
      <div style={stretchedContainerStyles}>
        <Button style={stretchedContainerTopButtonStyles}>Normal button</Button>
        <Button stretch>Stretched button</Button>
      </div>
    ))
  )
  .add(
    'Button kilo',
    withInfo()(() => <Button size={Button.KILO}>Button</Button>)
  )
  .add(
    'Button mega',
    withInfo()(() => <Button size={Button.MEGA}>Button</Button>)
  )
  .add(
    'Button giga',
    withInfo()(() => <Button size={Button.GIGA}>Button</Button>)
  );
