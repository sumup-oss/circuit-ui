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
import { action } from '@storybook/addon-actions';

import AutoCompleteTags from './AutoCompleteTags';

const randomItems = [];
const mails = ['@sumup.com', '@gmail.com', '@hotmail.com'];
const names = ['liam', 'josh', 'tom', 'adam', 'aaron', 'john', 'killjoy'];
const pushRandom = () => {
  const name =
    names[Math.floor(Math.random() * names.length)] +
    Math.floor(Math.random() * 20000) +
    mails[Math.floor(mails.length * Math.random())];

  if (randomItems.includes(name)) {
    pushRandom();
  } else {
    randomItems.push(name);
  }
};
for (let i = 0; i < 10000; i += 1) {
  pushRandom();
}

storiesOf('Forms|AutoCompleteTags', module)
  .addParameters({ jest: ['AutoCompleteTags'] })
  .add('Default AutoCompleteTags', () => (
    <div style={{ width: '300px' }}>
      <AutoCompleteTags
        availableTags={randomItems}
        onChange={action('handleChange')}
      />
    </div>
  ));
