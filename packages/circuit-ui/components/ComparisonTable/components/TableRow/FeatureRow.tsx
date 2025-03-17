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

import { TableCell } from '../TableCell/TableCell.js';
import { clsx } from '../../../../styles/clsx.js';
import { RowHeader } from '../RowHeader/RowHeader.js';
import type { ToggletipProps } from '../../../Toggletip/index.js';

import classes from './FeatureRow.module.css';

export type CellValue = string | { label: string; value: boolean } | undefined;
export interface Feature {
  featureDescription: {
    label: string;
    description?: string;
    toggletip?: ToggletipProps;
  };
  /**
   * An array of the cell values and labels in the same order of the displayed columns.
   */
  values: CellValue[];
}
export type FeatureRowProps = Feature & HTMLAttributes<HTMLTableRowElement>;

export const FeatureRow = ({
  featureDescription,
  values,
  ...props
}: FeatureRowProps) => (
  <tr {...props}>
    <RowHeader
      description={featureDescription.description}
      toggletip={featureDescription.toggletip}
    >
      {featureDescription.label}
    </RowHeader>
    {values.map((value, index) => (
      <TableCell
        key={`cui-comparison-table-row-${index}`}
        className={clsx(index > 0 && classes.border)}
        cellValue={value}
      />
    ))}
  </tr>
);
