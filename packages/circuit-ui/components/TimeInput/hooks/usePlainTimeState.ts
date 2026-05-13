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

import { useCallback, useEffect, useState } from 'react';
import { Temporal } from 'temporal-polyfill';

import {
  getCurrentTime,
  MAX_HOUR,
  MAX_MINUTE,
  MAX_SECOND,
  MIN_HOUR,
  MIN_MINUTE,
  MIN_SECOND,
  toPlainTime,
} from '../../../util/date.js';
import { isNumber } from '../../../util/type-check.js';
import { clamp } from '../../../util/helpers.js';
import type { DateSegmentProps } from '../../DateInput/components/DateSegment.js';

export type TimeValue = number | '';
type TimeValues = {
  hour: TimeValue;
  minute: TimeValue;
  second: TimeValue;
};

type PlainTimeState = {
  time: Temporal.PlainTime | undefined;
  update: (values: Partial<TimeValues>) => void;
  props: {
    hour: Omit<DateSegmentProps, 'focus'>;
    minute: Omit<DateSegmentProps, 'focus'>;
    second: Omit<DateSegmentProps, 'focus'>;
  };
};

// TODO: Differentiate between `h12` and `h23` hour cycles
export function usePlainTimeState({
  value,
  defaultValue,
  onChange,
  minTime,
  maxTime,
  step,
}: {
  value: string | undefined;
  defaultValue: string | undefined;
  onChange: ((time: string) => void) | undefined;
  minTime: Temporal.PlainTime | undefined;
  maxTime: Temporal.PlainTime | undefined;
  step: number;
}): PlainTimeState {
  const [values, setValues] = useState<TimeValues>(
    parseValue(defaultValue || value),
  );

  useEffect(() => {
    if (value) {
      setValues(parseValue(value));
    }
  }, [value]);

  const update = useCallback(
    (newValues: Partial<TimeValues>) => {
      setValues((prevValues) => {
        const hour = clampValue(
          prevValues.hour,
          newValues.hour,
          MIN_HOUR,
          MAX_HOUR,
        );
        const minute = clampValue(
          prevValues.minute,
          newValues.minute,
          MIN_MINUTE,
          MAX_MINUTE,
        );
        const second = clampValue(
          prevValues.second,
          newValues.second,
          MIN_SECOND,
          MAX_SECOND,
        );

        if (onChange) {
          const plainDate = safePlainTime(hour, minute, second);
          onChange(plainDate?.toString() || '');
        }

        return { hour, minute, second };
      });
    },
    [onChange],
  );

  const time = safePlainTime(values.hour, values.minute, values.second);
  const now = getCurrentTime();

  const sameHourLimit = minTime && maxTime && minTime.hour === maxTime.hour;
  const sameMinuteLimit = sameHourLimit && minTime.minute === maxTime.minute;
  const currentMinHour = minTime && minTime.hour === values.hour;
  const currentMaxHour = maxTime && maxTime.hour === values.hour;
  const currentMinMinute = currentMinHour && minTime.minute === values.minute;
  const currentMaxMinute = currentMaxHour && maxTime.minute === values.minute;

  const props = {
    hour: {
      value: values.hour,
      defaultValue: now.hour,
      placeholder: 'HH',
      step: Math.max(1, Math.floor(step / 60 / 60)),
      min: minTime ? minTime.hour : MIN_HOUR,
      max: maxTime ? maxTime.hour : MAX_HOUR,
      onChange: (hour: TimeValue) => update({ hour }),
    },
    minute: {
      value: pad(values.minute),
      defaultValue: pad(now.minute),
      placeholder: 'mm',
      step: Math.max(1, Math.floor(step / 60)),
      min: sameHourLimit || currentMinHour ? minTime.minute : MIN_MINUTE,
      max: sameHourLimit || currentMaxHour ? maxTime.minute : MAX_MINUTE,
      onChange: (minute: TimeValue) => update({ minute }),
    },
    second: {
      value: pad(values.second),
      defaultValue: pad(now.second),
      placeholder: 'ss',
      step,
      min: sameMinuteLimit || currentMinMinute ? minTime.second : MIN_SECOND,
      max: sameMinuteLimit || currentMaxMinute ? maxTime.second : MAX_SECOND,
      onChange: (second: TimeValue) => update({ second }),
    },
  };

  return { time, update, props };
}

function parseValue(value?: string): TimeValues {
  const plainTime = toPlainTime(value);
  if (!plainTime) {
    return { hour: '', minute: '', second: '' };
  }
  const { hour, minute, second } = plainTime;
  return { hour, minute, second };
}

function clampValue(
  prevValue: TimeValue,
  newValue: TimeValue | undefined,
  min: number,
  max: number,
) {
  if (newValue === '' || !isNumber(newValue || prevValue)) {
    return '';
  }
  return clamp((newValue || prevValue) as number, min, max);
}

function safePlainTime(
  hour: TimeValue | undefined,
  minute: TimeValue | undefined,
  second: TimeValue | undefined,
) {
  try {
    if (isNumber(hour) && isNumber(minute)) {
      return new Temporal.PlainTime(hour, minute, second ? second : undefined);
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function pad(value: TimeValue) {
  return value ? value.toString().padStart(2, '0') : value;
}
