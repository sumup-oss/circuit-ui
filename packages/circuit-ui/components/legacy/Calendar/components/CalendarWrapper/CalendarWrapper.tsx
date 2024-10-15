/**
 * Copyright 2019, SumUp Ltd.
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

/** @jsxImportSource @emotion/react */

import type { ReactNode } from 'react';
import type { Theme } from '@sumup/design-tokens';
import { css, Global } from '@emotion/react';

import {
  typography,
  focusVisible,
  disableVisually,
  cx,
} from '../../../../../styles/style-mixins.js';

import { calendarInheritStyles } from './CalendarImportedStyles.js';

const dayDefault = css`
  .CalendarDay__default {
    border: 1px solid var(--cui-border-divider);
    color: var(--cui-fg-normal);
    background: var(--cui-bg-normal);
    vertical-align: middle;

    &:hover {
      background: var(--cui-bg-normal-hovered);
      border: 1px double var(--cui-border-normal-hovered);
      color: inherit;
    }
  }

  .CalendarDay__hovered_span {
    &,
    &:hover {
      background: var(--cui-bg-accent-hovered);
      border: 1px solid var(--cui-border-accent-hovered);
    }

    &:active {
      background: var(--cui-bg-accent-pressed);
      border: 1px solid var(--cui-border-accent-pressed);
    }
  }
`;

const daySelection = css`
  .CalendarDay__selected_span {
    background: var(--cui-bg-accent);
    border: 1px solid var(--cui-border-accent);

    &:hover {
      color: var(--cui-fg-normal-hovered);
      background: var(--cui-bg-accent-hovered);
      border: 1px solid var(--cui-border-accent-hovered);
    }
  }
  .CalendarDay__last_in_range {
    border-right: var(--cui-border-accent);
  }
  .CalendarDay__selected {
    background: var(--cui-bg-accent-strong);
    border: 1px solid var(--cui-border-accent);
    color: var(--cui-fg-on-strong);
  }
  .CalendarDay__selected:hover {
    background: var(--cui-bg-accent-strong-hovered);
    border: 1px solid var(--cui-border-accent-hovered);
    color: var(--cui-fg-on-strong-hovered);
  }
  .CalendarDay__selected:active {
    background: var(--cui-bg-accent-strong-pressed);
    border: 1px solid var(--cui-border-accent-pressed);
    color: var(--cui-fg-on-strong-pressed);
  }
`;

const blockedOutOfRange = css`
  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-divider);
    color: var(--cui-fg-normal-disabled);
  }
`;

const dateRangePickerInput = (theme: Theme) => css`
  .DateRangePickerInput,
  .SingleDatePickerInput {
    background-color: var(--cui-bg-normal);
    padding: ${theme.spacings.kilo} ${theme.spacings.mega};
    transition: border-color ${theme.transitions.default};
    width: 100%;
    ${typography('one')(theme)};

    &.DateRangePickerInput__withBorder,
    &.SingleDatePickerInput__withBorder {
      border: none;
      border-radius: ${theme.borderRadius.byte};
      transition: box-shadow ${theme.transitions.default};
      box-shadow: 0 0 0 1px var(--cui-border-strong);

      &:hover {
        box-shadow: 0 0 0 1px var(--cui-border-strong-hovered);
      }
      &:focus-within {
        box-shadow: 0 0 0 2px var(--cui-border-accent);
      }
    }

    &.DateRangePickerInput__showClearDates {
      padding-right: 30px;
    }
  }

  .DateRangePickerInput__disabled {
    background: var(--cui-bg-normal-disabled);
  }

  .DateRangePickerInput_arrow {
    margin: 0 ${theme.spacings.kilo};
    width: ${theme.spacings.giga};
    height: ${theme.spacings.giga};
  }

  .DateInput {
    width: 90px;
    vertical-align: inherit;
  }

  .DateInput_input {
    color: var(--cui-fg-normal);
    ${typography('one')(theme)};
    font-weight: 200;
    background-color: inherit;
    width: 100%;
    padding: 0;
    border: none;

    &::placeholder {
      color: var(--cui-fg-placeholder);
      transition: color ${theme.transitions.default};
    }
  }

  .DateInput_fang {
    margin-top: -11px;
  }
`;

const navButtons = (theme: Theme) => css`
  .DayPickerNavigation_button__horizontal {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    cursor: pointer;
    text-align: center;
    border: 1px solid var(--cui-border-normal);
    background-color: var(--cui-bg-normal);
    color: var(--cui-fg-normal);
    padding: ${theme.spacings.byte};
    border-radius: ${theme.borderRadius.pill};
    transition:
      opacity ${theme.transitions.default},
      color ${theme.transitions.default},
      background-color ${theme.transitions.default},
      border-color ${theme.transitions.default};

    &:hover {
      background-color: var(--cui-bg-normal-hovered);
      border-color: var(--cui-border-normal-hovered);
    }

    &:active {
      background-color: var(--cui-bg-normal-pressed);
      border-color: var(--cui-border-normal-pressed);
    }

    ${focusVisible()};

    &:disabled,
    &[disabled] {
      ${disableVisually()};
    }
  }

  .DayPickerNavigation_leftButton__horizontal {
    transform: scale(-1, 1);
  }

  .DayPickerNavigation_button__horizontal:nth-of-type(1) {
    left: 22px;
  }
  .DayPickerNavigation_button__horizontal:nth-of-type(2) {
    right: 22px;
  }
`;

const closeButton = (theme: Theme) => css`
  .DateRangePickerInput_clearDates {
    margin: 0;
    width: ${theme.spacings.tera};
    height: ${theme.spacings.tera};
    padding: ${theme.spacings.bit};
  }
`;

const calendarCaption = css`
  .CalendarMonth_caption {
    color: var(--cui-fg-normal);
    font-size: 18px;
    text-align: center;
    padding-top: 22px;
    padding-bottom: 43px;
    caption-side: initial;
  }
`;

const calendarWeekHeader = (theme: Theme) => css`
  .DayPicker_weekHeader {
    color: var(--cui-fg-normal);
    position: absolute;
    top: 67px;
    z-index: 2;
    padding: 0 13px;
    text-align: left;

    .DayPicker_weekHeader_ul {
      ${typography('two')(theme)};
    }
  }
`;

const withPortal = (theme: Theme) => css`
  .DateRangePicker_picker,
  .SingleDatePicker_picker {
    z-index: ${theme.zIndex.modal};
  }
`;

interface CalendarWrapperProps {
  children: ReactNode;
}

export function CalendarWrapper({ children }: CalendarWrapperProps) {
  return (
    <div>
      <Global
        styles={cx(
          calendarInheritStyles,
          dayDefault,
          daySelection,
          blockedOutOfRange,
          dateRangePickerInput,
          navButtons,
          closeButton,
          calendarCaption,
          calendarWeekHeader,
          withPortal,
        )}
      />
      {children}
    </div>
  );
}
