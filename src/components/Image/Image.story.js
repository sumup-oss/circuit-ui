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
import Image from './Image';

storiesOf(`${GROUPS.COMPONENTS}|Image`, module)
  .addParameters({
    component: Image
  })
  .addDecorator(withTests('Image'))
  .add(
    'Responsive Image',
    withInfo()(() => (
      <Image
        src="http://www.placepuppy.net/800/500"
        alt="A random cute puppy"
      />
    ))
  );
