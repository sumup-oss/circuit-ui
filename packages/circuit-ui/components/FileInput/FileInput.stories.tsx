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

import { useState } from 'react';

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
    variant: {
      options: ['default', 'button'],
      control: { type: 'select' },
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    multiple: { control: 'boolean' },
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
  removeLabel: 'Remove file',
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

// The component only lists the files that the user selects, so the finished
// states are shown with static samples below the input. They can be removed.
export const Base = (args: FileInputProps) => {
  const [samples, setSamples] = useState(['march', 'april', 'may']);
  const remove = (sample: string) => () =>
    setSamples((previous) => previous.filter((item) => item !== sample));

  return (
    <>
      <FileInput {...args} />
      <ul className={classes.list}>
        {samples.includes('march') && (
          <FileInputItem
            name="receipt-march.pdf"
            size={245_760}
            status="success"
            statusLabel={args.successLabel}
            removeLabel={args.removeLabel}
            onRemove={remove('march')}
          />
        )}
        {samples.includes('april') && (
          <FileInputItem
            name="receipt-april-fail.png"
            size={3_145_728}
            status="error"
            statusLabel={getErrorMessage(new UploadError('network'))}
            removeLabel={args.removeLabel}
            onRemove={remove('april')}
          />
        )}
        {samples.includes('may') && (
          <FileInputItem
            name="receipt-may.pdf"
            size={1_048_576}
            status="success"
            statusLabel={args.successLabel}
            removeLabel={args.removeLabel}
            menuLabel={args.menuLabel}
            actions={[{ children: 'Download', onClick: () => {} }]}
            onRemove={remove('may')}
          />
        )}
      </ul>
    </>
  );
};

Base.args = baseArgs;

export const Variants = (args: FileInputProps) => (
  <Stack vertical>
    <FileInput {...args} variant="default" />
    <FileInput {...args} variant="button" />
  </Stack>
);

Variants.args = baseArgs;

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
