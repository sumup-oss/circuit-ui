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
   * TODO: Write description
   */
  datetime: string;
  /**
   * TODO: Write description
   *
   * @default 'auto'
   */
  variant?: 'auto' | 'relative' | 'absolute';
  /**
   * TODO: Write description
   *
   * @default false
   */
  includeTime?: boolean;
  /**
   * TODO: Write description
   *
   * @default 'P1M' // 1 month
   */
  threshold?: string;
  /**
   * TODO: Write description
   *
   * @default 'short'
   */
  formatStyle?: 'long' | 'short' | 'narrow';
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` in supported environments.
   */
  locale?: Locale;
}

// TODO: initial, server-rendered label should include timezone and respect format style

/**
 * TODO:
 */
export const Timestamp = forwardRef<HTMLTimeElement, TimestampProps>(
  (
    {
      datetime,
      variant = 'auto',
      formatStyle = 'long',
      includeTime = false,
      threshold = 'P1M',
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
          threshold,
          includeTime,
        }),
      );
    }, [datetime, variant, formatStyle, locale, threshold, includeTime]);

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
            threshold,
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
      locale,
      threshold,
      includeTime,
    ]);

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
