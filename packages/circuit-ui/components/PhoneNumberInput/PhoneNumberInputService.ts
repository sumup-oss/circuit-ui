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

import type { SelectProps } from '../Select/Select.js';

export function normalizePhoneNumber(
  countryCode: string,
  subscriberNumber: string,
) {
  const normalizedSubscriberNumber = subscriberNumber
    // Strip non-numeric, non-whitespace characters
    .replace(/[^0-9\s]/g, '')
    // Replace unsupported whitespace characters with simple space
    .replace(/\s/g, ' ')
    // Strip any leading zeros
    .replace(/^0+/, '');
  return `${countryCode}${normalizedSubscriberNumber}`;
}

export function mapCountryCodeOptions(
  countryCodeOptions: { country: string; code: string }[],
  locale?: string | string[],
): Required<SelectProps>['options'] {
  // eslint-disable-next-line compat/compat
  const isIntlDisplayNamesSupported = typeof Intl.DisplayNames === 'function';
  if (!isIntlDisplayNamesSupported) {
    // When Intl.DisplayNames is not supported, we can't provide the localized country names
    return countryCodeOptions.map(({ code, country }) => ({
      label: `${country} (${code})`,
      value: code,
    }));
  }
  // eslint-disable-next-line compat/compat
  const displayName = new Intl.DisplayNames(locale, { type: 'region' });
  return countryCodeOptions
    .map(({ code, country }) => {
      const countryName = displayName.of(country);
      return {
        label: countryName ? `${countryName} (${code})` : code,
        value: country,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}
