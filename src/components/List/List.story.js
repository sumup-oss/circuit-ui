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
import { withInfo } from '@storybook/addon-info';
import { boolean, select } from '@storybook/addon-knobs';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import List from './List';

const sizes = [List.KILO, List.MEGA, List.GIGA];

storiesOf(`${GROUPS.COMPONENTS}|List`, module)
  .addParameters({
    component: List
  })
  .addDecorator(withTests('List'))
  .add(
    'List',
    withInfo()(() => (
      <List size={select('Size', sizes, sizes[0])} ordered={boolean('Ordered')}>
        <li>This is a list</li>
        <li>A very fine list</li>
        <List
          size={select('Size', sizes, sizes[0])}
          ordered={boolean('Ordered')}
        >
          <li>Sometimes a nested list</li>
        </List>
        <li>The kind of list you like</li>
      </List>
    ))
  );
