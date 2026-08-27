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

import { useEffect, useState, type HTMLAttributes, type Ref } from 'react';
import { Temporal } from 'temporal-polyfill';

import type { Locale } from '../../util/i18n.js';
import { clsx } from '../../styles/clsx.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import { CircuitError } from '../../util/errors.js';

import { getInitialState, getState } from './TimestampService.js';
import classes from './Timestamp.module.css';

export interface TimestampProps extends HTMLAttributes<HTMLTimeElement> {
  ref?: Ref<HTMLTimeElement>;
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
   */
  formattingLocale?: Locale;
}

/**
 * The Timestamp component displays a human readable date time.
 */
export function Timestamp({
  datetime,
  variant = 'auto',
  formatStyle = 'long',
  includeTime = false,
  formattingLocale: customFormattingLocale,
  className,
  ...props
}: TimestampProps) {
  if (process.env.NODE_ENV !== 'production' && 'locale' in props) {
    throw new CircuitError(
      'Timestamp',
      'The `locale` prop has been removed. Use the `I18nProvider` component or the `formattingLocale` prop instead.',
    );
  }

  const { formattingLocale } = useI18n({
    formattingLocale: customFormattingLocale,
  });
  const zonedDateTime = Temporal.ZonedDateTime.from(datetime);
  const [state, setState] = useState(
    getInitialState({ datetime, formattingLocale, formatStyle, includeTime }),
  );

  // Update state on props change
  useEffect(() => {
    setState(
      getState({
        datetime,
        formattingLocale,
        formatStyle,
        variant,
        includeTime,
      }),
    );
  }, [datetime, variant, formatStyle, formattingLocale, includeTime]);

  // Update state in regular intervals for relative times
  useEffect(() => {
    if (!state.interval) {
      return undefined;
    }

    const timer = setInterval(() => {
      setState(
        getState({
          datetime,
          formattingLocale,
          formatStyle,
          variant,
          includeTime,
        }),
      );
    }, state.interval);

    return () => {
      clearInterval(timer);
    };
  }, [
    state.interval,
    datetime,
    variant,
    formatStyle,
    formattingLocale,
    includeTime,
  ]);

  return (
    <time
      dateTime={zonedDateTime.toString({ timeZoneName: 'never' })}
      title={zonedDateTime.toLocaleString(formattingLocale, {
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
}
