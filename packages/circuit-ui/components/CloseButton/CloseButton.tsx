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

import { forwardRef } from 'react';
import { css } from '@emotion/core';
import { Close } from '@sumup/icons';

import { IconButton, IconButtonProps } from '../IconButton/IconButton';

export type CloseButtonProps = Omit<IconButtonProps, 'children'>;

// The !important below is necessary to override the default hover styles.
const buttonStyles = () => css`
  border-color: transparent !important;
`;

/**
 * A generic close button.
 */
export const CloseButton = forwardRef(
  (
    { label = 'Close', ...props }: CloseButtonProps,
    ref: CloseButtonProps['ref'],
  ) => (
    <IconButton
      type="button"
      css={buttonStyles}
      label={label}
      {...props}
      ref={ref}
    >
      <Close />
    </IconButton>
  ),
);

CloseButton.displayName = 'CloseButton';
