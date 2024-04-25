/**
 * Copyright 2024, SumUp Ltd.
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

'use client';

import type { FC, MouseEventHandler } from 'react';
import { Hide, View } from '@sumup/icons';

import { clsx } from '../../styles/clsx.js';

import classes from './PasswordVisibilityToggle.module.css';

export type PasswordVisibilityToggleProps = {
  visible: boolean;
  onShowClick: MouseEventHandler;
  showLabel: string;
  hideLabel: string;
  className?: string;
};

export const PasswordVisibilityToggle: FC<PasswordVisibilityToggleProps> = ({
  visible,
  onShowClick,
  showLabel,
  hideLabel,
  className,
}) => (
  <div className={clsx(classes.visibilityToggleContainer, className)}>
    <button
      data-selector="password-visibility-toggle"
      type="button"
      role="switch"
      aria-checked={visible}
      aria-label={visible ? hideLabel : showLabel}
      onClick={onShowClick}
      // Skip password visibility toggle when navigating using tab.
      // Accessibility for password input is provided by the user-agents themselves.
      tabIndex={-1}
      className={classes.resetButton}
    >
      {visible ? (
        <Hide role="img" style={{ display: 'block' }} />
      ) : (
        <View role="img" style={{ display: 'block' }} />
      )}
    </button>
  </div>
);
