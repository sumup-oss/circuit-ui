/**
 * Copyright 2019, SumUp Ltd.
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

import { HTMLProps } from 'react';
import { css } from '@emotion/core';

import styled from '../../styles/styled';

export interface ImageProps
extends Omit<HTMLProps<HTMLImageElement>, 'size' | 'crossOrigin'> {
    /**
     * Specifies the source URL of an image
    */
   src: string;
    /**
     * Provides alternative information if a user cannot view the image,
     * e.g. because of slow connection, an error in the src attribute, or if the
     * user uses a screen reader.
    */
   alt: string;
  }

const baseStyles = () => css`
  label: image;
  display: block;
  height: auto;
  max-height: 100%;
  width: 100%;
`;

/**
 * The Image component. Responsive by default.
 */
export const Image = styled.img<ImageProps>(baseStyles);
