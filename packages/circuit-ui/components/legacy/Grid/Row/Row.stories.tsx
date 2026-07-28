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

import { Row, Col } from '../index.js';
import styles from '../Grid/GridStories.module.css';

export default {
  title: 'Layout/Row',
  component: Row,
  tags: ['status:legacy'],
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Base = () => (
  <Row className={styles.row}>
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
);
