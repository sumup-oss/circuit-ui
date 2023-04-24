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

import styled from '@emotion/styled';

import Image from '../../../Image';
import AspectRatio from '../../../AspectRatio.js';
import { ASPECT_RATIO } from '../../constants.js';

export interface SlideImageProps {
  /**
   * Specifies the source URL of an image.
   */
  src: string;
  /**
   * Provides alternative information if a user cannot view the image,
   * e.g. because of slow connection, an error in the src attribute, or if the
   * user uses a screen reader.
   */
  alt: string;
  /**
   * Image aspect ratio.
   */
  aspectRatio?: number;
}

const StyledAspectRatio = styled(AspectRatio)`
  background: var(--cui-bg-subtle);
`;

const StyledImage = styled(Image)`
  img {
    object-fit: cover;
  }
`;

export function SlideImage({
  src,
  alt,
  aspectRatio = ASPECT_RATIO,
  ...props
}: SlideImageProps) {
  return (
    <StyledAspectRatio aspectRatio={aspectRatio}>
      <StyledImage src={src} alt={alt} {...props} />
    </StyledAspectRatio>
  );
}
