import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// import withTests from '../../util/withTests';
import { RangePicker } from '.';

class CalendarStoryPicker extends Component {
  state = { startDate: null, endDate: null, focusedInput: null };
  render() {
    return (
      <RangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) =>
          this.setState({ startDate, endDate })
        } // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => {
          this.setState({ focusedInput });
        }} // PropTypes.func.isRequired,
        showClearDates
      />
    );
  }
}

storiesOf('Calendar', module)
  // .addDecorator(withTests('Calendar'))
  .add('RangePicker', withInfo()(() => <CalendarStoryPicker />));
