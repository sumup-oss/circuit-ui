import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import ProgressBar from './ProgressBar';

storiesOf(`${GROUPS.COMPONENTS}|ProgressBar`, module)
  .addDecorator(withTests('ProgressBar'))
  .add(
    'ProgressBar',
    withInfo()(() => (
      <div style={{ width: '25vw' }}>
        <ProgressBar value={3} max={10} size={ProgressBar.GIGA} />
        <ProgressBar value={5} max={10} size={ProgressBar.MEGA} />
        <ProgressBar value={8} max={10} size={ProgressBar.KILO} />
      </div>
    ))
  )
  .add(
    'ProgressBar with label',
    withInfo()(() => (
      <div style={{ width: '25vw' }}>
        <ProgressBar value={3} max={10} size={ProgressBar.GIGA}>
          3/10
        </ProgressBar>
        <ProgressBar value={5} max={10} size={ProgressBar.MEGA}>
          50%
        </ProgressBar>
        <ProgressBar value={8} max={10} size={ProgressBar.KILO}>
          Loading...
        </ProgressBar>
      </div>
    ))
  );
