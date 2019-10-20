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
import { select, boolean } from '@storybook/addon-knobs/react';

import ButtonGroup from '.';
import Button from '../Button';

storiesOf('Components|Button/ButtonGroup', module)
  .addParameters({ jest: ['ButtonGroup'] })
  .add('Default ButtonGroup', () => (
    <div
      style={{ maxWidth: '500px', width: '100vw', border: '1px dotted #000' }}
    >
      <ButtonGroup
        align={select(
          'Align',
          [ButtonGroup.LEFT, ButtonGroup.CENTER, ButtonGroup.RIGHT],
          ButtonGroup.RIGHT
        )}
        inlineMobile={boolean('Display inline on mobile', false)}
      >
        <Button secondary>Cancel</Button>
        <Button primary>Confirm</Button>
      </ButtonGroup>
    </div>
  ));
