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

import Avatar from '../Avatar';
import {
  render,
  axe,
  userEvent,
  fireEvent,
  waitFor,
  createEvent,
} from '../../util/test-utils.jsx';

import { ImageInput } from './ImageInput';

const defaultProps = {
  label: 'Upload an image',
  loadingLabel: 'Uploading',
  clearButtonLabel: 'Clear',
  onChange: () => Promise.resolve(),
  onClear: () => {},
  component: Avatar,
} as const;

describe('ImageInput', () => {
  global.URL.createObjectURL = vi.fn();

  describe('Styles', () => {
    it('should render with default styles', () => {
      const { container } = render(<ImageInput {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });

    it('should render with an existing image', () => {
      const { container } = render(
        <ImageInput {...defaultProps} src="/images/illustration-coffee.jpg" />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with invalid styles and an error message', () => {
      const { container } = render(
        <ImageInput
          {...defaultProps}
          invalid={true}
          validationHint="The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB."
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with a giga button', () => {
      const { container } = render(
        <ImageInput {...defaultProps} size="giga" />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should render with a custom component', () => {
      const { container } = render(
        <ImageInput
          {...defaultProps}
          src="/images/illustration-coffee.jpg"
          component={({ src }) => (
            <img
              style={{
                width: '400px',
                height: '100px',
              }}
              src={src}
              alt=""
            />
          )}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  const mockUploadFn = vi
    .fn<[File], Promise<string>>()
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
        component={Avatar}
      />
    );
  }

  describe('Logic', () => {
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
      const { getByLabelText, container } = render(<StatefulInput />);
      const inputEl = getByLabelText(defaultProps.label) as HTMLInputElement;

      await userEvent.upload(inputEl, file);

      const imageEl = container.querySelector('img');

      expect(imageEl?.src).toBe(
        'http://localhost:3000/images/illustration-coffee.jpg',
      );
    });

    it('should clear an uploaded image', async () => {
      const { getByLabelText, getByRole, container } = render(
        <StatefulInput />,
      );
      const inputEl = getByLabelText(defaultProps.label) as HTMLInputElement;

      await userEvent.upload(inputEl, file);

      const imageEl = container.querySelector('img');

      expect(imageEl?.src).toBe(
        'http://localhost:3000/images/illustration-coffee.jpg',
      );

      await userEvent.click(
        getByRole('button', { name: defaultProps.clearButtonLabel }),
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
      const { getByLabelText, getByText } = render(<StatefulInput />);
      const inputEl = getByLabelText(defaultProps.label) as HTMLInputElement;

      await userEvent.upload(inputEl, file);

      await waitFor(() => {
        expect(getByText(errorMessage)).toBeVisible();
        expect(inputEl).toBeInvalid();
      });
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
        const { getByLabelText } = render(<ImageInput {...defaultProps} />);
        const inputEl = getByLabelText(defaultProps.label); // can't getByRole because input type=file is generic in jest-dom

        expect(inputEl).toHaveAccessibleName(defaultProps.label);
      });

      it('should optionally have an accessible description', () => {
        const description = 'Description';
        const { getByLabelText } = render(
          <ImageInput validationHint={description} {...defaultProps} />,
        );
        const inputEl = getByLabelText(defaultProps.label);

        expect(inputEl).toHaveAccessibleDescription(description);
      });

      it('should accept a custom description via aria-describedby', () => {
        const customDescription = 'Custom description';
        const customDescriptionId = 'customDescriptionId';
        const { getByLabelText } = render(
          <>
            <span id={customDescriptionId}>{customDescription}</span>
            <ImageInput
              aria-describedby={customDescriptionId}
              {...defaultProps}
            />
            ,
          </>,
        );
        const inputEl = getByLabelText(defaultProps.label);

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
        const { getByLabelText } = render(
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
        const inputEl = getByLabelText(defaultProps.label);

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
        const { getByRole } = render(<ImageInput {...defaultProps} />);
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toBeEmptyDOMElement();
      });

      it('should render status messages in a live region', () => {
        const statusMessage = 'This field is required';
        const { getByRole } = render(
          <ImageInput
            invalid
            validationHint={statusMessage}
            {...defaultProps}
          />,
        );
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toHaveTextContent(statusMessage);
      });

      it('should not render descriptions in a live region', () => {
        const statusMessage = 'This field is required';
        const { getByRole } = render(
          <ImageInput validationHint={statusMessage} {...defaultProps} />,
        );
        const liveRegionEl = getByRole('status');

        expect(liveRegionEl).toBeEmptyDOMElement();
      });
    });
  });
});
