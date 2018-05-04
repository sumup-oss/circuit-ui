import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import styled from 'react-emotion';

import withTests from '../../util/withTests';
import Grid from './Grid';
import Col from '../Col';
import Row from '../Row';
import { standard } from '../../themes';

const StyledCol = styled(Col)`
  color: ${standard.colors.white};
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  height: 40px;
  padding: 10px;
  &:nth-of-type(n) {
    background-color: ${standard.colors.b500};
  }

  &:nth-of-type(2n) {
    background-color: ${standard.colors.b300};
  }
`;

StyledCol.defaultProps = {
  skip: '0'
};

const StyledRow = styled(Row)`
  border: 2px solid ${standard.colors.y100};
  margin-bottom: 8px;
`;

storiesOf('Grid', module)
  .addDecorator(withTests('Grid'))
  .add(
    'Default Grid',
    withInfo()(() => (
      <div style={{ width: '100vw' }}>
        <Grid>
          <StyledRow>
            <StyledCol span={{ default: 6, untilKilo: 4 }}>
              Col default 6 / Col kilo 4
            </StyledCol>
            <StyledCol span={{ default: 6, untilKilo: 4 }}>
              Col default 6 / Col kilo 4
            </StyledCol>
          </StyledRow>

          <StyledRow>
            <StyledCol span="6">Col default 6</StyledCol>
            <StyledCol span="6">Col default 6</StyledCol>
          </StyledRow>

          <StyledRow>
            <StyledCol span="6" skip="6">
              Col default 6 with skip
            </StyledCol>
            <StyledCol span="6" skip="-6">
              Col default 6 with negative skip
            </StyledCol>
          </StyledRow>
        </Grid>
      </div>
    ))
  );
