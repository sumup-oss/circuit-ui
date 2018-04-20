import React, { Component } from 'react';
import { withTheme } from 'emotion-theming';
import { DateRangePicker } from 'react-dates';

import 'react-dates/initialize';

import { CalendarWrap } from './components';

export class CalendarRangePicker extends Component {
  state = { startDate: null, endDate: null, focusedInput: null };
  render() {
    return (
      <CalendarWrap>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
      </CalendarWrap>
    );
  }
}

/**
 * Describe your component here.
 */
// const Calendar = styled('element')(baseStyles);

// Calendar.propTypes = {
/**
 * A consice description of the example prop.
 */
//  example: PropTypes.string
// };

// Calendar.defaultProps = {};

/**
 * @component
 */
export default withTheme(CalendarRangePicker);
