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
import { number, text } from '@storybook/addon-knobs/react';

import docs from './Pagination.docs.mdx';
import Pagination from '.';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: { page: docs }
  }
};

export const base = () => (
  <Pagination
    page={number('page', 1)}
    perPage={number('perPage', 10)}
    total={number('total', 50)}
    pagesToShow={number('pagesToShow', 1)}
    onChange={() => {}}
    footer={text('footer', 'Showing 1 - 10 of 50 items')}
    align={text('align', 'center')}
    justify={text('justify', 'center')}
  />
);
