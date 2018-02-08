import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Tooltip from './Tooltip';

const DummyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-eye"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

storiesOf('Tooltip', module)
  .addDecorator(withTests('Tooltip'))
  .add(
    'Centered ',
    withInfo()(() => (
      <Tooltip align={Tooltip.CENTER} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    ))
  )
  .add(
    'Left ',
    withInfo()(() => (
      <Tooltip align={Tooltip.LEFT} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    ))
  )
  .add(
    'Right ',
    withInfo()(() => (
      <Tooltip align={Tooltip.RIGHT} content="The tooltip content">
        Something with tooltip
      </Tooltip>
    ))
  )
  .add(
    'Content icon',
    withInfo()(() => (
      <Tooltip align={Tooltip.Center} content={<DummyIcon fill="#FFFFFF" />}>
        Something with tooltip
      </Tooltip>
    ))
  )
  .add(
    'Children with icon ',
    withInfo()(() => (
      <Tooltip align={Tooltip.Left} content="The tooltip content">
        <div>This is a icon:</div>
        <span>
          <DummyIcon />
        </span>
      </Tooltip>
    ))
  );
