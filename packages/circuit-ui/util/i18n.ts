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

export type Locale = string | string[];
export type Translations = Record<string, string>;

export const FALLBACK_LOCALE = 'en-US';

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

export function createTranslate(
  modules: Record<string, Translations>,
  locale: Locale,
) {
  const languages = Object.entries(modules).map(
    ([importPath, translations]) => {
      const matches = importPath.match(/[a-z]{2}-[A-Z]{2}/);

      if (!matches) {
        throw new Error(
          `Failed to extract a language from the import path: ${importPath}`,
        );
      }

      return { language: matches[0], translations };
    },
  );

  const locales = isString(locale) ? [locale] : locale;

  let translations: Translations;

  // eslint-disable-next-line no-restricted-syntax
  for (const l of locales) {
    let match: { language: string; translations: Translations } | undefined;

    if (l.length === 5) {
      match = languages.find(({ language }) => language === l);
    } else {
      match = languages.find(({ language }) => language.startsWith(l));
    }

    if (match) {
      translations = match.translations;
      break;
    }
  }

  const fallbackLanguage = languages.find(
    ({ language }) => language === FALLBACK_LOCALE,
  );

  if (!fallbackLanguage) {
    throw new Error('TODO:');
  }

  const fallbackTranslations = fallbackLanguage.translations;

  return (key: string, values?: Record<string, string>) => {
    const text = translations[key] || fallbackTranslations[key];
    return interpolate(text, values);
  };
}

export function interpolate(text: string, values: Record<string, string> = {}) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, value) => {
    if (!isString(value)) {
      throw new Error('TODO:');
    }
    if (!(value in values)) {
      throw new Error('TODO:');
    }
    return values[value];
  });
}
