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

import { forwardRef, useEffect, useState, type HTMLAttributes } from 'react';
import { Temporal } from 'temporal-polyfill';

import type { Locale } from '../../util/i18n.js';
import { clsx } from '../../styles/clsx.js';

import { getInitialState, getState } from './TimestampService.js';
import classes from './Timestamp.module.css';

export interface TimestampProps extends HTMLAttributes<HTMLTimeElement> {
  /**
   * A datetime in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DDThh:mm:ss.sss[time-zone-id]`). Must include an
   * [IANA time zone identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
   * in brackets.
   */
  datetime: string;
  /**
   * Whether to include the time when displaying the datetime as an absolute
   * value.
   *
   * @default false
   */
  includeTime?: boolean;
  /**
   * The verbosity of the displayed datetime value. Longer formats are easier
   * to read for humans.
   *
   * @default 'short'
   */
  formatStyle?: 'long' | 'short' | 'narrow';
  /**
   * Display the datetime as a relative or absolute value. The auto variant
   * displays a relative value within 30 days of the datetime and an absolute
   * value otherwise.
   *
   * @default 'auto'
   */
  variant?: 'auto' | 'relative' | 'absolute';
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` in supported environments.
   */
  locale?: Locale;
}

/**
 * The Timestamp component displays a human readable date time.
 */
export const Timestamp = forwardRef<HTMLTimeElement, TimestampProps>(
  (
    {
      datetime,
      variant = 'auto',
      formatStyle = 'long',
      includeTime = false,
      locale,
      className,
      ...props
    },
    ref,
  ) => {
    const zonedDateTime = Temporal.ZonedDateTime.from(datetime);
    const [state, setState] = useState(
      getInitialState({ datetime, locale, formatStyle, includeTime }),
    );

    // Update state on props change
    useEffect(() => {
      setState(
        getState({
          datetime,
          locale,
          formatStyle,
          variant,
          includeTime,
        }),
      );
    }, [datetime, variant, formatStyle, locale, includeTime]);

    // Update state in regular intervals for relative times
    useEffect(() => {
      if (!state.interval) {
        return undefined;
      }

      const timer = setInterval(() => {
        setState(
          getState({
            datetime,
            locale,
            formatStyle,
            variant,
            includeTime,
          }),
        );
      }, state.interval);

      return () => {
        clearInterval(timer);
      };
    }, [state.interval, datetime, variant, formatStyle, locale, includeTime]);

    return (
      <time
        ref={ref}
        dateTime={zonedDateTime.toString({ timeZoneName: 'never' })}
        title={zonedDateTime.toLocaleString(locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })}
        className={clsx(className, classes.base)}
        {...props}
      >
        {state.label}
      </time>
    );
  },
);
