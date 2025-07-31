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

import { isEmpty } from '../../util/helpers.js';
import type { Locale } from '../../util/i18n.js';
import type { SelectProps } from '../Select/Select.js';

export type CountryCodeOption = {
  /**
   * Country name in two letter ISO 3166 region code format(https://www.iso.org/iso-3166-country-codes.html)
   */
  country: string;
  /**
   * Country calling code, see https://en.wikipedia.org/wiki/List_of_country_calling_codes
   */
  code: string;
  /**
   * A list of area codes for countries that share a country calling code
   * and are differentiated by area code, e.g. Antigua & Barbuda: `+1 (268)`,
   * where `268` is the area code.
   */
  areaCodes?: string[];
};

export function parsePhoneNumber(
  options: CountryCodeOption[],
  value: string | undefined,
  currentCountry?: string,
): {
  countryCode?: string;
  subscriberNumber?: string;
} {
  const sanitizedValue = value
    // Strip non-numeric, non-whitespace characters
    ?.replace(/[^+0-9\s]/g, ' ')
    // Replace unsupported whitespace characters with simple space
    ?.replace(/\s+/g, ' ')
    ?.trim()
    // Normalize the country code prefix
    ?.replace(/^00/, '+');

  if (!sanitizedValue) {
    return {};
  }

  const hasCountryCode = sanitizedValue.startsWith('+');

  if (!hasCountryCode) {
    return {
      subscriberNumber: sanitizedValue,
    };
  }

  const matchedOptions = options
    .sort((a, b) => {
      // Match options with area code first
      if (a.areaCodes && !b.areaCodes) {
        return -1;
      }
      if (!a.areaCodes && b.areaCodes) {
        return 1;
      }
      // Match longer, more specific country codes first
      return b.code.length - a.code.length;
    })
    .filter(({ code, areaCodes }) => {
      if (!areaCodes) {
        return sanitizedValue.startsWith(code);
      }
      const noWhitespaceValue = sanitizedValue.replace(/\s/g, '');
      return areaCodes.some((areaCode) =>
        noWhitespaceValue.startsWith(`${code}${areaCode}`),
      );
    });

  if (isEmpty(matchedOptions)) {
    return {
      subscriberNumber: sanitizedValue,
    };
  }

  // When a user selects a country code, the PhoneNumberInput emits a change
  // event which contains only the country code (e.g. "+1") when the subscriber
  // number is empty. When used as a controlled input, this is passed back down
  // as the `value` prop. We can't definitely determine the country from an
  // incomplete phone number, thus we check the current input value to retain
  // the currently selected country if it matches the `value`.
  const matchedOption =
    matchedOptions.find((option) => option.country === currentCountry) ||
    matchedOptions[0];

  const subscriberNumber = sanitizedValue.split(matchedOption.code)[1].trim();

  if (!subscriberNumber) {
    return {
      countryCode: matchedOption.country,
    };
  }

  return {
    countryCode: matchedOption.country,
    subscriberNumber,
  };
}

export function normalizePhoneNumber(
  countryCode: string,
  subscriberNumber: string,
) {
  const normalizedSubscriberNumber = subscriberNumber
    // Strip non-numeric, non-whitespace characters
    .replace(/[^0-9\s]/g, ' ')
    // Replace unsupported whitespace characters with simple space
    .replace(/\s+/g, ' ')
    // Strip any leading zeros
    .replace(/^0+/, '');
  return `${countryCode}${normalizedSubscriberNumber}`;
}

export function mapCountryCodeOptions(
  countryCodeOptions: CountryCodeOption[],
  locale: Locale | undefined,
): Required<SelectProps>['options'] {
  const getCountryName = (country: string) => {
    // eslint-disable-next-line compat/compat
    const isIntlDisplayNamesSupported = typeof Intl.DisplayNames === 'function';

    // When Intl.DisplayNames is not supported, we can't provide the localized country names
    if (!isIntlDisplayNamesSupported || !country) {
      return country;
    }

    try {
      // eslint-disable-next-line compat/compat
      const displayName = new Intl.DisplayNames(locale, { type: 'region' });
      return displayName.of(country);
    } catch {
      return country;
    }
  };

  return countryCodeOptions
    .map(({ code, country }) => {
      const countryName = getCountryName(country);
      return {
        label: countryName ? `${countryName} (${code})` : code,
        value: country,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getCountryCode(
  options: CountryCodeOption[],
  country: string | undefined,
) {
  const option = options.find((o) => o.country === country);
  return option ? option.code : country;
}
