/**
 * Copyright 2021, SumUp Ltd.
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

import { Title, TitleProps } from './Title';

export default {
  title: 'Typography/Title',
  component: Title,
};

export const Base = (args: TitleProps) => (
  <Title {...args}>This is a Title</Title>
);

const sizes = ['one', 'two', 'three', 'four'] as const;

export const Sizes = (args: TitleProps) =>
  sizes.map((s) => (
    <Title key={s} {...args} size={s}>
      This is a Title {s}
    </Title>
  ));
