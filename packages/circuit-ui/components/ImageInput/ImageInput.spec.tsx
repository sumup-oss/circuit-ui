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

import React, { useState } from 'react';

import { render, axe, userEvent } from '../../util/test-utils';

import { ImageInput, ImageInputProps } from './ImageInput';

const defaultProps: ImageInputProps = {
  label: 'Upload an image',
  loadingLabel: 'Uploading',
  clearButtonLabel: 'Clear',
  onChange: () => Promise.resolve(),
  onClear: () => {},
};

describe('ImageInput', () => {
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  global.URL.createObjectURL = jest.fn();

  function renderImageInput(
    props: ImageInputProps = defaultProps,
    options = {},
  ) {
    return render(<ImageInput {...props} />, options);
  }

  describe('styles', () => {
    it('should render with default styles', () => {
      const { container } = renderImageInput();
      expect(container).toMatchSnapshot();
    });

    it('should render with an existing image', () => {
      const { container } = renderImageInput({
        ...defaultProps,
        imageUrl: 'https://source.unsplash.com/EcWFOYOpkpY/200x200',
      });
      expect(container).toMatchSnapshot();
    });

    it('should render with invalid styles', () => {
      const { container } = renderImageInput({
        ...defaultProps,
        invalid: true,
        validationHint:
          'The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB.',
      });
      expect(container).toMatchSnapshot();
    });

    it.todo('should render with loading styles');
  });

  /**
   * Copied from the component Stories
   */
  function StatefulInput() {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [error, setError] = useState<string>('');

    const uploadFile = (
      _file: File, // we need the _ to tell TS the variable is unused
    ) =>
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
        imageUrl={imageUrl}
        onChange={onChange}
        onClear={onClear}
        invalid={!!error}
        validationHint={error}
        loadingLabel="Uploading"
      />
    );
  }

  describe('business logic', () => {
    it('should upload an image', () => {
      const { getAllByLabelText } = render(<StatefulInput />);
      const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });
      /**
       * TODO find a better way to query the input. We can't use a query by role because
       * a file input can be a role=button (according to Chrome) but role=button on an
       * input element is invalid according to jest-axe.
       */
      const input = getAllByLabelText(
        defaultProps.label,
      )[1] as HTMLInputElement;
      userEvent.upload(input, file);
      expect(input.files && input.files[0]).toEqual(file);
      expect(input.files).toHaveLength(1);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = render(<StatefulInput />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
