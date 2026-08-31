/**
 * Copyright 2024, SumUp Ltd.
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

import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const BASE_DIR = path.dirname(fileURLToPath(import.meta.url));
export const BUILD_DIR = path.join(BASE_DIR, 'build');
export const ILLUSTRATIONS_DIR = path.join(BASE_DIR, './assets');
export const BASE_URL = 'https://circuit.sumup.com';

export const COLOR_SCHEMES = ['light', 'dark'] as const;
export const NAMES = [
  // Feedback
  'celebration',
  'error-1',
  'error-2',
  'financial-milestone',
  'waiting',
  // States
  'empty-state-1',
  'empty-state-2',
  'empty-state-3',
  'problems',
  'off',
  // Feature
  'account',
  'bookings',
  'invoice',
  'loyalty',
  'giftcards',
  'onlinepayments',
  'paymentlinks',
  'referral',
  'rewards',
  'taptopay',
  // General communication
  'security',
  'support',
  // Flow
  'flow-danger',
  'flow-success',
  'flow-warning',
] as const;
export const CATEGORIES = [
  'Feedback',
  'States',
  'Feature',
  'General communication',
  'Flow',
] as const;
