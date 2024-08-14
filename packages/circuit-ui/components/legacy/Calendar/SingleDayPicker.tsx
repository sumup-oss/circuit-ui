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

import { ArrowRight, ArrowLeft, Close } from '@sumup-oss/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SingleDatePicker } from 'react-dates';
import type { SingleDatePickerShape } from 'react-dates';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-dates/initialize.js';

import styled from '../../../styles/styled.js';

import { CalendarWrapper } from './components/index.js';

const CloseIcon = styled(Close)`
  color: var(--cui-fg-normal);
`;

export type SingleDayPickerProps = SingleDatePickerShape;

/**
 * @legacy
 */
export const SingleDayPicker = (props: SingleDayPickerProps) => (
  <CalendarWrapper>
    <SingleDatePicker
      navNext={<ArrowRight size="16" />}
      navPrev={<ArrowLeft size="16" />}
      customCloseIcon={<CloseIcon size="16" />}
      numberOfMonths={1}
      hideKeyboardShortcutsPanel
      {...props}
    />
  </CalendarWrapper>
);
