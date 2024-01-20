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

import styled from '../../../../styles/styled.js';
import { Row, Col } from '../index.js';

export default {
  title: 'Layout/Grid/Row',
  component: Row,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
};

const StyledCol = styled(Col)`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  height: 48px;
  padding: 12px;
  &:nth-of-type(n) {
    background-color: var(--cui-bg-highlight);
  }

  &:nth-of-type(2n) {
    background-color: var(--cui-bg-subtle);
  }
`;

const StyledRow = styled(Row)`
  border: 1px solid magenta;
  margin-bottom: 8px;
`;

export const Base = () => (
  <StyledRow>
    <StyledCol span="4">Col 4</StyledCol>
    <StyledCol span="4">Col 4</StyledCol>
    <StyledCol span="4">Col 4</StyledCol>
  </StyledRow>
);
