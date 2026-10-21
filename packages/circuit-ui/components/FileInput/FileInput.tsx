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

'use client';

import { useContext, useId, type InputHTMLAttributes, type Ref } from 'react';
import { File as FileIcon, Upload } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { idx } from '../../util/idx.js';
import {
  FieldLabel,
  FieldValidationHint,
  FieldWrapper,
} from '../Field/index.js';
import { I18nContext } from '../I18nContext/I18nContext.js';

import classes from './FileInput.module.css';
import { FileInputItem, type FileInputStatus } from './FileInputItem.js';

export type { FileInputStatus };

export interface FileInputFile {
  /**
   * A unique identifier for the file.
   */
  id: string;
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
}

export interface FileInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'value' | 'defaultValue' | 'children'
  > {
  ref?: Ref<HTMLInputElement>;
  /**
   * A clear and concise description of the input's purpose, for example
   * "Receipts". It is the accessible name of the input and is not displayed
   * visually.
   */
  label: string;
  /**
   * The text of the button that opens the file picker.
   */
  buttonLabel: string;
  /**
   * Choose between a dropzone with a button and a compact button.
   * @default 'default'
   */
  variant?: 'default' | 'button';
  /**
   * The call to action, displayed in the dropzone, for example
   * "Drop your files or click to upload".
   */
  dropLabel?: string;
  /**
   * Supporting text, for example the accepted file types and size limits.
   */
  description?: string;
  /**
   * The files to display below the input.
   */
  files?: FileInputFile[];
  /**
   * Called when the user wants to remove a file from the list.
   */
  onRemove?: (id: string) => void;
  /**
   * Called when the user wants to retry a failed upload.
   */
  onRetry?: (id: string) => void;
  /**
   * Accessible label for the buttons that remove files. Required when passing
   * the `onRemove` prop.
   */
  removeLabel?: string;
  /**
   * Accessible label for the buttons that retry failed uploads. Required
   * when passing the `onRetry` prop.
   */
  retryLabel?: string;
  /**
   * The status text of files that are being uploaded.
   */
  uploadingLabel?: string;
  /**
   * The status text of files that failed to upload.
   */
  errorLabel?: string;
  /**
   * A unique identifier for the input element. If not defined, a generated id
   * is used.
   */
  id?: string;
  /**
   * An information or error message, displayed below the input.
   */
  validationHint?: string;
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid?: boolean;
}

/**
 * The FileInput component allows users to select files from their device by
 * browsing or, in the default variant, by dragging them onto a dropzone.
 */
export function FileInput({
  label,
  buttonLabel,
  variant = 'default',
  dropLabel,
  description,
  files = [],
  onRemove,
  onRetry,
  removeLabel,
  retryLabel,
  uploadingLabel,
  errorLabel,
  id: customId,
  validationHint,
  invalid,
  required,
  disabled,
  className,
  style,
  'aria-describedby': descriptionId,
  ref,
  ...props
}: FileInputProps) {
  const id = useId();
  const inputId = customId || id;
  const labelId = useId();
  const supportingTextId = useId();
  const validationHintId = useId();
  const { formattingLocale } = useContext(I18nContext);
  const descriptionIds = idx(
    descriptionId,
    description && supportingTextId,
    validationHint && validationHintId,
  );

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    if (!isSufficientlyLabelled(label)) {
      throw new AccessibilityError(
        'FileInput',
        'The `label` prop is missing or invalid.',
      );
    }
    if (onRemove && !isSufficientlyLabelled(removeLabel)) {
      throw new AccessibilityError(
        'FileInput',
        'The `removeLabel` prop is missing or invalid. Omit the `onRemove` prop if you intend to disable removing files.',
      );
    }
    if (onRetry && !isSufficientlyLabelled(retryLabel)) {
      throw new AccessibilityError(
        'FileInput',
        'The `retryLabel` prop is missing or invalid. Omit the `onRetry` prop if you intend to disable retrying uploads.',
      );
    }
  }

  const statusLabels: Partial<Record<FileInputStatus, string>> = {
    uploading: uploadingLabel,
    error: errorLabel,
  };

  const supportingText = description && (
    <span id={supportingTextId} className={classes.description}>
      {description}
    </span>
  );

  return (
    <FieldWrapper className={className} style={style} disabled={disabled}>
      <div className={classes.base}>
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="file"
          className={clsx(classes.input, utilClasses.hideVisually)}
          required={required}
          disabled={disabled}
          aria-invalid={invalid && 'true'}
          aria-labelledby={labelId}
          aria-describedby={descriptionIds}
        />
        {variant === 'button' ? (
          <>
            <FieldLabel
              htmlFor={inputId}
              className={clsx(classes.trigger, classes['variant-button'])}
            >
              <span id={labelId} className={utilClasses.hideVisually}>
                {label}
              </span>
              <span className={classes.icon}>
                <FileIcon aria-hidden="true" size="24" />
                <span className={classes.badge}>
                  <Upload aria-hidden="true" size="16" />
                </span>
              </span>
              <span className={classes.title}>{buttonLabel}</span>
            </FieldLabel>
            {supportingText}
          </>
        ) : (
          <FieldLabel
            htmlFor={inputId}
            className={clsx(classes.trigger, classes['variant-default'])}
          >
            <span id={labelId} className={utilClasses.hideVisually}>
              {label}
            </span>
            <span className={classes.icon}>
              <FileIcon aria-hidden="true" size="24" />
            </span>
            {dropLabel && <span className={classes.title}>{dropLabel}</span>}
            {supportingText}
            <span className={classes.button}>
              {buttonLabel}
              <Upload aria-hidden="true" size="16" />
            </span>
          </FieldLabel>
        )}
      </div>
      {files.length > 0 && (
        <ul className={classes.list}>
          {files.map((file) => (
            <FileInputItem
              key={file.id}
              name={file.name}
              size={file.size}
              status={file.status}
              statusLabel={file.status && statusLabels[file.status]}
              formattingLocale={formattingLocale ?? undefined}
              removeLabel={removeLabel}
              retryLabel={retryLabel}
              onRemove={onRemove && (() => onRemove(file.id))}
              onRetry={onRetry && (() => onRetry(file.id))}
            />
          ))}
        </ul>
      )}
      <FieldValidationHint
        id={validationHintId}
        disabled={disabled}
        invalid={invalid}
        validationHint={validationHint}
      />
    </FieldWrapper>
  );
}
