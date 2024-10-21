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
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react';
import type { Temporal } from 'temporal-polyfill';
import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { Calendar as CalendarIcon } from '@sumup-oss/icons';
import { formatDate } from '@sumup-oss/intl';

import type { ClickEvent } from '../../types/events.js';
import { useMedia } from '../../hooks/useMedia/useMedia.js';
import { toPlainDate } from '../../util/date.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';
import type { InputProps } from '../Input/index.js';
import { Calendar, type CalendarProps } from '../Calendar/Calendar.js';
import { Button } from '../Button/Button.js';
import { CloseButton } from '../CloseButton/CloseButton.js';
import { IconButton } from '../Button/IconButton.js';
import { Headline } from '../Headline/Headline.js';
import {
  FieldLabelText,
  FieldLegend,
  FieldSet,
  FieldValidationHint,
  FieldWrapper,
} from '../Field/Field.js';

import { Dialog } from './components/Dialog.js';
import { Segment } from './components/Segment.js';
import {
  usePlainDateState,
  useDaySegment,
  useMonthSegment,
  useYearSegment,
  useSegmentFocus,
} from './hooks.js';
import { getDateSegments } from './DateInputService.js';
import classes from './DateInput.module.css';

export interface DateInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    Pick<
      InputProps,
      | 'label'
      | 'hideLabel'
      | 'invalid'
      | 'hasWarning'
      | 'showValid'
      | 'required'
      | 'disabled'
      | 'readOnly'
      | 'validationHint'
      | 'optionalLabel'
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
   * The currently selected date in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DD`).
   */
  value?: string;
  /**
   * The initially selected date in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DD`).
   */
  defaultValue?: string;
  /**
   * Visually hidden label for the year input.
   */
  yearInputLabel: string;
  /**
   * Visually hidden label for the month input.
   */
  monthInputLabel: string;
  /**
   * Visually hidden label for the day input.
   */
  dayInputLabel: string;
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
  /**
   * A hint to the user agent specifying how to prefill the input.
   */
  autoComplete?: 'bday';
}

/**
 * The DateInput component allows user to type or select a specific date.
 * The input value is always a string in the format `YYYY-MM-DD`.
 */
export const DateInput = forwardRef<HTMLDivElement, DateInputProps>(
  (
    {
      label,
      value,
      defaultValue,
      onChange,
      min,
      max,
      locale,
      firstDayOfWeek,
      modifiers,
      hideLabel,
      required,
      disabled,
      readOnly,
      invalid,
      hasWarning,
      showValid,
      validationHint,
      optionalLabel,
      openCalendarButtonLabel,
      closeCalendarButtonLabel,
      applyDateButtonLabel,
      clearDateButtonLabel,
      prevMonthButtonLabel,
      nextMonthButtonLabel,
      yearInputLabel,
      monthInputLabel,
      dayInputLabel,
      autoComplete,
      ...props
    },
    ref,
  ) => {
    const isMobile = useMedia('(max-width: 479px)');

    const referenceRef = useRef<HTMLDivElement>(null);
    const floatingRef = useRef<HTMLDialogElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const headlineId = useId();
    const validationHintId = useId();

    const minDate = toPlainDate(min);
    const maxDate = toPlainDate(max);

    const [focusProps, focusHandlers] = useSegmentFocus();
    const state = usePlainDateState(value, defaultValue, onChange);
    const yearProps = useYearSegment(state, focusHandlers, minDate, maxDate);
    const monthProps = useMonthSegment(state, focusHandlers, minDate, maxDate);
    const dayProps = useDaySegment(state, focusHandlers, minDate, maxDate);

    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState<Temporal.PlainDate>();

    const { floatingStyles, update } = useFloating({
      open,
      placement: 'bottom-start',
      middleware: [offset(4), flip(), shift()],
      elements: {
        reference: referenceRef.current,
        floating: floatingRef.current,
      },
    });

    useEffect(() => {
      /**
       * When we support `ResizeObserver` (https://caniuse.com/resizeobserver),
       * we can look into using Floating UI's `autoUpdate` (but we can't use
       * `whileElementIsMounted` because our implementation hides the floating
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

    // Focus the first date segment when clicking anywhere on the field...
    const handleClick = (event: ClickEvent) => {
      const element = event.target as HTMLElement;
      // ...except when clicking on a specific segment or the calendar button.
      if (
        element.tagName === 'INPUT' ||
        element.tagName === 'BUTTON' ||
        element.matches('button :scope')
      ) {
        return;
      }
      focusHandlers.next();
    };

    const openCalendar = () => {
      setSelection(toPlainDate(value) || undefined);
      setOpen(true);
    };

    const closeCalendar = () => {
      setOpen(false);
    };

    const handleSelect = (date: Temporal.PlainDate) => {
      setSelection(date);

      if (!isMobile) {
        const { year, month, day } = date;
        state.update({ year, month, day });
        closeCalendar();
      }
    };

    const handleApply = () => {
      if (selection) {
        const { year, month, day } = selection;
        state.update({ year, month, day });
      }
      closeCalendar();
    };

    const handleClear = () => {
      state.update({ year: '', month: '', day: '' });
      closeCalendar();
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
      if (!isSufficientlyLabelled(yearInputLabel)) {
        throw new AccessibilityError(
          'DateInput',
          'The `yearInputLabel` prop is missing or invalid.',
        );
      }
      if (!isSufficientlyLabelled(monthInputLabel)) {
        throw new AccessibilityError(
          'DateInput',
          'The `monthInputLabel` prop is missing or invalid.',
        );
      }
      if (!isSufficientlyLabelled(dayInputLabel)) {
        throw new AccessibilityError(
          'DateInput',
          'The `dayInputLabel` prop is missing or invalid.',
        );
      }
    }

    const plainDate = toPlainDate(value);
    const calendarButtonLabel = plainDate
      ? [openCalendarButtonLabel, formatDate(plainDate, locale, 'long')].join(
          ', ',
        )
      : openCalendarButtonLabel;

    const segments = getDateSegments(locale);

    return (
      <FieldWrapper ref={ref} disabled={disabled} {...props}>
        {/* TODO: Replicate native date input for uncontrolled inputs? */}
        {/* <input
          ref={ref}
          type="hidden"
          value={value}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        /> */}
        <FieldSet onClick={handleClick}>
          <FieldLegend>
            <FieldLabelText
              label={label}
              hideLabel={hideLabel}
              required={required}
              optionalLabel={optionalLabel}
            />
          </FieldLegend>
          <div className={classes.wrapper}>
            <div
              className={clsx(
                classes.segments,
                invalid && classes.invalid,
                hasWarning && classes.warning,
                readOnly && classes.readonly,
              )}
              ref={referenceRef}
            >
              {segments.map((segment, index) => {
                switch (segment.type) {
                  case 'year':
                    return (
                      <Segment
                        key={segment.type}
                        aria-label={yearInputLabel}
                        required={required}
                        invalid={invalid}
                        disabled={disabled}
                        readOnly={readOnly}
                        autoComplete={
                          autoComplete === 'bday' ? 'bday-year' : undefined
                        }
                        {...focusProps}
                        {...yearProps}
                      />
                    );
                  case 'month':
                    return (
                      <Segment
                        key={segment.type}
                        aria-label={monthInputLabel}
                        required={required}
                        invalid={invalid}
                        disabled={disabled}
                        readOnly={readOnly}
                        autoComplete={
                          autoComplete === 'bday' ? 'bday-month' : undefined
                        }
                        {...focusProps}
                        {...monthProps}
                      />
                    );
                  case 'day':
                    return (
                      <Segment
                        key={segment.type}
                        aria-label={dayInputLabel}
                        required={required}
                        invalid={invalid}
                        disabled={disabled}
                        readOnly={readOnly}
                        autoComplete={
                          autoComplete === 'bday' ? 'bday-day' : undefined
                        }
                        {...focusProps}
                        {...dayProps}
                      />
                    );
                  case 'literal':
                    return (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: The order of the literals is static
                        key={segment.type + index}
                        className={classes.literal}
                        aria-hidden="true"
                      >
                        {segment.value}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
            <IconButton
              icon={CalendarIcon}
              variant="secondary"
              onClick={openCalendar}
              className={classes['calendar-button']}
              disabled={disabled || readOnly}
            >
              {calendarButtonLabel}
            </IconButton>
          </div>
          <FieldValidationHint
            id={validationHintId}
            disabled={disabled}
            invalid={invalid}
            hasWarning={hasWarning}
            showValid={showValid}
            validationHint={validationHint}
          />
        </FieldSet>
        <Dialog
          ref={floatingRef}
          open={open}
          onClose={closeCalendar}
          aria-labelledby={headlineId}
          style={dialogStyles}
        >
          {() => (
            <div className={classes.content}>
              <header className={classes.header}>
                <Headline as="h2" size="m" id={headlineId}>
                  {label}
                </Headline>
                <CloseButton
                  size="s"
                  variant="tertiary"
                  onClick={closeCalendar}
                  className={classes['close-button']}
                >
                  {closeCalendarButtonLabel}
                </CloseButton>
              </header>

              <Calendar
                ref={calendarRef}
                className={classes.calendar}
                onSelect={handleSelect}
                selection={selection}
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
                firstDayOfWeek={firstDayOfWeek}
                modifiers={modifiers}
                prevMonthButtonLabel={prevMonthButtonLabel}
                nextMonthButtonLabel={nextMonthButtonLabel}
              />

              {(!required || isMobile) && (
                <div className={classes.buttons}>
                  {!required && (
                    <Button variant="tertiary" onClick={handleClear}>
                      {clearDateButtonLabel}
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    onClick={handleApply}
                    className={classes.apply}
                  >
                    {applyDateButtonLabel}
                  </Button>
                </div>
              )}
            </div>
          )}
        </Dialog>
      </FieldWrapper>
    );
  },
);

DateInput.displayName = 'DateInput';
