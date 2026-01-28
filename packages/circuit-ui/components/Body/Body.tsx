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
   * Choose from three font weights. Default: `regular`.
   *
   * Use the `as` prop to render the component as the `strong` HTML element
   * if appropriate.
   */
  weight?: 'regular' | 'semibold' | 'bold';
  /**
   * Choose a style or text decoration. Underline is reserved for hyperlinks.
   *
   * Use the `as` prop to render the component as the `em` or `del` HTML
   * elements if appropriate.
   */
  decoration?:
    | 'strikethrough'
    /**
     * @deprecated After the upcoming brand refresh, italic text will no longer be supported.
     * The `italic` decoration value will be removed in the next major version.
     */
    | 'italic';
  /**
   * Choose a foreground color token name. Default: `normal`.
   */
  color?:
    | 'normal'
    | 'subtle'
    | 'placeholder'
    | 'on-strong'
    | 'on-strong-subtle'
    | 'accent'
    | 'success'
    | 'warning'
    | 'danger'
    | 'promo';
  /**
   * @deprecated Use the new `color` prop instead of the `alert`, `confirm` and
   * `subtle` variants. Use the new `weight` prop instead of the `highlight`
   * variant. Use custom CSS for the `quote` variant.
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

function getDefaultWeight(as?: AsPropType) {
  if (as === 'strong') {
    return 'semibold';
  }
  return 'regular';
}

export const deprecatedSizeMap: Record<string, string> = {
  'one': 'm',
  'two': 's',
};

/**
 * The Body component is used to present the core textual content
 * to our users.
 */
export const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  (
    {
      className,
      as,
      size: legacySize = 'm',
      weight = getDefaultWeight(as),
      decoration,
      color = 'normal',
      variant,
      ...props
    },
    ref,
  ) => {
    const Element = as || getHTMLElement(variant);

    if (process.env.NODE_ENV !== 'production') {
      if (variant) {
        if (variant === 'highlight') {
          deprecate(
            'Body',
            'The "highlight" variant has been deprecated. Use the new `weight` prop instead.',
          );
        } else if (variant === 'quote') {
          deprecate(
            'Body',
            'The "quote" variant has been deprecated. Use custom CSS instead.',
          );
        } else {
          deprecate(
            'Body',
            `The "${variant}" variant has been deprecated. Use the new \`color\` prop instead.`,
          );
        }
      }

      if (legacySize in deprecatedSizeMap) {
        deprecate(
          'Body',
          `The "${legacySize}" size has been deprecated. Use the "${deprecatedSizeMap[legacySize]}" size instead.`,
        );
      }
    }

    const size = (deprecatedSizeMap[legacySize] || legacySize) as
      | 'l'
      | 'm'
      | 's';

    return (
      <Element
        {...props}
        ref={ref}
        className={clsx(
          classes.base,
          classes[size],
          classes[weight],
          classes[color],
          decoration && classes[decoration],
          variant && classes[variant],
          className,
        )}
      />
    );
  },
);

Body.displayName = 'Body';
