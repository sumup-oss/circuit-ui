import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Grid from './Grid';
import Col from '../Col';
// import CenterContainer from '../CenterContainer';

storiesOf('Grid', module)
  .addDecorator(withTests('Grid'))
  .add(
    'Default Grid',
    withInfo()(() => (
      <div style={{ width: '70vw' }}>
        <Grid style={{ height: '90vh' }}>
          <Col span={[2, 4, 6]}>Column 1</Col>
          <Col span={[2, 4, 6]}>Column 2</Col>
        </Grid>
      </div>
    ))
  );
