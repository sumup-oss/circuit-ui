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

import {
  PaymentMethod,
  type PaymentMethodProps,
  PAYMENT_METHODS,
} from '@sumup-oss/icons';

import { Body } from '../Body/index.js';

import classes from './PaymentMethodStory.module.css';

export default {
  title: 'Components/PaymentMethod',
  component: PaymentMethod,
  tags: ['status:stable'],
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'radio' },
    },
  },
};

function formatName(name: string) {
  return name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const Base = () => (
  <div className={classes.list}>
    {PAYMENT_METHODS.map((name) => (
      <div key={name} className={classes.wrapper}>
        <PaymentMethod name={name} alt="" size="l" />
        <Body>{formatName(name)}</Body>
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
