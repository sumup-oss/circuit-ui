import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Tooltip from './Tooltip';

storiesOf('Tooltip', module)
  .addDecorator(withTests('Tooltip'))
  .add(
    'Centered ',
    withInfo()(() => (
      <Tooltip align={Tooltip.Center} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    ))
  )
  .add(
    'Left ',
    withInfo()(() => (
      <Tooltip align={Tooltip.Left} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    ))
  )
  .add(
    'Right ',
    withInfo()(() => (
      <Tooltip align={Tooltip.Right} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    ))
  );
