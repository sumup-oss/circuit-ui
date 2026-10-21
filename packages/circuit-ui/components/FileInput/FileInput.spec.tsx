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

import { axe, render, screen, userEvent } from '../../util/test-utils.js';

import { FileInput, type FileInputProps } from './FileInput.js';
import { formatFileSize } from './FileInputService.js';

describe('FileInput', () => {
  const baseProps: FileInputProps = {
    label: 'Receipts',
    buttonLabel: 'Upload files',
    dropLabel: 'Drop your files or click to upload',
    description: 'PDF, JPG, PNG (max 10MB each)',
  };

  const files: NonNullable<FileInputProps['files']> = [
    { id: '1', name: 'march.pdf', size: 202_445, status: 'uploading' },
    { id: '2', name: 'april.jpg', size: 1_452_100, status: 'success' },
    { id: '3', name: 'may.png', size: 4_820_300, status: 'error' },
  ];

  it('renders a labelled file input', () => {
    render(<FileInput {...baseProps} />);

    expect(screen.getByLabelText('Receipts')).toHaveAttribute('type', 'file');
  });

  it('is named by the label in the button variant', () => {
    render(<FileInput {...baseProps} variant="button" />);

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

  it('passes native attributes to the input', () => {
    render(<FileInput {...baseProps} name="receipts" accept=".pdf" multiple />);

    const input = screen.getByLabelText('Receipts');

    expect(input).toHaveAttribute('name', 'receipts');
    expect(input).toHaveAttribute('accept', '.pdf');
    expect(input).toHaveAttribute('multiple');
  });

  it('describes the input with the description and validation hint', () => {
    render(<FileInput {...baseProps} validationHint="Pick a file" />);

    expect(screen.getByLabelText('Receipts')).toHaveAccessibleDescription(
      'PDF, JPG, PNG (max 10MB each) Pick a file',
    );
  });

  it('marks the input as invalid', () => {
    render(<FileInput {...baseProps} invalid />);

    expect(screen.getByLabelText('Receipts')).toBeInvalid();
  });

  it('disables the input', () => {
    render(<FileInput {...baseProps} disabled />);

    expect(screen.getByLabelText('Receipts')).toBeDisabled();
  });

  it('renders the drop label in the default variant', () => {
    render(<FileInput {...baseProps} />);

    expect(
      screen.getByText('Drop your files or click to upload'),
    ).toBeVisible();
  });

  it('renders only the button label in the button variant', () => {
    render(<FileInput {...baseProps} variant="button" />);

    expect(screen.getByText('Upload files')).toBeVisible();
    expect(
      screen.queryByText('Drop your files or click to upload'),
    ).not.toBeInTheDocument();
  });

  describe('files', () => {
    const props: FileInputProps = {
      ...baseProps,
      files,
      removeLabel: 'Remove file',
      retryLabel: 'Retry upload',
      uploadingLabel: 'Uploading…',
      errorLabel: 'Upload failed',
    };

    it('renders the name, size and status of each file', () => {
      render(<FileInput {...props} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(3);
      expect(screen.getByText('march.pdf')).toBeVisible();
      expect(screen.getByText('202.4 KB')).toBeVisible();
      expect(screen.getByText('Uploading…')).toBeVisible();
      expect(screen.getByText('Upload failed')).toBeVisible();
    });

    it('does not render a list without files', () => {
      render(<FileInput {...baseProps} />);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('calls onRemove with the id of the file', async () => {
      const onRemove = vi.fn();
      render(<FileInput {...props} onRemove={onRemove} />);

      await userEvent.click(
        screen.getAllByRole('button', { name: 'Remove file' })[1],
      );

      expect(onRemove).toHaveBeenCalledWith('2');
    });

    it('only offers a retry action for failed files', async () => {
      const onRetry = vi.fn();
      render(<FileInput {...props} onRetry={onRetry} />);

      const buttons = screen.getAllByRole('button', { name: 'Retry upload' });

      expect(buttons).toHaveLength(1);

      await userEvent.click(buttons[0]);

      expect(onRetry).toHaveBeenCalledWith('3');
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <FileInput
        {...baseProps}
        files={files}
        onRemove={() => {}}
        onRetry={() => {}}
        removeLabel="Remove file"
        retryLabel="Retry upload"
      />,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it('has no accessibility violations in the button variant', async () => {
    const { container } = render(<FileInput {...baseProps} variant="button" />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
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
