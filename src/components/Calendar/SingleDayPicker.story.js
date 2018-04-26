import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import { SingleDayPicker } from '.';

class CalendarStoryPicker extends Component {
  state = { date: null, focused: null };
  render() {
    return (
      <SingleDayPicker
        date={this.state.date}
        onDateChange={date => this.setState({ date })}
        focused={this.state.focused}
        onFocusChange={({ focused }) => this.setState({ focused })}
      />
    );
  }
}

storiesOf('Calendar', module)
  .addDecorator(withTests('Calendar'))
  .add('SingleDayPicker', withInfo()(() => <CalendarStoryPicker />));
