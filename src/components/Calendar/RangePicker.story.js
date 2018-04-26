import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import { RangePicker } from '.';

class CalendarStoryPicker extends Component {
  state = { startDate: null, endDate: null, focusedInput: null };
  render() {
    return (
      <RangePicker
        startDate={this.state.startDate}
        startDateId="your_unique_start_date_id"
        endDate={this.state.endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={({ startDate, endDate }) =>
          this.setState({ startDate, endDate })
        }
        focusedInput={this.state.focusedInput}
        onFocusChange={focusedInput => {
          this.setState({ focusedInput });
        }}
        showClearDates
      />
    );
  }
}

storiesOf('Calendar', module)
  .addDecorator(withTests('Calendar'))
  .add('RangePicker', withInfo()(() => <CalendarStoryPicker />));
