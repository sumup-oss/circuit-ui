import React from 'react';
import { storiesOf } from '@storybook/react';
import { Notification } from '..';

storiesOf('Notifications', module)
  .add('Error', () => <Notification type="error" data={{ msg: 'error' }} />)
  .add('Warning', () => (
    <Notification type="warning" data={{ msg: 'warning' }} />
  ))
  .add('Info', () => <Notification type="info" data={{ msg: 'info' }} />)
  .add('Success', () => (
    <Notification type="success" data={{ msg: 'success' }} />
  ));
