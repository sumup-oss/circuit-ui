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

import { Image, type ImageProps } from './Image.js';

export default {
  title: 'Components/Image',
  component: Image,
  tags: ['status:stable'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
  },
};

export const Base = (args: ImageProps) => <Image {...args} />;

Base.args = {
  src: '/images/sumup-tablet-insights.jpg',
  alt: 'A tablet shows sales insights in the SumUp POS app. On the table next to it are a SumUp Solo card reader with printer and two bowls with fruits',
};
