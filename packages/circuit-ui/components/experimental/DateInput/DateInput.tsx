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
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import { Calendar as CalendarIcon } from '@sumup/icons';
import type { Temporal } from 'temporal-polyfill';
import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { formatDate } from '@sumup/intl';

import dialogPolyfill from '../../../vendor/dialog-polyfill/index.js';
import {
  Input,
  type InputElement,
  type InputProps,
} from '../../Input/index.js';
import { IconButton } from '../../Button/IconButton.js';
import { Calendar, type CalendarProps } from '../../Calendar/Calendar.js';
import { applyMultipleRefs } from '../../../util/refs.js';
import { useMedia } from '../../../hooks/useMedia/useMedia.js';
import { useStackContext } from '../../StackContext/StackContext.js';
import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside.js';
import { useEscapeKey } from '../../../hooks/useEscapeKey/useEscapeKey.js';
import { toPlainDate } from '../../../util/date.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../../util/errors.js';
import { Headline } from '../../Headline/Headline.js';
import { CloseButton } from '../../CloseButton/CloseButton.js';
import { clsx } from '../../../styles/clsx.js';
import { Button } from '../../Button/Button.js';

import classes from './DateInput.module.css';

export interface DateInputProps
  extends Omit<
      InputProps,
      | 'type'
      | 'onChange'
      | 'value'
      | 'defaultValue'
      | 'placeholder'
      | 'as'
      | 'renderSuffix'
    >,
    Pick<
      CalendarProps,
      | 'locale'
      | 'firstDayOfWeek'
      | 'prevMonthButtonLabel'
      | 'nextMonthButtonLabel'
      | 'modifiers'
    > {
  /**
   * Label for the trailing button that opens the calendar dialog.
   */
  openCalendarButtonLabel: string;
  /**
   * Label for the button to close the calendar dialog.
   */
  closeCalendarButtonLabel: string;
  /**
   * Label for the button to apply the selected date and close the calendar dialog.
   */
  applyDateButtonLabel: string;
  /**
   * Label for the button to clear the date value and close the calendar dialog.
   */
  clearDateButtonLabel: string;
  /**
   * The currently selected date in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DD`).
   */
  value?: string;
  /**
   * Callback when the date changes. Called with the date in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DD`) or an empty string.
   *
   * @example '2024-10-08'
   */
  onChange: (date: string) => void;
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
}

/**
 * DateInput component for forms.
 * The input value is always a string in the format `YYYY-MM-DD`.
 */
export const DateInput = forwardRef<InputElement, DateInputProps>(
  (
    {
      label,
      value,
      onChange,
      min,
      max,
      locale,
      firstDayOfWeek,
      modifiers,
      openCalendarButtonLabel,
      closeCalendarButtonLabel,
      applyDateButtonLabel,
      clearDateButtonLabel,
      prevMonthButtonLabel,
      nextMonthButtonLabel,
      ...props
    },
    ref,
  ) => {
    const zIndex = useStackContext();
    const isMobile = useMedia('(max-width: 479px)');
    const inputRef = useRef<InputElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const headlineId = useId();
    const [isHydrated, setHydrated] = useState(false);
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState(toPlainDate(value) || undefined);

    // Initially, an `input[type="date"]` element is rendered in case
    // JavaScript isn't available. Once hydrated, the input is progressively
    // enhanced with the custom UI.
    useEffect(() => {
      setHydrated(true);
    }, []);

    useEffect(() => {
      const dialogElement = dialogRef.current;

      if (!dialogElement) {
        return undefined;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore The package is bundled incorrectly
      dialogPolyfill.registerDialog(dialogElement);

      const handleClose = () => {
        setOpen(false);
      };

      dialogElement.addEventListener('close', handleClose);

      return () => {
        dialogElement.addEventListener('close', handleClose);
      };
    }, []);

    const { refs, floatingStyles, update } = useFloating({
      open,
      placement: 'bottom-start',
      middleware: [offset(4), flip(), shift()],
    });

    useEffect(() => {
      /**
       * When we support `ResizeObserver` (https://caniuse.com/resizeobserver),
       * we can look into using Floating UI's `autoUpdate` (but we can't use
       * `whileElementInMounted` because our implementation hides the floating
       * element using CSS instead of using conditional rendering.
       * See https://floating-ui.com/docs/react-dom#updating
       */
      if (open) {
        update();
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update);
      } else {
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update);
      }
      return () => {
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update);
      };
    }, [open, update]);

    const closeCalendar = useCallback(() => {
      dialogRef.current?.close();
    }, []);

    useClickOutside(refs.floating, closeCalendar, open);
    useEscapeKey(closeCalendar, open);

    const placeholder = 'yyyy-mm-dd';

    const handleSelect = (date: Temporal.PlainDate) => {
      setSelection(date);

      if (!isMobile) {
        onChange(date.toString());
        closeCalendar();
      }
    };

    const handleApply = () => {
      onChange(selection?.toString() || '');
      closeCalendar();
    };

    const handleClear = () => {
      onChange('');
      closeCalendar();
    };

    const handleInputChange = (event: ChangeEvent<InputElement>) => {
      onChange(event.target.value);
    };

    const openCalendar = () => {
      if (dialogRef.current) {
        dialogRef.current.show();
        setOpen(true);
      }
    };

    const mobileStyles = {
      position: 'fixed',
      bottom: '0px',
      left: '0px',
      right: '0px',
    } as const;

    const dialogStyles = isMobile ? mobileStyles : floatingStyles;

    if (process.env.NODE_ENV !== 'production') {
      if (!isSufficientlyLabelled(openCalendarButtonLabel)) {
        throw new AccessibilityError(
          'DateInput',
          'The `openCalendarButtonLabel` prop is missing or invalid.',
        );
      }
      if (!isSufficientlyLabelled(closeCalendarButtonLabel)) {
        throw new AccessibilityError(
          'DateInput',
          'The `closeCalendarButtonLabel` prop is missing or invalid.',
        );
      }
      if (!isSufficientlyLabelled(applyDateButtonLabel)) {
        throw new AccessibilityError(
          'DateInput',
          'The `applyDateButtonLabel` prop is missing or invalid.',
        );
      }
      if (!isSufficientlyLabelled(clearDateButtonLabel)) {
        throw new AccessibilityError(
          'DateInput',
          'The `clearDateButtonLabel` prop is missing or invalid.',
        );
      }
    }

    const calendarButtonLabel = value
      ? [
          openCalendarButtonLabel,
          // FIXME: Don't error on incomplete date
          formatDate(new Date(value), locale, 'long'),
        ].join(', ')
      : openCalendarButtonLabel;

    return (
      <div>
        <Input
          {...props}
          ref={applyMultipleRefs(ref, inputRef, refs.setReference)}
          label={label}
          value={value}
          type={isHydrated ? 'text' : 'date'}
          min={min}
          max={max}
          placeholder={placeholder}
          renderSuffix={
            isHydrated
              ? (suffixProps) => (
                  <IconButton
                    {...suffixProps}
                    icon={CalendarIcon}
                    variant="secondary"
                    onClick={openCalendar}
                    className={clsx(
                      suffixProps.className,
                      classes['calendar-button'],
                    )}
                  >
                    {calendarButtonLabel}
                  </IconButton>
                )
              : undefined
          }
          onChange={handleInputChange}
        />
        <dialog
          ref={applyMultipleRefs<HTMLDialogElement>(
            dialogRef,
            refs.setFloating,
          )}
          aria-labelledby={headlineId}
          className={classes.dialog}
          style={{
            ...dialogStyles,
            // @ts-expect-error z-index can be a string
            zIndex: zIndex || 'var(--cui-z-index-modal)',
          }}
        >
          <div className={classes.content}>
            <header className={classes.header}>
              <Headline as="h2" size="three" id={headlineId}>
                {label}
              </Headline>
              <CloseButton size="s" variant="tertiary" onClick={closeCalendar}>
                {closeCalendarButtonLabel}
              </CloseButton>
            </header>

            <Calendar
              ref={calendarRef}
              className={classes.calendar}
              onSelect={handleSelect}
              selection={selection}
              minDate={toPlainDate(min) || undefined}
              maxDate={toPlainDate(max) || undefined}
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              modifiers={modifiers}
              prevMonthButtonLabel={prevMonthButtonLabel}
              nextMonthButtonLabel={nextMonthButtonLabel}
            />

            <div className={classes.buttons}>
              <Button variant="tertiary" onClick={handleClear}>
                {clearDateButtonLabel}
              </Button>
              <Button
                variant="primary"
                onClick={handleApply}
                className={classes.apply}
              >
                {applyDateButtonLabel}
              </Button>
            </div>
          </div>
        </dialog>
        <div
          className={classes.backdrop}
          style={{
            // @ts-expect-error z-index can be a string
            zIndex: `calc(${zIndex?.toString() || 'var(--cui-z-index-modal)'} - 1)`,
          }}
        />
      </div>
    );
  },
);

DateInput.displayName = 'DateInput';
