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

import { circuit } from '../../themes';

import Col from './Col';

const StyledCol = styled(Col)`
  background-color: ${circuit.colors.b500};
  color: ${circuit.colors.white};
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  height: 40px;
  padding: 10px;
`;

StyledCol.defaultProps = {
  skip: '0'
};

export default {
  title: 'Grid|Col',

  parameters: {
    component: Col,
    jest: ['Col']
  }
};

export const col = () => (
  <div style={{ width: '100vw' }}>
    <StyledCol span="12">Column</StyledCol>
  </div>
);

col.story = {
  name: 'Col'
};
