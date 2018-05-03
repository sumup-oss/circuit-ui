import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withStateHandlers } from 'recompose';

import withTests from '../../util/withTests';
import { SingleDayPicker } from '.';

const enhance = withStateHandlers(
  { date: null, focused: null },
  {
    onDateChange: () => date => ({ date }),
    onFocusChange: () => ({ focused }) => ({ focused })
  }
);

const CalendarStoryPicker = enhance(
  ({ date, onDateChange, focused, onFocusChange }) => (
    <SingleDayPicker
      date={date}
      onDateChange={onDateChange}
      focused={focused}
      onFocusChange={onFocusChange}
    />
  )
);

storiesOf('Calendar', module)
  .addDecorator(withTests('Calendar'))
  .add('SingleDayPicker', withInfo()(() => <CalendarStoryPicker />));
