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
  useContext,
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
import { idx } from '../../util/idx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import type { ActionMenuProps } from '../ActionMenu/index.js';
import {
  FieldLabel,
  FieldValidationHint,
  FieldWrapper,
} from '../Field/index.js';
import { Button } from '../Button/index.js';
import { I18nContext } from '../I18nContext/I18nContext.js';

import classes from './FileInput.module.css';
import { FileInputItem, type FileInputStatus } from './FileInputItem.js';
import { setInputFiles } from './FileInputService.js';

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
   * A clear and concise description of the input's purpose. It is not
   * displayed visually.
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
   * The call to action displayed in the dropzone.
   */
  dropLabel?: string;
  /**
   * Supporting text, such as the accepted file types and sizes.
   */
  description?: string;
  /**
   * Called for every selected file. Return a promise to show the file as
   * uploading until it settles, then as successful or failed. The `signal` is
   * aborted when the file is removed. Without a promise, the file is only
   * listed, for example to submit it with a form.
   */
  onChange?: (file: File, options: { signal: AbortSignal }) => unknown;
  /**
   * Called when a file is removed or replaced. Use it to delete the file from
   * your service.
   */
  onRemove?: (file: File) => void;
  /**
   * An accessible label for the button that removes a file.
   */
  removeLabel: string;
  /**
   * An accessible label for the action that retries a failed upload. Required
   * when uploaded files fail.
   */
  retryLabel?: string;
  /**
   * The status text of files that are uploading. Required when files are
   * uploaded.
   */
  uploadingLabel?: string;
  /**
   * The status text of uploaded files. Required when files are uploaded.
   */
  successLabel?: string;
  /**
   * The status text of files that failed to upload. Pass a function to return
   * a message based on the reason the upload failed. Required when files are
   * uploaded.
   */
  errorLabel?: string | ((error: unknown) => string);
  /**
   * Returns additional actions for a file. They are shown in a menu, before
   * the remove action.
   */
  trailingActions?: (file: File) => ActionMenuProps['actions'] | undefined;
  /**
   * An accessible label for the menu button. Required when uploaded files fail
   * and when passing the `trailingActions` prop.
   */
  menuLabel?: string;
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
  buttonLabel,
  variant = 'default',
  dropLabel,
  description,
  onChange,
  onRemove,
  removeLabel,
  retryLabel,
  uploadingLabel,
  successLabel,
  errorLabel,
  trailingActions,
  menuLabel,
  id: customId,
  validationHint,
  invalid,
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
    if (!isSufficientlyLabelled(removeLabel)) {
      throw new AccessibilityError(
        'FileInput',
        'The `removeLabel` prop is missing or invalid.',
      );
    }
    if (
      selectedFiles.some(({ status }) => status === 'uploading') &&
      !isSufficientlyLabelled(uploadingLabel)
    ) {
      throw new AccessibilityError(
        'FileInput',
        'The `uploadingLabel` prop is missing or invalid. It is required when files are uploaded.',
      );
    }
    if (
      selectedFiles.some(({ status }) => status === 'success') &&
      !isSufficientlyLabelled(successLabel)
    ) {
      throw new AccessibilityError(
        'FileInput',
        'The `successLabel` prop is missing or invalid. It is required when files are uploaded.',
      );
    }
    if (
      selectedFiles.some(({ status }) => status === 'error') &&
      typeof errorLabel !== 'function' &&
      !isSufficientlyLabelled(errorLabel)
    ) {
      throw new AccessibilityError(
        'FileInput',
        'The `errorLabel` prop is missing or invalid. It is required when files are uploaded.',
      );
    }
    if (
      selectedFiles.some(({ status }) => status === 'error') &&
      !isSufficientlyLabelled(retryLabel)
    ) {
      throw new AccessibilityError(
        'FileInput',
        'The `retryLabel` prop is missing or invalid. It is required when uploaded files fail.',
      );
    }
    if (
      (trailingActions ||
        selectedFiles.some(({ status }) => status === 'error')) &&
      !isSufficientlyLabelled(menuLabel)
    ) {
      throw new AccessibilityError(
        'FileInput',
        'The `menuLabel` prop is missing or invalid. It is required when uploaded files fail and when passing the `trailingActions` prop.',
      );
    }
  }

  // The error label can be a function of the reason the upload failed, which
  // the component passes through without looking at it.
  const getStatusLabel = (status: FileInputStatus, error?: unknown) => {
    if (status === 'error') {
      return typeof errorLabel === 'function' ? errorLabel(error) : errorLabel;
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
      // The file was removed in the meantime, so its result is irrelevant.
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

  const retryFile = (fileId: string) => {
    const retried = selectedFiles.find(
      ({ id: selected }) => selected === fileId,
    );
    if (retried) {
      handleFile(fileId, retried.file);
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
    // The `FileList` is live, so copy it before the input is synced.
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
      <div className={classes.base}>
        <input
          {...props}
          ref={applyMultipleRefs(inputRef, ref)}
          id={inputId}
          type="file"
          multiple={multiple}
          className={clsx(classes.input, utilClasses.hideVisually)}
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
            {dropLabel && <span className={classes.title}>{dropLabel}</span>}
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
              formattingLocale={formattingLocale ?? undefined}
              removeLabel={removeLabel}
              retryLabel={retryLabel}
              actions={trailingActions?.(file)}
              menuLabel={menuLabel}
              onRetry={() => retryFile(fileId)}
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
