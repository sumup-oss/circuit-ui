/**
 * Copyright 2026, SumUp Ltd.
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

import { PaymentMethod, type PaymentMethodProps } from './PaymentMethod.js';
import { PAYMENT_METHODS } from './constants.js';
import { LIST_STYLE, WRAPPER_STYLE, formatName } from '../../story-helpers.js';

export default {
  title: 'Icons/PaymentMethod',
  component: PaymentMethod,
  tags: ['status:stable'],
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
  },
};

export const Base = () => (
  <div style={LIST_STYLE}>
    {PAYMENT_METHODS.map((name) => (
      <div key={name} style={WRAPPER_STYLE}>
        <PaymentMethod name={name} alt="" size="l" />
        <p>{formatName(name)}</p>
      </div>
    ))}
  </div>
);

Base.parameters = {
  chromatic: {
    modes: {
      dark: { disable: true },
      consumer: { disable: true },
    },
  },
};

export const Example = (args: PaymentMethodProps) => (
  <PaymentMethod {...args} />
);
Example.tags = ['!dev'];
Example.parameters = {
  chromatic: { disableSnapshot: true },
};
Example.args = {
  name: 'visa',
  alt: 'Visa',
  size: 'l',
};
