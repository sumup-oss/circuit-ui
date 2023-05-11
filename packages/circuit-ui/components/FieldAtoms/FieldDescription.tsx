/**
 * Copyright 2020, SumUp Ltd.
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

import { HTMLAttributes } from 'react';
import { css } from '@emotion/react';

import styled from '../../styles/styled';
import { typography } from '../../styles/style-mixins';

import { CLASS_DISABLED } from './constants';

export interface FieldDescriptionProps extends HTMLAttributes<HTMLSpanElement> {
  validationHint?: string;
}

const baseStyles = () => css`
  display: block;
  color: var(--cui-fg-subtle);

  // TODO: Remove the next line once the Selector component is wrapped in the FieldWrapper component.
  input:disabled + label > &,
  .${CLASS_DISABLED} & {
    color: var(--cui-fg-subtle-disabled);
  }
`;

/**
 * @private
 */
export const FieldDescription = styled('span')<FieldDescriptionProps>(
  typography('two'),
  baseStyles,
);
