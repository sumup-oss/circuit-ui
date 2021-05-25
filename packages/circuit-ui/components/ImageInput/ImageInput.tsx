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
  onChange: (event: File | null) => Promise<void>;
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

const HiddenInput = styled.input(
  ({ theme, invalid }: StyleProps & { invalid: boolean }) => css`
    ${hideVisually()};

    &:focus + label {
      ${!invalid && focusOutline({ theme })};
      border-radius: ${theme.borderRadius.tera};
      // ensures the focus outline doesn't appear behind the ActionButton
      border-bottom-right-radius: 12px;
    }
  `,
);

const StyledAvatar = styled(Avatar)(
  ({
    theme,
    invalid,
    isLoading,
  }: StyleProps & { invalid: boolean; isLoading: boolean }) => css`
    ${isLoading &&
    css`
      // TODO switch from brightness() to ::before everywhere
      // FIXME use a brightness filter instead of a pseudo-element when we drop support for IE
      filter: brightness(40%);
    `}
    ${invalid &&
    css`
      box-shadow: 0 0 0 2px ${theme.colors.danger};
    `};
    &:hover {
      filter: brightness(90%);
      cursor: pointer;
      ${invalid &&
      css`
        box-shadow: 0 0 0 2px ${theme.colors.r700};
      `};
    }
    &:hover + button {
      background-color: ${theme.colors.p700};
      border-color: ${theme.colors.p700};
    }
    &:active {
      filter: brightness(80%);
      ${invalid &&
      css`
        box-shadow: 0 0 0 2px ${theme.colors.danger};
      `};
    }
    &:active + button {
      background-color: ${theme.colors.p900};
      border-color: ${theme.colors.p900};
    }
  `,
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

const InputWrapper = styled.div`
  display: inline-block;
  position: relative;
  text-align: center;
`;

const spinnerBaseStyles = ({ theme }: StyleProps) => css`
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

const spinnerLoadingStyles = ({ isLoading }: { isLoading: boolean }) =>
  isLoading &&
  css`
    opacity: 1;
    visibility: visible;
  `;

const LoadingIcon = styled(Spinner)<{ isLoading: boolean }>(
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
    setPreviewImage('');
    setIsLoading(true);
    // URL.createObjectURL is not supported in Node, but the handleChange will only run client-side
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    setPreviewImage(URL.createObjectURL(file));
    return onChange(file)
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
          invalid={invalid}
          aria-invalid={invalid}
          {...props}
        />
        <Label htmlFor={id}>
          <span css={hideVisually()}>{label}</span>
          <StyledAvatar
            isLoading={isLoading}
            src={imageUrl || previewImage}
            invalid={invalid}
          />
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
        </Label>
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
