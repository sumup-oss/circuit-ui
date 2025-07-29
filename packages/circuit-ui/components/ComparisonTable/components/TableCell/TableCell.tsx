/**
 * Copyright 2025, SumUp Ltd.
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

import type { TdHTMLAttributes } from 'react';

import { BooleanValue } from '../BooleanValue/BooleanValue.js';
import { Compact } from '../../../Compact/index.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './TableCell.module.css';

export type CellValue = string | { label: string; value: boolean } | undefined;

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * The content of the cell.
   * If the value is a string, it will be rendered as plain text.
   * If the value is a boolean, it will be rendered as an icon with a descriptive label.
   */
  cellValue: CellValue;
}
export const TableCell = ({
  cellValue,
  className,
  ...props
}: TableCellProps) => {
  let content = <BooleanValue label={''} value={false} />;
  if (typeof cellValue === 'string') {
    content = (
      <Compact size="s" className={classes.text}>
        {cellValue}
      </Compact>
    );
  } else if (typeof cellValue === 'object') {
    const { label, value } = cellValue;
    content = <BooleanValue label={label} value={value} />;
  }

  return (
    <td className={clsx(classes.base, className)} {...props}>
      <div className={classes.content}>{content}</div>
    </td>
  );
};
