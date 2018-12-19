import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { withTheme } from 'emotion-theming';

import {
  textMega,
  textKilo,
  shadowTriple
} from '../../../../styles/style-helpers';
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
      border: 1px double ${theme.colors.n300};
      color: inherit;
    }
  }

  .CalendarDay__hovered_span {
    &,
    &:hover {
      background: ${theme.colors.b100};
      border: 1px solid ${theme.colors.b500};
    }

    &:active {
      background: ${theme.colors.b100};
      border: 1px solid ${theme.colors.b500};
    }
  }
`;

const daySelection = ({ theme }) => css`
  .CalendarDay__selected_span {
    background: ${theme.colors.b100};
    border: 1px solid ${theme.colors.b300};

    &:hover {
      color: ${theme.colors.white};
      background: ${theme.colors.b300};
      border: 1px solid ${theme.colors.b300};
    }
  }
  .CalendarDay__last_in_range {
    border-right: #00a699;
  }
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${theme.colors.b500};
    border: 1px solid ${theme.colors.b300};
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
    ${textMega({ theme })};

    &.DateRangePickerInput__withBorder,
    &.SingleDatePickerInput__withBorder {
      border-width: 1px;
      border-style: solid;
      border-color: ${theme.colors.n300};
      border-radius: ${theme.borderRadius.mega};
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
    width: 85px;
    vertical-align: inherit;
  }

  .DateInput_input {
    color: ${theme.colors.n900};
    ${textMega({ theme })};
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
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.n300};
    color: ${theme.colors.n900};

    padding: 0;
    width: ${theme.spacings.peta};
    height: ${theme.spacings.tera};

    & > svg {
      vertical-align: middle;
    }
  }

  .DayPickerNavigation_leftButton__horizontal {
    transform: scale(-1, 1);
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
      ${textKilo({ theme })};
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
