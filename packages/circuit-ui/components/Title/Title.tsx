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

import { HTMLAttributes, forwardRef } from 'react';

import { clsx } from '../../styles/clsx.js';

import classes from './Title.module.css';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * A Circuit UI title size. Defaults to `one`.
   */
  size?: 'one' | 'two' | 'three' | 'four';
  /**
   * The HTML heading element to render.
   * Headings should be nested sequentially without skipping any levels.
   * Learn more at https://www.w3.org/WAI/tutorials/page-structure/headings/.
   */
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * A flexible title component capable of rendering any HTML heading element.
 */
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, as: Element, size = 'one', ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={clsx(classes.base, classes[size], className)}
    />
  ),
);

Title.displayName = 'Title';
