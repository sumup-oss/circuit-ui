import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, number, text, boolean } from '@storybook/addon-knobs/react';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import ProgressBar from './ProgressBar';

storiesOf(`${GROUPS.COMPONENTS}|ProgressBar`, module)
  .addDecorator(withTests('ProgressBar'))
  .add(
    'ProgressBar',
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
      const max = number('Maximum value', 10);
      const value = number('Value', 5);
      const percentage = boolean('Label in percentage', false);
      const defaultLabel = percentage
        ? `${(value / max) * 100}%`
        : `${value}/${max}`;
      const children = text('Label', defaultLabel);
      return (
        <div style={{ width: '25vw' }}>
          <ProgressBar value={value} max={max} size={size}>
            {children}
          </ProgressBar>
        </div>
      );
    })
  );
