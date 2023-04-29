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

import { forwardRef, HTMLAttributes, Ref } from 'react';
import { css } from '@emotion/react';

import styled from '../../styles/styled.js';
import { EmotionAsPropType } from '../../types/prop-types.js';

import { CLASS_DISABLED } from './constants.js';

export interface FieldWrapperProps extends HTMLAttributes<HTMLDivElement> {
  as?: EmotionAsPropType;
  /**
   * Trigger disabled styles on the component.
   */
  disabled?: boolean;
}

const wrapperStyles = () =>
  css`
    &.${CLASS_DISABLED} {
      pointer-events: none;
    }
  `;

const Wrapper = styled('div')(wrapperStyles);

/**
 * @private
 */
export const FieldWrapper = forwardRef(
  (
    { children, disabled, className = '', ...props }: FieldWrapperProps,
    ref: Ref<HTMLDivElement>,
  ) => (
    <Wrapper
      ref={ref}
      className={disabled ? `${className} ${CLASS_DISABLED}` : className}
      {...props}
    >
      {children}
    </Wrapper>
  ),
);

FieldWrapper.displayName = 'FieldWrapper';
