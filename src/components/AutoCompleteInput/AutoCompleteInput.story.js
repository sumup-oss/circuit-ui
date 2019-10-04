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
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import AutoCompleteInput from './AutoCompleteInput';

storiesOf(`${GROUPS.FORMS}|AutoCompleteInput`, module)
  .addParameters({
    component: AutoCompleteInput
  })
  .addDecorator(withTests('AutoCompleteInput'))
  .add(
    'Default AutoCompleteInput',
    withInfo()(() => (
      <div style={{ width: '300px' }}>
        <AutoCompleteInput
          items={[
            'liam.murphy@sumup.com',
            'liam.burdock@sumup.com',
            'lilijane.giordano@sumup.com'
          ]}
          onChange={action('handleChange')}
          clearOnSelect={boolean('clearOnSelect', false)}
        />
      </div>
    ))
  );
