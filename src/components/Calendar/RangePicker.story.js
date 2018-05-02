import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withStateHandlers } from 'recompose';

import withTests from '../../util/withTests';
import { RangePicker } from '.';

const enhance = withStateHandlers(
  { startDate: null, endDate: null, focusedInput: null },
  {
    onDatesChange: () => ({ startDate, endDate }) => ({ startDate, endDate }),
    onFocusChange: () => focusedInput => ({ focusedInput })
  }
);

const CalendarStoryPicker = enhance(
  ({ startDate, endDate, focusedInput, onDatesChange, onFocusChange }) => (
    <RangePicker
      startDate={startDate}
      startDateId="your_unique_start_date_id"
      endDate={endDate}
      endDateId="your_unique_end_date_id"
      onDatesChange={onDatesChange}
      focusedInput={focusedInput}
      onFocusChange={onFocusChange}
      showClearDates
    />
  )
);

storiesOf('Calendar', module)
  .addDecorator(withTests('Calendar'))
  .add('RangePicker', withInfo()(() => <CalendarStoryPicker />));
