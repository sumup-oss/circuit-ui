/**
 * Copyright 2026, SumUp Ltd.
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

import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  act,
  axe,
  fireEvent,
  render,
  screen,
  userEvent,
} from '../../util/test-utils.js';

import { FileInput, type FileInputProps } from './FileInput.js';
import { formatFileSize } from './FileInputService.js';

describe('FileInput', () => {
  const baseProps: FileInputProps = {
    label: 'Receipts',
    buttonLabel: 'Upload files',
    dropLabel: 'Drop your files or click to upload',
    description: 'PDF, JPG, PNG (max 10MB each)',
    removeLabel: 'Remove file',
  };

  const march = new File(['march'], 'march.pdf', { type: 'application/pdf' });
  const april = new File(['april'], 'april.jpg', { type: 'image/jpeg' });
  const may = new File(['may'], 'may.png', { type: 'image/png' });

  it('renders a labelled file input', () => {
    render(<FileInput {...baseProps} />);

    expect(screen.getByLabelText('Receipts')).toHaveAttribute('type', 'file');
  });

  it('forwards a ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<FileInput {...baseProps} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('merges a custom className', () => {
    const { container } = render(<FileInput {...baseProps} className="foo" />);

    expect(container.firstChild).toHaveClass('foo');
  });

  it('describes the input with the description and validation hint', () => {
    render(<FileInput {...baseProps} validationHint="Pick a file" />);

    expect(screen.getByLabelText('Receipts')).toHaveAccessibleDescription(
      'PDF, JPG, PNG (max 10MB each) Pick a file',
    );
  });

  describe('opening the file picker', () => {
    it('opens the picker when the button is clicked', async () => {
      render(<FileInput {...baseProps} />);

      const click = vi.spyOn(screen.getByLabelText('Receipts'), 'click');
      await userEvent.click(
        screen.getByRole('button', { name: 'Upload files' }),
      );

      expect(click).toHaveBeenCalledTimes(1);
    });

    it('does not open the picker when the dropzone is clicked', async () => {
      render(<FileInput {...baseProps} />);

      const click = vi.spyOn(screen.getByLabelText('Receipts'), 'click');
      await userEvent.click(
        screen.getByText('Drop your files or click to upload'),
      );

      expect(click).not.toHaveBeenCalled();
    });
  });

  describe('selecting files', () => {
    it('lists the name and size of the selected file', async () => {
      render(<FileInput {...baseProps} />);

      await userEvent.upload(screen.getByLabelText('Receipts'), march);

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.getByText('march.pdf')).toBeVisible();
      expect(screen.getByText('5 B')).toBeVisible();
    });

    it('calls the onChange handler when files are picked', async () => {
      const onChange = vi.fn();
      render(<FileInput {...baseProps} onChange={onChange} />);

      await userEvent.upload(screen.getByLabelText('Receipts'), march);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('replaces the selected file when multiple is not set', async () => {
      render(<FileInput {...baseProps} />);

      const input = screen.getByLabelText('Receipts');
      await userEvent.upload(input, march);
      await userEvent.upload(input, april);

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.queryByText('march.pdf')).not.toBeInTheDocument();
      expect(screen.getByText('april.jpg')).toBeVisible();
    });

    it('adds to the selected files when multiple is set', async () => {
      render(<FileInput {...baseProps} multiple />);

      const input = screen.getByLabelText('Receipts');
      await userEvent.upload(input, [march, april]);
      await userEvent.upload(input, may);

      expect(screen.getAllByRole('listitem')).toHaveLength(3);
      expect(screen.getByText('march.pdf')).toBeVisible();
      expect(screen.getByText('april.jpg')).toBeVisible();
      expect(screen.getByText('may.png')).toBeVisible();
    });

    it('removes a file from the list', async () => {
      render(<FileInput {...baseProps} multiple />);

      await userEvent.upload(screen.getByLabelText('Receipts'), [march, april]);
      await userEvent.click(
        screen.getAllByRole('button', { name: 'Remove file' })[0],
      );

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.queryByText('march.pdf')).not.toBeInTheDocument();
      expect(screen.getByText('april.jpg')).toBeVisible();
    });
  });

  describe('dropping files', () => {
    const getDropzone = () =>
      screen.getByText('Drop your files or click to upload').parentElement;

    it('lists the dropped file', () => {
      render(<FileInput {...baseProps} />);

      fireEvent.drop(getDropzone() as HTMLElement, {
        dataTransfer: { files: [march] },
      });

      expect(screen.getByText('march.pdf')).toBeVisible();
    });

    it('only keeps the first dropped file when multiple is not set', () => {
      render(<FileInput {...baseProps} />);

      fireEvent.drop(getDropzone() as HTMLElement, {
        dataTransfer: { files: [march, april] },
      });

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.getByText('march.pdf')).toBeVisible();
    });

    it('keeps all dropped files when multiple is set', () => {
      render(<FileInput {...baseProps} multiple />);

      fireEvent.drop(getDropzone() as HTMLElement, {
        dataTransfer: { files: [march, april] },
      });

      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
  });

  describe('uploading files', () => {
    const uploadProps: FileInputProps = {
      ...baseProps,
      uploadingLabel: 'Uploading…',
      successLabel: 'Uploaded',
      errorLabel: 'Upload failed',
      retryLabel: 'Retry upload',
      menuLabel: 'More actions',
    };

    function createUpload() {
      const calls: {
        file: File;
        signal: AbortSignal;
        onProgress: (progress: number) => void;
        resolve: () => void;
        reject: (reason: unknown) => void;
      }[] = [];
      const upload = vi.fn(
        (
          file: File,
          {
            signal,
            onProgress,
          }: { signal: AbortSignal; onProgress: (progress: number) => void },
        ) =>
          new Promise<void>((resolve, reject) => {
            calls.push({ file, signal, onProgress, resolve, reject });
          }),
      );
      return { upload, calls };
    }

    it('uploads the selected file and shows its state', async () => {
      const { upload, calls } = createUpload();
      render(<FileInput {...uploadProps} upload={upload} />);

      await userEvent.upload(screen.getByLabelText('Receipts'), march);

      expect(upload).toHaveBeenCalledTimes(1);
      expect(calls[0].file).toBe(march);
      expect(calls[0].signal.aborted).toBe(false);
      expect(screen.getByText('Uploading…')).toBeVisible();

      calls[0].resolve();

      expect(await screen.findByText('Uploaded')).toBeVisible();
      expect(screen.queryByText('Uploading…')).not.toBeInTheDocument();
    });

    it('shows the progress reported by the upload', async () => {
      const { upload, calls } = createUpload();
      render(<FileInput {...uploadProps} upload={upload} />);

      await userEvent.upload(screen.getByLabelText('Receipts'), march);

      const getIcon = () =>
        screen.getByText('march.pdf').closest('li')?.querySelector('span');

      expect(getIcon()).not.toHaveStyle('--progress: 40');

      act(() => calls[0].onProgress(40));

      expect(getIcon()).toHaveStyle('--progress: 40');
    });

    it('emits an event whenever the state of a file changes', async () => {
      const { upload, calls } = createUpload();
      const onFileStateChange = vi.fn();
      render(
        <FileInput
          {...uploadProps}
          upload={upload}
          onFileStateChange={onFileStateChange}
        />,
      );

      await userEvent.upload(screen.getByLabelText('Receipts'), march);

      expect(onFileStateChange).toHaveBeenCalledTimes(1);
      expect(onFileStateChange).toHaveBeenLastCalledWith({
        id: expect.any(String),
        file: march,
        status: 'uploading',
        error: undefined,
      });

      calls[0].resolve();
      await screen.findByText('Uploaded');

      expect(onFileStateChange).toHaveBeenCalledTimes(2);
      expect(onFileStateChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ file: march, status: 'success' }),
      );
    });

    it('shows an error and emits the reason when the upload fails', async () => {
      const { upload, calls } = createUpload();
      const onFileStateChange = vi.fn();
      const reason = new Error('Network error');
      render(
        <FileInput
          {...uploadProps}
          upload={upload}
          onFileStateChange={onFileStateChange}
        />,
      );

      await userEvent.upload(screen.getByLabelText('Receipts'), march);
      calls[0].reject(reason);

      expect(await screen.findByText('Upload failed')).toBeVisible();
      expect(onFileStateChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ status: 'error', error: reason }),
      );
    });

    it('treats an upload function that throws as a failed upload', async () => {
      const upload = vi.fn(() => {
        throw new Error('Synchronous error');
      });
      render(<FileInput {...uploadProps} upload={upload} />);

      await userEvent.upload(screen.getByLabelText('Receipts'), march);

      expect(await screen.findByText('Upload failed')).toBeVisible();
    });

    it('retries a failed upload', async () => {
      const { upload, calls } = createUpload();
      render(<FileInput {...uploadProps} upload={upload} />);

      await userEvent.upload(screen.getByLabelText('Receipts'), march);

      expect(
        screen.queryByRole('button', { name: 'Retry upload' }),
      ).not.toBeInTheDocument();

      calls[0].reject(new Error('Network error'));
      await userEvent.click(
        await screen.findByRole('button', { name: 'More actions' }),
      );
      await userEvent.click(
        screen.getByRole('button', { name: 'Retry upload' }),
      );

      expect(upload).toHaveBeenCalledTimes(2);
      expect(screen.getByText('Uploading…')).toBeVisible();

      calls[1].resolve();

      expect(await screen.findByText('Uploaded')).toBeVisible();
    });

    it('aborts the upload when the file is removed', async () => {
      const { upload, calls } = createUpload();
      const onRemove = vi.fn();
      const onFileStateChange = vi.fn();
      render(
        <FileInput
          {...uploadProps}
          upload={upload}
          onRemove={onRemove}
          onFileStateChange={onFileStateChange}
        />,
      );

      await userEvent.upload(screen.getByLabelText('Receipts'), march);
      await userEvent.click(
        screen.getByRole('button', { name: 'Remove file' }),
      );

      expect(calls[0].signal.aborted).toBe(true);
      expect(onRemove).toHaveBeenCalledWith({
        id: expect.any(String),
        file: march,
      });

      calls[0].resolve();
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
      expect(onFileStateChange).toHaveBeenCalledTimes(1);
    });

    it('aborts the upload of a file that is replaced', async () => {
      const { upload, calls } = createUpload();
      const onRemove = vi.fn();
      render(
        <FileInput {...uploadProps} upload={upload} onRemove={onRemove} />,
      );

      const input = screen.getByLabelText('Receipts');
      await userEvent.upload(input, march);
      await userEvent.upload(input, april);

      expect(calls[0].signal.aborted).toBe(true);
      expect(calls[1].signal.aborted).toBe(false);
      expect(onRemove).toHaveBeenCalledWith(
        expect.objectContaining({ file: march }),
      );
    });

    it('aborts pending uploads when unmounted', async () => {
      const { upload, calls } = createUpload();
      const { unmount } = render(
        <FileInput {...uploadProps} upload={upload} />,
      );

      await userEvent.upload(screen.getByLabelText('Receipts'), march);
      unmount();

      expect(calls[0].signal.aborted).toBe(true);
    });

    it('announces state changes to assistive technology', async () => {
      const { upload, calls } = createUpload();
      render(<FileInput {...uploadProps} upload={upload} />);

      await userEvent.upload(screen.getByLabelText('Receipts'), march);

      expect(screen.getByText('march.pdf: Uploading…')).toBeInTheDocument();

      calls[0].resolve();

      expect(
        await screen.findByText('march.pdf: Uploaded'),
      ).toBeInTheDocument();
    });

    it('has no accessibility violations', async () => {
      const { upload, calls } = createUpload();
      const { container } = render(
        <FileInput {...uploadProps} upload={upload} multiple />,
      );

      await userEvent.upload(screen.getByLabelText('Receipts'), [march, april]);
      calls[0].reject(new Error('Network error'));
      await screen.findByText('Upload failed');

      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});

describe('formatFileSize', () => {
  it.each([
    [0, '0 B'],
    [999, '999 B'],
    [1000, '1 KB'],
    [202_445, '202.4 KB'],
    [1_452_100, '1.5 MB'],
    [3_200_000_000, '3.2 GB'],
  ])('formats %d bytes as %s', (bytes, expected) => {
    expect(formatFileSize(bytes, 'en-US')).toBe(expected);
  });
});
