/**
 * Copyright 2025, SumUp Ltd.
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

import { images } from '../../../../.storybook/fixtures.js';
import { Body } from '../Body/Body.js';
import { Table } from '../Table/Table.js';

import { CheckboxInput } from './CheckboxInput.js';

export default {
  title: 'Forms/Checkbox/CheckboxInput',
  component: CheckboxInput,
  tags: ['status:internal'],
};

const products = [
  {
    id: 'sumup-solo',
    label: 'SumUp Solo',
    description: 'Take digital payments with a stylish card reader',
    image: images[3],
  },
  {
    id: 'tap-to-pay',
    label: 'Tap to Pay',
    description: 'Take payments with your phone',
    image: images[0],
  },
  {
    id: 'product-catalog',
    label: 'Product catalog',
    description: 'Organize and manage your inventory',
    image: images[1],
  },
  {
    id: 'sales-insights',
    label: 'Sales insights',
    description: 'Analyze your sales trends',
    image: images[2],
  },
  {
    id: 'printer',
    label: 'Printer',
    description: 'Accessorize the SumUp Solo to print receipts',
    image: images[4],
  },
];
const headers = ['', 'Preview', 'Name'];
const rows = products.map((product) => [
  {
    children: (
      <CheckboxInput
        name="products"
        value={product.id}
        aria-labelledby={`${product.id}-label`}
        aria-describedby={`${product.id}-description`}
      />
    ),
  },
  {
    children: (
      <img
        src={product.image.src}
        alt={product.image.alt}
        style={{ objectFit: 'cover', borderRadius: '4px' }}
        width="48"
        height="48"
      />
    ),
  },
  {
    children: (
      <div>
        <Body id={`${product.id}-label`}>{product.label}</Body>
        <Body id={`${product.id}-description`} size="s" color="subtle">
          {product.description}
        </Body>
      </div>
    ),
  },
]);

export const Base = () => <Table headers={headers} rows={rows} condensed />;
