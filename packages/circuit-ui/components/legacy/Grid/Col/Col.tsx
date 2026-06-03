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
import {forwardRef, type HTMLAttributes} from 'react';

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

export const Col =forwardRef<HTMLDivElement , ColProps>(
  ( { span, skip, className, ...props }, ref) => {
  let spanStyles: string[] = [];
  let skipStyles: string[] = [];


  // Span
  if(span) {
    if(isNumber(span) || isString(span)) {
      // @ts-ignore
      spanStyles.push(styles[`span-${span}`])
    } else {
      spanStyles = Object.entries(span).reduce((classes, [breakpoint, spanSize]) => {
        if(breakpoint === 'default') {
          // @ts-ignore
          classes.push(styles[`span-${spanSize}`])
        }else {
          const bpToUse = breakpoint === 'untilKilo' ? 'until-kilo' : breakpoint;
          // @ts-ignore
          classes.push(styles[`span-${bpToUse}-${spanSize}`])
        }
        return classes
      }, [styles.base])
    }
  }

  // Skip
  if(skip) {
    if(isNumber(skip) || isString(skip)) {
      // @ts-ignore
      skipStyles.push(styles[`skip-${Math.abs(skip)}`])
      if( Number(skip) < 0)
        skipStyles.push(styles['negative-skip'])
    } else {
      skipStyles = Object.entries(skip).reduce((classes, [breakpoint, skipBy]) => {
        if(breakpoint === 'default') {
          // @ts-ignore
          classes.push(styles[`skip-${Math.abs(skipBy)}`])
          if( Number(skipBy) < 0){
            classes.push(styles['negative-skip'])
          }

        }else {
          const bpToUse = breakpoint === 'untilKilo' ? 'until-kilo' : breakpoint;
          // @ts-ignore
          classes.push(styles[`skip-${bpToUse}-${Math.abs(skipBy)}`])
          if( Number(skipBy) < 0){
            // @ts-ignore
            classes.push(styles[`negative-skip${bpToUse}`])
          }
        }
        return classes
      }, [styles.base])
    }
  }

  return (
    // @ts-ignore
    <div ref={ref} className={clsx(styles.base, ...spanStyles, ...skipStyles, Boolean(skip) && styles.skip, className)} {...props} />
  )
});
