import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import CalendarTag from './CalendarTag';

storiesOf(`${GROUPS.COMPONENTS}|Calendar/CalendarTag`, module)
  .addDecorator(withTests('CalendarTag'))
  .add(
    'Default CalendarTag',
    withInfo()(() => (
      <div style={{ height: '100vh', width: '100vw', padding: '10px' }}>
        <CalendarTag onDatesRangeChange={action('onDatesRangeChange')} />
      </div>
    ))
  );
