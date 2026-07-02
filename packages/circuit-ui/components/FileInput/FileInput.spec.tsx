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

import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  axe,
  createEvent,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../util/test-utils.js';

import { FileInput, type FileInputProps } from './FileInput.js';

const defaultProps: FileInputProps = {
  label: 'ID document',
  description: 'National ID, driving licence or passport',
  onChange: () => Promise.resolve(),
};

describe('FileInput', () => {
  const onChange = vi.fn<(files: File[]) => void>();
  const file = new File(['passport'], 'passport.pdf', {
    type: 'application/pdf',
  });

  beforeEach(() => {
    onChange.mockClear();
  });

  it('should call the provided change handler with the selected file', async () => {
    render(<FileInput {...defaultProps} onChange={onChange} />);
    const inputEl = screen.getByLabelText(defaultProps.label);

    await userEvent.upload(inputEl, file);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([file]);
    });
    expect(screen.getByText(file.name)).toBeVisible();
  });

  it('should support dragging and dropping files', async () => {
    render(<FileInput {...defaultProps} onChange={onChange} />);
    const labelEl = screen.getByText(defaultProps.label);

    fireEvent.drop(labelEl, { dataTransfer: { files: [file] } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([file]);
    });
  });

  it('should support pasting files', async () => {
    render(<FileInput {...defaultProps} onChange={onChange} />);
    const inputEl = screen.getByLabelText(defaultProps.label);

    const paste = createEvent.paste(inputEl, {
      clipboardData: { files: [file] },
    });

    fireEvent(inputEl, paste);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([file]);
    });
  });

  it('should ignore pasted and dropped files when disabled', async () => {
    render(<FileInput {...defaultProps} onChange={onChange} disabled />);
    const inputEl = screen.getByLabelText(defaultProps.label);
    const labelEl = screen.getByText(defaultProps.label);

    const paste = createEvent.paste(inputEl, {
      clipboardData: { files: [file] },
    });

    fireEvent(inputEl, paste);
    fireEvent.drop(labelEl, { dataTransfer: { files: [file] } });

    await waitFor(() => {
      expect(onChange).not.toHaveBeenCalled();
    });
    expect(screen.queryByText(file.name)).not.toBeInTheDocument();
  });

  it('should clear the visible selection when the input is reopened', async () => {
    render(<FileInput {...defaultProps} onChange={onChange} />);
    const inputEl = screen.getByLabelText(defaultProps.label);

    await userEvent.upload(inputEl, file);

    expect(screen.getByText(file.name)).toBeVisible();

    fireEvent.click(inputEl);

    expect(screen.queryByText(file.name)).not.toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<FileInput {...defaultProps} />);

    const actual = await axe(container);

    expect(actual).toHaveNoViolations();
  });

  it('should expose validation hints as the accessible description', () => {
    const validationHint = 'Please upload a PDF smaller than 20MB.';
    render(
      <FileInput {...defaultProps} validationHint={validationHint} invalid />,
    );
    const inputEl = screen.getByLabelText(defaultProps.label);

    expect(inputEl).toHaveAccessibleDescription(
      `${defaultProps.description} ${validationHint}`,
    );
  });

  it('should expose selected filenames as the accessible description', async () => {
    render(<FileInput label="Attachment" onChange={onChange} />);
    const inputEl = screen.getByLabelText('Attachment');

    await userEvent.upload(inputEl, file);

    expect(inputEl).toHaveAccessibleDescription(file.name);
  });
});
