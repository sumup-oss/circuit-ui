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

import { Grid, Row, Col } from '../index.js';
import styles from './GridStories.module.css';

export default {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['status:legacy'],
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

const rowStyles = {
  border: '1px solid magenta',
  'margin-bottom': '8px',
};

export const StaticColumns = () => (
  <Grid>
    <Row style={rowStyles}>
      <Col className={styles.col} span="2">
        Col 2
      </Col>
      <Col className={styles.col} span="2">
        Col 2
      </Col>
      <Col className={styles.col} span="2">
        Col 2
      </Col>
      <Col className={styles.col} span="2">
        Col 2
      </Col>
      <Col className={styles.col} span="2">
        Col 2
      </Col>
      <Col className={styles.col} span="2">
        Col 2
      </Col>
    </Row>

    <Row style={rowStyles}>
      <Col className={styles.col} span="3">
        Col 3
      </Col>
      <Col className={styles.col} span="3">
        Col 3
      </Col>
      <Col className={styles.col} span="3">
        Col 3
      </Col>
      <Col className={styles.col} span="3">
        Col 3
      </Col>
    </Row>

    <Row style={rowStyles}>
      <Col className={styles.col} span="4">
        Col 4
      </Col>
      <Col className={styles.col} span="4">
        Col 4
      </Col>
      <Col className={styles.col} span="4">
        Col 4
      </Col>
    </Row>

    <Row style={rowStyles}>
      <Col className={styles.col} span="4">
        Col 4
      </Col>
      <Col className={styles.col} span="2">
        Col 2
      </Col>
      <Col className={styles.col} span="2">
        Col 2
      </Col>
      <Col className={styles.col} span="1">
        Col 1
      </Col>
      <Col className={styles.col} span="3">
        Col 4
      </Col>
    </Row>

    <Row style={rowStyles}>
      <Col className={styles.col} span="6">
        Col 6
      </Col>
      <Col className={styles.col} span="6">
        Col 6
      </Col>
    </Row>
  </Grid>
);

export const ResponsiveColumns = () => (
  <Grid>
    <Row style={rowStyles}>
      <Col className={styles.col} span={{ default: 12, mega: 3, kilo: 6 }}>
        resize me
      </Col>
      <Col className={styles.col} span={{ default: 12, mega: 3, kilo: 6 }}>
        resize me
      </Col>
      <Col className={styles.col} span={{ default: 12, mega: 3, kilo: 6 }}>
        resize me
      </Col>
      <Col className={styles.col} span={{ default: 12, mega: 3, kilo: 6 }}>
        resize me
      </Col>
    </Row>

    <Row style={rowStyles}>
      <Col className={styles.col} span={{ default: 12, mega: 3, kilo: 6 }}>
        resize me
      </Col>
      <Col className={styles.col} span="6">
        half
      </Col>
    </Row>
  </Grid>
);

export const SkippingColumns = () => (
  <Grid>
    <Row style={rowStyles}>
      <Col className={styles.col} span="3">
        Col 3
      </Col>
      <Col className={styles.col} span="3">
        Col 3
      </Col>
      <Col className={styles.col} span="3" skip="3">
        Col 3
      </Col>
    </Row>

    <Row style={rowStyles}>
      <Col className={styles.col} span="6" skip="6">
        First column
      </Col>
      <Col className={styles.col} span="6" skip="-6">
        Second Column
      </Col>
    </Row>
  </Grid>
);

export const ResponsiveSkipping = () => (
  <Grid>
    <Row style={rowStyles}>
      <Col className={styles.col} span="3">
        Col 3
      </Col>
      <Col className={styles.col} span="3">
        Col 3
      </Col>
      <Col className={styles.col} span="3" skip={{ default: 0, untilKilo: 3 }}>
        skip mobile
      </Col>
    </Row>

    <Row style={rowStyles}>
      <Col className={styles.col} span="6" skip={{ default: 6, untilKilo: 0 }}>
        first column
      </Col>
      <Col className={styles.col} span="6" skip={{ default: -6, untilKilo: 0 }}>
        second column
      </Col>
    </Row>
  </Grid>
);
