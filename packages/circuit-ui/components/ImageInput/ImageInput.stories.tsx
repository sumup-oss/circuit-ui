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

/** @jsx jsx */
import { jsx } from '@emotion/core';

import docs from './ImageInput.docs.mdx';
import { ImageInputProps } from './ImageInput';

import ImageInput from '.';

export default {
  title: 'Components/ImageInput',
  component: ImageInput,
  parameters: {
    docs: { page: docs },
  },
};

export const base = (args: ImageInputProps): JSX.Element => (
  <ImageInput {...args} />
);

base.args = {
  label: 'Upload an image',
};

export const withImage = (): JSX.Element => (
  <ImageInput
    label="Upload an image"
    imageUrl="https://source.unsplash.com/EcWFOYOpkpY"
  />
);
