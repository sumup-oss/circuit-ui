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

import { HTMLAttributes, ReactElement } from 'react';
import { ChevronLeft, ChevronRight } from '@sumup/icons';

import IconButton from '../IconButton/index.js';
import { AccessibilityError } from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';

import { PageSelect } from './components/PageSelect/index.js';
import { PageList } from './components/PageList/index.js';
import * as PaginationService from './PaginationService.js';
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
    if (!label) {
      throw new AccessibilityError(
        'Pagination',
        'The `label` prop is missing.',
      );
    }
    if (!previousLabel) {
      throw new AccessibilityError(
        'Pagination',
        'The `previousLabel` prop is missing.',
      );
    }
    if (!nextLabel) {
      throw new AccessibilityError(
        'Pagination',
        'The `nextLabel` prop is missing.',
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
        label={previousLabel}
        size="kilo"
        variant="tertiary"
        disabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
        className={classes.prev}
      >
        <ChevronLeft size="16" />
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
        label={nextLabel}
        size="kilo"
        variant="tertiary"
        disabled={currentPage >= totalPages}
        onClick={() => onChange(currentPage + 1)}
        className={classes.next}
      >
        <ChevronRight size="16" />
      </IconButton>
    </nav>
  );
};
