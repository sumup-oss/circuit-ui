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

import { forwardRef, type TdHTMLAttributes } from 'react';

import { clsx } from '../../../../styles/clsx';
import type { CellAlignment } from '../../types';

import classes from './TableCell.module.css';

const PRESENTATION = 'presentation';

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Aligns the content of the Cell with text-align.
   */
  align?: CellAlignment;
  /**
   * Adds heading styles to placeholder Cell.
   */
  header?: boolean;
  /**
   * Adds active style to the Cell if it is currently hovered by sort.
   */
  isHovered?: boolean;
  condensed?: boolean;
  role?: 'presentation';
}

/**
 * TableCell for the Table component. The Table handles rendering it.
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      children,
      className,
      align = 'left',
      condensed,
      isHovered,
      header,
      role,
      ...props
    },
    ref,
  ) => (
    <td
      ref={ref}
      role={role}
      className={clsx(
        classes.base,
        classes[align],
        condensed && classes.condensed,
        isHovered && classes.hover,
        header && classes.header,
        role === PRESENTATION && classes.presentation,
        className,
      )}
      {...props}
    >
      {children}
    </td>
  ),
);

TableCell.displayName = 'TableCell';
