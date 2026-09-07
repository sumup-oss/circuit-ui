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

import { Image, type ImageProps } from '../../../Image/index.js';
import { AspectRatio } from '../../../AspectRatio/index.js';
import { ASPECT_RATIO } from '../../constants.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './SlideImage.module.css';

interface SlideImageProps extends ImageProps {
  /**
   * Image aspect ratio.
   */
  aspectRatio?: number;
}

export function SlideImage({
  aspectRatio = ASPECT_RATIO,
  className,
  ...props
}: SlideImageProps) {
  return (
    <AspectRatio aspectRatio={aspectRatio} className={classes['aspect-ratio']}>
      <Image className={clsx(classes.image, className)} {...props} />
    </AspectRatio>
  );
}
