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

import { forwardRef, type HTMLAttributes } from 'react';

import type { AsPropType } from '../../types/prop-types.js';
import { clsx } from '../../styles/clsx.js';
import { deprecate } from '../../util/logger.js';

import classes from './Body.module.css';

type Variant = 'highlight' | 'quote' | 'confirm' | 'alert' | 'subtle';

export interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Choose from 3 font sizes. Default `m`.
   */
  size?:
    | 's'
    | 'm'
    | 'l'
    /**
     * @deprecated
     */
    | 'one'
    /**
     * @deprecated
     */
    | 'two';
  /**
   * Choose from style variants.
   */
  variant?: Variant;
  /**
   * Render the text using any HTML element.
   */
  as?: AsPropType;
}

function getHTMLElement(variant?: Variant): AsPropType {
  if (variant === 'highlight') {
    return 'strong';
  }
  if (variant === 'quote') {
    return 'blockquote';
  }
  return 'p';
}

/**
 * The Body component is used to present the core textual content
 * to our users.
 */
export const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  ({ className, as, size = 'm', variant, ...props }, ref) => {
    const Element = as || getHTMLElement(variant);

    if (process.env.NODE_ENV !== 'production') {
      const deprecatedSizeMap: Record<string, string> = {
        'one': 'm',
        'two': 's',
      };
      if (size in deprecatedSizeMap) {
        deprecate(
          'Body',
          `The "${size}" size has been deprecated. Use the "${deprecatedSizeMap[size]}" size instead.`,
        );
      }
    }

    return (
      <Element
        {...props}
        ref={ref}
        className={clsx(
          classes.base,
          classes[size],
          variant && classes[variant],
          className,
        )}
      />
    );
  },
);

Body.displayName = 'Body';
