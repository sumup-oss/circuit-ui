/**
 * Copyright 2021, SumUp Ltd.
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

import { forwardRef, HTMLAttributes, Ref } from 'react';

import type { AsPropType } from '../../types/prop-types.js';
import { clsx } from '../../styles/clsx.js';

import classes from './BodyLarge.module.css';

type Variant = 'highlight' | 'quote' | 'confirm' | 'alert' | 'subtle';

export interface BodyLargeProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Choose from style variants.
   */
  variant?: Variant;
  /**
   * Render the text using any HTML element.
   */
  as?: AsPropType;
  /**
   * The ref to the HTML DOM element.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: Ref<any>;
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
 * The BodyLarge component is used to present the core textual content
 * to our users.
 */
export const BodyLarge = forwardRef<HTMLParagraphElement, BodyLargeProps>(
  ({ className, as, variant, ...props }, ref) => {
    const Element = as || getHTMLElement(variant);
    return (
      <Element
        {...props}
        ref={ref}
        className={clsx(classes.base, variant && classes[variant], className)}
      />
    );
  },
);

BodyLarge.displayName = 'BodyLarge';
