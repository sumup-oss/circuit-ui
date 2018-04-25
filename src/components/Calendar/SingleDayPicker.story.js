import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// import withTests from '../../util/withTests';
import { SingleDayPicker } from '.';

class CalendarStoryPicker extends Component {
  state = { date: null, focused: null };
  render() {
    return (
      <SingleDayPicker
        date={this.state.date} // momentPropTypes.momentObj or null,
        onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired,
        focused={this.state.focused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={({ focused }) => this.setState({ focused })}
      />
    );
  }
}

storiesOf('Calendar', module)
  // .addDecorator(withTests('Calendar'))
  .add('SingleDayPicker', withInfo()(() => <CalendarStoryPicker />));
