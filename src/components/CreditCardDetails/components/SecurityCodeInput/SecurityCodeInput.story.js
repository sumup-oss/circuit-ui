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
import { action } from '@storybook/addon-actions';

import SecurityCodeInput from '.';
import { schemes } from '../..';

const { SCHEMES } = schemes;

export default {
  title: 'Forms|CreditCardDetails/SecurityCodeInput',
  component: SecurityCodeInput,
  parameters: {
    jest: ['SecurityCodeInput']
  }
};

export const base = () => <SecurityCodeInput />;

export const amex = () => <SecurityCodeInput cardScheme={SCHEMES.AMEX} />;

export const withModalToggle = () => (
  <SecurityCodeInput onShowInfo={action('Security modal toggled')} />
);
