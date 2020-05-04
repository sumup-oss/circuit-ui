/**
 * Copyright 2020, SumUp Ltd.
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

import React, { FunctionComponent } from 'react';

import Anchor from '.';
import docs from './Anchor.docs.mdx';

export default {
  title: 'Typography/Anchor',
  component: Anchor,
  parameters: {
    docs: { page: docs },
    jest: ['Anchor']
  }
};

export const AsLink: FunctionComponent = () => (
  <Anchor href="https://opensource.sumup.com">
    {`View SumUp's OSS projects`}
  </Anchor>
);

export const AsButton: FunctionComponent = () => (
  <Anchor onClick={() => alert('Hello')}>Say hello</Anchor>
);
