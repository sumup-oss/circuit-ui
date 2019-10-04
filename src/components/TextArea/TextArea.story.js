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
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import TextArea from '.';

storiesOf(`${GROUPS.FORMS}|TextArea`, module)
  .addParameters({
    component: TextArea
  })
  .addDecorator(withTests('TextArea'))
  .add(
    'TextArea',
    withInfo()(() => <TextArea placeholder="Enter your story here" />)
  )
  .add(
    'TextArea invalid',
    withInfo()(() => (
      <TextArea placeholder="Invalid TextArea, maybe too many chars?" invalid />
    ))
  )
  .add(
    'TextArea warning',
    withInfo()(() => (
      <TextArea
        placeholder="TextArea with warning, maybe too many chars?"
        hasWarning
      />
    ))
  )
  .add(
    'TextArea optional',
    withInfo()(() => <TextArea placeholder="Optional" optional />)
  )
  .add(
    'TextArea disabled',
    withInfo()(() => (
      <TextArea
        value="You cannot enter text because the textarea is disabled"
        disabled
      />
    ))
  );
