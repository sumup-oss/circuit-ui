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

import { HTMLAttributes } from 'react';
import { ChevronUp, ChevronDown } from '@sumup/icons';

import { Direction } from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';
import utilityClasses from '../../../../styles/utility.js';

import classes from './SortArrow.module.css';

interface SortArrowProps extends HTMLAttributes<HTMLButtonElement> {
  direction?: Direction;
  label: string;
}

/**
 * SortArrow for the Table component. The Table handles rendering it.
 */
export function SortArrow({
  label,
  direction,
  className,
  ...props
}: SortArrowProps) {
  return (
    <button title={label} className={clsx(classes.base, className)} {...props}>
      {direction !== 'ascending' && (
        <ChevronUp size="16" aria-hidden="true" className={classes.icon} />
      )}
      {direction !== 'descending' && (
        <ChevronDown size="16" aria-hidden="true" className={classes.icon} />
      )}
      <span className={utilityClasses.hideVisually}>{label}</span>
    </button>
  );
}
