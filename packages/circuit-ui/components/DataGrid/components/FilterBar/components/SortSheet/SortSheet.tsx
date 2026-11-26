/**
 * Copyright 2026, SumUp Ltd.
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

import { useId, useState, type ChangeEvent } from 'react';

import { Body } from '../../../../../Body/index.js';
import { Button } from '../../../../../Button/index.js';
import { Headline } from '../../../../../Headline/index.js';
import { Modal } from '../../../../../Modal/index.js';
import { RadioButtonGroup } from '../../../../../RadioButtonGroup/index.js';
import { clsx } from '../../../../../../styles/clsx.js';
import { useLatest } from '../../../../../../hooks/useLatest/index.js';
import type {
  Column,
  SortDirection,
  SortValue,
  WithSorting,
  MobileSortConfig,
} from '../../../../types.js';

import classes from './SortSheet.module.css';

type SortConfig = NonNullable<WithSorting['sortConfig']>;

export interface SortSheetProps<P>
  extends Pick<SortConfig, 'title' | 'sortLabels'>,
    MobileSortConfig {
  /**
   * Whether the sheet is open.
   */
  open: boolean;
  /**
   * Called once when the sheet closes, with or without applying. Set `open`
   * to `false` in response.
   */
  onClose: () => void;
  /**
   * The columns to sort by. Columns that are not sortable are skipped.
   */
  columns: Column<P>[];
  /**
   * The applied sorting.
   */
  value?: SortValue;
  /**
   * Called with the chosen sorting when the user applies it, or with
   * `undefined` when sorting is cleared.
   */
  onApply: (value?: SortValue) => void;
}

/**
 * Lets users pick the column and direction to sort by in one modal, e.g. on
 * mobile. The choice is kept as a draft and only takes effect once the user
 * applies it.
 */
export function SortSheet<P>({
  open,
  onClose,
  columns,
  value,
  onApply,
  title,
  description,
  parametersLabel,
  orderLabel,
  sortLabels,
  applyLabel,
  clearLabel,
}: SortSheetProps<P>) {
  const titleId = useId();
  const openRef = useLatest(open);
  const [columnId, setColumnId] = useState(value?.columnId);
  const [direction, setDirection] = useState(value?.direction);
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setColumnId(value?.columnId);
      setDirection(value?.direction);
    }
  }

  const sortableColumns = columns.filter(({ sortable }) => sortable);

  const handleColumnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnId(event.target.value);
    setDirection((current) => current ?? 'ascending');
  };

  const handleApply = () => {
    onApply(
      columnId ? { columnId, direction: direction ?? 'ascending' } : undefined,
    );
    onClose();
  };

  const handleClear = () => {
    setColumnId(undefined);
    setDirection(undefined);
  };

  const handleModalClose = () => {
    if (openRef.current) {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby={titleId}
      contentClassName={classes.content}
    >
      <div className={classes.header}>
        <Headline as="h2" size="s" id={titleId}>
          {title}
        </Headline>
        {description && (
          <Body size="s" color="subtle">
            {description}
          </Body>
        )}
      </div>
      <div className={classes.sections}>
        <div className={classes.section}>
          <RadioButtonGroup
            label={parametersLabel}
            className={classes.list}
            onChange={handleColumnChange}
            options={sortableColumns.map(({ id, label }) => ({
              label,
              value: id,
              checked: columnId === id,
              className: classes.option,
            }))}
          />
        </div>
        <div className={clsx(classes.section, classes.order)}>
          <RadioButtonGroup
            label={orderLabel}
            className={classes.list}
            onChange={(event) =>
              setDirection(event.target.value as SortDirection)
            }
            options={(['ascending', 'descending'] as const).map((option) => ({
              label: sortLabels[option],
              value: option,
              checked: direction === option,
              className: classes.option,
            }))}
          />
        </div>
      </div>
      <div className={classes.footer}>
        <Button type="button" variant="secondary" onClick={handleClear}>
          {clearLabel}
        </Button>
        <Button
          type="submit"
          variant="primary"
          className={classes.apply}
          onClick={handleApply}
        >
          {applyLabel}
        </Button>
      </div>
    </Modal>
  );
}
