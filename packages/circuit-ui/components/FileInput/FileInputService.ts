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

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];
const BASE = 1000;

/**
 * Formats a file size in bytes using decimal (SI) units, e.g. `197.7 KB`.
 */
export function formatFileSize(
  bytes: number,
  locale?: Intl.LocalesArgument,
): string {
  let value = Math.max(bytes, 0);
  let unitIndex = 0;

  while (value >= BASE && unitIndex < UNITS.length - 1) {
    value /= BASE;
    unitIndex += 1;
  }

  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: unitIndex === 0 ? 0 : 1,
  });

  return `${formatter.format(value)} ${UNITS[unitIndex]}`;
}
