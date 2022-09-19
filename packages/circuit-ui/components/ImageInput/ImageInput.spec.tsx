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
import {
  render,
  axe,
  userEvent,
  fireEvent,
  waitFor,
  createEvent,
} from '../../util/test-utils';

import { ImageInput, ImageInputProps } from './ImageInput';

const defaultProps = {
  label: 'Upload an image',
  loadingLabel: 'Uploading',
  clearButtonLabel: 'Clear',
  onChange: () => Promise.resolve(),
  onClear: () => {},
  component: Avatar,
} as const;

describe('ImageInput', () => {
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
        src: '/images/illustration-coffee.jpg',
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

    it('should render with smaller button', () => {
      const { container } = renderImageInput({
        ...defaultProps,
        size: 'giga',
      });
      expect(container).toMatchSnapshot();
    });

    it('should render a custom component', () => {
      const { container } = renderImageInput({
        ...defaultProps,
        src: '/images/illustration-coffee.jpg',
        // eslint-disable-next-line react/display-name
        component: ({ src }) => (
          <img
            style={{
              width: '400px',
              height: '100px',
            }}
            src={src}
            alt=""
          />
        ),
      });
      expect(container).toMatchSnapshot();
    });
  });

  const mockUploadFn = jest
    .fn<Promise<string>, [File]>()
    .mockResolvedValue('/images/illustration-coffee.jpg');
  const mockClearFn = jest.fn();

  /**
   * Copied from the component Stories
   */
  function StatefulInput() {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onChange = (file: File) => {
      setError('');
      setImageUrl('');
      return mockUploadFn(file)
        .then((remoteImageUrl) => {
          setImageUrl(remoteImageUrl);
        })
        .catch((e: Error) => setError(e.message));
    };

    const onClear = () => {
      setError('');
      setImageUrl('');
      mockClearFn();
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
  }

  describe('business logic', () => {
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    it('should call the provided upload function', async () => {
      const { getByLabelText } = render(<StatefulInput />);
      const inputEl = getByLabelText(defaultProps.label) as HTMLInputElement;

      await userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(inputEl.files && inputEl.files[0]).toEqual(file);
        expect(inputEl.files).toHaveLength(1);
        expect(mockUploadFn).toHaveBeenCalledWith(file);
      });
    });

    /**
     * FIXME: this test triggers an act() warning.
     */
    it('should support dragging and dropping an image', async () => {
      const { getByText } = render(<StatefulInput />);
      const labelEl = getByText(defaultProps.label);

      fireEvent.drop(labelEl, { dataTransfer: { files: [file] } });

      await waitFor(() => {
        expect(mockUploadFn).toHaveBeenCalledWith(file);
      });
    });

    /**
     * FIXME: this test triggers an act() warning.
     */
    it('should support pasting an image', async () => {
      const { getByLabelText } = render(<StatefulInput />);
      const inputEl = getByLabelText(defaultProps.label) as HTMLInputElement;

      const paste = createEvent.paste(inputEl, {
        clipboardData: { files: [file] },
      });

      fireEvent(inputEl, paste);

      await waitFor(() => {
        expect(mockUploadFn).toHaveBeenCalledWith(file);
      });
    });

    it('should render a successfully uploaded image', async () => {
      const { getByLabelText, getByRole } = render(<StatefulInput />);
      const inputEl = getByLabelText(defaultProps.label) as HTMLInputElement;
      const imageEl = getByRole('img') as HTMLImageElement;

      await userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(imageEl.src).toBe(
          'http://localhost/images/illustration-coffee.jpg',
        );
      });
    });

    it('should clear an uploaded image', async () => {
      const { getByLabelText, getByRole } = render(<StatefulInput />);
      const inputEl = getByLabelText(defaultProps.label) as HTMLInputElement;
      const imageEl = getByRole('img') as HTMLImageElement;

      await userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(imageEl.src).toBe(
          'http://localhost/images/illustration-coffee.jpg',
        );
      });

      await userEvent.click(
        getByRole('button', { name: defaultProps.clearButtonLabel }),
      );

      await waitFor(() => {
        expect(mockClearFn).toHaveBeenCalledTimes(1);
        expect(imageEl.src).not.toBe(
          'http://localhost/images/illustration-coffee.jpg',
        );
      });
    });

    it('should render an error message when the upload fails', async () => {
      const errorMessage =
        'The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB.';
      mockUploadFn.mockRejectedValue(new Error(errorMessage));
      const { getByLabelText, getByText } = render(<StatefulInput />);
      const inputEl = getByLabelText(defaultProps.label) as HTMLInputElement;

      await userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(getByText(errorMessage)).toBeVisible();
        expect(inputEl).toBeInvalid();
      });
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
