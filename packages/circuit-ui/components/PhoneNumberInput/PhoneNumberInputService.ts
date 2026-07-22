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
  /**
   * Pre-computed option label. When set, takes precedence over
   * `getOptionLabel`, `shouldDisplayCountryNames`, and `Intl.DisplayNames`.
   */
  label?: string;
};

function getCountryName(country: string, locale: Locale | undefined) {
  // eslint-disable-next-line compat/compat
  const isIntlDisplayNamesSupported = typeof Intl.DisplayNames === 'function';

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
}

export function resolveCountryCodeOptionLabel(
  option: CountryCodeOption,
  locale: Locale | undefined,
  shouldDisplayCountryNames = true,
  getOptionLabel?: (option: CountryCodeOption) => string,
): string {
  if (option.label) {
    return option.label;
  }

  if (getOptionLabel) {
    return getOptionLabel(option);
  }

  if (!shouldDisplayCountryNames) {
    return option.code;
  }

  const countryName = getCountryName(option.country, locale);
  return countryName ? `${countryName} (${option.code})` : option.code;
}

export function parsePhoneNumber(
  value: string | undefined,
  options: CountryCodeOption[],
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
  shouldDisplayCountryNames = true,
  getOptionLabel?: (option: CountryCodeOption) => string,
): Required<SelectProps>['options'] {
  return countryCodeOptions
    .map((option) => ({
      label: resolveCountryCodeOptionLabel(
        option,
        locale,
        shouldDisplayCountryNames,
        getOptionLabel,
      ),
      value: option.country,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getCountryCode(
  options: CountryCodeOption[],
  country: string | undefined,
) {
  const option = options.find((o) => o.country === country);
  return option ? option.code : country;
}

export function getCountry(
  options: CountryCodeOption[],
  code: string | undefined,
) {
  const option = options.find((o) => o.code === code);
  return option?.country;
}

/**
 * Matches native `<select>` sizing: width is based on the longest option label,
 * not the currently selected one.
 */
export function getCountryCodeFieldWidth(
  mappedOptions: { label: string }[],
  size: 's' | 'm',
  hasPrefix: boolean,
): string | undefined {
  const longestLabel = mappedOptions.reduce(
    (longest, { label }) => (label.length > longest.length ? label : longest),
    '',
  );

  if (!longestLabel) {
    return undefined;
  }

  const chevronSpace =
    size === 's' ? 'var(--cui-spacings-tera)' : 'var(--cui-spacings-exa)';
  const leftPad = hasPrefix
    ? chevronSpace
    : size === 's'
      ? 'var(--cui-spacings-kilo)'
      : 'var(--cui-spacings-mega)';

  return `calc(${leftPad} + ${longestLabel.length}ch + ${chevronSpace})`;
}
