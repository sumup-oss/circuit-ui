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

import React, { FunctionComponent } from 'react';

import styled from '../../../../styles/styled';
import Button from '../../../Button';

export interface PageListProps {
  onChange: (page: number) => void;
  pageLabel: (page: number) => string;
  pages: number[];
  currentPage: number;
  [key: string]: any;
}

const List = styled.ol`
  list-style: none;
  display: flex;
  justify-content: center;
`;

export const PageList: FunctionComponent<PageListProps> = ({
  onChange,
  pageLabel,
  pages,
  currentPage,
  ...props
}) => (
  <List role="list" {...props}>
    {pages.map((page) => {
      const isCurrent = currentPage === page;
      const label = pageLabel(page);
      return (
        <li key={page}>
          <Button
            size="kilo"
            onClick={() => onChange(page)}
            variant={isCurrent ? 'primary' : 'tertiary'}
            title={label}
            aria-label={label}
            aria-current={isCurrent}
          >
            {page}
          </Button>
        </li>
      );
    })}
  </List>
);
