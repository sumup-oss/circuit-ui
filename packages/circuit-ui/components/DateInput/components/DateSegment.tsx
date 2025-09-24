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
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';

import {
  isArrowLeft,
  isArrowRight,
  isBackspace,
  isDelete,
} from '../../../util/key-codes.js';
import { isNumber } from '../../../util/type-check.js';
import { shiftInRange } from '../../../util/helpers.js';
import type { DateValue } from '../hooks/usePlainDateState.js';
import type { SegmentFocus } from '../hooks/useSegmentFocus.js';

import classes from './DateSegment.module.css';

export interface DateSegmentProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'placeholder' | 'value' | 'defaultValue' | 'min' | 'max' | 'onChange'
  > {
  placeholder: string;
  value: DateValue;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: DateValue) => void;
  invalid?: boolean;
  hasWarning?: boolean;
  showValid?: boolean;
  readOnly?: boolean;
  focus: SegmentFocus;
}

export function DateSegment({
  onChange,
  invalid,
  focus,
  defaultValue,
  min,
  max,
  step,
  ...props
}: DateSegmentProps) {
  const sizeRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState('4ch');

  // biome-ignore lint/correctness/useExhaustiveDependencies: The width needs to be recalculated when the value changes
  useLayoutEffect(() => {
    function calculateWidth(attempt = 1) {
      if (sizeRef.current) {
        const cursorWidth = 1;
        const elementSize = sizeRef.current.getBoundingClientRect();
        const elementWidth = Math.ceil(elementSize.width);

        // The element width can be 0 if a parent element isn't rendered to the DOM (yet)
        if (elementWidth > 0) {
          setWidth(`${cursorWidth + elementWidth}px`);
          return undefined;
        }
      }

      // Try again on the next tick up to 5 times
      if (attempt <= 5) {
        const timerId = setTimeout(() => {
          calculateWidth(attempt + 1);
        }, 1);
        return () => {
          clearTimeout(timerId);
        };
      }

      return undefined;
    }

    return calculateWidth();
  }, [props.value]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const { selectionStart, selectionEnd } = input;

    // Move between segments using arrow keys, but don't interfere with text cursor movement
    if (selectionStart === selectionEnd) {
      // Move to the previous segment when the cursor is at the start of the input
      if (isArrowLeft(event) && (input.readOnly || selectionStart === 0)) {
        event.preventDefault();
        focus.previous();
        return;
      }

      // Move to the next segment when the cursor is at the end of the input
      if (
        isArrowRight(event) &&
        (input.readOnly || selectionEnd === input.value.length)
      ) {
        event.preventDefault();
        focus.next();
        return;
      }
    }

    // Focus the following segment after clearing the current one
    if (!input.value) {
      if (isBackspace(event)) {
        event.preventDefault();
        focus.previous();
        return;
      }

      if (isDelete(event)) {
        event.preventDefault();
        focus.next();
        return;
      }
    }

    // Don't allow editing the value when the input is disabled or read-only
    if (input.disabled || input.readOnly) {
      return;
    }

    const value = Number.parseInt(input.value, 10);
    let newValue: number;

    const getValue = (offset: number) =>
      value ? shiftInRange(value, offset, min, max) : defaultValue;

    switch (event.key) {
      case 'ArrowUp':
        newValue = getValue(1);
        break;
      case 'ArrowDown':
        newValue = getValue(-1);
        break;
      case 'PageUp':
        newValue = getValue(step);
        break;
      case 'PageDown':
        newValue = getValue(-1 * step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    if (isNumber(newValue)) {
      event.preventDefault();
      onChange(newValue);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.currentTarget.value, 10);

    onChange(value || '');

    // Focus the next segment if typing any other digit would exceed the
    // maximum value
    if (value && value > Math.floor(max / 10)) {
      focus.next();
    }
  };

  return (
    <>
      <input
        type="text"
        inputMode="numeric"
        autoCorrect="false"
        enterKeyHint="next"
        spellCheck="false"
        role="spinbutton"
        aria-valuenow={props.value || undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-invalid={invalid}
        className={classes.base}
        style={{ ...props.style, '--width': width }}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        {...focus.props}
        {...props}
      />
      <span ref={sizeRef} className={classes.size} aria-hidden="true">
        {props.value || props.placeholder}
      </span>
    </>
  );
}
