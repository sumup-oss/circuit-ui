import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';

import CalendarInheritStyles from './CalendarInheritStyles';

const baseStyles = (/* { theme } */) => css`
  label: calendar;

  border: 1px solid #000;
  border-radius: 3px;

  & {
    td {
      vertical-align: middle;
    }
  }
`;

/*
  Mapping
    #00a699 => ${theme.colors.b100}
*/

const dayDefault = ({ theme }) => css`
  .CalendarDay__default {
    border: 1px solid ${theme.colors.n500};
    color: #565a5c;
    background: ${theme.colors.white};

    &:hover {
      background: ${theme.colors.n500};
      border: 1px double ${theme.colors.n500};
      color: inherit;
    }
  }
`;

const selectedDay = ({ theme }) => css`
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${theme.colors.b700};
    border: 1px solid ${theme.colors.b700};
    color: #fff;
  }
    background: ${theme.colors.b700};
  }
`;

const selectedDaySpan = ({ theme }) => css`
  .CalendarDay__selected_span {
    background: ${theme.colors.b300};
    border: 1px solid ${theme.colors.b500};
    color: ${theme.colors.white};

    &:hover {
      color: ${theme.colors.white};
      background: ${theme.colors.b500};
      border: 1px solid ${theme.colors.b500};
    }
  }
`;

const hoveredSpan = ({ theme }) => css`
  .CalendarDay__hovered_span {
    &,
    &:hover {
      background: ${theme.colors.b300};
      border: 1px solid ${theme.colors.b500};
      color: ${theme.colors.white};
    }

    &:active {
      background: ${theme.colors.b300};
      border: 1px solid ${theme.colors.b500};
      color: ${theme.colors.white};
    }
  }
`;

/**
 * Describe your component here.
 */
const CalendarWrap = styled('div')`
  ${baseStyles};

  & {
    ${CalendarInheritStyles};
    ${dayDefault};
    ${selectedDay};
    ${selectedDaySpan};
    ${hoveredSpan};
  }
`;

CalendarWrap.propTypes = {
  /**
   * A consice description of the example prop.
   */
  // example: PropTypes.string
};

CalendarWrap.defaultProps = {};

/**
 * @component
 */
export default withTheme(CalendarWrap);
