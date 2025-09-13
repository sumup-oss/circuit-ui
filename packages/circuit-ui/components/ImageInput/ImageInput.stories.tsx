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

import { useState } from 'react';

import { Avatar } from '../Avatar/index.js';

import type { ImageInputProps } from './ImageInput.js';

import { ImageInput } from './index.js';

export default {
  title: 'Forms/ImageInput',
  component: ImageInput,
  tags: ['status:stable'],
};

export const Base = (args: ImageInputProps) => <ImageInput {...args} />;

Base.args = {
  label: 'Upload an image',
  clearButtonLabel: 'Clear',
  onChange: () => Promise.resolve(),
  onClear: () => {},
  loadingLabel: 'Uploading',
  component: Avatar,
  disabled: false,
};

export const WithImage = () => (
  <ImageInput
    label="Upload an image"
    clearButtonLabel="Clear"
    src="/images/illustration-coffee.jpg"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    loadingLabel="Uploading"
    component={(props) => <Avatar {...props} alt="" />}
  />
);

export const Invalid = (args: ImageInputProps) => (
  <ImageInput
    {...args}
    label="Upload an image"
    clearButtonLabel="Clear"
    src="/images/illustration-coffee.jpg"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    invalid
    validationHint="The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB."
    loadingLabel="Uploading"
    component={(props) => <Avatar {...props} alt="" />}
  />
);

export const Disabled = (args: ImageInputProps) => (
  <ImageInput
    {...args}
    label="Upload an image"
    clearButtonLabel="Clear"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    disabled
    loadingLabel="Uploading"
    component={(props) => <Avatar {...props} alt="" />}
    hideLabel={false}
  />
);

export const Stateful = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  /**
   * Fakes a network request that fails 30% of the time
   */
  const uploadFile = (_file: File) =>
    // upload the file to storage
    new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.3;
        if (shouldFail) {
          reject(new Error());
        } else {
          resolve('/images/illustration-coffee.jpg');
        }
      }, 2000);
    });

  const onChange = (file: File) => {
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
      src={imageUrl}
      onChange={onChange}
      onClear={onClear}
      invalid={!!error}
      validationHint={error}
      loadingLabel="Uploading"
      component={(props) => <Avatar {...props} alt="" />}
    />
  );
};

export const CustomComponentImg = () => (
  <ImageInput
    label="Upload an image"
    clearButtonLabel="Clear"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    loadingLabel="Uploading"
    component={({ src, ...props }) => (
      <img
        style={{
          display: 'block',
          width: '400px',
          height: '100px',
          backgroundColor: 'lightgrey',
          objectFit: 'cover',
          objectPosition: 'cover',
        }}
        src={
          src || // The transparent SVG placeholder avoids a broken image icon
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>'
        }
        {...props}
        alt="" // Technically, the `alt` text isn't necessary since the ImageInput applies `aria-hidden="true"`, but this silences a jsx-a11y error
      />
    )}
  />
);

CustomComponentImg.storyName = 'Custom Component (with an img element)';

export const CustomComponentDiv = () => (
  <ImageInput
    label="Upload an image"
    clearButtonLabel="Clear"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    loadingLabel="Uploading"
    component={({ src, ...props }) => (
      <div
        {...props}
        style={{
          width: '400px',
          height: '100px',
          backgroundColor: 'lightgrey',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: src ? `url(${src})` : undefined,
        }}
      />
    )}
  />
);

CustomComponentDiv.storyName = 'Custom Component (with a div element)';
