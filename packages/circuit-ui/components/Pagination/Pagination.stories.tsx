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

import { useState } from 'react';

import docs from './Pagination.docs.mdx';
import { Pagination, PaginationProps } from './Pagination';

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    docs: { page: docs },
  },
};

const baseArgs = {
  label: 'Pagination',
  totalPages: 5,
  pageLabel: (p: number) => `Go to page ${p}`,
  totalLabel: (t: number) => `of ${t}`,
  previousLabel: 'Previous page',
  nextLabel: 'Next page',
};

export const Base = (args: PaginationProps) => {
  const [page, setPage] = useState(1);
  return <Pagination {...args} currentPage={page} onChange={setPage} />;
};

Base.args = baseArgs;

export const ManyPages = (args: PaginationProps) => {
  const [page, setPage] = useState(1);
  return <Pagination {...args} currentPage={page} onChange={setPage} />;
};

ManyPages.args = { ...baseArgs, totalPages: 10 };
