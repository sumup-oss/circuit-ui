import React from 'react';
import { storiesOf } from '@storybook/react';
import { SumUpLogo } from '..';

storiesOf('Logo', module)
  .add('Light', () => (
    <div style={{ backgroundColor: '#3c3d3d', padding: '20px' }}>
      <SumUpLogo fill="white" />
    </div>
  ))
  .add('Dark', () => (
    <div style={{ padding: '20px' }}>
      <SumUpLogo fill="dark" />
    </div>
  ))
  .add('Blue', () => (
    <div style={{ padding: '20px' }}>
      <SumUpLogo fill="blue" />
    </div>
  ))
  .add('White', () => (
    <div style={{ backgroundColor: '#3c3d3d', padding: '20px' }}>
      <SumUpLogo fill="white" />
    </div>
  ))
  .add('Old Light', () => (
    <div style={{ backgroundColor: '#3c3d3d', padding: '20px' }}>
      <SumUpLogo fill="light" type="old" />
    </div>
  ))
  .add('Old Dark', () => (
    <div style={{ padding: '20px' }}>
      <SumUpLogo fill="dark" type="old" />
    </div>
  ))
  .add('Old Blue', () => (
    <div style={{ padding: '20px' }}>
      <SumUpLogo fill="blue" type="old" />
    </div>
  ))
  .add('Old White', () => (
    <div style={{ backgroundColor: '#3c3d3d', padding: '20px' }}>
      <SumUpLogo fill="white" type="old" />
    </div>
  ));
