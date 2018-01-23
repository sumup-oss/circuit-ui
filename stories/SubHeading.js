import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from './util/withTests';
import { SubHeading } from '../src/components/SubHeading';

storiesOf('SubHeading', module)
  .addDecorator(withTests('SubHeading'))
  .add(
    'Kilo SubHeading with h2',
    withInfo()(() => (
      <SubHeading element="h2" size="kilo">
        This is an kilo SubHeading with an h2 element
      </SubHeading>
    ))
  )
  .add(
    'Mega SubHeading with h3',
    withInfo()(() => (
      <SubHeading element="h3" size="mega">
        This is a mega SubHeading with an h3 element
      </SubHeading>
    ))
  );
