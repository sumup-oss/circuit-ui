/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { FlashAlert } from '..';

storiesOf('Flash Alerts', module)
  .add('Error', () => <FlashAlert type="error" data={{ msg: 'ERROR' }} />)
  .add('Success', () => <FlashAlert type="success" data={{ msg: 'SUCCESS' }} />)
  .add('Warning', () => (
    <FlashAlert type="warning" data={{ msg: 'WARNING' }} />
  ));
