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

import { isNumber, isString } from '../../../../util/type-check.js';
import type { BreakpointOptions } from '../types.js';

import styles from './Col.module.css';
import { clsx } from '../../../../styles/clsx.js';
import { forwardRef, type HTMLAttributes } from 'react';

type Option = string | number;

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The amount to skip for a column. If the value is a number/string it will
   * be applied with no media query. If the value is an object it will apply
   * each value based on the key breakpoint, i.e. `{ untilKilo: 6 }` will
   * create a style for the untilKilo media query with a skip of 6 columns.
   * Accepts negative values as well.
   */
  skip?: Option | BreakpointOptions<Option>;
  /**
   * The amount to span for a column. If the value is a number/string it will
   * be applied with no media query. If the value is an object it will apply
   * each value based on the key breakpoint, i.e. `{ untilKilo: 6 }` will
   * create a style for the untilKilo media query with a span of 6 columns.
   */
  span?: Option | BreakpointOptions<Option>;
}

export const Col = forwardRef<HTMLDivElement, ColProps>(
  ({ span, skip, className, ...props }, ref) => {
    const customProperties: Record<string, Option> = {};

    // Span
    if (span) {
      if (isNumber(span) || isString(span)) {
        customProperties['--span'] = span;
      } else {
        Object.entries(span).forEach(
          ([breakpoint, spanSize]) => {
            if (breakpoint === 'default') {
              customProperties['--span'] = spanSize;
            } else {
              const bpToUse =
                breakpoint === 'untilKilo' ? 'until-kilo' : breakpoint;
              customProperties[`--span-${bpToUse}`] = spanSize;
            }
          },
          [styles.base],
        );
      }
    }

    // Skip
    if (skip) {
      if (isNumber(skip) || isString(skip)) {
        customProperties['--skip'] = skip;
      } else {
        Object.entries(skip).forEach(
          ([breakpoint, skipBy]) => {
            if (breakpoint === 'default') {
              customProperties['--skip'] = skipBy;
            } else {
              const bpToUse =
                breakpoint === 'untilKilo' ? 'until-kilo' : breakpoint;
              customProperties[`--skip-${bpToUse}`] = skipBy;
            }
          },
          [styles.base],
        );
      }
    }

    return (
      <div
        ref={ref}
        style={customProperties}
        className={clsx(styles.base, Boolean(skip) && styles.skip, className)}
        {...props}
      />
    );
  },
);
