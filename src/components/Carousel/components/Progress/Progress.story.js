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
import { boolean, number } from '@storybook/addon-knobs/react';

import Progress from './Progress';
import { SLIDE_DURATION } from '../../constants';

export default {
  title: 'Components/Carousel/Progress',
  component: Progress,
  parameters: {
    jest: ['Carousel/Progress']
  }
};

export const base = () => (
  <div style={{ width: '60vw' }}>
    <Progress
      paused={boolean('Paused', false)}
      cycle={boolean('Cycle', true)}
      animationDuration={number('Animation duration', SLIDE_DURATION)}
    />
  </div>
);
