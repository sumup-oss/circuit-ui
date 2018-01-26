import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import TextArea from '.';

storiesOf('TextArea', module)
  .addDecorator(withTests('TextArea'))
  .add(
    'Default TextArea',
    withInfo()(() => <TextArea placeholder="Enter your story here" />)
  )
  .add(
    'TextArea invalid',
    withInfo()(() => (
      <TextArea
        placeholder="Invalid TextArea, maybe too many chars?"
        isInvalid
      />
    ))
  )
  .add(
    'TextArea optional',
    withInfo()(() => <TextArea placeholder="Optional" isOptional />)
  )
  .add(
    'TextArea disabled',
    withInfo()(() => (
      <TextArea
        value="You can only enter text after this was enabled"
        disabled
      />
    ))
  );
