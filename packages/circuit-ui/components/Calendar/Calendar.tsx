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
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { Temporal } from 'temporal-polyfill';
import { ArrowLeft, ArrowRight } from '@sumup-oss/icons';

import { utilClasses } from '../../styles/utility';
import { getBrowserLocale, type Locale } from '../../util/i18n';
import { IconButton } from '../Button/IconButton';
import { Headline } from '../Headline/Headline';
import { clsx } from '../../styles/clsx';
import {
  getFirstDateOfWeek,
  getLastDateOfWeek,
  type FirstDayOfWeek,
  type PlainDateRange,
} from '../../util/date';
import {
  AccessibilityError,
  CircuitError,
  isSufficientlyLabelled,
} from '../../util/errors';
import { applyMultipleRefs } from '../../util/refs';
import { useSwipe } from '../../hooks/useSwipe/useSwipe';
import { last } from '../../util/helpers';

import {
  CalendarActionType,
  calendarReducer,
  getMonthHeadline,
  getSelectionType,
  getViewOfMonth,
  getWeekdays,
  initCalendar,
  isDateActive,
  isDateInMonthRange,
} from './CalendarService';
import classes from './Calendar.module.css';

type DateModifiers = {
  disabled?: boolean;
  description?: string;
};

interface SharedProps {
  /**
   * The currently selected date.
   */
  selection?: Temporal.PlainDate | PlainDateRange;
  /**
   * A callback that is called when a user selects a date.
   */
  onSelect?: (date: Temporal.PlainDate) => void;
  /**
   * The minimum selectable date (inclusive).
   */
  minDate?: Temporal.PlainDate;
  /**
   * The maximum selectable date (inclusive).
   */
  maxDate?: Temporal.PlainDate;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` in supported environments.
   */
  locale?: Locale;
  /**
   * The identifier for the used [calendar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendar). Default: `iso8601`.
   */
  calendar?: 'iso8601' | 'gregory';
  /**
   * An integer indicating the first day of the week. Can be either `1` (Monday)
   * or `7` (Sunday). Default: `1`.
   */
  firstDayOfWeek?: FirstDayOfWeek;
  /**
   * A map of dates and their modifiers, which can be used to disable or add a
   * description to a specific date. The date key must be in the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format (`YYYY-MM-DD`).
   *
   * @example
   * {
   *   '2020-03-15': { disabled: true },
   *   '2020-03-20': { description: 'Booked' },
   * }
   */
  modifiers?: Record<string, DateModifiers>;
}

export interface CalendarProps
  extends SharedProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * A callback that is called with the visible months on the initial render and
   * whenever a user navigates to different months.
   */
  onMonthsChange?: (months: Temporal.PlainYearMonth[]) => void;
  /**
   * Text label for the button to navigate to the previous month.
   */
  prevMonthButtonLabel: string;
  /**
   * Text label for the button to navigate to the next month.
   */
  nextMonthButtonLabel: string;
  /**
   * The number of months to display at a time. Default: `1`.
   */
  numberOfMonths?: number;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      selection,
      onSelect,
      onMonthsChange,
      minDate,
      maxDate,
      firstDayOfWeek = 1,
      locale = getBrowserLocale(),
      prevMonthButtonLabel,
      nextMonthButtonLabel,
      modifiers,
      numberOfMonths = 1,
      calendar = 'iso8601',
      ...props
    },
    ref,
  ) => {
    const [{ months, focusedDate, hoveredDate, today }, dispatch] = useReducer(
      calendarReducer,
      { selection, minDate, maxDate, numberOfMonths },
      initCalendar,
    );

    useEffect(() => {
      onMonthsChange?.(months);
    }, [onMonthsChange, months]);

    useEffect(() => {
      dispatch({ type: CalendarActionType.NUMBER_OF_MONTHS, numberOfMonths });
    }, [numberOfMonths]);

    const calendarRef = useRef<HTMLDivElement>(null);

    const { daysInWeek } = focusedDate;

    const isPrevMonthDisabled = minDate
      ? Temporal.PlainYearMonth.compare(months[0], minDate) <= 0
      : false;
    const isNextMonthDisabled = maxDate
      ? Temporal.PlainYearMonth.compare(last(months), maxDate) >= 0
      : false;

    const touchHandlers = useSwipe((direction) => {
      if (direction === 'right' && !isPrevMonthDisabled) {
        dispatch({ type: CalendarActionType.PREV_MONTH });
      }
      if (direction === 'left' && !isNextMonthDisabled) {
        dispatch({ type: CalendarActionType.NEXT_MONTH });
      }
    });

    const handleFocusDate = useCallback((date: Temporal.PlainDate) => {
      dispatch({ type: CalendarActionType.FOCUS_DATE, date });
      // Focus the button on the next tick after React has rerendered the UI
      window.requestAnimationFrame(() => {
        calendarRef.current
          ?.querySelector<HTMLButtonElement>('button[tabindex="0"]')
          ?.focus();
      });
    }, []);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        let nextFocusedDate: Temporal.PlainDate;

        switch (event.key) {
          case 'ArrowRight':
            nextFocusedDate = focusedDate.add({ days: 1 });
            break;
          case 'ArrowLeft':
            nextFocusedDate = focusedDate.subtract({ days: 1 });
            break;
          case 'ArrowDown':
            nextFocusedDate = focusedDate.add({ days: focusedDate.daysInWeek });
            break;
          case 'ArrowUp':
            nextFocusedDate = focusedDate.subtract({
              days: focusedDate.daysInWeek,
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

        event.preventDefault();

        if (isDateInMonthRange(nextFocusedDate, minDate, maxDate)) {
          handleFocusDate(nextFocusedDate);
        }
      },
      [handleFocusDate, focusedDate, minDate, maxDate, firstDayOfWeek],
    );

    const handleMouseEnter = useCallback((date: Temporal.PlainDate) => {
      dispatch({ type: CalendarActionType.MOUSE_ENTER_DATE, date });
    }, []);
    const handleMouseLeave = useCallback(() => {
      dispatch({ type: CalendarActionType.MOUSE_LEAVE_DATE });
    }, []);

    if (process.env.NODE_ENV !== 'production') {
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
      if (modifiers) {
        Object.keys(modifiers).forEach((key) => {
          try {
            Temporal.PlainDate.from(key);
          } catch (_error) {
            throw new CircuitError(
              'Calendar',
              `The "${key}" key of the \`modifiers\` prop is not a valid ISO 8601 date string.`,
            );
          }
        });
      }
    }

    return (
      <div ref={applyMultipleRefs(ref, calendarRef)} role="group" {...props}>
        <div className={classes.header}>
          <div className={classes.prev}>
            <IconButton
              icon={ArrowLeft}
              size="s"
              variant="tertiary"
              disabled={isPrevMonthDisabled}
              onClick={() => {
                dispatch({ type: CalendarActionType.PREV_MONTH });
              }}
            >
              {prevMonthButtonLabel}
            </IconButton>
          </div>
          <div className={classes.next}>
            <IconButton
              icon={ArrowRight}
              size="s"
              variant="tertiary"
              disabled={isNextMonthDisabled}
              onClick={() => {
                dispatch({ type: CalendarActionType.NEXT_MONTH });
              }}
            >
              {nextMonthButtonLabel}
            </IconButton>
          </div>
        </div>
        <div className={classes.months}>
          {months.map((month) => (
            <Month
              key={month.toString()}
              yearMonth={month}
              selection={selection}
              focusedDate={focusedDate}
              hoveredDate={hoveredDate}
              minDate={minDate}
              maxDate={maxDate}
              today={today}
              firstDayOfWeek={firstDayOfWeek}
              daysInWeek={daysInWeek}
              locale={locale}
              calendar={calendar}
              modifiers={modifiers}
              onFocus={handleFocusDate}
              onSelect={onSelect}
              onKeyDown={handleKeyDown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              {...touchHandlers}
            />
          ))}
        </div>
      </div>
    );
  },
);

Calendar.displayName = 'Calendar';

interface MonthProps extends SharedProps {
  yearMonth: Temporal.PlainYearMonth;
  today: Temporal.PlainDate;
  onFocus: (date: Temporal.PlainDate) => void;
  onMouseEnter: (date: Temporal.PlainDate) => void;
  onMouseLeave: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
  focusedDate: Temporal.PlainDate;
  hoveredDate: Temporal.PlainDate | null;
  daysInWeek: number;
}

function Month({
  yearMonth,
  selection,
  focusedDate,
  hoveredDate,
  minDate,
  maxDate,
  today,
  modifiers = {},
  onFocus,
  onSelect,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  firstDayOfWeek = 1,
  daysInWeek,
  locale,
  calendar,
}: MonthProps) {
  const descriptionIds = useId();
  const headlineId = useId();
  const headline = useMemo(
    () => getMonthHeadline(yearMonth, locale, calendar),
    [yearMonth, locale, calendar],
  );
  const weekdays = useMemo(
    () => getWeekdays(firstDayOfWeek, daysInWeek, locale, calendar),
    [firstDayOfWeek, daysInWeek, locale, calendar],
  );
  const weeks = useMemo(
    () => getViewOfMonth(yearMonth, firstDayOfWeek, daysInWeek),
    [yearMonth, firstDayOfWeek, daysInWeek],
  );
  return (
    <div
      className={classes.month}
      style={{ '--calendar-days-in-week': daysInWeek }}
    >
      <Headline
        as="h2"
        size="s"
        id={headlineId}
        aria-live="polite"
        aria-atomic="true"
        className={classes.headline}
      >
        {headline}
      </Headline>
      <table role="grid" className={classes.grid}>
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday.long} scope="col">
                <span className={utilClasses.hideVisually}>{weekday.long}</span>
                <span aria-hidden="true" className={classes.weekday}>
                  {weekday.narrow}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {weeks.map((week) => (
            <tr key={week.toString()}>
              {week.map((date) => {
                const isoDate = date.toString();
                const descriptionId = `${descriptionIds}-${isoDate}`;
                const isOutsideMonth = !yearMonth.equals(date);

                if (isOutsideMonth) {
                  return <td key={isoDate} />;
                }

                const { disabled, description } = modifiers[isoDate] || {};
                const isActive = isDateActive(date, selection);
                const isToday = date.equals(today);
                const isFirstDay = date.day === 1;
                const isLastDay = date.day === date.daysInMonth;
                const isFocused = date.equals(focusedDate);
                const isDisabled =
                  disabled ||
                  (minDate && Temporal.PlainDate.compare(date, minDate) < 0) ||
                  (maxDate && Temporal.PlainDate.compare(date, maxDate) > 0);
                const selectionType = getSelectionType(
                  date,
                  hoveredDate,
                  selection,
                );

                const handleClick = (event: MouseEvent) => {
                  if (isDisabled) {
                    event.preventDefault();
                    event.stopPropagation();
                    event.nativeEvent.stopImmediatePropagation();
                  } else {
                    onSelect?.(date);
                  }
                  onFocus(date);
                };

                const handleMouseEnter = () => {
                  if (!isDisabled) {
                    onMouseEnter(date);
                  }
                };

                return (
                  <td key={isoDate}>
                    <button
                      data-date={isoDate}
                      onClick={handleClick}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={onMouseLeave}
                      onKeyDown={onKeyDown}
                      className={clsx(
                        classes.day,
                        selectionType && classes[selectionType],
                        isFirstDay && classes['first-day'],
                        isLastDay && classes['last-day'],
                        utilClasses.focusVisible,
                      )}
                      tabIndex={isFocused ? 0 : -1}
                      {...(isToday && { 'aria-current': 'date' })}
                      {...(isActive && { 'aria-pressed': 'true' })}
                      {...(isDisabled && { 'aria-disabled': 'true' })}
                      {...(description && {
                        'aria-describedby': descriptionId,
                      })}
                    >
                      {date.day}
                    </button>
                    {description && (
                      <span
                        id={descriptionId}
                        className={clsx(utilClasses.hideVisually)}
                      >
                        {description}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
