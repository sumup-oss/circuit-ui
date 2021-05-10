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
import { ChangeEvent, Fragment, InputHTMLAttributes, useState } from 'react';
import { css, jsx } from '@emotion/core';

import Avatar from '../Avatar';
import Label from '../Label';
import styled from '../../styles/styled';
import { uniqueId } from '../../util/id';
import { focusOutline, hideVisually } from '../../styles/style-mixins';

export interface ImageInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * label
   */
  label: string;
  /**
   * alt
   */
  alt: string;
  /**
   * imageUrl
   */
  imageUrl?: string;
}

const Input = styled.input(
  ({ theme }) => css`
    ${hideVisually()};

    &:focus + label {
      ${focusOutline({ theme })};
      border-radius: ${theme.borderRadius.tera};
    }
  `,
);

const StyledAvatar = styled(Avatar)`
  :hover {
    filter: brightness(90%);
    cursor: pointer;
  }
`;

/**
 * ImageInput component.
 */
export const ImageInput = ({
  label,
  imageUrl: initialImageUrl,
  alt,
  id: customId,
  ...props
}: ImageInputProps): JSX.Element => {
  const id = customId || uniqueId('imageinput_');
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    const image = URL.createObjectURL(
      event.target.files && event.target.files[0],
    );
    setImageUrl(image);
  };

  return (
    <Fragment>
      <Input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleChange}
        {...props}
      />
      <Label htmlFor={id}>
        <span css={hideVisually()}>{label}</span>
        <StyledAvatar src={imageUrl} variant="business" alt={alt} />
      </Label>
    </Fragment>
  );
};
