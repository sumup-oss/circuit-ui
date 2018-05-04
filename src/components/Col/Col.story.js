import React from 'react';
import styled from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { standard } from '../../themes';

import withTests from '../../util/withTests';
import Col from './Col';

const StyledCol = styled(Col)`
  background-color: ${standard.colors.b500};
  color: ${standard.colors.white};
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  height: 40px;
  padding: 10px;
`;

StyledCol.defaultProps = {
  skip: '0'
};

storiesOf('Col', module)
  .addDecorator(withTests('Col'))
  .add(
    'Default Col',
    withInfo()(() => (
      <div style={{ width: '100vw' }}>
        <StyledCol span="12">Default Column</StyledCol>
      </div>
    ))
  );
