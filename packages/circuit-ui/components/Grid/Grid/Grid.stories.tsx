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

import styled from '../../../styles/styled.js';
import { Grid, Row, Col } from '..';

export default {
  title: 'Layout/Grid/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
};

const StyledCol = styled(Col)`
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

export const StaticColumns = () => (
  <Grid>
    <StyledRow>
      <StyledCol span="2">Col 2</StyledCol>
      <StyledCol span="2">Col 2</StyledCol>
      <StyledCol span="2">Col 2</StyledCol>
      <StyledCol span="2">Col 2</StyledCol>
      <StyledCol span="2">Col 2</StyledCol>
      <StyledCol span="2">Col 2</StyledCol>
    </StyledRow>

    <StyledRow>
      <StyledCol span="3">Col 3</StyledCol>
      <StyledCol span="3">Col 3</StyledCol>
      <StyledCol span="3">Col 3</StyledCol>
      <StyledCol span="3">Col 3</StyledCol>
    </StyledRow>

    <StyledRow>
      <StyledCol span="4">Col 4</StyledCol>
      <StyledCol span="4">Col 4</StyledCol>
      <StyledCol span="4">Col 4</StyledCol>
    </StyledRow>

    <StyledRow>
      <StyledCol span="4">Col 4</StyledCol>
      <StyledCol span="2">Col 2</StyledCol>
      <StyledCol span="2">Col 2</StyledCol>
      <StyledCol span="1">Col 1</StyledCol>
      <StyledCol span="3">Col 4</StyledCol>
    </StyledRow>

    <StyledRow>
      <StyledCol span="6">Col 6</StyledCol>
      <StyledCol span="6">Col 6</StyledCol>
    </StyledRow>
  </Grid>
);

export const ResponsiveColumns = () => (
  <Grid>
    <StyledRow>
      <StyledCol span={{ default: 12, mega: 3, kilo: 6 }}>resize me</StyledCol>
      <StyledCol span={{ default: 12, mega: 3, kilo: 6 }}>resize me</StyledCol>
      <StyledCol span={{ default: 12, mega: 3, kilo: 6 }}>resize me</StyledCol>
      <StyledCol span={{ default: 12, mega: 3, kilo: 6 }}>resize me</StyledCol>
    </StyledRow>

    <StyledRow>
      <StyledCol span={{ default: 12, mega: 3, kilo: 6 }}>resize me</StyledCol>
      <StyledCol span="6">half</StyledCol>
    </StyledRow>
  </Grid>
);

export const SkippingColumns = () => (
  <Grid>
    <StyledRow>
      <StyledCol span="3">Col 3</StyledCol>
      <StyledCol span="3">Col 3</StyledCol>
      <StyledCol span="3" skip="3">
        Col 3
      </StyledCol>
    </StyledRow>

    <StyledRow>
      <StyledCol span="6" skip="6">
        First column
      </StyledCol>
      <StyledCol span="6" skip="-6">
        Second Column
      </StyledCol>
    </StyledRow>
  </Grid>
);

export const ResponsiveSkipping = () => (
  <Grid>
    <StyledRow>
      <StyledCol span="3">Col 3</StyledCol>
      <StyledCol span="3">Col 3</StyledCol>
      <StyledCol span="3" skip={{ default: 0, untilKilo: 3 }}>
        skip mobile
      </StyledCol>
    </StyledRow>

    <StyledRow>
      <StyledCol span="6" skip={{ default: 6, untilKilo: 0 }}>
        first column
      </StyledCol>
      <StyledCol span="6" skip={{ default: -6, untilKilo: 0 }}>
        second column
      </StyledCol>
    </StyledRow>
  </Grid>
);
