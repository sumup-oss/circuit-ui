import React from 'react';
import styled from '@emotion/styled';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import { CalendarWrapper } from './components';

import CloseIcon from './close.svg';
import ArrowRightIcon from './arrow-right.svg';

const CustomArrow = styled('div')`
  color: ${({ theme }) => theme.colors.b500};
`;

const RangePicker = props => (
  <CalendarWrapper>
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
  </CalendarWrapper>
);

export default RangePicker;
