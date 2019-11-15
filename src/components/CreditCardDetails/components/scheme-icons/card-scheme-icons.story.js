/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { flow, toPairs, map, pick, values } from '../../../../util/fp';
import { iconComponents } from './card-scheme-icons';
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

export default {
  title: 'Forms|CreditCardDetails/CardSchemeIcons'
};

export const debitCards = () => {
  const { DEBIT_SCHEMES } = schemes;
  const debitIcons = pick(values(DEBIT_SCHEMES), iconComponents);
  return (
    <IconList>
      {flow(
        toPairs,
        map(([name, Icon]) => (
          <IconWrapper key={name}>
            <Icon css={iconStyles} />
          </IconWrapper>
        ))
      )(debitIcons)}
    </IconList>
  );
};

export const creditCards = () => {
  const { CREDIT_SCHEMES } = schemes;
  const debitIcons = pick(values(CREDIT_SCHEMES), iconComponents);
  return (
    <IconList>
      {flow(
        toPairs,
        map(([name, Icon]) => (
          <IconWrapper key={name}>
            <Icon css={iconStyles} />
          </IconWrapper>
        ))
      )(debitIcons)}
    </IconList>
  );
};
