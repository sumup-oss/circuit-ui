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

import {
  Checkmark,
  Close,
  CsvFile,
  Delete,
  File as FileIcon,
  FileSpreadsheet,
  Image as ImageIcon,
  Invoice,
  PdfFile,
  Refresh,
  ZipFile,
} from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';
import { Body } from '../Body/index.js';
import type {
  ActionMenuItemProps,
  ActionMenuProps,
} from '../ActionMenu/index.js';
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

const iconsByExtension = new Map([
  ['pdf', PdfFile],
  ['csv', CsvFile],
  ['xls', FileSpreadsheet],
  ['xlsx', FileSpreadsheet],
  ['ods', FileSpreadsheet],
  ['jpg', ImageIcon],
  ['jpeg', ImageIcon],
  ['png', ImageIcon],
  ['gif', ImageIcon],
  ['webp', ImageIcon],
  ['doc', Invoice],
  ['docx', Invoice],
  ['odt', Invoice],
  ['rtf', Invoice],
  ['txt', Invoice],
  ['zip', ZipFile],
]);

/**
 * Picks the icon of a file by its extension, or by its MIME type for images
 * with another extension. Other files get the generic file icon.
 */
function getFileIcon(name: string, type?: string) {
  const extension = name.split('.').pop()?.toLowerCase() ?? '';
  const icon = iconsByExtension.get(extension);
  if (icon) {
    return icon;
  }
  return type?.startsWith('image/') ? ImageIcon : FileIcon;
}

export interface FileInputItemProps {
  /**
   * The name of the file, including its extension.
   */
  name: string;
  /**
   * The MIME type of the file. Used to pick the icon when the extension is
   * unknown.
   */
  type?: string;
  /**
   * The size of the file in bytes.
   */
  size: number;
  /**
   * The upload state of the file.
   */
  status?: FileInputStatus;
  /**
   * A short description of the file's state.
   */
  statusLabel?: string;
  /**
   * The locale used to format the file size.
   */
  formattingLocale?: Intl.LocalesArgument;
  /**
   * The label of the action that removes the file. It is also the accessible
   * name of the remove button.
   */
  removeLabel?: string;
  /**
   * An accessible label for the action that retries a failed upload.
   */
  retryLabel?: string;
  /**
   * Additional actions, shown in a menu before the retry and remove actions.
   * Files that are uploading only show the remove button.
   */
  actions?: ActionMenuProps['actions'];
  /**
   * An accessible label for the menu button.
   */
  menuLabel?: string;
  /**
   * Called when the user wants to retry a failed upload.
   */
  onRetry?: () => void;
  /**
   * Called when the user wants to remove the file.
   */
  onRemove?: () => void;
}

/**
 * A single file in the FileInput list, with its status and actions.
 */
export function FileInputItem({
  name,
  type,
  size,
  status,
  statusLabel,
  formattingLocale,
  removeLabel,
  retryLabel,
  actions,
  menuLabel,
  onRetry,
  onRemove,
}: FileInputItemProps) {
  const isUploading = status === 'uploading';
  const Icon = getFileIcon(name, type);
  const removeAction: ActionMenuProps['actions'] =
    onRemove && removeLabel
      ? [{ children: removeLabel, icon: Delete, onClick: () => onRemove() }]
      : [];
  const retryAction: ActionMenuProps['actions'] =
    status === 'error' && onRetry && retryLabel
      ? [{ children: retryLabel, icon: Refresh, onClick: () => onRetry() }]
      : [];
  const list: ActionMenuProps['actions'] = isUploading
    ? removeAction
    : [...(actions ?? []), ...retryAction, ...removeAction];
  const items = list.filter(
    (action): action is ActionMenuItemProps => !('type' in action),
  );
  const menu =
    items.length > 1 && menuLabel
      ? { label: menuLabel, actions: list }
      : undefined;
  // A file with a single action only has the remove action.
  const single = items.length === 1 ? items[0] : undefined;

  return (
    <li className={classes.item}>
      <ListItem
        className={classes.row}
        variant={menu ? 'menu' : 'action'}
        menu={menu}
        leadingComponent={
          <span
            className={clsx(
              classes.icon,
              status === 'uploading' && classes['icon-uploading'],
              (status === 'success' || status === 'error') &&
                classes['icon-finished'],
            )}
          >
            <Icon aria-hidden="true" size="24" />
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
              <span aria-hidden="true" className={classes.ring}>
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
                role="status"
                color={statusColors[status ?? 'uploading']}
                className={
                  status === 'uploading' ? classes.placeholder : undefined
                }
              >
                <span className={utilClasses.hideVisually}>{name}: </span>
                {statusLabel}
              </Body>
            )}
          </div>
        }
        trailingComponent={
          single && (
            <IconButton
              type="button"
              size="s"
              variant="tertiary"
              icon={Delete}
              disabled={single.disabled}
              onClick={single.onClick}
            >
              {single.children}
            </IconButton>
          )
        }
      />
    </li>
  );
}
