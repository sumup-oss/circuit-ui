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

import { Temporal } from 'temporal-polyfill';
import {
  formatDateTime,
  formatRelativeTime,
  isRelativeTimeFormatSupported,
} from '@sumup-oss/intl';

import type { Locale } from '../../util/i18n.js';

const DATE_STYLE_MAP = {
  long: 'long',
  short: 'medium',
  narrow: 'short',
} satisfies Record<string, Intl.DateTimeFormatOptions['dateStyle']>;

const TIME_STYLE = 'short' satisfies Intl.DateTimeFormatOptions['timeStyle'];

const UNITS = [
  {
    name: 'years',
    duration: Temporal.Duration.from('P1Y'),
    interval: 300000, // 5 minutes
  },
  {
    name: 'months',
    duration: Temporal.Duration.from('P1M'),
    interval: 300000, // 5 minutes
  },
  {
    name: 'weeks',
    duration: Temporal.Duration.from('P1W'),
    interval: 300000, // 5 minutes
  },
  {
    name: 'days',
    duration: Temporal.Duration.from('P1D'),
    interval: 300000, // 5 minutes
  },
  {
    name: 'hours',
    duration: Temporal.Duration.from('PT1H'),
    interval: 60000, // 1 minute
  },
  {
    name: 'minutes',
    duration: Temporal.Duration.from('PT1M'),
    interval: 5000, // 5 seconds
  },
  {
    name: 'seconds',
    duration: Temporal.Duration.from('PT1S'),
    interval: 1000, // 1 second
  },
] satisfies {
  name: Temporal.SmallestUnit<Temporal.DateTimeUnit>;
  duration: Temporal.Duration;
  interval: number; // in milliseconds
}[];

export type State = {
  label: string;
  interval: number | null;
};

export function getInitialState({
  datetime,
  locale,
  formatStyle,
  includeTime,
}: {
  datetime: string;
  locale: Locale | undefined;
  formatStyle: 'long' | 'short' | 'narrow';
  includeTime: boolean;
}): State {
  const zonedDateTime = Temporal.ZonedDateTime.from(datetime);
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: DATE_STYLE_MAP[formatStyle],
  };
  if (includeTime) {
    options.timeStyle = TIME_STYLE;
  }
  return {
    label: formatDateTime(zonedDateTime.toPlainDateTime(), locale, options),
    interval: null,
  };
}

export function getState({
  datetime,
  locale,
  formatStyle,
  variant,
  threshold,
  includeTime,
}: {
  datetime: string;
  locale: Locale | undefined;
  formatStyle: 'long' | 'short' | 'narrow';
  variant: 'auto' | 'relative' | 'absolute';
  threshold: string;
  includeTime: boolean;
}): State {
  const zonedDateTime = Temporal.ZonedDateTime.from(datetime);
  const now = Temporal.Now.zonedDateTimeISO();
  const duration = zonedDateTime.since(now);

  const isBeyondThreshold =
    Temporal.Duration.compare(
      duration.abs(),
      Temporal.Duration.from(threshold),
      { relativeTo: now },
    ) > 0;

  if (
    variant === 'absolute' ||
    (variant === 'auto' && isBeyondThreshold) ||
    !isRelativeTimeFormatSupported
  ) {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: DATE_STYLE_MAP[formatStyle],
    };
    if (includeTime) {
      options.timeStyle = TIME_STYLE;
    }
    return {
      label: formatDateTime(zonedDateTime.toPlainDateTime(), locale, options),
      interval: null,
    };
  }

  const bestUnitIndex = UNITS.findIndex(
    (unit) =>
      Temporal.Duration.compare(duration.abs(), unit.duration, {
        relativeTo: now,
      }) >= 0,
  );
  // Use 'seconds' when no unit was found, i.e. when the duration is less than a second
  const unitIndex = bestUnitIndex >= 0 ? bestUnitIndex : UNITS.length - 1;
  const unit = UNITS[unitIndex];
  const value = duration.round({
    smallestUnit: unit.name,
    relativeTo: now,
  })[unit.name];
  const options = { style: formatStyle };

  return {
    label: formatRelativeTime(value, unit.name, locale, options),
    interval: unit.interval,
  };
}
