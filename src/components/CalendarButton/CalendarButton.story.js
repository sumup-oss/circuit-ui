import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

// import withTests from '../../util/withTests';
import CalendarButton from './CalendarButton';

storiesOf('CalendarButton', module)
  // .addDecorator(withTests('CalendarButton'))
  .add(
    'Default CalendarButton',
    withInfo()(() => (
      <div style={{ height: '100vh', width: '100vw', padding: '10px' }}>
        <CalendarButton onDatesRangeChange={action('onDatesRangeChange')} />
      </div>
    ))
  );
