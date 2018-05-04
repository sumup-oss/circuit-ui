import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import Grid from './Grid';
import Col from '../Col';
import Row from '../Row';

storiesOf('Grid', module)
  .addDecorator(withTests('Grid'))
  .add(
    'Default Grid',
    withInfo()(() => (
      <div style={{ width: '70vw' }}>
        <Grid style={{ height: '90vh' }}>
          <Row>
            <Col span="3">Column 1</Col>
            <Col span="3">Column 2</Col>
            <Col span="3">Column 3</Col>
            <Col span="3">Column 4</Col>
          </Row>

          <Row>
            <Col span="6">Column 1</Col>
            <Col span="6">Column 2</Col>
          </Row>

          <Row>
            <Col span="6" skip="6">
              Column 1
            </Col>
            <Col span="6" skip="-6">
              Column 2
            </Col>
          </Row>
        </Grid>
      </div>
    ))
  );
