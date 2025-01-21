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
  type InputHTMLAttributes,
  useCallback,
} from 'react';
import type { Temporal } from 'temporal-polyfill';
import {
  flip,
  offset,
  shift,
  size,
  useFloating,
  type Placement,
} from '@floating-ui/react-dom';
import { Calendar as CalendarIcon } from '@sumup-oss/icons';

import type { ClickEvent } from '../../types/events.js';
import { useMedia } from '../../hooks/useMedia/useMedia.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';
import type { InputProps } from '../Input/Input.js';
import { Calendar, type CalendarProps } from '../Calendar/Calendar.js';
import { Button } from '../Button/Button.js';
import { IconButton } from '../Button/IconButton.js';
import { Headline } from '../Headline/Headline.js';
import {
  FieldLabelText,
  FieldLegend,
  FieldSet,
  FieldValidationHint,
  FieldWrapper,
} from '../Field/Field.js';
import { toPlainDate } from '../../util/date.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { changeInputValue } from '../../util/input-value.js';
import { Dialog } from '../Dialog/Dialog.js';
import { sharedClasses } from '../../styles/shared.js';

import { DateSegment } from './components/DateSegment.js';
import { usePlainDateState } from './hooks/usePlainDateState.js';
import { useSegmentFocus } from './hooks/useSegmentFocus.js';
import { getCalendarButtonLabel, getDateSegments } from './DateInputService.js';
import classes from './DateInput.module.css';
import { translations } from './translations/index.js';

export interface DateInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
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
  yearInputLabel?: string;
  /**
   * Visually hidden label for the month input.
   */
  monthInputLabel?: string;
  /**
   * Visually hidden label for the day input.
   */
  dayInputLabel?: string;
  /**
   * Label for the trailing button that opens the calendar dialog.
   */
  openCalendarButtonLabel?: string;
  /**
   * Label for the button to close the calendar dialog.
   */
  closeCalendarButtonLabel?: string;
  /**
   * Label for the button to apply the selected date and close the calendar dialog.
   */
  applyDateButtonLabel?: string;
  /**
   * Label for the button to clear the date value and close the calendar dialog.
   */
  clearDateButtonLabel?: string;
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
  /**
   * One of the accepted placement values. Defaults to `bottom-end`.
   */
  placement?: Placement;
}

/**
 * The DateInput component allows users to type or select a specific date.
 * The input value is always a string in the format `YYYY-MM-DD`.
 */
export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (props, ref) => {
    const {
      label,
      value,
      defaultValue,
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
      'aria-describedby': descriptionId,
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
      placement = 'bottom-end',
      className,
      style,
      ...rest
    } = useI18n(props, translations);
    const isMobile = useMedia('(max-width: 479px)');
    const animationDuration = isMobile ? 300 : 0;

    const inputRef = useRef<HTMLInputElement>(null);
    const calendarButtonRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const dialogId = useId();
    const headlineId = useId();
    const validationHintId = useId();

    const descriptionIds = clsx(descriptionId, validationHintId);
    const minDate = toPlainDate(min);
    const maxDate = toPlainDate(max);

    const handleChange = (newValue: string) => {
      changeInputValue(inputRef.current, newValue);
    };

    const focus = useSegmentFocus();
    const state = usePlainDateState({
      value,
      defaultValue,
      onChange: handleChange,
      minDate,
      maxDate,
      locale,
    });

    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState<Temporal.PlainDate>();

    const padding = 16; // px

    const { floatingStyles, update } = useFloating({
      open,
      placement,
      strategy: 'fixed',
      middleware: [
        offset(4),
        flip({ padding, fallbackAxisSideDirection: 'start' }),
        shift({ padding }),
        size({
          padding,
          apply({ availableHeight, elements }) {
            elements.floating.style.maxHeight = `${availableHeight}px`;
          },
        }),
      ],
      elements: {
        reference: calendarButtonRef.current,
        floating: dialogRef.current,
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
      // ...except when clicking on a specific segment input.
      if (element.getAttribute('role') === 'spinbutton') {
        return;
      }
      focus.next();
    };

    const openCalendar = () => {
      setSelection(state.date);
      setOpen(true);
    };

    const closeCalendar = useCallback(() => {
      setOpen(false);
    }, []);

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
      top: 'auto',
      right: '0px',
      bottom: '0px',
      left: '0px',
    } as const;

    const dialogStyles = isMobile ? mobileStyles : floatingStyles;

    const segments = getDateSegments(locale);
    const calendarButtonLabel = getCalendarButtonLabel(
      openCalendarButtonLabel,
      state.date,
      locale,
    );

    if (
      process.env.NODE_ENV !== 'production' &&
      !isSufficientlyLabelled(label)
    ) {
      throw new AccessibilityError(
        'DateInput',
        'The `label` prop is missing or invalid.',
      );
    }
    const [isClosing, setIsClosing] = useState(false);

    const handleModalCloseEnd = useCallback(() => {
      setIsClosing(false);
      closeCalendar?.();
    }, [closeCalendar]);

    const handleModalCloseStart = useCallback(() => {
      setIsClosing(true);
    }, []);

    const outAnimation = isMobile
      ? sharedClasses.animationSlideUpOut
      : undefined;
    const inAnimation = isMobile ? sharedClasses.animationSlideUpIn : undefined;

    return (
      <FieldWrapper disabled={disabled} className={className} style={style}>
        <FieldSet aria-describedby={descriptionIds}>
          <FieldLegend onClick={handleClick}>
            <FieldLabelText
              label={label}
              hideLabel={hideLabel}
              required={required}
              optionalLabel={optionalLabel}
            />
          </FieldLegend>
          <div className={classes.wrapper}>
            <input
              type="date"
              ref={applyMultipleRefs(ref, inputRef)}
              className={classes.hidden}
              min={min}
              max={max}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              autoComplete={autoComplete}
              aria-invalid={invalid}
              aria-hidden="true"
              tabIndex={-1}
              value={value}
              defaultValue={defaultValue}
              {...rest}
            />
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: */}
            <div
              onClick={handleClick}
              className={clsx(
                classes.segments,
                invalid && classes.invalid,
                hasWarning && classes.warning,
                readOnly && classes.readonly,
              )}
            >
              {segments.map((segment, index) => {
                const segmentProps = {
                  required,
                  invalid,
                  disabled,
                  readOnly,
                  focus,
                  // Only the first segment should be associated with the validation hint to reduce verbosity.
                  'aria-describedby': index === 0 ? descriptionIds : undefined,
                };
                switch (segment.type) {
                  case 'year':
                    return (
                      <DateSegment
                        key={segment.type}
                        aria-label={yearInputLabel}
                        autoComplete={
                          autoComplete === 'bday' ? 'bday-year' : undefined
                        }
                        {...segmentProps}
                        {...state.props.year}
                      />
                    );
                  case 'month':
                    return (
                      <DateSegment
                        key={segment.type}
                        aria-label={monthInputLabel}
                        autoComplete={
                          autoComplete === 'bday' ? 'bday-month' : undefined
                        }
                        {...segmentProps}
                        {...state.props.month}
                      />
                    );
                  case 'day':
                    return (
                      <DateSegment
                        key={segment.type}
                        aria-label={dayInputLabel}
                        autoComplete={
                          autoComplete === 'bday' ? 'bday-day' : undefined
                        }
                        {...segmentProps}
                        {...state.props.day}
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
              ref={calendarButtonRef}
              type="button"
              icon={CalendarIcon}
              variant="secondary"
              onClick={openCalendar}
              className={classes['calendar-button']}
              disabled={disabled || readOnly}
              aria-expanded={open}
              aria-haspopup="true"
              aria-controls={dialogId}
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
          ref={dialogRef}
          id={dialogId}
          open={open}
          isModal={isMobile}
          hideCloseButton={!isMobile}
          onCloseStart={handleModalCloseStart}
          onCloseEnd={handleModalCloseEnd}
          className={clsx(
            classes.dialog,
            isClosing ? outAnimation : inAnimation,
          )}
          animationDuration={isMobile ? animationDuration : 0}
          aria-labelledby={headlineId}
          style={dialogStyles}
          locale={locale}
          closeButtonLabel={closeCalendarButtonLabel}
        >
          {() => (
            <div className={classes.content}>
              <header className={classes.header}>
                <Headline as="h2" size="m" id={headlineId}>
                  {label}
                </Headline>
              </header>

              <Calendar
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
                    <Button
                      type="button"
                      variant="tertiary"
                      onClick={handleClear}
                    >
                      {clearDateButtonLabel}
                    </Button>
                  )}
                  <Button
                    type="button"
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
