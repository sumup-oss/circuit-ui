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

import { type HTMLAttributes, useCallback, type KeyboardEvent } from 'react';

import type { ClickEvent } from '../../../../types/events.js';
import { clsx } from '../../../../styles/clsx.js';
import { isEnter, isSpacebar } from '../../../../util/key-codes.js';

import classes from './TableRow.module.css';

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  onClick?: (event: ClickEvent<HTMLTableRowElement>) => void;
}

/**
 * TableRow for the Table component. The Table handles rendering it.
 */
export function TableRow({ onClick, className, ...props }: TableRowProps) {
  const onRowKeydown = useCallback(
    (event: KeyboardEvent<HTMLTableRowElement>) => {
      if (isEnter(event) || isSpacebar(event)) {
        onClick?.(event);
      }
    },
    [onClick],
  );
  return (
    <tr
      onClick={onClick}
      onKeyDown={onClick ? onRowKeydown : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={clsx(classes.base, className)}
      {...props}
    />
  );
}
