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

import { SortCodeInput, type SortCodeInputProps } from './SortCodeInput.js';

export default {
  title: 'Forms/SortCodeInput',
  component: SortCodeInput,
  tags: ['status:stable'],
};

const baseArgs = {
  label: 'Sort code',
  placeholder: '12-34-56',
};

export const Base = (args: SortCodeInputProps) => (
  <SortCodeInput {...args} style={{ maxWidth: '250px' }} />
);

Base.args = baseArgs;
