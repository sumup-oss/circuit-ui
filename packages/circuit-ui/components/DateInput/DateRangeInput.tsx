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
import { Temporal } from 'temporal-polyfill';
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
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';
import type { InputProps } from '../Input/Input.js';
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
import {
  toPlainDate,
  updatePlainDateRange,
  type PlainDateRange,
} from '../../util/date.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';

import { Dialog } from './components/Dialog.js';
import { emptyDate, usePlainDateState } from './hooks/usePlainDateState.js';
import { useSegmentFocus } from './hooks/useSegmentFocus.js';
import { getCalendarButtonLabel, getDateParts } from './DateInputService.js';
import { PlainDateSegments } from './components/PlainDateSegments.js';
import classes from './DateInput.module.css';
import { translations } from './translations/index.js';

export interface DateRangeInputProps
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      'onChange' | 'value' | 'defaultValue'
    >,
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
  // FIXME:
  value?: { start?: string; end?: string };
  /**
   * The initially selected date in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601)
   * format (`YYYY-MM-DD`).
   */
  // FIXME:
  defaultValue?: { start?: string; end?: string };
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
   * One of the accepted placement values. Defaults to `bottom-end`.
   */
  placement?: Placement;
}

/**
 * The DateRangeInput component allows users to type or select a specific date.
 * The input value is always a string in the format `YYYY-MM-DD`.
 */
export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(
  (props, ref) => {
    const {
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
      placement = 'bottom-end',
      className,
      style,
      ...rest
    } = useI18n(props, translations);
    const isMobile = useMedia('(max-width: 479px)');

    const calendarButtonRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const dialogId = useId();
    const headlineId = useId();
    const validationHintId = useId();

    const descriptionIds = clsx(descriptionId, validationHintId);
    const minDate = toPlainDate(min);
    const maxDate = toPlainDate(max);

    const focus = useSegmentFocus();
    const startState = usePlainDateState({
      value: value?.start,
      defaultValue: defaultValue?.start,
      onChange,
      minDate,
      maxDate,
      locale,
    });
    const endState = usePlainDateState({
      value: value?.end,
      defaultValue: defaultValue?.end,
      onChange,
      minDate,
      maxDate,
      locale,
    });

    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState<PlainDateRange>({
      start: undefined,
      end: undefined,
    });

    const padding = 16; // px

    const { floatingStyles, update } = useFloating({
      open,
      placement,
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
      if (startState.date && endState.date) {
        // Technically, a start date after the end date is invalid, however,
        //
        const [start, end] = [startState.date, endState.date].sort(
          Temporal.PlainDate.compare,
        );
        setSelection({ start, end });
      } else if (startState.date) {
        setSelection({ start: startState.date, end: endState.date });
      } else {
        setSelection({ start: undefined, end: undefined });
      }
      setOpen(true);
    };

    const closeCalendar = () => {
      setOpen(false);
    };

    const handleSelect = (date: Temporal.PlainDate) => {
      const updatedSelection = updatePlainDateRange(selection, date);
      setSelection(updatedSelection);

      if (!isMobile) {
        startState.update(updatedSelection.start || emptyDate);
        endState.update(updatedSelection.end || emptyDate);
      }
    };

    const handleApply = () => {
      startState.update(selection.start || emptyDate);
      endState.update(selection.end || emptyDate);
      closeCalendar();
    };

    const handleClear = () => {
      startState.update(emptyDate);
      endState.update(emptyDate);
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

    const parts = getDateParts(locale);
    const calendarButtonLabel = getCalendarButtonLabel(
      openCalendarButtonLabel,
      // FIXME:
      startState.date,
      locale,
    );

    if (
      process.env.NODE_ENV !== 'production' &&
      !isSufficientlyLabelled(label)
    ) {
      throw new AccessibilityError(
        'DateRangeInput',
        'The `label` prop is missing or invalid.',
      );
    }

    return (
      <FieldWrapper
        ref={ref}
        disabled={disabled}
        className={className}
        style={style}
        {...rest}
      >
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
              <PlainDateSegments
                parts={parts}
                state={startState}
                focus={focus}
                yearInputLabel={yearInputLabel}
                monthInputLabel={monthInputLabel}
                dayInputLabel={dayInputLabel}
                aria-describedby={descriptionIds}
                required={required}
                invalid={invalid}
                disabled={disabled}
                readOnly={readOnly}
              />
              <div className={classes.divider} aria-hidden="true">
                –
              </div>
              <PlainDateSegments
                parts={parts}
                state={endState}
                focus={focus}
                yearInputLabel={yearInputLabel}
                monthInputLabel={monthInputLabel}
                dayInputLabel={dayInputLabel}
                aria-describedby={descriptionIds}
                required={required}
                invalid={invalid}
                disabled={disabled}
                readOnly={readOnly}
              />
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
                  {isMobile && (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleApply}
                      className={classes.apply}
                    >
                      {applyDateButtonLabel}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </Dialog>
      </FieldWrapper>
    );
  },
);

DateRangeInput.displayName = 'DateRangeInput';
