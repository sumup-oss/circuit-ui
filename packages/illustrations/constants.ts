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
export const DIST_DIR = path.join(BASE_DIR, 'dist');
export const BASE_URL =
  'https://oss-circuit-ui-git-illustrations-package.sumup-vercel.app/'; //TODO replace with https://circuit.sumup.com/illustrations/'

export const SIZES = ['s', 'm', 'l'] as const;
export const THEMES = ['light', 'dark', 'consumer'] as const;
export const VARIANTS = [
  // Feedback
  'success',
  'error',
  'warning',
  'pending',
  // Empty states
  'empty',
  'no-results',
  'no-data',
  // System
  'device-problems',
  // Communication
  'celebration',
  // SumUp Devices
  'solo',
  // Merchant Products
  'bank',
] as const;
export const CATEGORIES = [
  'Feedback',
  'Empty states',
  'System',
  'Communication',
  'SumUp Devices',
  'Merchant Products',
] as const;
