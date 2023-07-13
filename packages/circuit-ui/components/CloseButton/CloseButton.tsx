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
import { Close } from '@sumup/icons';

import { clsx } from '../../styles/clsx.js';
import { IconButton, IconButtonProps } from '../IconButton/IconButton.js';

import classes from './CloseButton.module.css';

export type CloseButtonProps = Omit<IconButtonProps, 'children'>;

/**
 * A generic close button.
 */
export const CloseButton = forwardRef<any, CloseButtonProps>(
  ({ label = 'Close', className, ...props }, ref) => (
    <IconButton
      type="button"
      className={clsx(classes.base, className)}
      label={label}
      {...props}
      ref={ref}
    >
      <Close size="16" />
    </IconButton>
  ),
);

CloseButton.displayName = 'CloseButton';
