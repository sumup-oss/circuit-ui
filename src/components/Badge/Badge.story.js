import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Badge from './Badge';

storiesOf('Badge', module)
  .addDecorator(withTests('Badge'))
  .add('Default Badge', withInfo()(() => <Badge>Update</Badge>))
  .add(
    'Circular Badge',
    withInfo()(() => (
      <Fragment>
        <Badge circular>1</Badge>
        <Badge circular>12</Badge>
        <Badge circular>88</Badge>
      </Fragment>
    ))
  );
