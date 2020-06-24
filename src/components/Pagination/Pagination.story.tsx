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

import React, { useState } from 'react';
import { number, text } from '@storybook/addon-knobs';

import docs from './Pagination.docs.mdx';
import { Pagination, PaginationProps } from './Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: { page: docs }
  }
};

const BasePagination = (props: Partial<PaginationProps>) => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      label={text('Label', 'Pagination')}
      totalPages={number('Total pages', 5)}
      pageLabel={p => `${text('Page label', 'Go to page')} ${p}`}
      totalLabel={t => `${text('Total label', 'of')} ${t}`}
      previousLabel={text('Previous label', 'Previous page')}
      nextLabel={text('Next label', 'Next page')}
      currentPage={page}
      onChange={setPage}
      {...props}
    />
  );
};

export const base = () => <BasePagination />;

export const manyPages = () => <BasePagination totalPages={10} />;
