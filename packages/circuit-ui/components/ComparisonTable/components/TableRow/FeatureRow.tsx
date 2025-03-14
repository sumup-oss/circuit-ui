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

import type { HTMLAttributes } from 'react';

import { TableCell, type TableCellProps } from '../TableCell/TableCell.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './FeatureRow.module.css';

export interface FeatureRowProps extends HTMLAttributes<HTMLTableRowElement> {
  featureDescription: Pick<
    TableCellProps,
    'label' | 'description' | 'toggletip'
  >;
  /**
   * An array of the cell values and labels in the same order of the displayed columns.
   */
  values: { value: TableCellProps['value']; label: TableCellProps['label'] }[];
}

export const FeatureRow = ({
  featureDescription,
  values,
  ...props
}: FeatureRowProps) => (
  <tr {...props}>
    <TableCell
      isHeader
      value={featureDescription.label}
      label={featureDescription.label}
      description={featureDescription.description}
      toggletip={featureDescription.toggletip}
    />
    {values.map(({ value, label }, index) => (
      <TableCell
        className={clsx(index > 0 && classes.border)}
        key={`${label}-${index}`}
        value={value}
        label={label}
      />
    ))}
  </tr>
);
