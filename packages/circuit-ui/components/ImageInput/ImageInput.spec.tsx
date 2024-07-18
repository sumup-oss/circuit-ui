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

import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';

import Avatar from '../Avatar/index.js';
import {
  render,
  axe,
  userEvent,
  fireEvent,
  waitFor,
  createEvent,
  screen,
} from '../../util/test-utils.js';

import { ImageInput, type ImageInputProps } from './ImageInput.js';

const defaultProps: ImageInputProps = {
  label: 'Upload an image',
  loadingLabel: 'Uploading',
  clearButtonLabel: 'Clear',
  onChange: () => Promise.resolve(),
  onClear: () => {},
  component: (props) => <Avatar {...props} alt="" />,
};

describe('ImageInput', () => {
  global.URL.createObjectURL = vi.fn();

  const mockUploadFn = vi
    .fn<(file: File) => Promise<string>>()
    .mockResolvedValue('/images/illustration-coffee.jpg');
  const mockClearFn = vi.fn();

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
        component={(props) => <Avatar {...props} alt="" />}
      />
    );
  }

  describe('Logic', () => {
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    it('should call the provided upload function', async () => {
      render(<StatefulInput />);
      const inputEl: HTMLInputElement = screen.getByLabelText(
        defaultProps.label,
      );

      await userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(inputEl.files?.[0]).toEqual(file);
      });

      expect(inputEl.files).toHaveLength(1);
      expect(mockUploadFn).toHaveBeenCalledWith(file);
    });

    /**
     * FIXME: this test triggers an act() warning.
     */
    it('should support dragging and dropping an image', async () => {
      render(<StatefulInput />);
      const labelEl = screen.getByText(defaultProps.label);

      fireEvent.drop(labelEl, { dataTransfer: { files: [file] } });

      await waitFor(() => {
        expect(mockUploadFn).toHaveBeenCalledWith(file);
      });
    });

    /**
     * FIXME: this test triggers an act() warning.
     */
    it('should support pasting an image', async () => {
      render(<StatefulInput />);
      const inputEl = screen.getByLabelText(defaultProps.label);

      const paste = createEvent.paste(inputEl, {
        clipboardData: { files: [file] },
      });

      fireEvent(inputEl, paste);

      await waitFor(() => {
        expect(mockUploadFn).toHaveBeenCalledWith(file);
      });
    });

    it('should render a successfully uploaded image', async () => {
      const { container } = render(<StatefulInput />);
      const inputEl = screen.getByLabelText(defaultProps.label);

      await userEvent.upload(inputEl, file);

      const imageEl = container.querySelector('img');

      expect(imageEl?.src).toBe(
        'http://localhost:3000/images/illustration-coffee.jpg',
      );
    });

    it('should clear an uploaded image', async () => {
      const { container } = render(<StatefulInput />);
      const inputEl = screen.getByLabelText(defaultProps.label);

      await userEvent.upload(inputEl, file);

      const imageEl = container.querySelector('img');

      expect(imageEl?.src).toBe(
        'http://localhost:3000/images/illustration-coffee.jpg',
      );

      await userEvent.click(
        screen.getByRole('button', { name: defaultProps.clearButtonLabel }),
      );

      await waitFor(() => {
        expect(mockClearFn).toHaveBeenCalledTimes(1);
      });

      // not in the document because the placeholder Avatar is a <div aria-hidden="true" />
      expect(imageEl).not.toBeInTheDocument();
    });

    it('should render an error message when the upload fails', async () => {
      const errorMessage =
        'The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB.';
      mockUploadFn.mockRejectedValue(new Error(errorMessage));
      render(<StatefulInput />);
      const inputEl = screen.getByLabelText(defaultProps.label);

      await userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeVisible();
      });
      expect(inputEl).toBeInvalid();
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<ImageInput {...defaultProps} />);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    describe('Labeling', () => {
      it('should have an accessible name', () => {
        render(<ImageInput {...defaultProps} />);
        const inputEl = screen.getByLabelText(defaultProps.label); // can't getByRole because input type=file is generic in jest-dom

        expect(inputEl).toHaveAccessibleName(defaultProps.label);
      });

      it('should optionally have an accessible description', () => {
        const description = 'Description';
        render(<ImageInput validationHint={description} {...defaultProps} />);
        const inputEl = screen.getByLabelText(defaultProps.label);

        expect(inputEl).toHaveAccessibleDescription(description);
      });

      it('should accept a custom description via aria-describedby', () => {
        const customDescription = 'Custom description';
        const customDescriptionId = 'customDescriptionId';
        render(
          <>
            <span id={customDescriptionId}>{customDescription}</span>
            <ImageInput
              aria-describedby={customDescriptionId}
              {...defaultProps}
            />
            ,
          </>,
        );
        const inputEl = screen.getByLabelText(defaultProps.label);

        expect(inputEl).toHaveAttribute(
          'aria-describedby',
          expect.stringContaining(customDescriptionId),
        );
        expect(inputEl).toHaveAccessibleDescription(customDescription);
      });

      it('should accept a custom description in addition to a validationHint', () => {
        const customDescription = 'Custom description';
        const customDescriptionId = 'customDescriptionId';
        const description = 'Description';
        render(
          <>
            <span id={customDescriptionId}>{customDescription}</span>
            <ImageInput
              validationHint={description}
              aria-describedby={customDescriptionId}
              {...defaultProps}
            />
            ,
          </>,
        );
        const inputEl = screen.getByLabelText(defaultProps.label);

        expect(inputEl).toHaveAttribute(
          'aria-describedby',
          expect.stringContaining(customDescriptionId),
        );
        expect(inputEl).toHaveAccessibleDescription(
          `${customDescription} ${description}`,
        );
      });
    });

    describe('Status messages', () => {
      it('should render an empty live region on mount', () => {
        render(<ImageInput {...defaultProps} />);
        const liveRegionEl = screen.getByRole('status');

        expect(liveRegionEl).toBeEmptyDOMElement();
      });

      it('should render status messages in a live region', () => {
        const statusMessage = 'This field is required';
        render(
          <ImageInput
            invalid
            validationHint={statusMessage}
            {...defaultProps}
          />,
        );
        const liveRegionEl = screen.getByRole('status');

        expect(liveRegionEl).toHaveTextContent(statusMessage);
      });

      it('should not render descriptions in a live region', () => {
        const statusMessage = 'This field is required';
        render(<ImageInput validationHint={statusMessage} {...defaultProps} />);
        const liveRegionEl = screen.getByRole('status');

        expect(liveRegionEl).toBeEmptyDOMElement();
      });
    });
  });
});
