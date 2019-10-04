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
import { select, boolean } from '@storybook/addon-knobs';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import Text from '.';

const elements = ['p', 'article', 'div', 'span', 'strong', 'em'];
const sizes = [Text.KILO, Text.MEGA, Text.GIGA];

// eslint-disable-next-line max-len
const content = `An electronic circuit is composed of individual electronic components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces through which electric current can flow.`;

storiesOf(`${GROUPS.TYPOGRAPHY}|Text`, module)
  .addParameters({ jest: ['Text'] })
  .add('Text', () => (
    <div style={{ width: '66%', margin: '0 auto' }}>
      <Text
        as={select('Element', elements, elements[0])}
        size={select('Size', sizes, sizes[0])}
        noMargin={boolean('No margin')}
        bold={boolean('Bold')}
        italic={boolean('Italic')}
        strike={boolean('Strike through')}
      >
        {content}
      </Text>
    </div>
  ));
