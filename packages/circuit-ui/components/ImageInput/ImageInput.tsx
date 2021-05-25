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
  Fragment,
} from 'react';
import { css, jsx } from '@emotion/core';
import { Bin } from '@sumup/icons';

import Avatar from '../Avatar';
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
   * A clear and concise description of the image input's purpose.
   */
  label: string;
  /**
   * A unique identifier for the input element. If not defined, a generated id is used.
   */
  id?: string;
  /**
   * An existing image URL to be displayed in the image input.
   */
  imageUrl?: string;
  /**
   * An accessible label for the "clear" icon button.
   */
  clearButtonLabel: string;
  /**
   * A callback function to call when the user has selected an image.
   */
  onChange: (event: File) => Promise<void>;
  /**
   * A callback function to call when the input is cleared.
   */
  onClear: () => void;
  /**
   * ...
   */
  validationHint?: string;
  /**
   * ...
   */
  invalid?: boolean;
  /**
   * ...
   */
  loadingLabel: string;
}

const InputWrapper = styled.div`
  display: inline-block;
  position: relative;
  text-align: center;
`;

const HiddenInput = styled.input(
  ({ theme }) => css`
    ${hideVisually()};
    &:focus + label {
      ${focusOutline({ theme })};
    }
  `,
);

type StyledLabelProps = StyleProps & { isLoading: boolean; invalid: boolean };

const baseLabelStyles = ({ theme }: StyledLabelProps) => css`
  border-radius: ${theme.borderRadius.tera};
  // ensures the focus outline doesn't appear behind the ActionButton
  border-bottom-right-radius: 12px;
  &:hover {
    cursor: pointer;
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

const invalidLabelStyles = ({ theme, invalid }: StyledLabelProps) =>
  invalid &&
  css`
    box-shadow: 0 0 0 2px ${theme.colors.danger};
    &:hover {
      box-shadow: 0 0 0 2px ${theme.colors.r700};
    }
    &:active {
      box-shadow: 0 0 0 2px ${theme.colors.danger};
    }
  `;

const overlayLabelStyles = ({ theme, isLoading }: StyledLabelProps) => css`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius.tera};
    background-color: ${theme.colors.black};
    opacity: 0;
    pointer-events: none;
    ${isLoading &&
    css`
      opacity: 0.4;
    `}
  }
  &:hover::before {
    ${!isLoading &&
    css`
      opacity: 0.1;
    `}
  }
  &:active::before {
    ${!isLoading &&
    css`
      opacity: 0.2;
    `}
  }
`;

const StyledLabel = styled(Label)<StyledLabelProps>(
  baseLabelStyles,
  addButtonStyles,
  invalidLabelStyles,
  overlayLabelStyles,
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
 * ImageInput component.
 */
export const ImageInput = ({
  label,
  imageUrl,
  id: customId,
  clearButtonLabel,
  onChange,
  onClear,
  disabled,
  validationHint,
  invalid = false,
  loadingLabel,
  ...props
}: ImageInputProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = customId || uniqueId('imageinput_');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    setPreviewImage('');
    setIsLoading(true);
    // URL.createObjectURL is not supported in Node, but the handleChange will only run client-side
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    setPreviewImage(URL.createObjectURL(file));
    onChange(file)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setPreviewImage('');
    onClear();
  };

  return (
    <Fragment>
      <InputWrapper>
        <HiddenInput
          ref={inputRef}
          id={id}
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={disabled || isLoading}
          aria-invalid={invalid}
          {...props}
        />
        <StyledLabel isLoading={isLoading} invalid={invalid} htmlFor={id}>
          <span css={hideVisually()}>{label}</span>
          <Avatar src={imageUrl || previewImage} />
          {!imageUrl && (
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.99999 0C8.55228 0 8.99999 0.447715 8.99999 1V6.99999H15C15.5523 6.99999 16 7.44771 16 7.99999C16 8.55228 15.5523 8.99999 15 8.99999H8.99999V15C8.99999 15.5523 8.55228 16 7.99999 16C7.44771 16 6.99999 15.5523 6.99999 15V8.99999H1C0.447715 8.99999 0 8.55228 0 7.99999C0 7.44771 0.447715 6.99999 1 6.99999H6.99999V1C6.99999 0.447715 7.44771 0 7.99999 0Z"
                  fill="white"
                />
              </svg>
            </AddButton>
          )}
        </StyledLabel>
        {imageUrl && (
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
        )}
        <LoadingIcon isLoading={isLoading}>
          <LoadingLabel>{loadingLabel}</LoadingLabel>
        </LoadingIcon>
      </InputWrapper>
      <ValidationHint validationHint={validationHint} invalid={invalid} />
    </Fragment>
  );
};
