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

/** @jsx jsx */
import { useState, useRef, InputHTMLAttributes, ChangeEvent } from 'react';
import { css, jsx } from '@emotion/core';
import { Bin } from '@sumup/icons';

import Avatar from '../Avatar';
import Label from '../Label';
import IconButton from '../IconButton';
import styled from '../../styles/styled';
import { uniqueId } from '../../util/id';
import { focusOutline, hideVisually } from '../../styles/style-mixins';

export interface ImageInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
}

const HiddenInput = styled.input(
  ({ theme }) => css`
    ${hideVisually()};

    &:focus + label {
      ${focusOutline({ theme })};
      border-radius: ${theme.borderRadius.tera};
    }
  `,
);

const StyledAvatar = styled(Avatar)(
  ({ theme }) => css`
    &:hover {
      filter: brightness(90%);
      cursor: pointer;
    }
    &:hover + button {
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

/**
 * ImageInput component.
 */
export const ImageInput = ({
  label,
  imageUrl: initialImageUrl,
  id: customId,
  clearButtonLabel,
  ...props
}: ImageInputProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = customId || uniqueId('imageinput_');
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    const image = URL.createObjectURL(
      event.target.files && event.target.files[0],
    );
    setImageUrl(image);
  };

  const handleClear = () => {
    if (inputRef.current) {
      setImageUrl(undefined);
      inputRef.current.value = '';
    }
  };

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <HiddenInput
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        onChange={handleChange}
        {...props}
      />
      <Label htmlFor={id}>
        <span css={hideVisually()}>{label}</span>
        <StyledAvatar src={imageUrl} variant="business" alt="" />
        {!imageUrl && (
          <AddButton
            type="button"
            size="kilo"
            variant="primary"
            aria-hidden="true"
            tabIndex={-1}
            label=""
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
        >
          <Bin />
        </ActionButton>
      )}
    </div>
  );
};
