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

import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withTheme } from 'emotion-theming';

import {
  typography,
  shadowTriple,
  focusVisible,
  disableVisually,
} from '../../../../styles/style-mixins';

import CalendarInheritStyles from './CalendarImportedStyles';

const baseStyles = (/* { theme } */) => css`
  label: calendar;
`;

const dayDefault = ({ theme }) => css`
  .CalendarDay__default {
    border: 1px solid ${theme.colors.n300};
    color: ${theme.colors.n900};
    background: ${theme.colors.white};
    vertical-align: middle;

    &:hover {
      background: ${theme.colors.n300};
      border: 1px double ${theme.colors.n500};
      color: inherit;
    }
  }

  .CalendarDay__hovered_span {
    &,
    &:hover {
      background: ${theme.colors.p100};
      border: 1px solid ${theme.colors.p500};
    }

    &:active {
      background: ${theme.colors.p100};
      border: 1px solid ${theme.colors.p500};
    }
  }
`;

const daySelection = ({ theme }) => css`
  .CalendarDay__selected_span {
    background: ${theme.colors.p100};
    border: 1px solid ${theme.colors.p300};

    &:hover {
      color: ${theme.colors.white};
      background: ${theme.colors.p300};
      border: 1px solid ${theme.colors.p500};
    }
  }
  .CalendarDay__last_in_range {
    border-right: ${theme.colors.p500};
  }
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${theme.colors.p500};
    border: 1px solid ${theme.colors.p700};
    color: ${theme.colors.white};
  }
`;

const blockedOutOfRange = ({ theme }) => css`
  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    background: #fff;
    border: 1px solid ${theme.colors.n300};
    color: ${theme.colors.n300};
  }
`;

const dateRangePickerInput = ({ theme }) => css`
  .DateRangePickerInput,
  .SingleDatePickerInput {
    label: input__calendar;
    background-color: ${theme.colors.white};
    padding: ${theme.spacings.byte} ${theme.spacings.kilo};
    transition: border-color ${theme.transitions.default};
    width: 100%;
    ${typography('one')(theme)};

    &.DateRangePickerInput__withBorder,
    &.SingleDatePickerInput__withBorder {
      border-width: 1px;
      border-style: solid;
      border-color: ${theme.colors.n300};
      border-radius: ${theme.borderRadius.bit};
    }

    &.DateRangePickerInput__showClearDates {
      padding-right: 30px;
    }
  }

  .DateRangePickerInput__disabled {
    background: #f2f2f2;
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
    color: ${theme.colors.n900};
    ${typography('one')(theme)};
    font-weight: 200;
    background-color: inherit;
    width: 100%;
    padding: 0;
    border: none;

    &::placeholder {
      color: ${theme.colors.n500};
      transition: color ${theme.transitions.default};
    }
  }

  .DateInput_fang {
    margin-top: -8px;
  }
`;

const navButtons = ({ theme }) => css`
  .DayPickerNavigation_button__horizontal {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    cursor: pointer;
    text-align: center;
    border: 1px solid ${theme.colors.n500};
    background-color: ${theme.colors.white};
    color: ${theme.colors.n800};
    padding: ${theme.spacings.byte};
    border-radius: ${theme.borderRadius.pill};
    transition: opacity ${theme.transitions.default},
      color ${theme.transitions.default},
      background-color ${theme.transitions.default},
      border-color ${theme.transitions.default};

    &:hover {
      background-color: ${theme.colors.n100};
      border-color: ${theme.colors.n700};
    }

    &:active {
      background-color: ${theme.colors.n200};
      border-color: ${theme.colors.n800};
    }

    ${focusVisible(theme)};

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

const closeButton = ({ theme }) => css`
  .DateRangePickerInput_clearDates {
    margin: 0;
    width: ${theme.spacings.tera};
    height: ${theme.spacings.tera};
    padding: ${theme.spacings.bit};
  }
`;

const calendarCaption = ({ theme }) => css`
  .CalendarMonth_caption {
    color: ${theme.colors.n900};
    font-size: 18px;
    text-align: center;
    padding-top: 22px;
    padding-bottom: 43px;
    caption-side: initial;
  }
`;

const calendarWeekHeader = ({ theme }) => css`
  .DayPicker_weekHeader {
    color: ${theme.colors.n900};
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

const wrapShadow = ({ theme }) => css`
  .DayPicker {
    /**
      * Rollback to using their own shadow
      * as it looks better with the tip they provide
      */
    /* ${shadowTriple({ theme })}; */
  }
`;

/**
 * Describe your component here.
 */
const CalendarWrapper = styled('div')`
  ${baseStyles};

  & {
    ${CalendarInheritStyles};
    ${dayDefault};
    ${daySelection};
    ${blockedOutOfRange};
    ${dateRangePickerInput};
    ${navButtons};
    ${closeButton};
    ${calendarCaption};
    ${calendarWeekHeader};
    ${wrapShadow};
  }
`;

/**
 * @component
 */
export default withTheme(CalendarWrapper);
