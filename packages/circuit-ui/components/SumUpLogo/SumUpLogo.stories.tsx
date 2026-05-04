/**
 * Copyright 2026, SumUp Ltd.
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

import { Matrix } from '../../../../.storybook/components/index.js';

import { SumUpLogo, type SumUpLogoProps } from './SumUpLogo.js';

export default {
  title: 'Brand/SumUpLogo',
  component: SumUpLogo,
  tags: ['status:stable'],
};

export const Base = (args: SumUpLogoProps) => <SumUpLogo {...args} />;

export const Variations = (args: SumUpLogoProps) => (
  <Matrix
    component={SumUpLogo}
    args={args}
    horizontal={{ prop: 'variant', values: ['full', 'short'] }}
    vertical={{ prop: 'size', values: ['s', 'm', 'l'] }}
  />
);
