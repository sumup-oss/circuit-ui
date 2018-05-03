import React from 'react';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';

import { CalendarWrapper } from './components';
import ArrowRightIcon from './arrow-right.svg';

const RangePickerController = props => (
  <CalendarWrapper>
    <DayPickerRangeController
      navNext={<ArrowRightIcon />}
      navPrev={<ArrowRightIcon />}
      numberOfMonths={1}
      hideKeyboardShortcutsPanel
      {...props}
    />
  </CalendarWrapper>
);

export default RangePickerController;
