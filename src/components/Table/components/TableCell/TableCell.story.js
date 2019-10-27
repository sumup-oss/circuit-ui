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
import { boolean, text, select } from '@storybook/addon-knobs/react';

import TableCell from '.';

const options = {
  [TableCell.LEFT]: TableCell.LEFT,
  [TableCell.RIGHT]: TableCell.RIGHT,
  [TableCell.CENTER]: TableCell.CENTER
};

export default {
  title: 'Components|Table/TableCell',
  component: TableCell,
  parameters: {
    jest: ['TableCell']
  }
};

export const base = () => (
  <TableCell
    style={{ width: '300px', alignSelf: 'center' }}
    align={select('Align', options)}
    isHovered={boolean('Hover styles', false)}
  >
    {text('Content', 'Header')}
  </TableCell>
);
