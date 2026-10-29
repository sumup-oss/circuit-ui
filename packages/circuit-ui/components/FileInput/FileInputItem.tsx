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

import { useState } from 'react';
import {
  Checkmark,
  Close,
  Delete,
  File as FileIcon,
  More,
  Refresh,
} from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { ActionMenu } from '../ActionMenu/index.js';
import { Body } from '../Body/index.js';
import { IconButton } from '../Button/index.js';
import { ListItem } from '../ListItem/index.js';

import classes from './FileInput.module.css';
import { formatFileSize } from './FileInputService.js';

export type FileInputStatus = 'uploading' | 'success' | 'error';

const statusColors = {
  uploading: 'subtle',
  success: 'success',
  error: 'danger',
} as const;

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
   * The upload progress between 0 and 100. When undefined while the file is
   * uploading, the progress ring spins to indicate activity.
   */
  progress?: number;
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
   * Accessible label for the button that opens the menu of a finished upload.
   */
  menuLabel?: string;
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
  progress,
  statusLabel,
  formattingLocale,
  removeLabel,
  retryLabel,
  menuLabel,
  onRemove,
  onRetry,
}: FileInputItemProps) {
  const showRetry = status === 'error' && onRetry && retryLabel;
  const showRemove = onRemove && removeLabel;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Finished uploads collapse their actions into a menu. This mirrors the
  // upcoming "menu" variant of the ListItem and can be replaced by it.
  const menuActions = [
    ...(showRetry ? [{ children: retryLabel, onClick: () => onRetry() }] : []),
    ...(showRemove
      ? [
          {
            children: removeLabel,
            onClick: () => onRemove(),
            destructive: true,
          },
        ]
      : []),
  ];
  const hasMenu =
    (status === 'success' || status === 'error') &&
    Boolean(menuLabel) &&
    menuActions.length > 0;

  return (
    <li className={classes.item}>
      <ListItem
        className={classes.row}
        leadingComponent={
          <span
            className={clsx(
              classes.icon,
              status === 'uploading' && classes['icon-uploading'],
              (status === 'success' || status === 'error') &&
                classes['icon-finished'],
            )}
            style={
              status === 'uploading' && progress !== undefined
                ? { '--progress': progress }
                : undefined
            }
          >
            <FileIcon aria-hidden="true" size="24" />
            {(status === 'success' || status === 'error') && (
              <span
                className={clsx(
                  classes.badge,
                  status === 'error' && classes['badge-error'],
                )}
              >
                {status === 'success' ? (
                  <Checkmark aria-hidden="true" size="16" />
                ) : (
                  <Close aria-hidden="true" size="16" />
                )}
              </span>
            )}
            {status === 'uploading' && (
              <span
                aria-hidden="true"
                className={clsx(
                  classes.ring,
                  progress === undefined && classes.indeterminate,
                )}
              >
                <span className={classes.arc} />
              </span>
            )}
          </span>
        }
        label={name}
        details={
          <div className={classes['row-details']}>
            <Body size="s" color="subtle">
              {formatFileSize(size, formattingLocale)}
            </Body>
            {statusLabel && (
              <Body
                size="s"
                color={statusColors[status ?? 'uploading']}
                className={
                  status === 'uploading' ? classes.placeholder : undefined
                }
              >
                {statusLabel}
              </Body>
            )}
          </div>
        }
        trailingComponent={
          hasMenu ? (
            <ActionMenu
              isOpen={isMenuOpen}
              onToggle={setIsMenuOpen}
              placement="bottom-end"
              component={(buttonProps) => (
                <IconButton
                  {...buttonProps}
                  icon={More}
                  size="s"
                  variant="tertiary"
                >
                  {menuLabel as string}
                </IconButton>
              )}
              actions={menuActions}
            />
          ) : (
            (showRetry || showRemove) && (
              <div className={classes['row-actions']}>
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
                    icon={Delete}
                    onClick={onRemove}
                  >
                    {removeLabel}
                  </IconButton>
                )}
              </div>
            )
          )
        }
      />
    </li>
  );
}
