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

import { Image } from '../../../Image/index.js';
import { AspectRatio } from '../../../AspectRatio/index.js';
import { ASPECT_RATIO } from '../../constants.js';

import classes from './SlideImage.module.css';

interface SlideImageProps {
  /**
   * Specifies the source URL of an image.
   */
  src: string;
  /**
   * [Images must have text alternatives](https://www.w3.org/WAI/tutorials/images/)
   * that describe the information or function represented by them. This
   * ensures that images can be used by people with various disabilities. Pass
   * an empty string if the image is [decorative](https://www.w3.org/WAI/tutorials/images/decorative/),
   * or a localized description if the image is [informative](https://www.w3.org/WAI/tutorials/images/informative/).
   */
  alt: string;
  /**
   * Image aspect ratio.
   */
  aspectRatio?: number;
}

export function SlideImage({
  src,
  alt,
  aspectRatio = ASPECT_RATIO,
  ...props
}: SlideImageProps) {
  return (
    <AspectRatio aspectRatio={aspectRatio} className={classes['aspect-ratio']}>
      <Image src={src} alt={alt} className={classes.image} {...props} />
    </AspectRatio>
  );
}
