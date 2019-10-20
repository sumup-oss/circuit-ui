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

import TextArea from '.';

storiesOf('Forms|TextArea', module)
  .addParameters({ jest: ['TextArea'] })
  .add('TextArea', () => <TextArea placeholder="Enter your story here" />)
  .add('TextArea invalid', () => (
    <TextArea placeholder="Invalid TextArea, maybe too many chars?" invalid />
  ))
  .add('TextArea warning', () => (
    <TextArea
      placeholder="TextArea with warning, maybe too many chars?"
      hasWarning
    />
  ))
  .add('TextArea optional', () => <TextArea placeholder="Optional" optional />)
  .add('TextArea disabled', () => (
    <TextArea
      value="You cannot enter text because the textarea is disabled"
      disabled
    />
  ));
