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
import { Temporal } from 'temporal-polyfill';
import dialogPolyfill from 'dialog-polyfill';
import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { formatDate } from '@sumup/intl';

import Input, {
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
  CircuitError,
  isSufficientlyLabelled,
} from '../../../util/errors.js';
import {
  SelectorGroup,
  type SelectorGroupProps,
} from '../../SelectorGroup/SelectorGroup.js';
import { Headline } from '../../Headline/Headline.js';
import { CloseButton } from '../../CloseButton/CloseButton.js';

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
   * TODO:
   */
  openCalendarButtonLabel: string;
  /**
   * TODO:
   */
  closeCalendarButtonLabel: string;
  /**
   * The currently selected date in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DD`).
   */
  value?: string;
  /**
   * TODO:
   *
   * date in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DD`).
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
  /**
   * TODO:
   */
  presets?: SelectorGroupProps;
}

// TODO: Fallback to input[type="date"] without JS?
// TODO: What to do about required calendar labels? -> optional? or separate experimental component?

/**
 * TODO: DateInput component for forms.
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
      presets,
      locale,
      firstDayOfWeek,
      modifiers,
      openCalendarButtonLabel,
      closeCalendarButtonLabel,
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
    const [open, setOpen] = useState(false);

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
      onChange(date.toString());
      closeCalendar();
    };

    const handlePresetChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
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
      if (presets) {
        presets.options.forEach((option) => {
          try {
            Temporal.PlainDate.from(option.value);
          } catch (error) {
            throw new CircuitError(
              'DateInput',
              `The "${option.value}" value of the "${option.label}" preset option is not a valid ISO 8601 date string.`,
            );
          }
        });
      }
    }

    const calendarButtonLabel = value
      ? [
          openCalendarButtonLabel,
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
          min={min}
          max={max}
          placeholder={placeholder}
          renderSuffix={(suffixProps) => (
            <IconButton
              {...suffixProps}
              icon={CalendarIcon}
              variant="tertiary"
              onClick={openCalendar}
            >
              {calendarButtonLabel}
            </IconButton>
          )}
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
            <Headline
              as="h2"
              size="two"
              id={headlineId}
              className={classes.headline}
            >
              {label}
            </Headline>
            <CloseButton
              size="s"
              variant="tertiary"
              className={classes.close}
              onClick={closeCalendar}
            >
              {closeCalendarButtonLabel}
            </CloseButton>
            {open && (
              <Calendar
                ref={calendarRef}
                onSelect={handleSelect}
                selection={toPlainDate(value) || undefined}
                minDate={toPlainDate(min) || undefined}
                maxDate={toPlainDate(max) || undefined}
                locale={locale}
                firstDayOfWeek={firstDayOfWeek}
                modifiers={modifiers}
                prevMonthButtonLabel={prevMonthButtonLabel}
                nextMonthButtonLabel={nextMonthButtonLabel}
              />
            )}
            {presets && (
              <SelectorGroup
                {...presets}
                onChange={handlePresetChange}
                value={value}
                className={classes.presets}
                size="s"
                hideLabel
              />
            )}
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
