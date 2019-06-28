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
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withStateHandlers } from 'recompose';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import { SingleDayPicker } from '.';

const enhance = withStateHandlers(
  { date: null, focused: null },
  {
    onDateChange: () => date => ({ date }),
    onFocusChange: () => ({ focused }) => ({ focused })
  }
);

const CalendarStoryPicker = enhance(
  ({ date, onDateChange, focused, onFocusChange }) => (
    <SingleDayPicker
      date={date}
      onDateChange={onDateChange}
      focused={focused}
      onFocusChange={onFocusChange}
    />
  )
);

storiesOf(`${GROUPS.COMPONENTS}|Calendar`, module)
  .addDecorator(withTests('Calendar'))
  .add('SingleDayPicker', withInfo()(() => <CalendarStoryPicker />));
