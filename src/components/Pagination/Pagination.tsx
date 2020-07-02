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

import React from 'react';
import { css } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';
import { ChevronLeft, ChevronRight } from '@sumup/icons';
import { Dispatch as TrackingProps, useClickTrigger } from '@sumup/collector';

import styled from '../../styles/styled';
import IconButton from '../IconButton';
import { PageSelect } from './components/PageSelect';
import { PageList } from './components/PageList';
import * as PaginationService from './PaginationService';

export interface PaginationProps {
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
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${p => p.theme.spacings.kilo};
`;

const prevButtonStyles = (theme: Theme) =>
  css`
    margin-right: ${theme.spacings.kilo};
    flex-shrink: 0;
  `;

const nextButtonStyles = (theme: Theme) =>
  css`
    margin-left: ${theme.spacings.kilo};
    flex-shrink: 0;
  `;

/**
 * Pagination is a component to show pages numbers calculate dynamically.
 */
export const Pagination = ({
  currentPage = 1,
  totalPages,
  onChange,
  label = 'Pagination',
  previousLabel = 'Previous page',
  nextLabel = 'Next page',
  pageLabel = page => `Go to page ${page}`,
  totalLabel,
  tracking = {},
  ...props
}: PaginationProps) => {
  // Can't use our custom useClickHandler here because it doesn't allow us
  // to add the page number as label. So we implement it from scratch:
  const dispatch = useClickTrigger();
  const handleChange = (pageNumber: number): void => {
    const {
      label: trackingLabel = pageNumber.toString(),
      component = 'pagination',
      customParameters
    } = tracking;

    if (label) {
      dispatch({ label: trackingLabel, component, customParameters });
    }

    onChange(pageNumber);
  };

  if (!totalPages || totalPages < 2) {
    return null;
  }

  const showList = totalPages <= 5;
  const pages = PaginationService.generatePages(totalPages);

  return (
    <Nav role="navigation" aria-label={label} {...props}>
      <IconButton
        label={previousLabel}
        size="kilo"
        variant="tertiary"
        disabled={currentPage <= 1}
        onClick={() => handleChange(currentPage - 1)}
        css={prevButtonStyles}
      >
        <ChevronLeft />
      </IconButton>

      {showList ? (
        <PageList
          onChange={handleChange}
          pageLabel={pageLabel}
          pages={pages}
          currentPage={currentPage}
        />
      ) : (
        <PageSelect
          label={label}
          onChange={handleChange}
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
        onClick={() => handleChange(currentPage + 1)}
        css={nextButtonStyles}
      >
        <ChevronRight />
      </IconButton>
    </Nav>
  );
};
