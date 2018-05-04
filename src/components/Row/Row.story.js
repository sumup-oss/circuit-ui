import React from 'react';
import styled from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Row from './Row';
import Col from '../Col';
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

storiesOf('Row', module)
  .addDecorator(withTests('Row'))
  .add(
    'Default Row',
    withInfo()(() => (
      <div style={{ width: '100vw' }}>
        <StyledRow>
          <StyledCol span="4">Col 4</StyledCol>
          <StyledCol span="4">Col 4</StyledCol>
          <StyledCol span="4">Col 4</StyledCol>
        </StyledRow>
      </div>
    ))
  );
