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

import { ArrowRight, ArrowLeft } from '@sumup-oss/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DayPickerRangeController } from 'react-dates';
import type { DayPickerRangeControllerShape } from 'react-dates';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-dates/initialize';

import { deprecate } from '../../../util/logger';

import { CalendarWrapper } from './components/index';

export type RangePickerControllerProps = DayPickerRangeControllerShape;

/**
 * @deprecated Use the experimental Calendar component instead.
 */
export const RangePickerController = (props: RangePickerControllerProps) => {
  if (process.env.NODE_ENV !== 'production') {
    deprecate(
      'RangePickerController',
      'The RangePickerController component is deprecated. Use the experimental Calendar component instead.',
    );
  }

  return (
    <CalendarWrapper>
      <DayPickerRangeController
        navNext={<ArrowRight size="16" />}
        navPrev={<ArrowLeft size="16" />}
        numberOfMonths={1}
        hideKeyboardShortcutsPanel
        {...props}
      />
    </CalendarWrapper>
  );
};
