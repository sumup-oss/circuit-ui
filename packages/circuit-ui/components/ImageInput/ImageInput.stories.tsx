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
import { useState } from 'react';
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
  clearButtonLabel: 'Clear',
  onChange: () => Promise.resolve(),
  onClear: () => {},
  loadingLabel: 'Uploading',
};

export const withImage = (): JSX.Element => (
  <ImageInput
    label="Upload an image"
    clearButtonLabel="Clear"
    imageUrl="https://source.unsplash.com/EcWFOYOpkpY/200x200"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    loadingLabel="Uploading"
  />
);

export const invalid = (): JSX.Element => (
  <ImageInput
    label="Upload an image"
    clearButtonLabel="Clear"
    imageUrl="https://source.unsplash.com/EcWFOYOpkpY/200x200"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    invalid={true}
    validationHint="The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB."
    loadingLabel="Uploading"
  />
);

export const Stateful = (): JSX.Element => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  /**
   * Fakes a network request that fails 30% of the time
   */
  const uploadFile = (file) =>
    // upload the file to storage
    new Promise<string>((resolve, reject) =>
      setTimeout(() => {
        const shouldFail = Math.random() < 0.3;
        return shouldFail
          ? reject()
          : resolve('https://source.unsplash.com/EcWFOYOpkpY/200x200');
      }, 2000),
    );

  const onChange = (file) => {
    setError('');
    setImageUrl('');
    return uploadFile(file)
      .then((remoteImageUrl) => {
        setImageUrl(remoteImageUrl);
      })
      .catch(() =>
        setError(
          'The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB.',
        ),
      );
  };

  const onClear = () => {
    setError('');
    setImageUrl('');
  };

  return (
    <ImageInput
      label="Upload an image"
      clearButtonLabel="Clear"
      imageUrl={imageUrl}
      onChange={onChange}
      onClear={onClear}
      invalid={!!error}
      validationHint={error}
      loadingLabel="Uploading"
    />
  );
};
