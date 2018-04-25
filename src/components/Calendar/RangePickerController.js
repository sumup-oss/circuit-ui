import React from 'react';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';

import { CalendarWrap } from './components';
import ArrowRightIcon from './arrow-right.svg';

const RangePickerController = props => (
  <CalendarWrap>
    <DayPickerRangeController
      navNext={<ArrowRightIcon />}
      navPrev={<ArrowRightIcon />}
      numberOfMonths={1}
      hideKeyboardShortcutsPanel
      {...props}
    />
  </CalendarWrap>
);

export default RangePickerController;
