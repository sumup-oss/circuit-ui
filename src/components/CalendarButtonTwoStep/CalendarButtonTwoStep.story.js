import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import CalendarButtonTwoStep from './CalendarButtonTwoStep';

storiesOf('CalendarButtonTwoStep', module)
  .addDecorator(withTests('CalendarButtonTwoStep'))
  .add(
    'Default CalendarButtonTwoStep',
    withInfo()(() => (
      <div style={{ height: '100vh', width: '100vw', padding: '10px' }}>
        <CalendarButtonTwoStep
          onDatesRangeChange={action('onDatesRangeChange')}
        />
      </div>
    ))
  );
