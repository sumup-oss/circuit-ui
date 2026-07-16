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

import { forwardRef, type HTMLAttributes } from 'react';

import { getIconURL } from '../../helpers.js';
import { ICON_SIZES } from '../../icon-sizes.js';

import type { CARD_SCHEMES } from './constants.js';

type CardSchemeName = (typeof CARD_SCHEMES)[number];

export type CardSchemeProps = HTMLAttributes<HTMLImageElement> & {
  /**
   * The name of the card scheme.
   */
  name: CardSchemeName;
  /**
   * The alt text for the card scheme logo.
   */
  alt: string;
  /**
   * Choose from 3 sizes.
   */
  size?: 's' | 'm' | 'l';
  /**
   * Additional class name to apply to the image.
   */
  className?: string;
};

/**
 * Renders the logo of a card scheme as an image, loaded from a URL.
 */
export const CardScheme = forwardRef<HTMLImageElement, CardSchemeProps>(
  ({ name, alt, className, style, size = 'm', ...props }, ref) => {
    const sizeValue = ICON_SIZES[size];
    return (
      <img
        ref={ref}
        className={className}
        style={{
          width: sizeValue,
          height: `calc(${sizeValue} * 3 / 4)`,
          ...style,
        }}
        src={getIconURL(name, '32')}
        {...props}
        alt={alt}
      />
    );
  },
);

CardScheme.displayName = 'CardScheme';
