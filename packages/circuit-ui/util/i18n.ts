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

import { isString } from './type-check.js';

export const FALLBACK_LOCALE = 'en-US';

export const SUPPORTED_LOCALES = [
  'bg-BG',
  'cs-CZ',
  'da-DK',
  'de-AT',
  'de-CH',
  'de-DE',
  'de-LU',
  'el-CY',
  'el-GR',
  'en-AU',
  'en-GB',
  'en-IE',
  'en-MT',
  'en-US',
  'es-CL',
  'es-CO',
  'es-ES',
  'es-MX',
  'es-PE',
  'es-US',
  'et-EE',
  'fi-FI',
  'fr-BE',
  'fr-CH',
  'fr-FR',
  'fr-LU',
  'hr-HR',
  'hu-HU',
  'it-CH',
  'it-IT',
  'lt-LT',
  'lv-LV',
  'nb-NO',
  'nl-BE',
  'nl-NL',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ro-RO',
  'sk-SK',
  'sl-SI',
  'sv-SE',
] as const;

export type Locale = string | string[];
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export type Translations<Key extends string | number | symbol> = Record<
  SupportedLocale,
  Record<Key, string>
>;

/**
 * Returns the user's preferred locale(s) in browser-like environments.
 */
export function getDefaultLocale(): Locale {
  if (typeof window === 'undefined') {
    return FALLBACK_LOCALE;
  }
  return (navigator.languages ||
    navigator.language ||
    FALLBACK_LOCALE) as Locale;
}

/**
 * Returns the first supported locale.
 */
export function findSupportedLocale(locale: Locale): SupportedLocale {
  const locales = isString(locale) ? [locale] : locale;

  // eslint-disable-next-line no-restricted-syntax
  for (const l of locales) {
    const matcher =
      locale.length === 5
        ? (value: string) => value === l
        : (value: string) => value.startsWith(l);

    const match = SUPPORTED_LOCALES.find(matcher);

    if (match) {
      return match;
    }
  }

  return FALLBACK_LOCALE;
}

export function transformModulesToTranslations<
  T extends Record<string, string>,
  Key extends string | number | symbol = keyof T,
>(modules: Record<string, T>): Translations<Key> {
  const translations = Object.entries(modules).reduce(
    (acc, [importPath, exports]) => {
      const { default: unused, ...strings } = exports;
      const matches = importPath.match(/[a-z]{2}-[A-Z]{2}/);

      // @ts-expect-error This environment variable is set by Vite.
      if (import.meta.env.DEV && !matches) {
        throw new Error(
          `Failed to extract a locale from the import path: ${importPath}`,
        );
      }

      // biome-ignore lint/style/noNonNullAssertion:
      const locale = matches![0] as SupportedLocale;

      // @ts-expect-error This environment variable is set by Vite.
      if (import.meta.env.DEV && !SUPPORTED_LOCALES.includes(locale)) {
        throw new Error(`Unsupported locale: ${importPath}`);
      }

      acc[locale] = strings as unknown as Record<Key, string>;
      return acc;
    },
    {} as Translations<Key>,
  );

  // @ts-expect-error This environment variable is set by Vite.
  if (import.meta.env.DEV) {
    SUPPORTED_LOCALES.forEach((locale) => {
      if (!translations[locale]) {
        throw new Error(`Missing translations for locale ${locale}`);
      }
    });
  }

  return translations;
}
