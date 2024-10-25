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

import { forwardRef, type ImgHTMLAttributes } from 'react';

import { clsx } from '../../styles/clsx';

import classes from './Image.module.css';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * The source URL of the image. Do not use unauthorized images from external sources.
   */
  src: string;
  /**
   * Images must have text alternatives that describe the information or function represented by them. This ensures that images can be used by people with various disabilities.
   *
   * - [**Informative images**](https://www.w3.org/WAI/tutorials/images/informative/): Images that graphically represent concepts and information, typically pictures, photos, and illustrations. The text alternative should be at least a short description conveying the essential information presented by the image.
   * - [**Decorative images**](https://www.w3.org/WAI/tutorials/images/decorative/): Provide a null text alternative (`alt=""`) when the only purpose of an image is to add visual decoration to the page, rather than to convey information that is important to understanding the page.
   * - [**Functional images**](https://www.w3.org/WAI/tutorials/images/functional/): The text alternative of an image used as a link or as a button should describe the functionality of the link or button rather than the visual image. Examples of such images are a printer icon to represent the print function or a button to submit a form.
   * - [**Images of text**](https://www.w3.org/WAI/tutorials/images/textual/): Readable text is sometimes presented within an image. If the image is not a logo, avoid text in images. However, if images of text are used, the text alternative should contain the same words as in the image.
   * - [**Complex images**](https://www.w3.org/WAI/tutorials/images/complex/) such as graphs and diagrams: To convey data or detailed information, provide a complete text equivalent of the data or information provided in the image as the text alternative.
   * - [**Groups of images**](https://www.w3.org/WAI/tutorials/images/groups/): If multiple images convey a single piece of information, the text alternative for one image should convey the information for the entire group.
   * - [**Image maps**](https://www.w3.org/WAI/tutorials/images/imagemap/): The text alternative for an image that contains multiple clickable areas should provide an overall context for the set of links. Also, each individually clickable area should have alternative text that describes the purpose or destination of the link.
   *
   * _From the [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/tutorials/images/)_
   */
  alt: string;
}

/**
 * The Image component. Responsive by default.
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, ...props }, ref) => (
    // biome-ignore lint/a11y/useAltText: The `alt` prop is marked as required.
    <img
      alt={alt}
      ref={ref}
      className={clsx(classes.base, className)}
      {...props}
    />
  ),
);

Image.displayName = 'Image';
