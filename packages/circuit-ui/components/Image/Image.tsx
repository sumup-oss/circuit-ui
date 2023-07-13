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

import { ImgHTMLAttributes, forwardRef } from 'react';

import { clsx } from '../../styles/clsx.js';

import classes from './Image.module.css';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
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

/**
 * The Image component. Responsive by default.
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, ...props }, ref) => (
    <img
      alt={alt}
      ref={ref}
      className={clsx(classes.base, className)}
      {...props}
    />
  ),
);

Image.displayName = 'Image';
