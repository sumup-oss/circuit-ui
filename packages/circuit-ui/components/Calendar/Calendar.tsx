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
import { formatDateTime } from '@sumup/intl';
import { ArrowLeft, ArrowRight } from '@sumup/icons';

import utilityClasses from '../../styles/utility.js';
import { getBrowserLocale, type Locale } from '../../util/i18n.js';
import { IconButton } from '../Button/IconButton.js';
import { Headline } from '../Headline/Headline.js';
import { Body } from '../Body/Body.js';
import { clsx } from '../../styles/clsx.js';
import {
  getFirstDateOfWeek,
  getLastDateOfWeek,
  yearMonthToDate,
  type FirstDayOfWeek,
} from '../../util/date.js';
import {
  AccessibilityError,
  CircuitError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { applyMultipleRefs } from '../../util/refs.js';

import {
  calendarReducer,
  getViewOfMonth,
  getWeekdays,
  initCalendar,
} from './CalendarService.js';
import classes from './Calendar.module.css';

type DateModifiers = {
  disabled?: boolean;
  description?: string;
};

interface SharedProps {
  /**
   * The currently selected date.
   */
  selection?: Temporal.PlainDate;
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
   * A callback that is called when a user selects a date.
   */
  onSelect?: (date: Temporal.PlainDate) => void;
  /**
   * A callback that is called with the visible month on the initial render and
   * whenever a user navigates to a different month.
   */
  onMonthChange?: (date: Temporal.PlainYearMonth) => void;
  /**
   * Text label for the button to navigate to the previous month.
   */
  prevMonthButtonLabel: string;
  /**
   * Text label for the button to navigate to the next month.
   */
  nextMonthButtonLabel: string;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      selection,
      onSelect,
      onMonthChange,
      minDate,
      maxDate,
      firstDayOfWeek = 1,
      locale = getBrowserLocale(),
      prevMonthButtonLabel,
      nextMonthButtonLabel,
      modifiers,
      ...props
    },
    ref,
  ) => {
    const [{ yearMonth, focusedDate, today }, dispatch] = useReducer(
      calendarReducer,
      { selection, minDate, maxDate },
      initCalendar,
    );

    useEffect(() => {
      onMonthChange?.(yearMonth);
    }, [onMonthChange, yearMonth]);

    const calendarRef = useRef<HTMLDivElement>(null);
    const headlineId = useId();
    const headline = formatDateTime(yearMonthToDate(yearMonth), locale, {
      year: 'numeric',
      month: 'long',
    });

    const handleFocusDate = useCallback(
      (date: Temporal.PlainDate) => {
        dispatch({ type: 'focus-date', date });
        // Focus the button on the next tick after React has rerendered the UI
        window.requestAnimationFrame(() => {
          calendarRef.current
            ?.querySelector<HTMLButtonElement>('button[tabindex="0"]')
            ?.focus();
        });
      },
      [dispatch],
    );

    const handleSelectDate = useCallback(
      (date: Temporal.PlainDate) => {
        onSelect?.(date);
      },
      [onSelect],
    );

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
        handleFocusDate(nextFocusedDate);
      },
      [handleFocusDate, focusedDate, firstDayOfWeek],
    );

    const isPrevButtonDisabled = minDate ? yearMonth.equals(minDate) : false;
    const isNextButtonDisabled = maxDate ? yearMonth.equals(maxDate) : false;

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
          } catch (error) {
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
          yearMonth={yearMonth}
          selection={selection}
          focusedDate={focusedDate}
          minDate={minDate}
          maxDate={maxDate}
          today={today}
          firstDayOfWeek={firstDayOfWeek}
          locale={locale}
          aria-labelledby={headlineId}
          modifiers={modifiers}
          onFocusDate={handleFocusDate}
          onSelectDate={handleSelectDate}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  },
);

Calendar.displayName = 'Calendar';

interface MonthProps extends SharedProps, HTMLAttributes<HTMLTableElement> {
  yearMonth: Temporal.PlainYearMonth;
  today: Temporal.PlainDate;
  onFocusDate: (date: Temporal.PlainDate) => void;
  onSelectDate: (date: Temporal.PlainDate) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  focusedDate: Temporal.PlainDate;
}

function Month({
  yearMonth,
  selection,
  focusedDate,
  minDate,
  maxDate,
  today,
  modifiers = {},
  onFocusDate,
  onSelectDate,
  onKeyDown,
  firstDayOfWeek = 1,
  locale,
  className,
  ...props
}: MonthProps) {
  const daysInWeek = 7;
  const descriptionIds = useId();
  const weeks = useMemo(
    () => getViewOfMonth(yearMonth, firstDayOfWeek, daysInWeek),
    [yearMonth, firstDayOfWeek],
  );
  const weekdays = useMemo(
    () => getWeekdays(firstDayOfWeek, daysInWeek, locale),
    [firstDayOfWeek, locale],
  );
  return (
    <table {...props} className={clsx(className, classes.table)} role="grid">
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
              const isoDate = date.toString();
              const descriptionId = `${descriptionIds}-${isoDate}`;
              const isOutsideMonth = !yearMonth.equals(date);

              if (isOutsideMonth) {
                return <td key={isoDate}></td>;
              }

              const { disabled, description } = modifiers[isoDate] || {};
              const isToday = date.equals(today);
              const isActive = selection && date.equals(selection);
              const isFocused = date.equals(focusedDate);
              const isDisabled =
                disabled ||
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

              return (
                <td key={isoDate}>
                  <button
                    data-date={isoDate}
                    onClick={handleClick}
                    onKeyDown={onKeyDown}
                    className={clsx(
                      className,
                      classes.day,
                      utilityClasses.focusVisible,
                    )}
                    tabIndex={isFocused ? 0 : -1}
                    {...(isToday && { 'aria-current': 'date' })}
                    {...(isActive && { 'aria-pressed': 'true' })}
                    {...(isDisabled && { 'aria-disabled': 'true' })}
                    {...(description && { 'aria-describedby': descriptionId })}
                  >
                    {date.day}
                  </button>
                  {description && (
                    <span
                      id={descriptionId}
                      className={clsx(utilityClasses.hideVisually)}
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
  );
}