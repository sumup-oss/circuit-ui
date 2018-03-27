import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import TextArea from '.';

storiesOf('TextArea', module)
  .addDecorator(withTests('TextArea'))
  .add(
    'TextArea',
    withInfo()(() => <TextArea placeholder="Enter your story here" />)
  )
  .add(
    'TextArea invalid',
    withInfo()(() => (
      <TextArea placeholder="Invalid TextArea, maybe too many chars?" invalid />
    ))
  )
  .add(
    'TextArea warning',
    withInfo()(() => (
      <TextArea
        placeholder="TextArea with warning, maybe too many chars?"
        hasWarning
      />
    ))
  )
  .add(
    'TextArea optional',
    withInfo()(() => <TextArea placeholder="Optional" optional />)
  )
  .add(
    'TextArea disabled',
    withInfo()(() => (
      <TextArea
        value="You cannot enter text because the textarea is disabled"
        disabled
      />
    ))
  );
