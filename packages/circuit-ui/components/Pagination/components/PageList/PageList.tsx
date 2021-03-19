/**
 * Copyright 2020, SumUp Ltd.
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

import React, { HTMLProps } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../../../styles/styled';
import Button from '../../../Button';

export interface PageListProps
  extends Omit<HTMLProps<HTMLOListElement>, 'onChange' | 'type'> {
  onChange: (page: number) => void;
  pageLabel: (page: number) => string;
  pages: number[];
  currentPage: number;
}

const List = styled.ol`
  list-style: none;
  display: flex;
  justify-content: center;
`;

const buttonStyles = ({ theme }: StyleProps) => css`
  min-width: 34px;
  padding: ${theme.spacings.bit};
  margin-right: ${theme.spacings.bit};

  li:last-child & {
    margin-right: 0;
  }
`;

const PageButton = styled(Button)(buttonStyles);

export const PageList = ({
  onChange,
  pageLabel,
  pages,
  currentPage,
  ...props
}: PageListProps) => (
  <List role="list" {...props}>
    {pages.map((page) => {
      const isCurrent = currentPage === page;
      const label = pageLabel(page);
      return (
        <li key={page}>
          <PageButton
            size="kilo"
            onClick={() => onChange(page)}
            variant={isCurrent ? 'primary' : 'tertiary'}
            title={label}
            aria-label={label}
            aria-current={isCurrent}
          >
            {page}
          </PageButton>
        </li>
      );
    })}
  </List>
);
