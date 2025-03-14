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

import type { HTMLAttributes } from 'react';

import { BooleanValue } from '../BooleanValue/BooleanValue.js';
import { Compact } from '../../../Compact/index.js';
import { clsx } from '../../../../styles/clsx.js';
import { Toggletip, type ToggletipProps } from '../../../Toggletip/index.js';
import { useMedia } from '../../../../hooks/useMedia/index.js';

import classes from './TableCell.module.css';

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  /**
   * Decides whether the cell is rendered as a `th` or `td`.
   */
  isHeader?: boolean;
  /**
   * The content of the cell.
   * If the value is a string, it will be rendered as plain text.
   * If the value is a boolean, it will be rendered as an icon with a descriptive label.
   */
  value: string | boolean | undefined;
  /**
   * The label will describe the boolean value's icon.
   */
  label: string;
  /**
   * A short description of the feature (for row headers only).
   */
  description?: string;
  /**
   * Additional description of the feature (for row headers only).
   */
  toggletip?: ToggletipProps;
}
export const TableCell = ({
  isHeader,
  value,
  label,
  className,
  description,
  toggletip,
  ...props
}: TableCellProps) => {
  const isMobile = useMedia('(max-width: 767px)');
  const Element = isHeader ? 'th' : 'td';
  let cellValue = <BooleanValue label={label} value={false} />;
  if (typeof value === 'string') {
    cellValue = <Compact size={isMobile ? 's' : 'm'}>{value}</Compact>;
  } else if (typeof value === 'boolean') {
    cellValue = <BooleanValue label={label} value={value} />;
  }

  return (
    <Element
      className={clsx(classes.base, className)}
      scope={isHeader ? 'row' : undefined}
      {...props}
    >
      <div className={clsx(classes.content, isHeader && classes.header)}>
        <div className={clsx(classes.title, !isHeader && classes.centered)}>
          {cellValue}
          {toggletip && <Toggletip {...toggletip} placement="right" />}
        </div>
        {description && (
          <Compact className={classes.description} size="s" color="subtle">
            {description}
          </Compact>
        )}
      </div>
    </Element>
  );
};
