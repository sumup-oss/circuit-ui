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

import docs from './Image.docs.mdx';
import { Image, ImageProps } from './Image';

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    docs: { page: docs },
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
  },
};

export const Base = (args: ImageProps) => <Image {...args} />;

Base.args = {
  src: 'https://source.unsplash.com/QU-zhliIV8Q/1600x900',
  alt: 'Aerial photo of turbulent blue-turquoise ocean waves',
};
