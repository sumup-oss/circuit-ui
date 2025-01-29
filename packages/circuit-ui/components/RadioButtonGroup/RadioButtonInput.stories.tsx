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

import { images } from '../../../../.storybook/fixtures.js';
import { Body } from '../Body/Body.js';

import {
  RadioButtonInput,
  type RadioButtonInputProps,
} from './RadioButtonInput.js';

export default {
  title: 'Forms/RadioButtonGroup/RadioButtonInput',
  component: RadioButtonInput,
  tags: ['status:internal'],
};

const options = [
  {
    id: 'sumup-solo',
    label: 'SumUp Solo',
    image: images[3],
  },
  {
    id: 'tap-to-pay',
    label: 'Tap to Pay',
    image: images[0],
  },
  {
    id: 'product-catalog',
    label: 'Product catalog',
    image: images[1],
  },
  {
    id: 'sales-insights',
    label: 'Sales insights',
    image: images[2],
  },
  {
    id: 'printer',
    label: 'Printer',
    image: images[4],
  },
];

export const Base = (args: RadioButtonInputProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {options.map((option) => (
      <RadioButtonInput key={option.id} {...args} value={option.id}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingLeft: '12px',
          }}
        >
          <img
            src={option.image.src}
            alt={option.image.alt}
            style={{ objectFit: 'cover', borderRadius: '4px' }}
            width="48"
            height="48"
          />
          <Body>{option.label}</Body>
        </div>
      </RadioButtonInput>
    ))}
  </div>
);

Base.args = {
  name: 'products',
};
