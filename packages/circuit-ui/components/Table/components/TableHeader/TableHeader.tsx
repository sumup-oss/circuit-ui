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

import type { ThHTMLAttributes } from 'react';

import SortArrow from '../SortArrow/index.js';
import { CellAlignment, SortParams } from '../../types.js';
import { ClickEvent } from '../../../../types/events.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../../../util/errors.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './TableHeader.module.css';

export interface TableHeaderProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Aligns the content of the Header with text-align.
   */
  align?: CellAlignment;
  /**
   * Adds row or col styles based on the provided Scope.
   */
  scope?: 'col' | 'row';
  /**
   * Adds sticky style to the Header based on rowHeader definition.
   */
  fixed?: boolean;
  /**
   * Adds condensed style to the Header based on the table props.
   */
  condensed?: boolean;
  /**
   * Adds active styles to the Header if it is currently hovered by sort.
   */
  isHovered?: boolean;
  /**
   * Props related to table sorting. Defaults to not sortable.
   */
  onClick?: (
    event: ClickEvent<HTMLTableCellElement | HTMLButtonElement>,
  ) => void;
  /**
   * Props related to table sorting. Defaults to not sortable.
   */
  sortParams?: SortParams;
}

/**
 * TableHeader for the Table component. The Table handles rendering it.
 */
export function TableHeader({
  children,
  condensed,
  align = 'left',
  scope = 'col',
  fixed = false,
  isHovered = false,
  sortParams = { sortable: false },
  className,
  onClick,
  ...props
}: TableHeaderProps) {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    sortParams.sortable &&
    !isSufficientlyLabelled(sortParams.sortLabel)
  ) {
    throw new AccessibilityError(
      'Table',
      'The `sortLabel` prop is missing or invalid. Omit the `sortable` prop if you intend to disable the row sorting functionality.',
    );
  }
  return (
    <th
      className={clsx(
        classes.base,
        classes[align],
        isHovered && classes.hover,
        fixed && classes.fixed,
        condensed && classes.condensed,
        className,
      )}
      scope={scope}
      aria-sort={
        sortParams.sortable ? sortParams.sortDirection || 'none' : undefined
      }
      onClick={onClick}
      {...props}
    >
      {sortParams.sortable && (
        <SortArrow
          label={sortParams.sortLabel}
          direction={sortParams.sortDirection}
          onClick={onClick}
        />
      )}
      {children}
    </th>
  );
}
