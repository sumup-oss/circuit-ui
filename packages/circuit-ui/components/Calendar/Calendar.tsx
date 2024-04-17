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

'use client';

import {
  useCallback,
  useId,
  useMemo,
  useReducer,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { Temporal } from 'temporal-polyfill';
import { formatDateTime } from '@sumup/intl';
import { ArrowLeft, ArrowRight } from '@sumup/icons';

import utilityClasses from '../../styles/utility.js';
import { getBrowserLocale, type Locale } from '../../util/i18n.js';
import { IconButton } from '../Button/IconButton.js';
import { Headline } from '../Headline/Headline.js';
import { Body } from '../Body/Body.js';
import { clsx } from '../../styles/clsx.js';
import {
  DAYS_IN_WEEK,
  getFirstDateOfWeek,
  getLastDateOfWeek,
  toPlainDate,
  yearMonthToDate,
  type FirstDayOfWeek,
} from '../../util/date.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';

import {
  calendarReducer,
  getViewOfMonth,
  getWeekdays,
  initCalendar,
  type Weekdays,
} from './CalendarService.js';
import styles from './Calendar.module.css';

export interface CalendarProps {
  /**
   * The currently selected date in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DD`).
   */
  value?: string;
  /**
   * The minimum selectable date in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DD`) (inclusive).
   */
  min?: string;
  /**
   * The maximum selectable date in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DD`) (inclusive).
   */
  max?: string;
  /**
   * A callback that is called when a user selects a date.
   */
  onChange?: (date: string) => void;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag),
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` when available.
   */
  locale?: Locale;
  /**
   * An integer indicating the first day of the week. Can be either `1` (Monday)
   * or `7` (Sunday). Default: `1` (Monday).
   */
  firstDayOfWeek?: FirstDayOfWeek;
  /**
   * Text label for the button to navigate to the previous month.
   */
  prevMonthButtonLabel: string;
  /**
   * Text label for the button to navigate to the next month.
   */
  nextMonthButtonLabel: string;
}

export function Calendar({
  value,
  onChange,
  min,
  max,
  firstDayOfWeek = 1,
  locale = getBrowserLocale(),
  prevMonthButtonLabel,
  nextMonthButtonLabel,
}: CalendarProps) {
  const selectedDate = toPlainDate(value);
  const minDate = toPlainDate(min);
  const maxDate = toPlainDate(max);

  const [calendar, dispatch] = useReducer(
    calendarReducer,
    { selectedDate, minDate, maxDate },
    initCalendar,
  );

  const weekdays = useMemo(
    () => getWeekdays(firstDayOfWeek, locale),
    [firstDayOfWeek, locale],
  );

  const ref = useRef<HTMLDivElement>(null);
  const headlineId = useId();
  const headline = formatDateTime(yearMonthToDate(calendar.yearMonth), locale, {
    year: 'numeric',
    month: 'long',
  });

  const handleFocusDate = useCallback(
    (date: Temporal.PlainDate) => {
      dispatch({ type: 'focus-date', date });
      // Focus the button on the next tick after React has rerendered the UI
      window.requestAnimationFrame(() => {
        ref.current
          ?.querySelector<HTMLButtonElement>('button[tabindex="0"]')
          ?.focus();
      });
    },
    [dispatch],
  );

  const handleSelectDate = useCallback(
    (date: Temporal.PlainDate) => {
      if (onChange) {
        onChange(date.toString());
      }
    },
    [onChange],
  );

  const isPrevButtonDisabled = minDate
    ? calendar.yearMonth.equals(minDate)
    : false;
  const isNextButtonDisabled = maxDate
    ? calendar.yearMonth.equals(maxDate)
    : false;

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    if (!isSufficientlyLabelled(prevMonthButtonLabel)) {
      throw new AccessibilityError(
        'Calendar',
        'The `prevMonthButtonLabel` prop is missing or invalid.',
      );
    }
    if (!isSufficientlyLabelled(nextMonthButtonLabel)) {
      throw new AccessibilityError(
        'Calendar',
        'The `nextMonthButtonLabel` prop is missing or invalid.',
      );
    }
  }

  return (
    <div ref={ref} role="group">
      <div className={styles.header}>
        <IconButton
          icon={ArrowLeft}
          size="s"
          variant="tertiary"
          disabled={isPrevButtonDisabled}
          onClick={() => {
            dispatch({ type: 'prev-month' });
          }}
        >
          {prevMonthButtonLabel}
        </IconButton>
        <Headline
          as="h2"
          size="four"
          id={headlineId}
          aria-live="polite"
          aria-atomic="true"
        >
          {headline}
        </Headline>
        <IconButton
          icon={ArrowRight}
          size="s"
          variant="tertiary"
          disabled={isNextButtonDisabled}
          onClick={() => {
            dispatch({ type: 'next-month' });
          }}
        >
          {nextMonthButtonLabel}
        </IconButton>
      </div>
      <Month
        {...calendar}
        weekdays={weekdays}
        selectedDate={selectedDate}
        minDate={minDate}
        maxDate={maxDate}
        firstDayOfWeek={firstDayOfWeek}
        aria-labelledby={headlineId}
        onFocusDate={handleFocusDate}
        onSelectDate={handleSelectDate}
      />
    </div>
  );
}

interface SharedProps {
  today: Temporal.PlainDate;
  onFocusDate: (date: Temporal.PlainDate) => void;
  onSelectDate: (date: Temporal.PlainDate) => void;
  focusedDate: Temporal.PlainDate;
  selectedDate: Temporal.PlainDate | null;
  minDate: Temporal.PlainDate | null;
  maxDate: Temporal.PlainDate | null;
  firstDayOfWeek: FirstDayOfWeek;
}

interface MonthProps extends SharedProps, HTMLAttributes<HTMLTableElement> {
  yearMonth: Temporal.PlainYearMonth;
  weekdays: Weekdays;
  // TODO: Better name?
  showOutsideDays?: boolean;
}

function Month({
  yearMonth,
  today,
  onFocusDate,
  focusedDate,
  onSelectDate,
  selectedDate,
  minDate,
  maxDate,
  weekdays,
  showOutsideDays = true,
  firstDayOfWeek,
  className,
  ...props
}: MonthProps) {
  const weeks = getViewOfMonth(yearMonth, firstDayOfWeek);
  return (
    <table {...props} className={clsx(className, styles.table)} role="grid">
      <thead>
        <tr>
          {weekdays.map((weekday) => (
            <th key={weekday.long} scope="col">
              <span className={utilityClasses.hideVisually}>
                {weekday.long}
              </span>
              <Body as="span" size="one" variant="highlight" aria-hidden="true">
                {weekday.narrow}
              </Body>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {weeks.map((week, i) => (
          <tr key={i}>
            {week.map((date) => {
              const isDateOutsideMonth = !yearMonth.equals(date);
              const isDateVisible = isDateOutsideMonth ? showOutsideDays : true;

              return (
                <td key={date.toString()}>
                  {isDateVisible && (
                    <Day
                      today={today}
                      date={date}
                      onFocusDate={onFocusDate}
                      onSelectDate={onSelectDate}
                      focusedDate={focusedDate}
                      selectedDate={selectedDate}
                      minDate={minDate}
                      maxDate={maxDate}
                      firstDayOfWeek={firstDayOfWeek}
                      isOutsideMonth={isDateOutsideMonth}
                    />
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface DayProps extends SharedProps, HTMLAttributes<HTMLButtonElement> {
  date: Temporal.PlainDate;
  isOutsideMonth?: boolean;
}

function Day({
  date,
  today,
  onFocusDate,
  onSelectDate,
  focusedDate,
  selectedDate,
  minDate,
  maxDate,
  firstDayOfWeek,
  isOutsideMonth,
  className,
  ...props
}: DayProps) {
  const isToday = date.equals(today);
  const isSelected = selectedDate && date.equals(selectedDate);
  const isFocused = date.equals(focusedDate);
  const isDisabled =
    (minDate && Temporal.PlainDate.compare(date, minDate) < 0) ||
    (maxDate && Temporal.PlainDate.compare(date, maxDate) > 0);

  const handleClick = (event: MouseEvent) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    } else {
      onSelectDate(date);
    }
    onFocusDate(date);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    let nextFocusedDate: Temporal.PlainDate;

    switch (event.key) {
      case 'ArrowRight':
        nextFocusedDate = focusedDate.add({ days: 1 });
        break;
      case 'ArrowLeft':
        nextFocusedDate = focusedDate.subtract({ days: 1 });
        break;
      case 'ArrowDown':
        nextFocusedDate = focusedDate.add({ days: DAYS_IN_WEEK });
        break;
      case 'ArrowUp':
        nextFocusedDate = focusedDate.subtract({
          days: DAYS_IN_WEEK,
        });
        break;
      case 'PageUp':
        nextFocusedDate = focusedDate.subtract(
          event.shiftKey ? { years: 1 } : { months: 1 },
        );
        break;
      case 'PageDown':
        nextFocusedDate = focusedDate.add(
          event.shiftKey ? { years: 1 } : { months: 1 },
        );
        break;
      case 'Home':
        nextFocusedDate = getFirstDateOfWeek(focusedDate, firstDayOfWeek);
        break;
      case 'End':
        nextFocusedDate = getLastDateOfWeek(focusedDate, firstDayOfWeek);
        break;
      default:
        return;
    }

    onFocusDate(nextFocusedDate);
    event.preventDefault();
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        className,
        styles.day,
        isOutsideMonth && styles.outside,
        utilityClasses.focusVisible,
      )}
      tabIndex={isFocused ? 0 : -1}
      {...(isToday && { 'aria-current': 'date' })}
      {...(isSelected && { 'aria-pressed': 'true' })}
      {...(isDisabled && { 'aria-disabled': 'true' })}
    >
      {date.day}
    </button>
  );
}
