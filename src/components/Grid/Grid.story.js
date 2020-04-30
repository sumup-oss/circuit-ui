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

import Grid from './Grid';
import Col from '../Col';
import Row from '../Row';

const StyledCol = styled(Col)`
  color: ${p => p.theme.colors.white};
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  height: 40px;
  padding: 10px;
  &:nth-of-type(n) {
    background-color: ${p => p.theme.colors.b500};
  }

  &:nth-of-type(2n) {
    background-color: ${p => p.theme.colors.b300};
  }
`;

StyledCol.defaultProps = {
  skip: '0'
};

const StyledRow = styled(Row)`
  border: 2px solid ${p => p.theme.colors.y100};
  margin-bottom: 8px;
`;

export default {
  title: 'Layout/Grid/Grid',
  component: Grid,
  parameters: {
    jest: ['Grid']
  }
};

export const staticColumns = () => (
  <div style={{ width: '100vw' }}>
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
        <StyledCol span="1">1</StyledCol>
        <StyledCol span="3">Col 4</StyledCol>
      </StyledRow>

      <StyledRow>
        <StyledCol span="6">Col 6</StyledCol>
        <StyledCol span="6">Col 6</StyledCol>
      </StyledRow>
    </Grid>
  </div>
);

export const responsiveColumns = () => (
  <div style={{ width: '100vw' }}>
    <Grid>
      <StyledRow>
        <StyledCol span={{ default: 12, mega: 3, kilo: 6 }}>
          resize me
        </StyledCol>
        <StyledCol span={{ default: 12, mega: 3, kilo: 6 }}>
          resize me
        </StyledCol>
        <StyledCol span={{ default: 12, mega: 3, kilo: 6 }}>
          resize me
        </StyledCol>
        <StyledCol span={{ default: 12, mega: 3, kilo: 6 }}>
          resize me
        </StyledCol>
      </StyledRow>

      <StyledRow>
        <StyledCol span={{ default: 12, mega: 3, kilo: 6 }}>
          resize me
        </StyledCol>
        <StyledCol span="6">half</StyledCol>
      </StyledRow>
    </Grid>
  </div>
);

export const skippingColumns = () => (
  <div style={{ width: '100vw' }}>
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
  </div>
);

export const responsiveSkipping = () => (
  <div style={{ width: '100vw' }}>
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
  </div>
);
