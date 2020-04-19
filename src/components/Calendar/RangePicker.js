/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import styled from '@emotion/styled';
import { ArrowRight, ArrowLeft, Cross } from '@sumup/icons';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

import { CalendarWrapper } from './components';

const CustomArrow = styled('div')`
  color: ${({ theme }) => theme.colors.b500};
`;

const RangePicker = props => (
  <CalendarWrapper>
    <DateRangePicker
      customArrowIcon={
        <CustomArrow>
          <ArrowRight />
        </CustomArrow>
      }
      navNext={<ArrowRight />}
      navPrev={<ArrowLeft />}
      customCloseIcon={<Cross size="small" />}
      numberOfMonths={1}
      hideKeyboardShortcutsPanel
      {...props}
    />
  </CalendarWrapper>
);

RangePicker.propTypes = DateRangePicker.propTypes;

/**
 * @component
 */
export default RangePicker;
