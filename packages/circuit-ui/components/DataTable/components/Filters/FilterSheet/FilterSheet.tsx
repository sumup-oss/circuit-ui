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

import { useId, useState } from 'react';

import { Button } from '../../../../Button/index.js';
import { Headline } from '../../../../Headline/index.js';
import type { I18nConfig } from '../../../../I18nContext/I18nContext.js';
import { Modal } from '../../../../Modal/index.js';
import { useLatest } from '../../../../../hooks/useLatest/index.js';
import { useTranslations } from '../../../../../hooks/useTranslations/useTranslations.js';
import type { Column } from '../../../types.js';
import {
  getFilterKind,
  normalizeFilterValue,
} from '../Filter/FilterService.js';
import type { FilterLabels, FilterValue } from '../Filter/types.js';
import { FilterWrapper } from '../Filter/FilterWrapper.js';
import { translations } from '../translations/index.js';

import classes from './FilterSheet.module.css';

type SheetColumn = Pick<Column<unknown>, 'id' | 'label' | 'type' | 'filter'>;

export type FilterValues = Record<string, FilterValue | undefined>;

export interface FilterSheetProps extends Partial<I18nConfig> {
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
   * The columns to filter. Columns without a filter are skipped.
   */
  columns: SheetColumn[];
  // TODO: Only require the labels of the filter types in use once the columns are hooked up.
  /**
   * The labels of the fields of the amount and date filters.
   */
  labels: FilterLabels;
  /**
   * The applied values, by column id.
   */
  values: FilterValues;
  /**
   * Called with the values of all the filters when the user applies them, or
   * with an empty object when they clear all. Filters without a value are
   * left out.
   */
  onApply: (values: FilterValues) => void;
  /**
   * Label for the Clear all button. Clearing empties the draft and removes
   * all the filters right away, and the sheet stays open.
   */
  clearAllButtonLabel: string;
  /**
   * The title of the sheet.
   */
  title: string;
  /**
   * Label for the Apply button.
   */
  applyButtonLabel?: string;
}

/**
 * Shows all the filters of a table in one modal, e.g. on mobile. Edits are
 * kept as a draft and only take effect once the user applies them.
 */
export function FilterSheet(props: FilterSheetProps) {
  const {
    open,
    onClose,
    columns,
    labels,
    values,
    onApply,
    clearAllButtonLabel,
    title,
    applyButtonLabel,
  } = useTranslations(props, translations);
  const titleId = useId();
  const openRef = useLatest(open);
  const [draft, setDraft] = useState<FilterValues>(values);
  const [wasOpen, setWasOpen] = useState(open);

  // Start every session from the applied values.
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setDraft(values);
    }
  }

  const handleApply = () => {
    const applied: FilterValues = {};
    for (const [id, value] of Object.entries(draft)) {
      const column = columns.find((item) => item.id === id);
      if (value !== undefined) {
        applied[id] = column ? normalizeFilterValue(column, value) : value;
      }
    }
    onApply(applied);
    onClose();
  };

  // Applying already asked to close. The modal reports it again once it has
  // finished closing, which is only news when the user closed it themselves.
  const handleModalClose = () => {
    if (openRef.current) {
      onClose();
    }
  };

  const handleClearAll = () => {
    setDraft({});
    onApply({});
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
      </div>
      <div className={classes.filters}>
        {columns.map((column) =>
          getFilterKind(column) ? (
            <div key={column.id} className={classes.section}>
              <FilterWrapper
                column={column}
                labels={labels}
                variant="inline"
                value={draft[column.id]}
                onChange={(value) =>
                  setDraft((previous) => ({ ...previous, [column.id]: value }))
                }
              />
            </div>
          ) : null,
        )}
      </div>
      <div className={classes.footer}>
        <Button type="button" variant="secondary" onClick={handleClearAll}>
          {clearAllButtonLabel}
        </Button>
        <Button
          type="button"
          variant="primary"
          className={classes.apply}
          onClick={handleApply}
        >
          {applyButtonLabel}
        </Button>
      </div>
    </Modal>
  );
}
