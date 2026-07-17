/**
 * Copyright 2026, SumUp Ltd.
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

import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';

import { getIconURL } from '../../helpers.js';
import { ICON_SIZES } from '../../icon-sizes.js';
import { deprecate } from '../../logger.js';

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
  /**
   * The code of the country flag to display, e.g. `'DE'`.
   */
  countryCode: CountryCode;
  /**
   * The alt text for the flag image. Pass an empty string to hide purely
   * decorative flags from assistive technology.
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
} & (WithSize | WithHeightWidth);

const ASPECT_RATIO = 4 / 3;

// Inline styles can't use an `@supports` feature query, so `aspect-ratio`
// is applied as a progressive enhancement with no fallback for browsers
// that don't support it.
const WRAPPER_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  aspectRatio: '1 / 1',
};

const IMAGE_STYLE: CSSProperties = {
  border: '0.5px solid #ccc',
  borderRadius: '2px',
};

/**
 * Renders an SVG icon of a flag. Flags are sourced from: https://flagicons.lipis.dev/
 */
export const Flag = forwardRef<HTMLImageElement, FlagProps>(
  (
    {
      countryCode,
      alt,
      className,
      imageClassName,
      style,
      size,
      width,
      height,
      ...props
    },
    ref,
  ) => {
    const flagName = `flag_${countryCode.toLowerCase()}`;

    if (process.env.NODE_ENV !== 'production' && (width || height)) {
      deprecate(
        'Flag',
        'The `width` and `height` props are deprecated. Use the `size` prop instead.',
      );
    }

    if (size) {
      const sizeValue = ICON_SIZES[size];
      return (
        <div className={className} style={WRAPPER_STYLE}>
          <img
            ref={ref}
            className={imageClassName}
            style={{
              ...IMAGE_STYLE,
              width: sizeValue,
              height: `calc(${sizeValue} * 3 / 4)`,
              ...style,
            }}
            src={getIconURL(flagName)}
            {...props}
            alt={alt}
          />
        </div>
      );
    }

    // default dimensions
    const dimensions = { width: 16, height: 12 };
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
      <div className={className} style={WRAPPER_STYLE}>
        <img
          ref={ref}
          className={imageClassName}
          style={{ ...IMAGE_STYLE, ...style }}
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

Flag.displayName = 'Flag';
