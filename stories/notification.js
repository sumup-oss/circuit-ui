import React from 'react';
import { storiesOf } from '@storybook/react';
import { Notification } from '..';

const act = () => console.log('I am a notification action');

storiesOf('Notifications', module)
  .add('Error', () => <Notification type="error" msg="error" />)
  .add('Warning', () => <Notification type="warning" msg="warning" />)
  .add('Info', () => <Notification type="info" msg="info" />)
  .add('Success', () => <Notification type="success" msg="success" />)
  .add('Success + Action', () => (
    <Notification type="success" msg="success" action={act} />
  ));
