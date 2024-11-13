/**
 * Copyright 2024, SumUp Ltd.
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

import { useState } from 'react';
import isChromatic from 'chromatic/isChromatic';
import { Temporal } from 'temporal-polyfill';

import { Stack } from '../../../../.storybook/components/index.js';
import {
  getTodaysDate,
  updatePlainDateRange,
  type PlainDateRange,
} from '../../util/date.js';

import { Calendar, type CalendarProps } from './Calendar.js';

export default {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['status:stable'],
};

const today = isChromatic()
  ? new Temporal.PlainDate(2020, 3, 15)
  : getTodaysDate();

export const Base = ({ selection, ...args }: CalendarProps) => {
  const [date, setDate] = useState(selection);
  return <Calendar {...args} selection={date} onSelect={setDate} />;
};

Base.args = {
  locale: 'en-US',
  selection: today.add({ days: 3 }),
  minDate: today.subtract({ days: 7 }),
  maxDate: today.add({ months: 3 }),
  prevMonthButtonLabel: 'Previous month',
  nextMonthButtonLabel: 'Next month',
};

export const Localized = ({ selection, ...args }: CalendarProps) => {
  const [date, setDate] = useState(selection);
  return (
    <Stack>
      <Calendar
        {...args}
        selection={date}
        onSelect={setDate}
        locale="de-DE"
        prevMonthButtonLabel="Vorheriger Monat"
        nextMonthButtonLabel="Nächster Monat"
      />
      <Calendar
        {...args}
        selection={date}
        onSelect={setDate}
        locale="bg-BG"
        prevMonthButtonLabel="Предишния месец"
        nextMonthButtonLabel="Следващият месец"
      />
      <Calendar
        {...args}
        selection={date}
        onSelect={setDate}
        locale="pt-BR"
        prevMonthButtonLabel="Mês anterior"
        nextMonthButtonLabel="Mês próximo"
      />
    </Stack>
  );
};

Localized.args = {
  selection: today.add({ days: 3 }),
  minDate: today.subtract({ days: 7 }),
  maxDate: today.add({ months: 3 }),
};

export const Modifiers = ({ selection, ...args }: CalendarProps) => {
  const [date, setDate] = useState(selection);
  return <Calendar {...args} selection={date} onSelect={setDate} />;
};

Modifiers.args = {
  locale: 'en-US',
  selection: today.add({ days: 3 }),
  minDate: today.subtract({ days: 7 }),
  maxDate: today.add({ months: 3 }),
  prevMonthButtonLabel: 'Previous month',
  nextMonthButtonLabel: 'Next month',
  modifiers: {
    [today.subtract({ days: 10 }).toString()]: {
      description: 'Booked',
    },
    [today.subtract({ days: 3 }).toString()]: {
      description: 'Booked',
    },
    [today.subtract({ days: 2 }).toString()]: {
      disabled: true,
    },
    [today.add({ days: 2 }).toString()]: {
      description: 'Booked',
    },
    [today.add({ days: 5 }).toString()]: {
      disabled: true,
    },
  },
};

export const Range = (args: CalendarProps) => {
  const [selection, setSelection] = useState(args.selection as PlainDateRange);

  const handleSelect = (date: Temporal.PlainDate) => {
    setSelection((prevSelection) => updatePlainDateRange(prevSelection, date));
  };

  return <Calendar {...args} selection={selection} onSelect={handleSelect} />;
};

Range.args = {
  ...Base.args,
  selection: {
    start: today.subtract({ days: 3 }),
    end: today.add({ days: 3 }),
  },
  numberOfMonths: 2,
};
