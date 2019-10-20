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
import { storiesOf } from '@storybook/react';

import Row from './Row';
import Col from '../Col';
import { circuit } from '../../themes';

const StyledCol = styled(Col)`
  color: ${circuit.colors.white};
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  height: 40px;
  padding: 10px;
  &:nth-of-type(n) {
    background-color: ${circuit.colors.b500};
  }

  &:nth-of-type(2n) {
    background-color: ${circuit.colors.b300};
  }
`;

StyledCol.defaultProps = {
  skip: '0'
};

const StyledRow = styled(Row)`
  border: 2px solid ${circuit.colors.y100};
  margin-bottom: 8px;
`;

storiesOf('Grid|Row', module)
  .addParameters({ component: Row })
  .addParameters({ jest: ['Row'] })
  .add('Default Row', () => (
    <div style={{ width: '100vw' }}>
      <StyledRow>
        <StyledCol span="4">Col 4</StyledCol>
        <StyledCol span="4">Col 4</StyledCol>
        <StyledCol span="4">Col 4</StyledCol>
      </StyledRow>
    </div>
  ));
