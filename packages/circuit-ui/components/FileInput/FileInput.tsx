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
import { File as FileIcon, Upload } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { idx } from '../../util/idx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import {
  FieldLabel,
  FieldValidationHint,
  FieldWrapper,
} from '../Field/index.js';
import { I18nContext } from '../I18nContext/I18nContext.js';

import classes from './FileInput.module.css';
import { FileInputItem, type FileInputStatus } from './FileInputItem.js';
import { setInputFiles } from './FileInputService.js';

export type { FileInputStatus };

export interface FileInputStateEvent {
  /**
   * The unique identifier of the file within the component.
   */
  id: string;
  /**
   * The file whose state changed.
   */
  file: File;
  /**
   * The new state of the file.
   */
  status: FileInputStatus;
  /**
   * The reason why the upload failed. Only set when the status is `error`.
   */
  error?: unknown;
}

export interface FileInputRemoveEvent {
  /**
   * The unique identifier of the file within the component.
   */
  id: string;
  /**
   * The file that was removed from the list.
   */
  file: File;
}

interface SelectedFile {
  id: string;
  file: File;
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
   * Accessible label for the buttons that remove files from the list.
   */
  removeLabel: string;
  /**
   * Uploads a file. The component calls it for every selected file and
   * tracks the file's state: it is `uploading` until the returned promise
   * settles, then `success` if it resolves or `error` if it rejects. The
   * signal is aborted when the file is removed from the list.
   *
   * When omitted, the component only collects files (for example for a form
   * submission) and doesn't track any upload state.
   */
  upload?: (file: File, options: { signal: AbortSignal }) => Promise<unknown>;
  /**
   * Called whenever the state of a file changes, as it starts uploading and
   * when the upload succeeds or fails. Use it to decide when to move the user
   * forward, for example once all files have been uploaded.
   */
  onFileStateChange?: (event: FileInputStateEvent) => void;
  /**
   * Called when a file is removed from the list, either by the user or
   * because a new file replaced it. Pending uploads of the file are aborted.
   */
  onRemove?: (event: FileInputRemoveEvent) => void;
  /**
   * The status text of files that are being uploaded, for example
   * "Uploading…". Required when passing the `upload` prop.
   */
  uploadingLabel?: string;
  /**
   * The status text of files that were uploaded successfully. It is shown and
   * announced to assistive technology when provided.
   */
  successLabel?: string;
  /**
   * The status text of files that failed to upload, for example "Upload
   * failed". Required when passing the `upload` prop.
   */
  errorLabel?: string;
  /**
   * Accessible label for the buttons that retry failed uploads. Required when
   * passing the `upload` prop.
   */
  retryLabel?: string;
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
  removeLabel,
  upload,
  onFileStateChange,
  onRemove,
  uploadingLabel,
  successLabel,
  errorLabel,
  retryLabel,
  id: customId,
  validationHint,
  invalid,
  required,
  disabled,
  multiple,
  className,
  style,
  onChange,
  'aria-describedby': descriptionId,
  ref,
  ...props
}: FileInputProps) {
  const id = useId();
  const inputId = customId || id;
  const labelId = useId();
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
    if (upload) {
      for (const [name, value] of Object.entries({
        uploadingLabel,
        errorLabel,
        retryLabel,
      })) {
        if (!isSufficientlyLabelled(value)) {
          throw new AccessibilityError(
            'FileInput',
            `The \`${name}\` prop is missing or invalid. It is required when passing the \`upload\` prop.`,
          );
        }
      }
    }
  }

  const statusLabels: Partial<Record<FileInputStatus, string>> = {
    uploading: uploadingLabel,
    success: successLabel,
    error: errorLabel,
  };

  // The callbacks run after asynchronous uploads, so they must not be stale.
  const latest = useRef({ onFileStateChange, onRemove, statusLabels });
  latest.current = { onFileStateChange, onRemove, statusLabels };

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
        selected.id === fileId ? { ...selected, status } : selected,
      ),
    );
    latest.current.onFileStateChange?.({ id: fileId, file, status, error });

    const statusLabel = latest.current.statusLabels[status];
    if (statusLabel) {
      setAnnouncement(`${file.name}: ${statusLabel}`);
    }
  };

  const startUpload = (fileId: string, file: File) => {
    if (!upload) {
      return;
    }

    // eslint-disable-next-line compat/compat
    const controller = new AbortController();
    controllers.current.set(fileId, controller);

    updateStatus(fileId, file, 'uploading');

    const settle = (status: FileInputStatus, error?: unknown) => {
      // The file was removed in the meantime, so its result is irrelevant.
      if (controller.signal.aborted) {
        return;
      }
      controllers.current.delete(fileId);
      updateStatus(fileId, file, status, error);
    };

    // Wrapping the call also catches errors thrown by non-async functions.
    new Promise((resolve) => {
      resolve(upload(file, { signal: controller.signal }));
    }).then(
      () => settle('success'),
      (error: unknown) => settle('error', error),
    );
  };

  const discardFiles = (discarded: SelectedFile[]) => {
    for (const { id: fileId, file } of discarded) {
      controllers.current.get(fileId)?.abort();
      controllers.current.delete(fileId);
      latest.current.onRemove?.({ id: fileId, file });
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

    setSelectedFiles(multiple ? [...selectedFiles, ...added] : added);

    for (const { id: fileId, file } of added) {
      startUpload(fileId, file);
    }
  };

  const removeFile = (fileId: string) => {
    const removed = selectedFiles.filter(
      ({ id: selected }) => selected === fileId,
    );
    discardFiles(removed);
    setSelectedFiles((previous) =>
      previous.filter(({ id: selected }) => selected !== fileId),
    );
  };

  const retryFile = (fileId: string) => {
    const retried = selectedFiles.find(
      ({ id: selected }) => selected === fileId,
    );
    if (retried) {
      startUpload(fileId, retried.file);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // The `FileList` is live, so copy it before the input is synced.
    addFiles(Array.from(event.target.files ?? []));
    onChange?.(event);
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
          required={required}
          disabled={disabled}
          onChange={handleChange}
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
            <span className={classes.button}>
              {buttonLabel}
              <Upload aria-hidden="true" size="16" />
            </span>
          </FieldLabel>
        )}
      </div>
      {selectedFiles.length > 0 && (
        <ul className={classes.list}>
          {selectedFiles.map(({ id: fileId, file, status }) => (
            <FileInputItem
              key={fileId}
              name={file.name}
              size={file.size}
              status={status}
              statusLabel={status && statusLabels[status]}
              formattingLocale={formattingLocale ?? undefined}
              removeLabel={removeLabel}
              retryLabel={retryLabel}
              onRemove={() => removeFile(fileId)}
              onRetry={upload && (() => retryFile(fileId))}
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
