import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Input from './Input';

const styles = { display: 'block', marginBottom: '20px' };

storiesOf('Input', module)
  .addDecorator(withTests('Input'))
  .add('Input', withInfo()(() => <Input placeholder="Placeholder" />))
  .add(
    'Input invalid',
    withInfo()(() => <Input placeholder="Placeholder" isInvalid={true} />)
  )
  .add(
    'Input optional',
    withInfo()(() => (
      <Input placeholder="Placeholder" style={styles} isOptional />
    ))
  )
  .add(
    'Input disabled',
    withInfo()(() => <Input value="Some value" disabled />)
  );
