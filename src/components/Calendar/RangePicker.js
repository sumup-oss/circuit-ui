import React from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import { CalendarWrap } from './components';

import CloseIcon from './close.svg';
import ArrowRightIcon from './arrow-right.svg';

const RangePicker = props => (
  <CalendarWrap>
    <DateRangePicker
      customArrowIcon={<ArrowRightIcon />}
      navNext={<ArrowRightIcon />}
      navPrev={<ArrowRightIcon />}
      customCloseIcon={<CloseIcon />}
      numberOfMonths={1}
      hideKeyboardShortcutsPanel
      {...props}
    />
  </CalendarWrap>
);

export default RangePicker;
