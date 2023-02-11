/**
 * Copyright 2023, SumUp Ltd.
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

import React from 'react';
import { css } from '@emotion/react';
import { createComponent, EventName } from '@lit-labs/react';
import { WcDatepicker } from 'wc-datepicker/dist/components/wc-datepicker';
import type { Theme } from '@sumup/design-tokens';

import { focusOutline } from '../../styles/style-mixins';

import type {
  BaseCalendarProps,
  DateChangeEvent,
  DateProps,
  DateRangeChangeEvent,
  DateRangeProps,
  MonthChangeEvent,
} from './types';

customElements.define('wc-datepicker', WcDatepicker);

const ReactDatepicker = createComponent({
  tagName: 'wc-datepicker',
  elementClass: WcDatepicker,
  react: React,
  events: {
    onSelectDate: 'selectDate' as EventName<
      DateChangeEvent | DateRangeChangeEvent
    >,
    onMonthChange: 'monthChange' as EventName<MonthChangeEvent>,
  },
});

const calendarStyles = (theme: Theme) => css`
  wc-datepicker {
    display: inline-flex;
  }

  .wc-datepicker {
    display: block;
    width: min-content;
    min-width: 17rem;
    max-width: 24rem;
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-normal);
  }

  .wc-datepicker--disabled *:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .wc-datepicker--disabled .wc-datepicker__weekday {
    color: var(--cui-fg-normal-disabled);
  }

  .wc-datepicker--disabled .wc-datepicker__date:focus > * {
    outline: none;
  }

  .wc-datepicker--disabled .wc-datepicker__date {
    cursor: default;
    opacity: 0.5;
  }

  .wc-datepicker--disabled .wc-datepicker__date:hover > * {
    background-color: transparent;
  }

  .wc-datepicker--disabled .wc-datepicker__date--in-range:hover > * {
    background-color: var(--cui-bg-highlight-hovered);
  }

  .wc-datepicker--disabled .wc-datepicker__date--selected:hover > * {
    color: var(--cui-fg-on-strong-hovered);
    background-color: var(--cui-bg-accent-strong-hovered);
  }

  .wc-datepicker__header {
    display: flex;
    padding: 0.75rem;
    align-items: center;
    gap: 0.5rem;
  }

  .wc-datepicker__current-month {
    display: flex;
    flex-grow: 1;
  }

  .wc-datepicker__month-select,
  .wc-datepicker__year-select {
    display: flex;
    padding: ${theme.spacings.bit} ${theme.spacings.kilo};
    align-items: center;
    border: none;
    outline: 0;
    border-radius: ${theme.borderRadius.byte};
    color: var(--cui-fg-normal);
    background: var(--cui-bg-normal);
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.typography.headline.four.fontSize};
    line-height: ${theme.typography.headline.four.lineHeight};
  }

  .wc-datepicker__month-select {
    flex-grow: 1;
    cursor: pointer;
    appearance: none;
    text-align: right;
  }

  .wc-datepicker__year-select {
    -moz-appearance: textfield;
    max-width: 5rem;
  }

  .wc-datepicker__year-select::-webkit-outer-spin-button,
  .wc-datepicker__year-select::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .wc-datepicker__previous-month-button,
  .wc-datepicker__next-month-button,
  .wc-datepicker__previous-year-button,
  .wc-datepicker__next-year-button {
    display: inline-flex;
    padding: ${theme.spacings.byte};
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: ${theme.borderRadius.circle};
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-normal);
    cursor: pointer;
  }

  .wc-datepicker__previous-month-button:hover,
  .wc-datepicker__next-month-button:hover,
  .wc-datepicker__previous-year-button:hover,
  .wc-datepicker__next-year-button:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-normal-hovered);
  }

  .wc-datepicker__previous-month-button:active,
  .wc-datepicker__next-month-button:active,
  .wc-datepicker__previous-year-button:active,
  .wc-datepicker__next-year-button:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-normal-pressed);
  }

  .wc-datepicker__body {
    padding-right: ${theme.spacings.giga};
    padding-bottom: ${theme.spacings.giga};
    padding-left: ${theme.spacings.giga};
  }

  .wc-datepicker__calendar {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .wc-datepicker__weekday > span {
    display: flex;
    padding: 0.125rem;
    justify-content: center;
    align-items: center;
    font-weight: ${theme.fontWeight.bold};
    aspect-ratio: 1;
  }

  .wc-datepicker__date {
    padding: 0;
    text-align: center;
    cursor: pointer;
  }

  .wc-datepicker__date:focus {
    outline: none;
  }

  .wc-datepicker__date:focus > * {
    ${focusOutline(theme)};
  }

  .wc-datepicker__date:focus:not(:focus-visible) > * {
    box-shadow: none;
  }

  .wc-datepicker__date:hover > * {
    background-color: var(--cui-bg-accent-hovered);
  }

  .wc-datepicker__date > * {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${theme.borderRadius.circle};
    aspect-ratio: 1;
    height: 2.5rem;
    width: 2.5rem;
  }

  .wc-datepicker__date--current {
  }

  .wc-datepicker__date--overflowing {
  }

  .wc-datepicker__date--today > * {
    border: ${theme.borderWidth.kilo} solid var(--cui-border-strong);
  }

  .wc-datepicker__date--in-range {
    background-color: var(--cui-bg-accent);
  }

  .wc-datepicker__date--start {
    background: linear-gradient(
      to left,
      var(--cui-bg-accent) 0%,
      var(--cui-bg-accent) 50%,
      var(--cui-bg-normal) 50%,
      var(--cui-bg-normal) 100%
    );
  }

  .wc-datepicker__date--end {
    background: linear-gradient(
      to right,
      var(--cui-bg-accent) 0%,
      var(--cui-bg-accent) 50%,
      var(--cui-bg-normal) 50%,
      var(--cui-bg-normal) 100%
    );
  }

  .wc-datepicker__date--selected > * {
    color: var(--cui-fg-on-strong);
    background-color: var(--cui-bg-accent-strong);
    font-weight: ${theme.fontWeight.bold};
  }

  .wc-datepicker__date--selected:hover > * {
    color: var(--cui-fg-on-strong-hovered);
    background-color: var(--cui-bg-accent-strong-hovered);
  }

  .wc-datepicker__date--disabled {
    color: var(--cui-fg-normal-disabled);
    cursor: default;
  }

  .wc-datepicker__date--disabled:not(.wc-datepicker__date--selected):not(
      .wc-datepicker__date--in-range
    ):hover
    > * {
    background-color: transparent;
  }

  .wc-datepicker__date--disabled.wc-datepicker__date--in-range:not(
      .wc-datepicker__date--selected
    ):not(.wc-datepicker__date--in-range)
    > * {
    background-color: transparent;
  }

  .wc-datepicker__footer {
    display: flex;
    padding-right: ${theme.spacings.giga};
    padding-bottom: ${theme.spacings.giga};
    padding-left: ${theme.spacings.giga};
    align-items: center;
    gap: 0.5rem;
  }

  .wc-datepicker__clear-button,
  .wc-datepicker__today-button {
    display: inline-flex;
    padding-right: ${theme.spacings.byte};
    padding-left: ${theme.spacings.byte};
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: ${theme.borderRadius.pill};
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-normal);
    font: inherit;
    line-height: 1;
    cursor: pointer;
  }

  .wc-datepicker__clear-button:hover,
  .wc-datepicker__today-button:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-normal-hovered);
  }

  .wc-datepicker__clear-button:active,
  .wc-datepicker__today-button:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-normal-pressed);
  }
`;

export type CalendarProps = BaseCalendarProps & (DateProps | DateRangeProps);

export function Calendar({
  onChange,
  disabled,
  disableDate,
  locale,
  range,
}: CalendarProps) {
  return (
    <div css={calendarStyles}>
      <ReactDatepicker
        // @ts-expect-error Type-safety is guaranteed by the conditional RangeProps
        onSelectDate={onChange}
        disabled={disabled}
        disableDate={disableDate}
        locale={locale}
        range={range}
        first-day-of-week={1}
      />
    </div>
  );
}
