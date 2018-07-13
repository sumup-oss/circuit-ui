import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, number, text } from '@storybook/addon-knobs/react';
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
  )
  .add(
    'ProgressBar with knobs',
    withInfo()(() => {
      const size = select(
        'Size',
        {
          kilo: ProgressBar.KILO,
          mega: ProgressBar.MEGA,
          giga: ProgressBar.GIGA
        },
        ProgressBar.KILO
      );
      const max = number('Maximum number', 10);
      const value = number('Value', 5);
      const children = text('Text value', `${value}/${max}`);
      return (
        <div style={{ width: '25vw' }}>
          <ProgressBar value={value} max={max} size={size}>
            {children}
          </ProgressBar>
        </div>
      );
    })
  );
