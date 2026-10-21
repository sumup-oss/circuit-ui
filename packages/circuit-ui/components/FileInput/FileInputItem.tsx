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

import { Delete, File as FileIcon, Refresh } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { IconButton } from '../Button/index.js';

import classes from './FileInput.module.css';
import { formatFileSize } from './FileInputService.js';

export type FileInputStatus = 'uploading' | 'success' | 'error';

export interface FileInputItemProps {
  /**
   * The name of the file, including its extension.
   */
  name: string;
  /**
   * The size of the file in bytes.
   */
  size: number;
  /**
   * The upload state of the file.
   */
  status?: FileInputStatus;
  /**
   * A short description of the file's state, for example "Uploading…".
   */
  statusLabel?: string;
  /**
   * The locale used to format the file size.
   */
  formattingLocale?: Intl.LocalesArgument;
  /**
   * Accessible label for the button that removes the file.
   */
  removeLabel?: string;
  /**
   * Accessible label for the button that retries a failed upload.
   */
  retryLabel?: string;
  /**
   * Called when the user wants to remove the file.
   */
  onRemove?: () => void;
  /**
   * Called when the user wants to retry a failed upload.
   */
  onRetry?: () => void;
}

/**
 * A single file in the FileInput list, with its status and actions.
 */
export function FileInputItem({
  name,
  size,
  status,
  statusLabel,
  formattingLocale,
  removeLabel,
  retryLabel,
  onRemove,
  onRetry,
}: FileInputItemProps) {
  const showRetry = status === 'error' && onRetry && retryLabel;
  const showRemove = onRemove && removeLabel;

  return (
    <li className={clsx(classes.item, status && classes[status])}>
      <span className={classes['item-icon']}>
        <FileIcon aria-hidden="true" size="24" />
      </span>
      <div className={classes['item-text']}>
        <span className={classes['item-name']}>{name}</span>
        <span className={classes['item-meta']}>
          {formatFileSize(size, formattingLocale)}
        </span>
        {statusLabel && (
          <span className={classes['item-status']}>{statusLabel}</span>
        )}
      </div>
      {(showRetry || showRemove) && (
        <div className={classes['item-actions']}>
          {showRetry && (
            <IconButton
              type="button"
              size="s"
              variant="tertiary"
              icon={Refresh}
              onClick={onRetry}
            >
              {retryLabel}
            </IconButton>
          )}
          {showRemove && (
            <IconButton
              type="button"
              size="s"
              variant="tertiary"
              destructive
              icon={Delete}
              onClick={onRemove}
            >
              {removeLabel}
            </IconButton>
          )}
        </div>
      )}
    </li>
  );
}
