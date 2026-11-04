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

import { Stack } from '../../../../.storybook/components/index.js';

import { FileInput, type FileInputProps } from './FileInput.js';
import classes from './FileInput.module.css';
import { FileInputItem } from './FileInputItem.js';

export default {
  title: 'Forms/FileInput',
  component: FileInput,
  tags: ['status:experimental'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    // Input
    label: { table: { category: 'Input' } },
    hideLabel: { table: { category: 'Input' } },
    optionalLabel: { table: { category: 'Input' } },
    description: { table: { category: 'Input' } },
    validationHint: { table: { category: 'Input' } },
    id: { table: { category: 'Input' } },
    accept: { table: { category: 'Input' } },
    invalid: { table: { category: 'Input' } },
    disabled: { control: 'boolean', table: { category: 'Input' } },
    required: { control: 'boolean', table: { category: 'Input' } },
    // Behavior & Appearance
    variant: {
      options: ['default', 'button'],
      control: { type: 'select' },
      table: { category: 'Behavior & Appearance' },
    },
    multiple: {
      control: 'boolean',
      table: { category: 'Behavior & Appearance' },
    },
    // Customisation
    locale: { table: { category: 'Customisation' } },
    buttonLabel: { table: { category: 'Customisation' } },
    dropLabel: { table: { category: 'Customisation' } },
    uploadingLabel: { table: { category: 'Customisation' } },
    successLabel: { table: { category: 'Customisation' } },
    errorLabel: { table: { category: 'Customisation' } },
    retryLabel: { table: { category: 'Customisation' } },
    removeLabel: { table: { category: 'Customisation' } },
    menuLabel: { table: { category: 'Customisation' } },
    trailingActions: { table: { category: 'Customisation' } },
    // Value & change handling
    onChange: { table: { category: 'Value & change handling' } },
    onRemove: { table: { category: 'Value & change handling' } },
  },
};

// The error messages are up to the consumer: the component passes the reason
// of a failed upload to `errorLabel` and displays the text it returns. This
// example maps the errors of an imaginary upload service to messages.
class UploadError extends Error {
  constructor(public reason: 'too-large' | 'network') {
    super(reason);
  }
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof UploadError && error.reason === 'too-large') {
    return 'The file is too large. Choose a file below 10MB.';
  }
  return 'The upload failed. Please try again.';
};

const baseArgs = {
  label: 'Receipts',
  buttonLabel: 'Upload files',
  dropLabel: 'Drop your files or click to upload',
  description: 'PDF, JPG, PNG (max 10MB each)',
  removeLabel: 'Delete',
  retryLabel: 'Retry',
  uploadingLabel: 'Uploading…',
  successLabel: 'Upload complete',
  errorLabel: getErrorMessage,
  menuLabel: 'More actions',
  // Simulates an upload that takes two seconds. Files with "large" in their
  // name are rejected as too large, and files with "fail" in their name fail
  // with a network error.
  onChange: (file: File, { signal }: { signal: AbortSignal }) =>
    new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (file.name.includes('large')) {
          reject(new UploadError('too-large'));
        } else if (file.name.includes('fail')) {
          reject(new UploadError('network'));
        } else {
          resolve();
        }
      }, 2000);
      signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        reject(new Error('Upload aborted'));
      });
    }),
  accept: '.pdf,.jpg,.jpeg,.png',
  multiple: true,
};

export const Base = (args: FileInputProps) => <FileInput {...args} />;

Base.args = baseArgs;

export const Variants = (args: FileInputProps) => (
  <Stack vertical>
    <FileInput {...args} variant="default" />
    <FileInput {...args} variant="button" />
  </Stack>
);

Variants.args = baseArgs;

export const Labels = (args: FileInputProps) => (
  <Stack vertical>
    <FileInput {...args} hideLabel={false} />
    <FileInput
      {...args}
      variant="button"
      hideLabel={false}
      optionalLabel="optional"
    />
  </Stack>
);

Labels.args = baseArgs;

export const Validations = (args: FileInputProps) => (
  <Stack vertical>
    <FileInput
      {...args}
      validationHint="Upload at least one receipt"
      required
      invalid
    />
    <FileInput
      {...args}
      variant="button"
      validationHint="Select a file"
      invalid
    />
  </Stack>
);

Validations.args = baseArgs;

export const Disabled = (args: FileInputProps) => (
  <Stack vertical>
    <FileInput {...args} disabled />
    <FileInput {...args} variant="button" disabled />
  </Stack>
);

Disabled.args = baseArgs;

const noop = () => {};

// Simulates the states of the uploaded files.
// `FileInputItem` is internal and not exported
export const States = (args: FileInputProps) => {
  const itemProps = {
    size: 245_760,
    removeLabel: args.removeLabel,
    retryLabel: args.retryLabel,
    menuLabel: args.menuLabel,
    onRetry: noop,
    onRemove: noop,
  };

  return (
    <ul className={classes.list}>
      <FileInputItem name="listed.pdf" {...itemProps} />
      <FileInputItem
        name="uploading.pdf"
        status="uploading"
        statusLabel={args.uploadingLabel}
        {...itemProps}
      />
      <FileInputItem
        name="success.pdf"
        status="success"
        statusLabel={args.successLabel}
        {...itemProps}
      />
      <FileInputItem
        name="success-with-actions.pdf"
        status="success"
        statusLabel={args.successLabel}
        actions={[{ children: 'Download', onClick: noop }]}
        {...itemProps}
      />
      <FileInputItem
        name="error.pdf"
        status="error"
        statusLabel={getErrorMessage(new UploadError('network'))}
        {...itemProps}
      />
      <FileInputItem
        name="a-very-long-file-name-that-does-not-fit-in-the-row-and-gets-truncated.pdf"
        status="success"
        statusLabel={args.successLabel}
        {...itemProps}
      />
    </ul>
  );
};

States.args = baseArgs;

export const FileTypes = (args: FileInputProps) => (
  <ul className={classes.list}>
    {[
      'document.pdf',
      'table.csv',
      'sheet.xlsx',
      'photo.jpg',
      'letter.docx',
      'archive.zip',
    ].map((name) => (
      <FileInputItem
        key={name}
        name={name}
        size={245_760}
        status="success"
        statusLabel={args.successLabel}
        removeLabel={args.removeLabel}
        onRemove={noop}
      />
    ))}
  </ul>
);

FileTypes.args = baseArgs;
