/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { FlashAlert } from '..';

storiesOf('Flash Alerts', module)
  .add('Error', () => <FlashAlert type="error" msg="ERROR" />)
  .add('Success', () => <FlashAlert type="success" msg="SUCCESS" />)
  .add('Warning', () => <FlashAlert type="warning" msg="WARNING" />);
