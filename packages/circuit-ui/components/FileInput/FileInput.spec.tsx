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
  axe,
  fireEvent,
  render,
  screen,
  userEvent,
} from '../../util/test-utils.js';

import { FileInput, type FileInputProps } from './FileInput.js';
import { formatFileSize, setInputFiles } from './FileInputService.js';

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

  describe('selecting files', () => {
    it('does not render a list without files', () => {
      render(<FileInput {...baseProps} />);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

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

    it('keeps the list when the picker is cancelled', async () => {
      render(<FileInput {...baseProps} />);

      const input = screen.getByLabelText('Receipts');
      await userEvent.upload(input, march);
      fireEvent(input, new Event('cancel'));

      expect(screen.getByText('march.pdf')).toBeVisible();
    });
  });

  describe('dropping files', () => {
    const getDropzone = () =>
      screen.getByText('Drop your files or click to upload').closest('label');

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

    it('ignores drops without files', () => {
      render(<FileInput {...baseProps} />);

      fireEvent.drop(getDropzone() as HTMLElement, {
        dataTransfer: { files: [] },
      });

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<FileInput {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it('has no accessibility violations in the button variant', async () => {
    const { container } = render(<FileInput {...baseProps} variant="button" />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it('has no accessibility violations with selected files', async () => {
    const { container } = render(<FileInput {...baseProps} multiple />);

    await userEvent.upload(screen.getByLabelText('Receipts'), [march, april]);

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

describe('setInputFiles', () => {
  it('does nothing when DataTransfer is not supported', () => {
    const input = document.createElement('input');
    input.type = 'file';

    expect(() =>
      setInputFiles(input, [new File(['a'], 'a.txt')]),
    ).not.toThrow();
    expect(input.files).toHaveLength(0);
  });
});
