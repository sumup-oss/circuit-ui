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

import { useContext } from 'react';

import {
  I18nContext,
  type I18nConfig,
} from '../../components/I18nContext/I18nContext.js';
import { CircuitError } from '../../util/errors.js';
import { FALLBACK_LOCALE } from '../../util/i18n.js';

/**
 * Provides localization context from the I18nProvider.
 */
export function useI18n({
  locale: customLocale,
  formattingLocale: customFormattingLocale,
}: Partial<I18nConfig>): I18nConfig {
  const { locale: globalLocale, formattingLocale: globalFormattingLocale } =
    useContext(I18nContext);

  if (process.env.NODE_ENV !== 'production' && !globalLocale) {
    throw new CircuitError(
      'Internationalization',
      'Missing internationalization context. Make sure the `I18nProvider` component wraps your entire app component tree.',
    );
  }

  return {
    locale: customLocale || globalLocale || FALLBACK_LOCALE,
    formattingLocale:
      customFormattingLocale || globalFormattingLocale || FALLBACK_LOCALE,
  };
}
