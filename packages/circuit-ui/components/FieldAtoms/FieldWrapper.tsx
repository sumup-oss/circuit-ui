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

import { HTMLAttributes } from 'react';
import isPropValid from '@emotion/is-prop-valid';

import styled from '../../styles/styled';
import { disableVisually } from '../../styles/style-mixins';

export interface FieldWrapperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Trigger disabled styles on the component.
   */
  disabled?: boolean;
}

const disabledStyles = ({ disabled }: FieldWrapperProps) =>
  disabled && disableVisually();

/**
 * @private
 */
export const FieldWrapper = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'disabled',
})<FieldWrapperProps>(disabledStyles);
