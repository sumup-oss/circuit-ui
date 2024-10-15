/**
 * Copyright 2021, SumUp Ltd.
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
  useState,
  useRef,
  useId,
  type InputHTMLAttributes,
  type ChangeEvent,
  type ClipboardEvent,
  type DragEvent,
  type ComponentType,
} from 'react';
import { Delete, Plus } from '@sumup/icons';

import type { ClickEvent } from '../../types/events.js';
import { utilClasses } from '../../styles/utility.js';
import {
  FieldWrapper,
  FieldLabel,
  FieldValidationHint,
  FieldLabelText,
} from '../Field/index.js';
import { IconButton } from '../Button/index.js';
import { Spinner } from '../Spinner/index.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';

import classes from './ImageInput.module.css';

export interface ImageInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * A clear and concise description of the ImageInput's purpose.
   */
  label: string;
  /**
   * The visual component to render as an image input.
   * It should accept a `src` prop to render the image, and `aria-hidden` to
   * hide it from assistive technology.
   */
  component: ComponentType<{ 'src'?: string; 'aria-hidden': 'true' }>;
  /**
   * A callback function to call when the user has selected an image.
   */
  onChange: (event: File) => void | Promise<void>;
  /**
   * A callback function to call when the input is cleared.
   */
  onClear: (event: ClickEvent) => void | Promise<void>;
  /**
   * An accessible label for the "clear" icon button.
   */
  clearButtonLabel: string;
  /**
   * An accessible label to communicate the input's loading state.
   */
  loadingLabel: string;
  /**
   * The source URL of an existing Avatar to be displayed in the ImageInput.
   */
  src?: string;
  /**
   * A unique identifier for the input element. If not defined, a generated id
   * is used.
   */
  id?: string;
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid?: boolean;
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
   * Visually hide the label. Default: `true`.
   */
  hideLabel?: boolean;
}

/**
 * The ImageInput component allows users to upload images.
 */
export const ImageInput = ({
  label,
  src,
  'id': customId,
  clearButtonLabel,
  onChange,
  onClear,
  disabled,
  validationHint,
  invalid = false,
  required,
  optionalLabel,
  loadingLabel,
  hideLabel = true,
  'component': Component,
  className,
  style,
  'aria-describedby': descriptionId,
  ...props
}: ImageInputProps) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    if (!isSufficientlyLabelled(label)) {
      throw new AccessibilityError(
        'ImageInput',
        'The `label` prop is missing or invalid.',
      );
    }
    if (!isSufficientlyLabelled(clearButtonLabel)) {
      throw new AccessibilityError(
        'ImageInput',
        'The `clearButtonLabel` prop is missing or invalid.',
      );
    }
    if (!isSufficientlyLabelled(loadingLabel)) {
      throw new AccessibilityError(
        'ImageInput',
        'The `loadingLabel` prop is missing or invalid.',
      );
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const inputId = customId || id;
  const validationHintId = useId();
  const descriptionIds = `${
    descriptionId ? `${descriptionId} ` : ''
  }${validationHintId}`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragging, setDragging] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleChange = (files?: FileList | null) => {
    const file = files?.[0];
    if (!file) {
      return;
    }
    setPreviewImage('');
    setIsLoading(true);
    setPreviewImage(URL.createObjectURL(file));
    Promise.resolve(onChange(file))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    handleChange(event.target.files);

  const clearInputElement = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClear = (event: ClickEvent) => {
    Promise.resolve(onClear(event))
      .then(() => {
        clearInputElement();
        setPreviewImage('');
      })
      .catch(() => {
        clearInputElement();
        setPreviewImage('');
      });
  };

  /**
   * We clear the input DOM element on click so that the onChange event is
   * re-triggered if the same image is uploaded again.
   */
  const handleClick = () => {
    clearInputElement();
  };

  const handlePaste = (event: ClipboardEvent) => {
    const { files } = event.clipboardData;
    handleChange(files);

    if (inputRef.current && files) {
      // An error is thrown when trying to assign anything but a FileList here.
      // For security reasons, it's not possible to simulate a FileList object.
      // That's why this code has to be disabled during testing.
      if (process.env.NODE_ENV !== 'test') {
        inputRef.current.files = files;
      }
    }
  };

  const handleDragging = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (event: DragEvent) => {
    handleDragLeave(event);
    const files = event.dataTransfer?.files;
    handleChange(files);

    if (inputRef.current && files) {
      // An error is thrown when trying to assign anything but a FileList here.
      // For security reasons, it's not possible to simulate a FileList object.
      // That's why this code has to be disabled during testing.
      if (process.env.NODE_ENV !== 'test') {
        inputRef.current.files = files;
      }
    }
  };

  return (
    <FieldWrapper className={className} style={style} disabled={disabled}>
      <FieldLabelText
        label={label}
        hideLabel={hideLabel}
        optionalLabel={optionalLabel}
        required={required}
        aria-hidden="true"
      />
      <div onPaste={handlePaste} className={classes.base}>
        <input
          className={clsx(classes.input, utilClasses.hideVisually)}
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          onClick={handleClick}
          required={required}
          disabled={disabled || isLoading}
          aria-invalid={invalid && 'true'}
          aria-describedby={descriptionIds}
          {...props}
        />
        <FieldLabel
          htmlFor={inputId}
          onDragEnter={handleDragging}
          onDragOver={handleDragging}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={clsx(
            classes.label,
            isLoading && classes.loading,
            isDragging && classes.dragging,
          )}
        >
          <span className={utilClasses.hideVisually}>{label}</span>
          <Component src={src || previewImage} aria-hidden="true" />
        </FieldLabel>
        {src ? (
          <IconButton
            type="button"
            size="s"
            variant="secondary"
            destructive
            onClick={handleClear}
            disabled={isLoading || disabled}
            className={classes.button}
            icon={Delete}
          >
            {clearButtonLabel}
          </IconButton>
        ) : (
          <IconButton
            type="button"
            size="s"
            variant="secondary"
            aria-hidden="true"
            tabIndex={-1}
            disabled={isLoading || disabled}
            className={clsx(classes.button, classes.add)}
            icon={Plus}
          />
        )}
        <Spinner
          className={clsx(classes.spinner, isLoading && classes.loading)}
        >
          <span className={utilClasses.hideVisually}>{loadingLabel}</span>
        </Spinner>
      </div>
      <FieldValidationHint
        id={validationHintId}
        validationHint={validationHint}
        invalid={invalid}
      />
    </FieldWrapper>
  );
};
