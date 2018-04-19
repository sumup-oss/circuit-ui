import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: calendar;

  border: 1px solid ${theme.colors.b100};
  border-radius: 3px;

  & {
    td {
      vertical-align: middle;
    }
  }
`;

/**
 * Describe your component here.
 */
const CalendarWrap = styled('div')(baseStyles);

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
export default CalendarWrap;
