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

import { useContext, useEffect, useState } from 'react';

import { getDefaultLocale, type Locale } from '../../util/i18n.js';
import {
  I18nContext,
  type I18nConfig,
} from '../../components/I18nContext/I18nContext.js';

/**
 * Provides localization context, either from the I18nProvider or the current
 * browser/system language.
 */
export function useI18n({
  locale: customLocale,
  // TODO: Remove this fallback in v12 once the deprecated `locale` props have been removed.
  formattingLocale: customFormattingLocale = customLocale,
}: Partial<I18nConfig>): I18nConfig {
  const {
    locale: globalLocale,
    formattingLocale: globalFormattingLocale,
    isDefault,
  } = useContext(I18nContext);
  const [locale, setLocale] = useState<Locale>(customLocale || globalLocale);
  const [formattingLocale, setFormattingLocale] = useState<Locale>(
    customFormattingLocale || globalFormattingLocale || locale,
  );

  // Update the locales after hydration on the client
  useEffect(() => {
    if (customLocale || (globalLocale && !isDefault)) {
      return;
    }

    setLocale(getDefaultLocale());
  }, [customLocale, globalLocale, isDefault]);

  useEffect(() => {
    if (customFormattingLocale || (globalFormattingLocale && !isDefault)) {
      return;
    }

    setFormattingLocale(getDefaultLocale());
  }, [customFormattingLocale, globalFormattingLocale, isDefault]);

  return { locale, formattingLocale };
}
