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

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Input from '.';
import Label from '../Label';

storiesOf(`${GROUPS.FORMS}|Input`, module)
  .addParameters({
    component: Input
  })
  .addDecorator(withTests('Input'))
  .add('Input', withInfo()(() => <Input placeholder="Placeholder" />))
  .add(
    'Input valid',
    withInfo()(() => <Input placeholder="Placeholder" showValid />)
  )
  .add(
    'Input invalid',
    withInfo()(() => (
      <Fragment>
        <Input
          placeholder="Placeholder"
          validationHint="This field is required."
          invalid
        />
        <Input placeholder="Placeholder" invalid />
      </Fragment>
    ))
  )
  .add(
    'Input warning',
    withInfo()(() => (
      <Fragment>
        <Input
          placeholder="Placeholder"
          validationHint="This does not look right."
          hasWarning
        />
        <Input placeholder="Placeholder" hasWarning />
      </Fragment>
    ))
  )
  .add(
    'Input optional',
    withInfo()(() => <Input placeholder="Placeholder" optional />)
  )
  .add(
    'Input disabled',
    withInfo()(() => <Input value="Some value" disabled />)
  )
  .add(
    'Input right aligned text',
    withInfo()(() => <Input placeholder="Placeholder" textAlign="right" />)
  )
  .add(
    'Inline inputs',
    withInfo()(() => (
      <div>
        <Input placeholder="First" inline />
        <Input placeholder="Second" inline />
      </div>
    ))
  )
  .add(
    'Stacked inputs',
    withInfo()(() => (
      <div>
        <Label htmlFor="first">My label</Label>
        <Input placeholder="First" id="first" />
        <Label htmlFor="second">My second label</Label>
        <Input placeholder="Second" id="second" />
      </div>
    ))
  );
