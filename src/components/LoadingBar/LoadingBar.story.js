import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import LoadingBar from './LoadingBar';

storiesOf('LoadingBar', module)
  .addDecorator(withTests('LoadingBar'))
  .add(
    'Default LoadingBar',
    withInfo()(() => (
      <Fragment>
        <LoadingBar value={3} max={10} size="giga" />
        <LoadingBar value={5} max={10} size="mega" />
        <LoadingBar value={8} max={10} size="kilo" />
      </Fragment>
    ))
  );
