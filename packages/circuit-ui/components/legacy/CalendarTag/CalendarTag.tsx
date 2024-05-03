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

'use client';

import { useEffect, useRef, useState } from 'react';
import { formatDateTime } from '@sumup/intl';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment, { type Moment } from 'moment';
import type { Temporal } from 'temporal-polyfill';

import type { ClickEvent } from '../../../types/events.js';
import type { Locale } from '../../../util/i18n.js';
import { sortDateRange, type PlainDateRange } from '../../../util/date.js';
import Tag from '../../Tag/index.js';
import { Calendar, type CalendarProps } from '../../Calendar/Calendar.js';

type CalendarTagTemporalProps = {
  useTemporal: true;
  /**
   * Callback to receive the set of dates when the user selects them.
   */
  onDatesRangeChange: (range: PlainDateRange) => void;
};

type CalendarTagMomentProps = {
  useTemporal: never;
  /**
   * Callback to receive the set of dates when the user selects them.
   */
  onDatesRangeChange: (range: DateRange) => void;
};

export type CalendarTagProps = Pick<CalendarProps, 'locale'> &
  CalendarTagMomentProps &
  CalendarTagTemporalProps & {
    /**
     * Function that's called when the date tag is clicked.
     */
    onClick?: (event: ClickEvent) => void;
    // TODO: Make required in the next major version.
    prevMonthButtonLabel?: CalendarProps['prevMonthButtonLabel'];
    nextMonthButtonLabel?: CalendarProps['nextMonthButtonLabel'];
  };

type CalendarDate = Moment | null;
type DateRange = {
  startDate: CalendarDate;
  endDate: CalendarDate;
};

function toDate(date?: Temporal.PlainDate, locale?: Locale) {
  if (!date) {
    return '';
  }
  const tmp = new Date(Date.UTC(date.year, date.month - 1, date.day));
  return formatDateTime(tmp, locale, { month: 'short', day: 'numeric' });
}

/**
 * @legacy
 */
export function CalendarTag({
  onDatesRangeChange,
  onClick,
  useTemporal,
  prevMonthButtonLabel = 'Previous',
  nextMonthButtonLabel = 'Next',
  locale,
  ...props
}: CalendarTagProps) {
  const tagRef = useRef<HTMLDivElement & HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [selection, setSelection] = useState<PlainDateRange>([]);

  useEffect(() => {
    if (selection.length === 2) {
      if (useTemporal) {
        onDatesRangeChange(selection);
      } else {
        const startDate = moment(selection[0].toString());
        const endDate = moment(selection[1].toString());
        onDatesRangeChange({ startDate, endDate });
      }
    }
  }, [selection, useTemporal, onDatesRangeChange]);

  const handleSelect = (date: Temporal.PlainDate) => {
    setSelection((prevSelection) => {
      if (!prevSelection[0] || (prevSelection[0] && prevSelection[1])) {
        return [date];
      }
      return sortDateRange([prevSelection[0], date]);
    });
  };

  const handleTagClick = (event: ClickEvent) => {
    onClick?.(event);
    setOpen((prev) => !prev);
  };

  const getDateRangePreview = () => {
    const [startDate, endDate] = selection;

    if (!startDate && !endDate) {
      return 'Dates';
    }

    return `${toDate(startDate, locale)} - ${toDate(endDate, locale)}`;
  };

  return (
    <div {...props}>
      <Tag selected={isOpen} ref={tagRef} onClick={handleTagClick}>
        {getDateRangePreview()}
      </Tag>
      {isOpen && (
        <Calendar
          selection={selection}
          onSelect={handleSelect}
          prevMonthButtonLabel={prevMonthButtonLabel}
          nextMonthButtonLabel={nextMonthButtonLabel}
        />
      )}
    </div>
  );
}
