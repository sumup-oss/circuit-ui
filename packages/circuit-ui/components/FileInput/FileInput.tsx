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
import { FileInputItem } from './FileInputItem.js';
import { setInputFiles } from './FileInputService.js';

interface SelectedFile {
  id: string;
  file: File;
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
  const [isDragging, setIsDragging] = useState(false);
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
  }

  // The native input only holds the files of the latest selection, so the
  // list is the source of truth and the input is kept in sync with it. This
  // ensures that a surrounding form submits exactly the files the user sees.
  useEffect(() => {
    if (inputRef.current) {
      setInputFiles(
        inputRef.current,
        selectedFiles.map(({ file }) => file),
      );
    }
  }, [selectedFiles]);

  const addFiles = (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    const added = (multiple ? files : files.slice(0, 1)).map((file) => {
      nextFileId.current += 1;
      return { id: String(nextFileId.current), file };
    });

    setSelectedFiles((previous) =>
      multiple ? [...previous, ...added] : added,
    );
  };

  const removeFile = (fileId: string) => {
    setSelectedFiles((previous) =>
      previous.filter((selected) => selected.id !== fileId),
    );
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
          {selectedFiles.map(({ id: fileId, file }) => (
            <FileInputItem
              key={fileId}
              name={file.name}
              size={file.size}
              formattingLocale={formattingLocale ?? undefined}
              removeLabel={removeLabel}
              onRemove={() => removeFile(fileId)}
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
