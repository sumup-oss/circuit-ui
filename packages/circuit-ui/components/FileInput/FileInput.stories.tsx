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

const baseArgs = {
  label: 'Receipts',
  buttonLabel: 'Upload files',
  dropLabel: 'Drop your files or click to upload',
  description: 'PDF, JPG, PNG (max 10MB each)',
  removeLabel: 'Remove file',
  uploadingLabel: 'Uploading…',
  errorLabel: 'Upload failed',
  retryLabel: 'Retry upload',
  // Simulates an upload that takes two seconds. Files with "fail" in their
  // name are rejected.
  upload: (file: File, { signal }: { signal: AbortSignal }) =>
    new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (file.name.includes('fail')) {
          reject(new Error('Upload failed'));
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
    <FileInput {...args} validationHint="Files are stored securely" />
  </Stack>
);

Validations.args = baseArgs;
