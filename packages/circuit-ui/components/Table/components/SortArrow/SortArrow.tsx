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

'use client';

import { type HTMLAttributes } from 'react';
import { ChevronUp, ChevronDown } from '@sumup/icons';

import type { Direction } from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';
import Tooltip from '../../../Tooltip/index.js';

import classes from './SortArrow.module.css';

interface SortArrowProps extends HTMLAttributes<HTMLButtonElement> {
  direction?: Direction;
  label: string;
}

/**
 * SortArrow for the Table component. The Table handles rendering it.
 */
export function SortArrow({ label, direction, onClick }: SortArrowProps) {
  return (
    <Tooltip
      type="label"
      label={label}
      component={(props) => (
        <button
          {...props}
          className={clsx(classes.base, props.className)}
          onClick={onClick}
        >
          {direction !== 'ascending' && (
            <ChevronUp size="16" aria-hidden="true" className={classes.icon} />
          )}
          {direction !== 'descending' && (
            <ChevronDown
              size="16"
              aria-hidden="true"
              className={classes.icon}
            />
          )}
        </button>
      )}
    />
  );
}
