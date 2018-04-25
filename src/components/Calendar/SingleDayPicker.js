import React from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

import { CalendarWrap } from './components';

import CloseIcon from './close.svg';
import ArrowRightIcon from './arrow-right.svg';

const SingleDayPicker = props => (
  <CalendarWrap>
    <SingleDatePicker
      navNext={<ArrowRightIcon />}
      navPrev={<ArrowRightIcon />}
      customCloseIcon={<CloseIcon />}
      numberOfMonths={1}
      hideKeyboardShortcutsPanel
      {...props}
    />
  </CalendarWrap>
);

export default SingleDayPicker;
