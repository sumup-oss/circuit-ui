import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import LoadingBar from './LoadingBar';

storiesOf('LoadingBar', module)
  .addDecorator(withTests('LoadingBar'))
  .add(
    'LoadingBar',
    withInfo()(() => (
      <div style={{ width: '25vw' }}>
        <LoadingBar value={3} max={10} size="giga" />
        <LoadingBar value={5} max={10} size="mega" />
        <LoadingBar value={8} max={10} size="kilo" />
      </div>
    ))
  )
  .add(
    'LoadingBar with label',
    withInfo()(() => (
      <div style={{ width: '25vw' }}>
        <LoadingBar value={3} max={10} size="giga">
          3/10
        </LoadingBar>
        <LoadingBar value={5} max={10} size="mega">
          50%
        </LoadingBar>
        <LoadingBar value={8} max={10} size="kilo">
          Loading...
        </LoadingBar>
      </div>
    ))
  );
