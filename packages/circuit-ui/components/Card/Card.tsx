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

import { HTMLAttributes, forwardRef } from 'react';

import { clsx } from '../../styles/clsx.js';
import type { AsPropType } from '../../types/prop-types.js';

import classes from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The padding of the Card.
   */
  spacing?: 'mega' | 'giga';
  /**
   * Render the text using any HTML element.
   */
  as?: AsPropType;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, spacing = 'giga', as: Element = 'div', ...props }, ref) => (
    <Element
      {...props}
      ref={ref}
      className={clsx(classes.base, classes[spacing], className)}
    />
  ),
);

Card.displayName = 'Card';
