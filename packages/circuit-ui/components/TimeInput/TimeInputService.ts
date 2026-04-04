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

import { Temporal } from 'temporal-polyfill';
import { formatDateTimeToParts, resolveDateTimeFormat } from '@sumup-oss/intl';

import type { Locale } from '../../util/i18n.js';

const TEST_VALUE = new Temporal.PlainTime(16, 20);

export function getTimeSegments(
  locale: Locale | undefined,
  includeSeconds: boolean,
) {
  const defaultOptions = {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  } satisfies Intl.DateTimeFormatOptions;
  const { hour, minute, second } =
    resolveDateTimeFormat(locale, defaultOptions) || defaultOptions;
  const options = (
    includeSeconds ? { hour, minute, second } : { hour, minute }
  ) as Intl.DateTimeFormatOptions;
  const parts = formatDateTimeToParts(TEST_VALUE, locale, options);
  return parts.map(({ type, value }) => {
    if (type === 'literal') {
      return { type, value };
    }
    const format = options[type];
    return { type, format };
  });
}
