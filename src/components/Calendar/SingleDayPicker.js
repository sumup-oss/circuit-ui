import React from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

import { CalendarWrapper } from './components';

import { ReactComponent as CloseIcon } from './close.svg';
import { ReactComponent as ArrowRightIcon } from './arrow-right.svg';

const SingleDayPicker = props => (
  <CalendarWrapper>
    <SingleDatePicker
      navNext={<ArrowRightIcon />}
      navPrev={<ArrowRightIcon />}
      customCloseIcon={<CloseIcon />}
      numberOfMonths={1}
      hideKeyboardShortcutsPanel
      {...props}
    />
  </CalendarWrapper>
);

export default SingleDayPicker;
