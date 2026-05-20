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

import { DriverLicense } from '@sumup-oss/icons';

import type { FileInputProps } from './FileInput.js';

import { FileInput } from './index.js';

export default {
  title: 'Forms/FileInput',
  component: FileInput,
  tags: ['status:experimental'],
};

export const Base = (args: FileInputProps) => <FileInput {...args} />;

Base.args = {
  label: 'ID document',
  description: 'Drag and drop your file here or choose manually',
  onChange: () => Promise.resolve(),
  disabled: false,
};

export const Invalid = (args: FileInputProps) => (
  <FileInput
    {...args}
    label="ID document"
    description="Drag and drop your file here or choose manually"
    validationHint="The selected file exceeds the maximum allowed size."
    invalid
  />
);

export const Hint = (args: FileInputProps) => (
  <FileInput
    {...args}
    label="ID document"
    description="Drag and drop your file here or choose manually"
    validationHint="Supported formats: PNG, JPG. Maximum file size: 5MB."
  />
);

export const Optional = (args: FileInputProps) => (
  <FileInput
    {...args}
    label="ID document"
    description="Drag and drop your file here or choose manually"
    optionalLabel="Optional"
  />
);

export const Multiple = (args: FileInputProps) => (
  <FileInput
    {...args}
    label="Supporting documents"
    description="Drag and drop your files here or choose manually"
    accept="application/pdf"
    multiple
  />
);

export const CustomIcon = (args: FileInputProps) => (
  <FileInput
    {...args}
    label="ID document"
    description="Drag and drop your file here or choose manually"
    icon={DriverLicense}
  />
);

export const Disabled = (args: FileInputProps) => (
  <FileInput
    {...args}
    label="ID document"
    description="Drag and drop your file here or choose manually"
    disabled
  />
);
