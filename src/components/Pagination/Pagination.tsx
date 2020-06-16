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

import styled, { StyleProps } from '../../styles/styled';
import Button from '../Button';
import { PageSelect } from './components/PageSelect';
import { PageList } from './components/PageList';
import * as PaginationService from './PaginationService';

export interface PaginationProps {
  /**
   * Active page of pagination
   */
  currentPage?: number;
  /**
   * Total of items inside the pagination
   */
  totalPages: number;
  /**
   * Callback for when an page is changed
   */
  onChange: (page: number) => void;
  label: string;
  pageLabel: (page: number) => string;
  /**
   * Label to be used on button of next
   */
  nextLabel: string;
  /**
   * Label to be used on button of previous
   */
  previousLabel: string;
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${p => p.theme.spacings.kilo};

  ${p => p.theme.mq.untilKilo} {
    flex-wrap: wrap;
  }
`;

const buttonStyles = ({ theme, wrap }: StyleProps & { wrap: boolean }) =>
  wrap &&
  css`
    ${theme.mq.untilKilo} {
      order: 2;
      width: 50%;
    }
  `;

/**
 * Pagination is a component to show pages numbers calculate dynamically.
 */
export const Pagination = ({
  currentPage = 1,
  totalPages,
  onChange,
  label = 'Pagination',
  pageLabel = page => `Go to page ${page}`,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  ...props
}: PaginationProps) => {
  if (!totalPages || totalPages < 2) {
    return null;
  }

  const showList = totalPages <= 7;
  const pages = PaginationService.generatePages(totalPages);

  return (
    <Nav role="navigation" aria-label={label} {...props}>
      <Button
        size="kilo"
        variant="tertiary"
        disabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
        css={(theme: Theme) => buttonStyles({ theme, wrap: showList })}
      >
        {previousLabel}
      </Button>

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
        />
      )}

      <Button
        size="kilo"
        variant="tertiary"
        disabled={currentPage >= totalPages}
        onClick={() => onChange(currentPage + 1)}
        css={(theme: Theme) => buttonStyles({ theme, wrap: showList })}
      >
        {nextLabel}
      </Button>
    </Nav>
  );
};
