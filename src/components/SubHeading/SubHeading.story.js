import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import { KILO, MEGA } from '../../util/sizes';
import SubHeading from '.';

storiesOf('SubHeading', module)
  .addDecorator(withTests('SubHeading'))
  .add(
    'Kilo SubHeading with h2',
    withInfo()(() => (
      <SubHeading element="h2" size={KILO}>
        This is an kilo SubHeading with an h2 element
      </SubHeading>
    ))
  )
  .add(
    'Mega SubHeading with h3',
    withInfo()(() => (
      <SubHeading element="h3" size={MEGA}>
        This is a mega SubHeading with an h3 element
      </SubHeading>
    ))
  );
