import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from './util/withTests';
import { Input } from '../src/components/Input';

const styles = { display: 'block', marginBottom: '20px' };

storiesOf('Input', module)
  .addDecorator(withTests('Button'))
  .add(
    'Input',
    withInfo()(() => <Input key="regular" placeholder="Placeholder" />)
  )
  .add(
    'Input invalid',
    withInfo()(() => (
      <Input key="invalid" placeholder="Placeholder" isInvalid={true} />
    ))
  )
  .add(
    'Input optional',
    withInfo()(() => (
      <Input
        key="optional"
        placeholder="Placeholder"
        style={styles}
        isOptional
      />
    ))
  )
  .add(
    'Input disabled',
    withInfo()(() => <Input key="disabled" value="Some value" disabled />)
  );
