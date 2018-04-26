import React from 'react';
import styled from 'react-emotion';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import { CalendarWrap } from './components';

import CloseIcon from './close.svg';
import ArrowRightIcon from './arrow-right.svg';

const RangePicker = props => (
  <CalendarWrap>
    <DateRangePicker
      customArrowIcon={
        <CustomArrow>
          <ArrowRightIcon />
        </CustomArrow>
      }
      navNext={<ArrowRightIcon />}
      navPrev={<ArrowRightIcon />}
      customCloseIcon={<CloseIcon />}
      numberOfMonths={1}
      hideKeyboardShortcutsPanel
      {...props}
    />
  </CalendarWrap>
);

const CustomArrow = styled('div')`
  color: ${({ theme }) => theme.colors.b500};
`;

export default RangePicker;
