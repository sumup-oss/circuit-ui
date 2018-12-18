import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import styled from '@emotion/styled';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

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

const TooltipContainer = styled('div')`
  position: relative;
  line-height: 0;

  div {
    visibility: visible;
    opacity: 1;
  }
`;

storiesOf(`${GROUPS.COMPONENTS}|Tooltip`, module)
  .addDecorator(withTests('Tooltip'))
  .add(
    'Top left',
    withInfo()(() => (
      <TooltipContainer>
        <Tooltip position={Tooltip.TOP} align={Tooltip.LEFT}>
          I am a teeny, tiny tooltip.
        </Tooltip>
        <DummyIcon />
      </TooltipContainer>
    ))
  )
  .add(
    'Right center',
    withInfo()(() => (
      <TooltipContainer>
        <Tooltip position={Tooltip.RIGHT} align={Tooltip.CENTER}>
          I am a teeny, tiny tooltip.
        </Tooltip>
        <DummyIcon />
      </TooltipContainer>
    ))
  )
  .add(
    'Bottom right',
    withInfo()(() => (
      <TooltipContainer>
        <Tooltip position={Tooltip.BOTTOM} align={Tooltip.RIGHT}>
          I am a teeny, tiny tooltip.
        </Tooltip>
        <DummyIcon />
      </TooltipContainer>
    ))
  )
  .add(
    'Left center',
    withInfo()(() => (
      <TooltipContainer>
        <Tooltip position={Tooltip.LEFT} align={Tooltip.CENTER}>
          I am a teeny, tiny tooltip.
        </Tooltip>
        <DummyIcon />
      </TooltipContainer>
    ))
  );
