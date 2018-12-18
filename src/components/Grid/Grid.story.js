import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import styled from '@emotion/styled';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Grid from './Grid';
import Col from '../Col';
import Row from '../Row';
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

storiesOf(`${GROUPS.GRID}|Grid`, module)
  .addDecorator(withTests('Grid'))
  .add(
    'Static columns',
    withInfo()(() => (
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
    ))
  )
  .add(
    'Responsive columns',
    withInfo()(() => (
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
    ))
  )
  .add(
    'Skipping columns',
    withInfo()(() => (
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
    ))
  )
  .add(
    'Responsive skipping',
    withInfo()(() => (
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
    ))
  );
