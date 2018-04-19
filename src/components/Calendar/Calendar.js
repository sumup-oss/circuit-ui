import React, { Component } from 'react';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import { withTheme } from 'emotion-theming';
import { DateRangePicker } from 'react-dates';

import { themePropType } from '../../util/shared-prop-types';
import {
  mapThemeToReactDates,
  reactWithStylesEmotionInterface
} from './CalendarThemeService';

import { CalendarWrap } from './components';

ThemedStyleSheet.registerInterface(reactWithStylesEmotionInterface);

class Calendar extends Component {
  static propTypes = {
    theme: themePropType.isRequired
  };

  constructor(props) {
    super(props);

    ThemedStyleSheet.registerTheme(mapThemeToReactDates(props.theme));
  }
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

// const baseStyles = ({ theme }) => css`
//   label: calendar;
// `;

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
export default withTheme(Calendar);
