import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { css } from 'react-emotion';

import { flow, toPairs, map, pick, values } from '../../../../util/fp';
import iconComponents from './card-scheme-icons';
import { schemes } from '../..';

const IconList = styled('ul')`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  max-width: '30vw';
`;

const iconStyles = css`
  width: auto;
  height: 100%;
`;

const IconWrapper = styled('li')`
  height: 32px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-of-type) {
    margin-right: 12px;
  }
`;

storiesOf('CardSchemeIcons', module)
  .add('Debit cards', () => {
    const { DEBIT_SCHEMES } = schemes;
    const debitIcons = pick(values(DEBIT_SCHEMES), iconComponents);
    return (
      <IconList>
        {flow(
          toPairs,
          map(([name, Icon]) => (
            <IconWrapper key={name}>
              <Icon className={iconStyles} />
            </IconWrapper>
          ))
        )(debitIcons)}
      </IconList>
    );
  })
  .add('Credit cards', () => {
    const { CREDIT_SCHEMES } = schemes;
    const debitIcons = pick(values(CREDIT_SCHEMES), iconComponents);
    return (
      <IconList>
        {flow(
          toPairs,
          map(([name, Icon]) => (
            <IconWrapper key={name}>
              <Icon className={iconStyles} />
            </IconWrapper>
          ))
        )(debitIcons)}
      </IconList>
    );
  });
