/**
 * Copyright 2019, SumUp Ltd.
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

import { CopyInput, CopyInputProps } from './CopyInput';
import docs from './CopyInput.docs.mdx';

export default {
  title: 'Forms/Input/CopyInput',
  component: CopyInput,
  parameters: {
    docs: { page: docs },
  },
};

const baseArgs = {
  label: 'API token',
  value: 'sumup_74452f05-3a0a-4c57-9d16',
  copyButtonLabel: 'Copy',
};

export const Base = (args: CopyInputProps): JSX.Element => {
  const [validationProps, setValidationProps] = useState({});

  const onSuccess = () => {
    setValidationProps({
      validationHint: 'Copied successfully',
      showValid: true,
    });
  };
  const onError = () => {
    setValidationProps({
      validationHint: 'Failed to copy',
      hasWarning: true,
    });
  };

  return (
    <CopyInput
      {...args}
      {...validationProps}
      onSuccess={onSuccess}
      onError={onError}
    />
  );
};

Base.args = baseArgs;
