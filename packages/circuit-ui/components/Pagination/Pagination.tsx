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

import type { HTMLAttributes, ReactElement } from 'react';
import { ChevronLeft, ChevronRight } from '@sumup-oss/icons';

import { IconButton } from '../Button/index';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors';
import { clsx } from '../../styles/clsx';

import { PageSelect } from './components/PageSelect/index';
import { PageList } from './components/PageList/index';
import * as PaginationService from './PaginationService';
import classes from './Pagination.module.css';

export interface PaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * The currently active page
   */
  currentPage?: number;
  /**
   * The total number of pages
   */
  totalPages: number;
  /**
   * Callback for when the page is changed
   */
  onChange: (page: number) => void;
  /**
   * Label to describe the type of navigation, e.g. "Pagination"
   */
  label: string;
  /**
   * Label for the "previous page" button, "Previous page"
   */
  previousLabel: string;
  /**
   * Label for the "next page" button, e.g. "Next page"
   */
  nextLabel: string;
  /**
   * Function that returns the label for a page button,
   * called with the page number, e.g. "Go to page 9"
   */
  pageLabel: (page: number) => string;
  /**
   * Function that returns the label after the select element,
   * called with the total number of pages, e.g. "of 10"
   */
  totalLabel?: (totalPages: number) => string;
}

/**
 * Pagination is a component to show pages numbers calculate dynamically.
 */
export const Pagination = ({
  currentPage = 1,
  totalPages,
  onChange,
  label,
  previousLabel,
  nextLabel,
  pageLabel = (page) => `Go to page ${page}`,
  totalLabel,
  className,
  ...props
}: PaginationProps): ReactElement | null => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    if (!isSufficientlyLabelled(label)) {
      throw new AccessibilityError(
        'Pagination',
        'The `label` prop is missing or invalid.',
      );
    }
    if (!isSufficientlyLabelled(previousLabel)) {
      throw new AccessibilityError(
        'Pagination',
        'The `previousLabel` prop is missing or invalid.',
      );
    }
    if (!isSufficientlyLabelled(nextLabel)) {
      throw new AccessibilityError(
        'Pagination',
        'The `nextLabel` prop is missing or invalid.',
      );
    }
  }

  if (!totalPages || totalPages < 2) {
    return null;
  }

  const showList = totalPages <= 5;
  const pages = PaginationService.generatePages(totalPages);

  return (
    <nav
      role="navigation"
      aria-label={label}
      className={clsx(classes.base, className)}
      {...props}
    >
      <IconButton
        size="s"
        variant="secondary"
        disabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
        className={classes.prev}
        icon={ChevronLeft}
      >
        {previousLabel}
      </IconButton>

      {showList ? (
        <PageList
          onChange={onChange}
          pageLabel={pageLabel}
          pages={pages}
          currentPage={currentPage}
        />
      ) : (
        <PageSelect
          label={label}
          onChange={onChange}
          pages={pages}
          currentPage={currentPage}
          totalPages={totalPages}
          totalLabel={totalLabel}
        />
      )}

      <IconButton
        size="s"
        variant="secondary"
        disabled={currentPage >= totalPages}
        onClick={() => onChange(currentPage + 1)}
        className={classes.next}
        icon={ChevronRight}
      >
        {nextLabel}
      </IconButton>
    </nav>
  );
};
