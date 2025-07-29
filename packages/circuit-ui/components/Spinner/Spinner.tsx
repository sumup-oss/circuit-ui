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

import { clsx } from '../../styles/clsx.js';
import { deprecate } from '../../util/logger.js';

import classes from './Spinner.module.css';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Choose from 3 sizes. Default: 'm'.
   */
  size?:
    | 's'
    | 'm'
    | 'l'
    /**
     * @deprecated
     */
    | 'byte'
    /**
     * @deprecated
     */
    | 'kilo'
    /**
     * @deprecated
     */
    | 'giga';
}

const legacySizeMap: Record<string, 's' | 'm' | 'l'> = {
  byte: 's',
  kilo: 'm',
  giga: 'l',
};

/**
 * A spinning loading icon.
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size: legacySize = 'm', className, ...props }, ref) => {
    if (process.env.NODE_ENV !== 'production' && legacySizeMap[legacySize]) {
      deprecate(
        'Spinner',
        `The \`${legacySize}\` size has been deprecated. Use the \`${legacySizeMap[legacySize]}\` size instead.`,
      );
    }

    const size = legacySizeMap[legacySize] || legacySize;

    return (
      <span
        className={clsx(classes.base, classes[size], className)}
        {...props}
        ref={ref}
      />
    );
  },
);

Spinner.displayName = 'Spinner';
