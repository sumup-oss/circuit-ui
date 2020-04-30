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
import { boolean } from '@storybook/addon-knobs/react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Spinner from './Spinner';

const Container = styled('div')(
  ({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.n500};
    display: flex;
    height: 50px;
    justify-content: center;
    width: 50px;
  `
);

export default {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    jest: ['Spinner']
  }
};

export const base = () => (
  <Container>
    <Spinner dark={boolean('Dark', false)} active={boolean('Active', true)} />
  </Container>
);
