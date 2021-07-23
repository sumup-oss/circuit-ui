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

/** @jsxRuntime classic */
/** @jsx jsx */
import {
  useState,
  useRef,
  InputHTMLAttributes,
  ChangeEvent,
  ClipboardEvent,
  DragEvent,
  MouseEvent,
  KeyboardEvent,
  Fragment,
} from 'react';
import { css, jsx } from '@emotion/core';
import { Bin } from '@sumup/icons';

import Label from '../Label';
import IconButton from '../IconButton';
import Spinner from '../Spinner';
import ValidationHint from '../ValidationHint';
import styled, { StyleProps } from '../../styles/styled';
import { uniqueId } from '../../util/id';
import { focusOutline, hideVisually } from '../../styles/style-mixins';

export interface ImageInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * A clear and concise description of the ImageInput's purpose.
   */
  label: string;
  /**
   * The visual component to render as an image input. It should accept an src
   * prop to render the image.
   */
  component: ({ src, alt }: { src?: string; alt: string }) => JSX.Element;
  /**
   * A callback function to call when the user has selected an image.
   */
  onChange: (event: File) => void | Promise<void>;
  /**
   * A callback function to call when the input is cleared.
   */
  onClear: (event: MouseEvent | KeyboardEvent) => void | Promise<void>;
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
}

const InputWrapper = styled.div`
  display: inline-block;
  position: relative;
  text-align: center;
`;

const HiddenInput = styled.input(
  ({ theme }) => css`
    ${hideVisually()};
    &:focus + label > *:last-child {
      ${focusOutline({ theme })};
    }
  `,
);

type StyledLabelProps = StyleProps & {
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
    background-color: ${theme.colors.black};
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

const invalidLabelStyles = ({ theme, invalid }: StyledLabelProps) =>
  invalid &&
  css`
    > *:last-child {
      box-shadow: 0 0 0 2px ${theme.colors.danger};
    }
    &:hover > *:last-child {
      box-shadow: 0 0 0 2px ${theme.colors.r700};
    }
  `;

const loadingLabelStyles = ({ isLoading }: StyledLabelProps) => {
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

const draggingLabelStyles = ({ theme, isDragging }: StyledLabelProps) =>
  isDragging &&
  css`
    *:last-child {
      ${focusOutline(theme)};
    }

    &::before {
      opacity: 0.1;
    }

    @supports (-webkit-filter: brightness(1)) or (filter: brightness(1)) {
      filter: brightness(0.9);
    }
  `;

const addButtonStyles = ({ theme }: StyledLabelProps) => css`
  &:hover {
    & > button {
      background-color: ${theme.colors.p700};
      border-color: ${theme.colors.p700};
    }
  }
  &:active {
    & > button {
      background-color: ${theme.colors.p900};
      border-color: ${theme.colors.p900};
    }
  }
`;

const StyledLabel = styled(Label)<StyledLabelProps>(
  baseLabelStyles,
  invalidLabelStyles,
  loadingLabelStyles,
  draggingLabelStyles,
  addButtonStyles,
);

const ActionButton = styled(IconButton)(
  ({ theme }) => css`
    position: absolute;
    right: -${theme.spacings.bit};
    bottom: -${theme.spacings.bit};
  `,
);

const AddButton = styled(ActionButton)`
  pointer-events: none;
`;

type LoadingIconProps = StyleProps & { isLoading: boolean };

const spinnerBaseStyles = ({ theme }: LoadingIconProps) => css`
  position: absolute;
  width: ${theme.iconSizes.giga};
  height: ${theme.iconSizes.giga};
  top: calc(50% - 16px);
  left: calc(50% - 16px);
  opacity: 0;
  visibility: hidden;
  transition: opacity ${theme.transitions.default},
    visibility ${theme.transitions.default};
  color: ${theme.colors.white};
  pointer-events: none;
`;

const spinnerLoadingStyles = ({ isLoading }: LoadingIconProps) =>
  isLoading &&
  css`
    opacity: 1;
    visibility: visible;
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
  alt,
  id: customId,
  clearButtonLabel,
  onChange,
  onClear,
  disabled,
  validationHint,
  invalid = false,
  loadingLabel,
  component: Component,
  ...props
}: ImageInputProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = customId || uniqueId('ImageInput_');
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
    // URL.createObjectURL is not supported in Node, but the handleChange will only run client-side
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
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

  const handleClear = (event: MouseEvent | KeyboardEvent) => {
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
    <Fragment>
      <InputWrapper onPaste={handlePaste}>
        <HiddenInput
          ref={inputRef}
          id={id}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          onClick={handleClick}
          disabled={disabled || isLoading}
          aria-invalid={invalid}
          {...props}
        />
        <StyledLabel
          isLoading={isLoading}
          isDragging={isDragging}
          invalid={invalid}
          htmlFor={id}
          onDragEnter={handleDragging}
          onDragOver={handleDragging}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span css={hideVisually()}>{label}</span>
          <Component src={src || previewImage} alt={alt || ''} />
        </StyledLabel>
        {src ? (
          <ActionButton
            type="button"
            size="kilo"
            variant="primary"
            destructive
            label={clearButtonLabel}
            onClick={handleClear}
            disabled={isLoading}
          >
            <Bin />
          </ActionButton>
        ) : (
          <AddButton
            type="button"
            size="kilo"
            variant="primary"
            aria-hidden="true"
            tabIndex={-1}
            label=""
            disabled={isLoading}
          >
            {/* FIXME add to @sumup/icons and upgrade the dependency in the next major */}
            <svg width="16" height="16" fill="none">
              <path
                d="M7.99999 0c.55229 0 1 .447715 1 1v5.99999H15c.5523 0 1 .44772 1 1 0 .55229-.4477 1-1 1H8.99999V15c0 .5523-.44771 1-1 1-.55228 0-1-.4477-1-1V8.99999H1c-.552285 0-1-.44771-1-1 0-.55228.447715-1 1-1h5.99999V1c0-.552285.44772-1 1-1z"
                fill="#fff"
              />
            </svg>
          </AddButton>
        )}
        <LoadingIcon isLoading={isLoading}>
          <LoadingLabel>{loadingLabel}</LoadingLabel>
        </LoadingIcon>
      </InputWrapper>
      <ValidationHint validationHint={validationHint} invalid={invalid} />
    </Fragment>
  );
};
