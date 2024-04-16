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
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  type RefObject,
  type PropsWithChildren,
  type ForwardedRef,
} from 'react';
import 'cally';
import type {
  CalendarRangeProps,
  CalendarMonthProps,
  CalendarDateProps,
} from 'cally';

import { Input, type InputProps } from '../Input/Input.js';
import { Card } from '../Card/Card.js';

import styles from './DatePicker.module.css';

type CustomElementAttributes<Props, Element = HTMLElement> = Props &
  React.HTMLAttributes<Element> & {
    className?: never;
    class?: string;
    ref?: ForwardedRef<unknown>;
  };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace React.JSX {
    interface IntrinsicElements {
      'calendar-month': CustomElementAttributes<CalendarMonthProps>;
      'calendar-range': CustomElementAttributes<CalendarRangeProps>;
      'calendar-date': CustomElementAttributes<CalendarDateProps>;
    }
  }
}

function useListener(
  ref: RefObject<HTMLElement>,
  event: string,
  listener?: (e: Event) => void,
) {
  useEffect(() => {
    const { current } = ref;

    if (current && listener) {
      current.addEventListener(event, listener);
      return () => {
        current.removeEventListener(event, listener);
      };
    }
    return undefined;
  }, [ref, event, listener]);
}

function useProperty<Value>(
  ref: RefObject<HTMLElement>,
  prop: string,
  value?: Value,
) {
  useEffect(() => {
    if (ref.current) {
      // @ts-expect-error - TS doesn't know that `prop` is a key
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-param-reassign
      ref.current[prop] = value;
    }
  }, [ref, prop, value]);
}

export const CalendarMonth = forwardRef(
  (props: CalendarMonthProps, forwardedRef) => (
    <calendar-month
      offset={props.offset}
      ref={forwardedRef}
      class={styles.calendar}
    />
  ),
);

export const CalendarRange = forwardRef(
  (
    {
      onChange,
      showOutsideDays,
      firstDayOfWeek,
      isDateDisallowed,
      ...props
    }: PropsWithChildren<CalendarRangeProps>,
    forwardedRef,
  ) => {
    const ref = useRef<HTMLElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current, []);
    useListener(ref, 'change', onChange);
    useProperty(ref, 'isDateDisallowed', isDateDisallowed);

    return (
      <calendar-range
        ref={ref}
        show-outside-days={showOutsideDays || undefined}
        first-day-of-week={firstDayOfWeek}
        {...props}
      />
    );
  },
);

export const CalendarDate = forwardRef(
  (
    {
      onChange,
      showOutsideDays,
      firstDayOfWeek,
      isDateDisallowed,
      ...props
    }: PropsWithChildren<CalendarDateProps>,
    forwardedRef,
  ) => {
    const ref = useRef<HTMLElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current, []);
    useListener(ref, 'change', onChange);
    useProperty(ref, 'isDateDisallowed', isDateDisallowed);

    return (
      <calendar-date
        ref={ref}
        show-outside-days={showOutsideDays ? '' : undefined}
        first-day-of-week={firstDayOfWeek}
        {...props}
      />
    );
  },
);

export interface DatePickerProps
  extends Omit<CalendarDateProps, 'onChange' | 'months'>,
    Omit<InputProps, 'min' | 'max' | 'value'> {}

export function DatePicker({
  value,
  onChange,
  locale,
  showOutsideDays = true,
  firstDayOfWeek,
  isDateDisallowed,
  min,
  max,
  onFocusDay,
  ...inputProps
}: DatePickerProps) {
  return (
    <div>
      <Input value={value} onChange={onChange} {...inputProps} />
      <Card>
        <CalendarDate
          value={value}
          // @ts-expect-error The relevant event properties align
          onChange={onChange}
          locale={locale}
          showOutsideDays={showOutsideDays}
          firstDayOfWeek={firstDayOfWeek}
          isDateDisallowed={isDateDisallowed}
          min={min}
          max={max}
          onFocusDay={onFocusDay}
        >
          <CalendarMonth />
        </CalendarDate>
      </Card>
    </div>
  );
}
