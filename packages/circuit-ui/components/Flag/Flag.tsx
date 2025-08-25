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

import { forwardRef, type HTMLAttributes } from 'react';
import { getIconURL } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';

import classes from './Flag.module.css';
import type { FLAGS } from './constants.js';

type CountryCode = (typeof FLAGS)[number];

type FlagName = `flag_${Lowercase<CountryCode>}`;

type Dimensions =
  | {
      /**
       * The width of the flag image. To size the flag correctly, either width or height must be provided.
       */
      width?: never;
      /**
       * The height of the flag image. To size the flag correctly, either width or height must be provided.
       */
      height?: number;
    }
  | {
      /**
       * The width of the flag image. To size the flag correctly, either width or height must be provided.
       */
      width?: number;
      /**
       * The height of the flag image. To size the flag correctly, either width or height must be provided.
       */
      height?: never;
    };

export type FlagProps = HTMLAttributes<HTMLImageElement> & {
  countryCode: CountryCode;
  /**
   * The alt text for the flag image.
   */
  alt: string;
  /**
   * Additional class name to apply to the flag wrapper.
   */
  className?: string;
  /**
   * Additional class name to apply to the flag's inner image.
   */
  imageClassName?: string;
} & Dimensions;

const ASPECT_RATIO = 4 / 3;

// Renders an SVG icon of a flag. Flags are sourced from: https://flagicons.lipis.dev/
export const Flag = forwardRef<HTMLImageElement, FlagProps>(
  (
    { countryCode, alt, className, imageClassName, width, height, ...props },
    ref,
  ) => {
    const flagName = `flag_${countryCode.toLowerCase()}` as FlagName;
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
      <div
        className={clsx(classes.wrapper, className)}
        style={{
          height: dimensions.width,
          width: dimensions.width,
        }}
      >
        <img
          ref={ref}
          className={clsx(classes.base, imageClassName)}
          height={`${dimensions.height}px`}
          width={`${dimensions.width}px`}
          src={getIconURL(flagName)}
          {...props}
          alt={alt}
        />
      </div>
    );
  },
);
