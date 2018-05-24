import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import CalendarTagTwoStep from './CalendarTagTwoStep';

storiesOf(`${GROUPS.COMPONENTS}|Calendar/CalendarTagTwoStep`, module)
  .addDecorator(withTests('CalendarTagTwoStep'))
  .add(
    'Default CalendarTagTwoStep',
    withInfo()(() => (
      <div style={{ height: '100vh', width: '100vw', padding: '10px' }}>
        <CalendarTagTwoStep onDatesRangeChange={action('onDatesRangeChange')} />
      </div>
    ))
  );
