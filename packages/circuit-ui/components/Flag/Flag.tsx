/**
 * Copyright 2025, SumUp Ltd.
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

import type { HTMLAttributes, Ref } from 'react';
import { getIconURL, type IconName } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { deprecate } from '../../util/logger.js';

import classes from './Flag.module.css';
import type { FLAGS } from './constants.js';

type CountryCode = (typeof FLAGS)[number];

type WithSize = {
  /**
   * Choose from 3 sizes.
   */
  size?: 's' | 'm' | 'l';
  width?: never;
  height?: never;
};

type WithHeightWidth =
  | {
      /**
       * The width of the flag image.
       * @deprecated Use the `size` prop instead.
       */
      width?: number;
      height?: never;
      size?: never;
    }
  | {
      /**
       * The height of the flag image.
       * @deprecated Use the `size` prop instead.
       */
      height?: number;
      width?: never;
      size?: never;
    };

export type FlagProps = HTMLAttributes<HTMLImageElement> & {
  ref?: Ref<HTMLImageElement>;
  countryCode: CountryCode;
  /**
   * The alt text for the flag image.
   */
  alt: string;
  /**
<<<<<<< HEAD
=======
   * The size of the flag. Matches the standard icon sizes.
   * @default 'm'
   */
  size?: 's' | 'm' | 'l';
  /**
>>>>>>> a8a295c4 (update styles to use tshirt sizes)
   * Additional class name to apply to the flag wrapper.
   */
  className?: string;
  /**
   * Additional class name to apply to the flag's inner image.
   */
  imageClassName?: string;
} & (WithSize | WithHeightWidth);

const ASPECT_RATIO = 4 / 3;

/**
 * Renders an SVG icon of a flag. Flags are sourced from: https://flagicons.lipis.dev/
 */
export function Flag({
  countryCode,
  alt,
<<<<<<< HEAD
=======
  size = 'm',
>>>>>>> a8a295c4 (update styles to use tshirt sizes)
  className,
  imageClassName,
  size,
  width,
  height,
  ref,
  ...props
}: FlagProps) {
  const flagName = `flag_${countryCode.toLowerCase()}` as IconName;

  if (process.env.NODE_ENV !== 'production' && (width || height)) {
    deprecate(
      'Flag',
      'The `width` and `height` props are deprecated. Use the `size` prop instead.',
    );
  }

  if (size) {
    return (
      <div className={clsx(classes.wrapper, className)}>
        <img
          ref={ref}
          className={clsx(classes.base, classes[size], imageClassName)}
          src={getIconURL(flagName)}
          {...props}
          alt={alt}
        />
      </div>
    );
  }

  // default dimensions
  const dimensions = {
    width: 16,
    height: 12,
  };
  // for a consistent aspect ratio
  if (height) {
    dimensions.height = height;
    dimensions.width = height * ASPECT_RATIO;
  }
  if (width) {
    dimensions.width = width;
    dimensions.height = width / ASPECT_RATIO;
  }

  return (
    <div className={clsx(classes.wrapper, className)}>
      <img
        ref={ref}
<<<<<<< HEAD
        className={clsx(classes.base, imageClassName)}
=======
        className={clsx(classes.base, classes[size], imageClassName)}
>>>>>>> a8a295c4 (update styles to use tshirt sizes)
        src={getIconURL(flagName)}
        {...props}
        alt={alt}
      />
    </div>
  );
}
