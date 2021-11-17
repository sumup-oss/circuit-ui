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

import Avatar from '../Avatar';

import docs from './ImageInput.docs.mdx';
import { ImageInputProps } from './ImageInput';

import ImageInput from '.';

export default {
  title: 'Forms/ImageInput',
  component: ImageInput,
  parameters: {
    docs: { page: docs },
  },
};

export const Base = (args: ImageInputProps): JSX.Element => (
  <ImageInput {...args} />
);

Base.args = {
  label: 'Upload an image',
  clearButtonLabel: 'Clear',
  onChange: () => Promise.resolve(),
  onClear: () => {},
  loadingLabel: 'Uploading',
  component: Avatar,
};

export const WithImage = (): JSX.Element => (
  <ImageInput
    label="Upload an image"
    clearButtonLabel="Clear"
    src="https://source.unsplash.com/EcWFOYOpkpY/200x200"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    loadingLabel="Uploading"
    component={Avatar}
  />
);

export const AsGigaAvatar = (): JSX.Element => (
  <ImageInput
    label="Upload an image"
    clearButtonLabel="Clear"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    loadingLabel="Uploading"
    component={({ src, alt }) => <Avatar src={src} alt={alt} size="giga" />}
    size="giga"
  />
);

export const Invalid = (): JSX.Element => (
  <ImageInput
    label="Upload an image"
    clearButtonLabel="Clear"
    src="https://source.unsplash.com/EcWFOYOpkpY/200x200"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    invalid
    validationHint="The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB."
    loadingLabel="Uploading"
    component={Avatar}
  />
);

export const Stateful = (): JSX.Element => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  /**
   * Fakes a network request that fails 30% of the time
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const uploadFile = (_file: File) =>
    // upload the file to storage
    new Promise<string>((resolve, reject) =>
      setTimeout(() => {
        const shouldFail = Math.random() < 0.3;
        return shouldFail
          ? reject()
          : resolve('https://source.unsplash.com/EcWFOYOpkpY/200x200');
      }, 2000),
    );

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
      component={Avatar}
    />
  );
};

export const CustomComponentImg = (): JSX.Element => (
  <ImageInput
    label="Upload an image"
    clearButtonLabel="Clear"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    loadingLabel="Uploading"
    component={({ src }) => (
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
          src || // we add a transparent svg placeholder to avoid a broken image icon
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>'
        }
        alt="" // we don't need alt text because it is set by the ImageInput, but this fixes a jsx-a11y error
      />
    )}
  />
);

CustomComponentImg.storyName = 'Custom Component (with an img element)';

export const CustomComponentDiv = (): JSX.Element => (
  <ImageInput
    label="Upload an image"
    clearButtonLabel="Clear"
    onChange={() => Promise.resolve()}
    onClear={() => {}}
    loadingLabel="Uploading"
    component={({ src }) => (
      <div
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
