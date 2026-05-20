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
  forwardRef,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type DragEvent,
  type InputHTMLAttributes,
} from 'react';
import { Upload, type IconComponentType } from '@sumup-oss/icons';

import { utilClasses } from '../../styles/utility.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { clsx } from '../../styles/clsx.js';
import { idx } from '../../util/idx.js';

import classes from './FileInput.module.css';
import { Body } from '../Body/index.js';
import { FieldValidationHint } from '../Field/index.js';

export interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * A clear and concise description of the FileInput's purpose.
   */
  label: string;
  /**
   * Supporting copy displayed below the label.
   */
  description?: string;
  /**
   * Callback function when the user selects one or more files.
   */
  onChange?: (files: File[]) => void | Promise<void>;
  /**
   * An information or error message, displayed below the input.
   */
  validationHint?: string;
  /**
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   */
  optionalLabel?: string;
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid?: boolean;
  /**
   * Visually hide the label.
   */
  hideLabel?: boolean;
  /**
   * Decorative icon rendered at the top of the dropzone.
   */
  icon?: IconComponentType;
}

/**
 * FileInput component for selecting one or more files.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label,
      description,
      onChange,
      validationHint,
      optionalLabel,
      invalid = false,
      hideLabel = false,
      icon: Icon = Upload,
      disabled,
      required,
      multiple,
      id: customId,
      className,
      style,
      'aria-describedby': descriptionId,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const [isDragging, setDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const id = useId();
    const inputId = customId || id;
    const labelId = useId();
    const validationHintId = useId();
    const descriptionTextId = useId();
    const selectedFilesId = useId();
    const descriptionIds = idx(
      descriptionId,
      description && descriptionTextId,
      selectedFiles.length > 0 && selectedFilesId,
      validationHint && validationHintId,
    );

    const syncFiles = async (files?: FileList | null) => {
      const nextFiles = files ? Array.from(files) : [];
      setSelectedFiles(nextFiles);
      if (nextFiles.length === 0) {
        return;
      }
      await onChange?.(nextFiles);
    };

    const clearInputElement = () => {
      if (localRef.current) {
        localRef.current.value = '';
      }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
      syncFiles(event.target.files);

    const handleClick = () => {
      clearInputElement();
      setSelectedFiles([]);
    };

    const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }
      const { files } = event.clipboardData;
      void syncFiles(files);

      if (localRef.current && files && process.env.NODE_ENV !== 'test') {
        localRef.current.files = files;
      }
    };

    const handleDragging = (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!disabled) {
        setDragging(true);
      }
    };

    const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDragging(false);
    };

    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
      handleDragLeave(event);
      if (disabled) {
        return;
      }
      const files = event.dataTransfer?.files;
      void syncFiles(files);

      if (localRef.current && files && process.env.NODE_ENV !== 'test') {
        localRef.current.files = files;
      }
    };

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !isSufficientlyLabelled(label)
    ) {
      throw new AccessibilityError(
        'FileInput',
        'The `label` prop is missing or invalid.',
      );
    }

    return (
      <div
        className={clsx(classes.wrapper, className)}
        style={style}
        data-disabled={disabled}
      >
        <div onPaste={handlePaste} className={classes.base}>
          <input
            {...props}
            ref={applyMultipleRefs(localRef, ref)}
            id={inputId}
            type="file"
            className={clsx(classes.input, utilClasses.hideVisually)}
            required={required}
            disabled={disabled}
            multiple={multiple}
            onChange={handleInputChange}
            onClick={handleClick}
            aria-invalid={invalid && 'true'}
            aria-describedby={descriptionIds}
            aria-labelledby={labelId}
          />
          <label
            htmlFor={inputId}
            onDragEnter={handleDragging}
            onDragOver={handleDragging}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={clsx(
              classes.label,
              isDragging && classes.dragging,
              invalid && classes.invalid,
            )}
          >
            <Icon size="24" />
            <span
              id={labelId}
              className={clsx(
                classes.title,
                hideLabel && utilClasses.hideVisually,
              )}
            >
              <Body as="span">{label}</Body>
              {optionalLabel && !required && (
                <Body color="subtle">({optionalLabel})</Body>
              )}
            </span>
            {description && (
              <Body size="s" color="subtle" as="span" id={descriptionTextId}>
                {description}
              </Body>
            )}
            {selectedFiles.length > 0 && (
              <span className={classes.files} id={selectedFilesId}>
                {selectedFiles.map((file) => (
                  <Body as="span" size="s" key={file.name}>
                    {file.name}
                  </Body>
                ))}
              </span>
            )}
          </label>
        </div>
        {validationHint ? (
          <FieldValidationHint
            id={validationHintId}
            validationHint={validationHint}
            invalid={invalid}
          />
        ) : null}
      </div>
    );
  },
);

FileInput.displayName = 'FileInput';
