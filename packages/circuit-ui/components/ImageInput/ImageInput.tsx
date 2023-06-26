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

import {
  useState,
  useRef,
  InputHTMLAttributes,
  ChangeEvent,
  ClipboardEvent,
  DragEvent,
  useId,
} from 'react';
import { css } from '@emotion/react';
import { Delete, Plus } from '@sumup/icons';

import { ClickEvent } from '../../types/events.js';
import styled, { StyleProps } from '../../styles/styled.js';
import { focusOutline, hideVisually } from '../../styles/style-mixins.js';
import {
  FieldWrapper,
  FieldLabel,
  FieldValidationHint,
} from '../Field/index.js';
import IconButton, { IconButtonProps } from '../IconButton/index.js';
import Spinner from '../Spinner/index.js';
import { AccessibilityError } from '../../util/errors.js';

type Size = 'giga' | 'yotta';

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
  component: (props: { 'src'?: string; 'aria-hidden': 'true' }) => JSX.Element;
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
   * Changes the size of the button that controls the input. Defaults to "yotta".
   */
  size?: Size;
}

const InputWrapper = styled.div`
  display: inline-block;
  position: relative;
  text-align: center;
`;

const HiddenInput = styled.input(
  hideVisually,
  css`
    &:focus + label > *:last-child {
      ${focusOutline()};
    }

    &:focus:not(:focus-visible) + label > *:last-child {
      box-shadow: none;
    }
  `,
);

type LabelProps = {
  isLoading: boolean;
  isDragging: boolean;
  invalid: boolean;
};

const baseLabelStyles = ({ theme }: StyleProps) => css`
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    pointer-events: none;
    background-color: var(--cui-bg-strong);
    opacity: 0;
    transition: opacity ${theme.transitions.default};
  }

  > *:last-child {
    transition: box-shadow ${theme.transitions.default};
  }

  @supports (-webkit-filter: brightness(1)) or (filter: brightness(1)) {
    transition: filter ${theme.transitions.default};

    &::before {
      content: none;
    }
  }
`;

const invalidLabelStyles = ({ invalid }: LabelProps) =>
  invalid &&
  css`
    > *:last-child {
      box-shadow: 0 0 0 2px var(--cui-border-danger);
    }
    &:hover > *:last-child {
      box-shadow: 0 0 0 2px var(--cui-border-danger-hovered);
    }
    &:active > *:last-child {
      box-shadow: 0 0 0 2px var(--cui-border-danger-pressed);
    }
  `;

const loadingLabelStyles = ({ isLoading }: LabelProps) => {
  if (isLoading) {
    return css`
      &::before {
        opacity: 0.4;
      }

      @supports (-webkit-filter: brightness(1)) or (filter: brightness(1)) {
        filter: brightness(0.6);
      }
    `;
  }

  return css`
    &:hover::before {
      opacity: 0.1;
    }
    &:active::before {
      opacity: 0.2;
    }

    @supports (-webkit-filter: brightness(1)) or (filter: brightness(1)) {
      &:hover {
        filter: brightness(0.9);
      }
      &:active {
        filter: brightness(0.8);
      }
    }
  `;
};

const draggingLabelStyles = ({ isDragging }: LabelProps) =>
  isDragging &&
  css`
    *:last-child {
      ${focusOutline()};
    }

    &::before {
      opacity: 0.1;
    }

    @supports (-webkit-filter: brightness(1)) or (filter: brightness(1)) {
      filter: brightness(0.9);
    }
  `;

const disabledLabelStyles = css`
  [data-disabled='true'] & {
    opacity: 0.4;
  }
`;

const addButtonStyles = css`
  &:hover {
    & > button {
      background-color: var(--cui-bg-danger-hovered);
      border-color: var(--cui-border-danger-hovered);
    }
  }
  &:active {
    & > button {
      background-color: var(--cui-bg-danger-pressed);
      border-color: var(--cui-border-danger-pressed);
    }
  }
`;

const Label = styled(FieldLabel)<LabelProps>(
  baseLabelStyles,
  invalidLabelStyles,
  loadingLabelStyles,
  draggingLabelStyles,
  disabledLabelStyles,
  addButtonStyles,
);

const actionButtonBaseStyles = ({ theme }: StyleProps) => css`
  position: absolute;
  right: -${theme.spacings.bit};
  bottom: -${theme.spacings.bit};
`;

const actionButtonSizeStyles = ({ buttonSize }: ActionButtonProps) => {
  if (buttonSize === 'giga') {
    return css`
      padding: 5px;
      svg {
        width: 14px;
        height: 14px;
      }
    `;
  }
  return null;
};

type ActionButtonProps = IconButtonProps & { buttonSize: Size };

const ActionButton = styled(IconButton)<ActionButtonProps>(
  actionButtonBaseStyles,
  actionButtonSizeStyles,
);

const AddButton = styled(ActionButton)`
  pointer-events: none;
`;

type LoadingIconProps = { isLoading: boolean };

const spinnerBaseStyles = ({ theme }: LoadingIconProps & StyleProps) => css`
  position: absolute;
  width: ${theme.iconSizes.giga};
  height: ${theme.iconSizes.giga};
  top: calc(50% - 16px);
  left: calc(50% - 16px);
  opacity: 0;
  visibility: hidden;
  transition: opacity ${theme.transitions.default},
    visibility ${theme.transitions.default};
  color: var(--cui-fg-on-strong);
  pointer-events: none;
`;

const spinnerLoadingStyles = ({ isLoading }: LoadingIconProps) =>
  isLoading &&
  css`
    opacity: 1;
    visibility: inherit;
  `;

const LoadingIcon = styled(Spinner)<LoadingIconProps>(
  spinnerBaseStyles,
  spinnerLoadingStyles,
);

const LoadingLabel = styled.span(hideVisually);

/**
 * The ImageInput component allows users to upload images.
 */
export const ImageInput = ({
  label,
  src,
  size = 'yotta',
  'id': customId,
  clearButtonLabel,
  onChange,
  onClear,
  disabled,
  validationHint,
  invalid = false,
  loadingLabel,
  'component': Component,
  className,
  style,
  'aria-describedby': descriptionId,
  ...props
}: ImageInputProps): JSX.Element => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    if (!label) {
      throw new AccessibilityError(
        'ImageInput',
        'The `label` prop is missing.',
      );
    }
    if (!clearButtonLabel) {
      throw new AccessibilityError(
        'ImageInput',
        'The `clearButtonLabel` prop is missing.',
      );
    }
    if (!loadingLabel) {
      throw new AccessibilityError(
        'ImageInput',
        'The `loadingLabel` prop is missing.',
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
    const file = files && files[0];
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
    const files = event.dataTransfer && event.dataTransfer.files;
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
      <InputWrapper onPaste={handlePaste}>
        <HiddenInput
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          onClick={handleClick}
          disabled={disabled || isLoading}
          aria-invalid={invalid && 'true'}
          aria-describedby={descriptionIds}
          {...props}
        />
        <Label
          isLoading={isLoading}
          isDragging={isDragging}
          invalid={invalid}
          htmlFor={inputId}
          onDragEnter={handleDragging}
          onDragOver={handleDragging}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span css={hideVisually()}>{label}</span>
          <Component src={src || previewImage} aria-hidden="true" />
        </Label>
        {src ? (
          <ActionButton
            type="button"
            size="kilo"
            variant="primary"
            destructive
            label={clearButtonLabel}
            onClick={handleClear}
            disabled={isLoading || disabled}
            buttonSize={size}
          >
            <Delete size="16" />
          </ActionButton>
        ) : (
          <AddButton
            type="button"
            size="kilo"
            variant="primary"
            aria-hidden="true"
            tabIndex={-1}
            label="-" // We need to pass a label here to prevent IconButton from throwing
            disabled={isLoading || disabled}
            buttonSize={size}
          >
            <Plus size="16" />
          </AddButton>
        )}
        <LoadingIcon isLoading={isLoading}>
          <LoadingLabel>{loadingLabel}</LoadingLabel>
        </LoadingIcon>
      </InputWrapper>
      <FieldValidationHint
        id={validationHintId}
        validationHint={validationHint}
        invalid={invalid}
      />
    </FieldWrapper>
  );
};
