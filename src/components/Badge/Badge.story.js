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
        <Badge circle>1</Badge>
        <Badge circle>12</Badge>
        <Badge circle>88</Badge>
      </Fragment>
    ))
  );
