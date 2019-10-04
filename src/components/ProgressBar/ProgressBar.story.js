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
import { storiesOf } from '@storybook/react';
import { select, number, text, boolean } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import ProgressBar from './ProgressBar';

storiesOf(`${GROUPS.COMPONENTS}|ProgressBar`, module)
  .addParameters({ jest: ['ProgressBar'] })
  .add('ProgressBar', () => {
    const size = select(
      'Size',
      {
        kilo: ProgressBar.KILO,
        mega: ProgressBar.MEGA,
        giga: ProgressBar.GIGA
      },
      ProgressBar.KILO
    );
    const max = number('Maximum value', 10);
    const value = number('Value', 5);
    const percentage = boolean('Label in percentage', false);
    const defaultLabel = percentage
      ? `${(value / max) * 100}%`
      : `${value}/${max}`;
    const children = text('Label', defaultLabel);
    return (
      <div style={{ width: '25vw' }}>
        <ProgressBar value={value} max={max} size={size}>
          {children}
        </ProgressBar>
      </div>
    );
  });
