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

export interface AvatarInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * A clear and concise description of the AvatarInput's purpose.
   */
  label: string;
  /**
   * A unique identifier for the input element. If not defined, a generated id is used.
   */
  id?: string;
  /**
   * The source URL of an existing Avatar to be displayed in the AvatarInput.
   */
  src?: string;
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
 * AvatarInput component.
 */
export const AvatarInput = ({
  label,
  src,
  id: customId,
  clearButtonLabel,
  onChange,
  onClear,
  disabled,
  validationHint,
  invalid = false,
  loadingLabel,
  ...props
}: AvatarInputProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = customId || uniqueId('AvatarInput_');
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
          <Avatar src={src || previewImage} />
          {!src && (
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
        </StyledLabel>
        {src && (
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
