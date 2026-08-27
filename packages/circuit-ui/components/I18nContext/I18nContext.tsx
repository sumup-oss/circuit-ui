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

'use client';

import { createContext, useMemo, type ReactNode } from 'react';

import type { Locale } from '../../util/i18n.js';

export interface I18nConfig {
  locale: Locale;
  formattingLocale: Locale;
}

export interface I18nContextValue {
  locale: Locale | null;
  formattingLocale: Locale | null;
}

export const I18nContext = createContext<I18nContextValue>({
  locale: null,
  formattingLocale: null,
});

export interface I18nProviderProps {
  /**
   * The I18nProvider should wrap your entire application.
   */
  children: ReactNode;
  /**
   * The locale to use to localize translation strings.
   * Can be one or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   */
  locale: Locale;
  /**
   * A locale to use to format datetime and numeric values. Falls back to the `locale`.
   * Can be one or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   */
  formattingLocale?: Locale;
}

/**
 * Provide global internationalization context that is used by the
 * design system components to localize translation strings and to format
 * datetime and numeric values.
 * The `I18nProvider` should wrap your entire application.
 */
export function I18nProvider({
  children,
  locale,
  formattingLocale = locale,
}: I18nProviderProps) {
  const contextValue = useMemo(
    () => ({ locale, formattingLocale }),
    [locale, formattingLocale],
  );
  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
}
