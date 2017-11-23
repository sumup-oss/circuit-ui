/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { FlashAlert } from '..';

class Flash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  onDismiss = e => {
    e.preventDefault();
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        {React.cloneElement(this.props.alert, {
          onDismiss: this.onDismiss,
          show: this.state.show
        })}
      </div>
    );
  }
}

storiesOf('Flash Alerts', module)
  .add('Error', () => <Flash alert={<FlashAlert type="error" msg="ERROR" />} />)
  .add('Success', () => (
    <Flash alert={<FlashAlert type="success" msg="SUCCESS" />} />
  ))
  .add('Warning', () => (
    <Flash alert={<FlashAlert type="warning" msg="WARNING" />} />
  ));
