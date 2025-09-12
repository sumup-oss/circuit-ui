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
export const ICON_DIR = path.join(BASE_DIR, './web/v2');
export const DIST_DIR = path.join(BASE_DIR, 'dist');

export const SIZES = ['16', '24', '32', '480'] as const;
export const CATEGORIES = [
  'Action',
  'Communication',
  'Payment method',
  'Card scheme',
  'Country flag',
  'Flag',
  'Device',
  'File',
  'Finance',
  'Miscellaneous',
  'Navigation',
  'Notification',
  'Product and feature',
  'Social media',
  'Brand',
] as const;
