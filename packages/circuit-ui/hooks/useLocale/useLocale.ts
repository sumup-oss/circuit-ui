'use client';

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

import { useEffect, useState } from 'react';

import { getDefaultLocale, type Locale } from '../../util/i18n.js';

const listeners = new Set<(locale: Locale) => void>();

function updateLocale() {
  const currentLocale = getDefaultLocale();
  for (const listener of listeners) {
    listener(currentLocale);
  }
}

/**
 * Returns the current browser/system language, and updates when it changes.
 */
export function useLocale(customLocale?: Locale): Locale {
  const [locale, setLocale] = useState<Locale>(getDefaultLocale());

  useEffect(() => {
    if (customLocale) {
      return undefined;
    }

    // Update the locale after hydration on the client
    setLocale(getDefaultLocale());

    // Share a single listener between hook instances to optimize performance
    if (listeners.size === 0) {
      window.addEventListener('languagechange', updateLocale);
    }

    listeners.add(setLocale);

    return () => {
      listeners.delete(setLocale);
      if (listeners.size === 0) {
        window.removeEventListener('languagechange', updateLocale);
      }
    };
  }, [customLocale]);

  return customLocale || locale;
}
