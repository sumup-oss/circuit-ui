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

import { Temporal } from 'temporal-polyfill';
import { formatDateTimeToParts } from '@sumup-oss/intl';

import type { Locale } from '../../util/i18n.js';

const TEST_VALUE = new Temporal.PlainDate(2024, 3, 8);

export function getDateSegments(locale?: Locale) {
  const parts = formatDateTimeToParts(TEST_VALUE, locale);
  return parts.map(({ type, value }) =>
    type === 'literal' ? { type, value } : { type },
  );
}
