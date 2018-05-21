import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import LoadingBar from './LoadingBar';

storiesOf(`${GROUPS.COMPONENTS}|LoadingBar`, module)
  .addDecorator(withTests('LoadingBar'))
  .add(
    'LoadingBar',
    withInfo()(() => (
      <div style={{ width: '25vw' }}>
        <LoadingBar value={3} max={10} size={LoadingBar.GIGA} />
        <LoadingBar value={5} max={10} size={LoadingBar.MEGA} />
        <LoadingBar value={8} max={10} size={LoadingBar.KILO} />
      </div>
    ))
  )
  .add(
    'LoadingBar with label',
    withInfo()(() => (
      <div style={{ width: '25vw' }}>
        <LoadingBar value={3} max={10} size={LoadingBar.GIGA}>
          3/10
        </LoadingBar>
        <LoadingBar value={5} max={10} size={LoadingBar.MEGA}>
          50%
        </LoadingBar>
        <LoadingBar value={8} max={10} size={LoadingBar.KILO}>
          Loading...
        </LoadingBar>
      </div>
    ))
  );
