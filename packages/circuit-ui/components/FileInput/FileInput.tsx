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

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
  type Ref,
} from 'react';
import { ArrowUp, File as FileIcon, Upload } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import type { Locale } from '../../util/i18n.js';
import { idx } from '../../util/idx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { useTranslations } from '../../hooks/useTranslations/useTranslations.js';
import type { ActionMenuProps } from '../ActionMenu/index.js';
import {
  FieldLabel,
  FieldLabelText,
  FieldValidationHint,
  FieldWrapper,
} from '../Field/index.js';
import { Button } from '../Button/index.js';

import classes from './FileInput.module.css';
import { FileInputItem, type FileInputStatus } from './FileInputItem.js';
import { setInputFiles } from './FileInputService.js';
import { translations } from './translations/index.js';

interface SelectedFile {
  id: string;
  file: File;
  status?: FileInputStatus;
  error?: unknown;
}

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as PromiseLike<unknown>).then === 'function'
  );
}

export interface FileInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'value' | 'defaultValue' | 'children' | 'onChange'
  > {
  ref?: Ref<HTMLInputElement>;
  /**
   * A clear and concise description of the input's purpose.
   */
  label: string;
  /**
   * Visually hide the label.
   * @default true
   */
  hideLabel?: boolean;
  /**
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * The text of the button that opens the file picker.
   */
  buttonLabel?: string;
  /**
   * Choose between a dropzone with a button and a compact button.
   * @default 'default'
   */
  variant?: 'default' | 'button';
  /**
   * The call to action displayed in the dropzone.
   */
  dropLabel?: string;
  /**
   * Supporting text, such as the accepted file types and sizes.
   */
  description?: string;
  /**
   * A callback function fired for every selected file. Use it to upload the
   * file and return the promise of the upload.
   */
  onChange?: (file: File, options: { signal: AbortSignal }) => unknown;
  /**
   * A callback function fired when a file is removed or replaced.
   */
  onRemove?: (file: File) => void;
  /**
   * The label of the action that removes a file. It is also the accessible
   * name of the remove button.
   */
  removeLabel?: string;
  /**
   * A label for the action that retries a failed upload.
   */
  retryLabel?: string;
  /**
   * The status text of files that are uploading.
   */
  uploadingLabel?: string;
  /**
   * The status text of uploaded files.
   */
  successLabel?: string;
  /**
   * The status text of files that failed to upload. Pass a function to base
   * the message on the error.
   */
  errorLabel?: string | ((error: unknown) => string);
  /**
   * Returns additional actions for a file. They are shown in a menu, before
   * the retry and remove actions.
   */
  trailingActions?: (file: File) => ActionMenuProps['actions'] | undefined;
  /**
   * An accessible label for the menu button.
   */
  menuLabel?: string;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to the locale of the `I18nProvider`.
   */
  locale?: Locale;
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
 * The FileInput component allows users to select files by browsing or
 * dropping them, and shows the state of their uploads.
 */
export function FileInput({
  label,
  hideLabel = true,
  optionalLabel,
  buttonLabel: customButtonLabel,
  variant = 'default',
  dropLabel: customDropLabel,
  description,
  onChange,
  onRemove,
  removeLabel: customRemoveLabel,
  retryLabel: customRetryLabel,
  uploadingLabel: customUploadingLabel,
  successLabel: customSuccessLabel,
  errorLabel: customErrorLabel,
  trailingActions,
  menuLabel: customMenuLabel,
  locale,
  id: customId,
  validationHint,
  invalid,
  required,
  disabled,
  multiple,
  className,
  style,
  'aria-describedby': descriptionId,
  ref,
  ...props
}: FileInputProps) {
  const id = useId();
  const inputId = customId || id;
  const labelId = useId();
  const buttonTextId = useId();
  const supportingTextId = useId();
  const validationHintId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const nextFileId = useRef(0);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const controllers = useRef(new Map<string, AbortController>());
  const [isDragging, setIsDragging] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const {
    buttonLabel,
    dropLabel,
    removeLabel,
    retryLabel,
    menuLabel,
    uploadingLabel,
    successLabel,
    errorLabel,
    formattingLocale,
  } = useTranslations(
    {
      locale,
      buttonLabel: customButtonLabel,
      dropLabel: customDropLabel,
      removeLabel: customRemoveLabel,
      retryLabel: customRetryLabel,
      menuLabel: customMenuLabel,
      uploadingLabel: customUploadingLabel,
      successLabel: customSuccessLabel,
      errorLabel:
        typeof customErrorLabel === 'string' ? customErrorLabel : undefined,
    },
    translations,
  );
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
  }

  // The error label can be a function of the reason the upload failed, which
  // the component passes through without looking at it. The generic label is
  // used when the function doesn't return a message.
  const getStatusLabel = (status: FileInputStatus, error?: unknown) => {
    if (status === 'error') {
      return typeof customErrorLabel === 'function'
        ? customErrorLabel(error) || errorLabel
        : errorLabel;
    }
    return status === 'success' ? successLabel : uploadingLabel;
  };

  // The callbacks run after asynchronous uploads, so they must not be stale.
  const latest = useRef({ onRemove, getStatusLabel });
  latest.current = { onRemove, getStatusLabel };

  // The native input only holds the files of the latest selection, so the
  // list is the source of truth and the input is kept in sync with it. This
  // ensures that a surrounding form submits exactly the files the user sees.
  // Files that failed to upload are not submitted.
  useEffect(() => {
    if (inputRef.current) {
      setInputFiles(
        inputRef.current,
        selectedFiles
          .filter(({ status }) => status !== 'error')
          .map(({ file }) => file),
      );
    }
  }, [selectedFiles]);

  // Abort pending uploads when the component is unmounted.
  useEffect(() => {
    const pending = controllers.current;
    return () => {
      for (const controller of pending.values()) {
        controller.abort();
      }
      pending.clear();
    };
  }, []);

  const updateStatus = (
    fileId: string,
    file: File,
    status: FileInputStatus,
    error?: unknown,
  ) => {
    setSelectedFiles((previous) =>
      previous.map((selected) =>
        selected.id === fileId ? { ...selected, status, error } : selected,
      ),
    );
    const statusLabel = latest.current.getStatusLabel(status, error);
    if (statusLabel) {
      setAnnouncement(`${file.name}: ${statusLabel}`);
    }
  };

  const handleFile = (fileId: string, file: File) => {
    if (!onChange) {
      return;
    }

    // eslint-disable-next-line compat/compat
    const controller = new AbortController();
    controllers.current.set(fileId, controller);

    const settle = (status: FileInputStatus, error?: unknown) => {
      // The file was removed or replaced in the meantime, so its result is
      // irrelevant.
      if (controller.signal.aborted) {
        return;
      }
      controllers.current.delete(fileId);
      updateStatus(fileId, file, status, error);
    };

    let result: unknown;
    try {
      result = onChange(file, { signal: controller.signal });
    } catch (error) {
      settle('error', error);
      return;
    }

    if (!isPromiseLike(result)) {
      // Nothing to track, the file is only listed.
      controllers.current.delete(fileId);
      return;
    }

    updateStatus(fileId, file, 'uploading');
    result.then(
      () => settle('success'),
      (error: unknown) => settle('error', error),
    );
  };

  const discardFiles = (discarded: SelectedFile[]) => {
    for (const { id: fileId, file } of discarded) {
      controllers.current.get(fileId)?.abort();
      controllers.current.delete(fileId);
      latest.current.onRemove?.(file);
    }
  };

  const addFiles = (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    const added = (multiple ? files : files.slice(0, 1)).map((file) => {
      nextFileId.current += 1;
      return { id: String(nextFileId.current), file };
    });

    if (!multiple) {
      discardFiles(selectedFiles);
    }

    // New files appear at the top of the list.
    setSelectedFiles(multiple ? [...added, ...selectedFiles] : added);

    for (const { id: fileId, file } of added) {
      handleFile(fileId, file);
    }
  };

  const removeFile = (fileId: string) => {
    discardFiles(
      selectedFiles.filter(({ id: selected }) => selected === fileId),
    );
    setSelectedFiles((previous) =>
      previous.filter(({ id: selected }) => selected !== fileId),
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(event.target.files ?? []));
  };

  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    // Moving between the dropzone's children also fires `dragleave`.
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  };

  const supportingText = description && (
    <span id={supportingTextId} className={classes.description}>
      {description}
    </span>
  );

  return (
    <FieldWrapper className={className} style={style} disabled={disabled}>
      <FieldLabelText
        label={label}
        hideLabel={hideLabel}
        optionalLabel={optionalLabel}
        required={required}
        aria-hidden="true"
      />
      <div className={classes.base}>
        <input
          {...props}
          ref={applyMultipleRefs(inputRef, ref)}
          id={inputId}
          type="file"
          multiple={multiple}
          className={clsx(classes.input, utilClasses.hideVisually)}
          required={required}
          disabled={disabled}
          onChange={handleChange}
          aria-invalid={invalid && 'true'}
          // The visible button text is part of the name for voice control.
          aria-labelledby={idx(labelId, buttonTextId)}
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
                  <ArrowUp aria-hidden="true" size="16" />
                </span>
              </span>
              <span id={buttonTextId} className={classes.title}>
                {buttonLabel}
              </span>
            </FieldLabel>
            {supportingText}
          </>
        ) : (
          <FieldLabel
            htmlFor={inputId}
            className={clsx(
              classes.trigger,
              classes['variant-default'],
              isDragging && classes.dragging,
            )}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <span id={labelId} className={utilClasses.hideVisually}>
              {label}
            </span>
            <span className={classes.icon}>
              <FileIcon aria-hidden="true" size="24" />
            </span>
            <span className={classes.title}>{dropLabel}</span>
            {supportingText}
            {/* The label opens the picker, so the button is only a visual cue. */}
            <Button
              as="span"
              id={buttonTextId}
              aria-hidden="true"
              size="s"
              variant="secondary"
              navigationIcon={Upload}
              disabled={disabled}
              className={classes.button}
            >
              {buttonLabel}
            </Button>
          </FieldLabel>
        )}
      </div>
      {selectedFiles.length > 0 && (
        <ul className={classes.list}>
          {selectedFiles.map(({ id: fileId, file, status, error }) => (
            <FileInputItem
              key={fileId}
              name={file.name}
              type={file.type}
              size={file.size}
              status={status}
              statusLabel={status && getStatusLabel(status, error)}
              formattingLocale={formattingLocale}
              removeLabel={removeLabel}
              retryLabel={retryLabel}
              actions={trailingActions?.(file)}
              menuLabel={menuLabel}
              onRetry={() => handleFile(fileId, file)}
              onRemove={() => removeFile(fileId)}
            />
          ))}
        </ul>
      )}
      <div role="status" className={utilClasses.hideVisually}>
        {announcement}
      </div>
      <FieldValidationHint
        id={validationHintId}
        disabled={disabled}
        invalid={invalid}
        validationHint={validationHint}
      />
    </FieldWrapper>
  );
}
