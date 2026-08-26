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

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderHook } from '../../util/test-utils.js';
import { I18nProvider } from '../../components/I18nContext/I18nContext.js';

import { useI18n } from './useI18n.js';

describe('useI18n', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return the global locale', () => {
    const globalLocale = ['de-DE', 'de'];
    const { result } = renderHook(() => useI18n({}), {
      wrapper: ({ children }) => (
        <I18nProvider locale={globalLocale}>{children}</I18nProvider>
      ),
    });
    expect(result.current).toEqual({
      locale: globalLocale,
      formattingLocale: globalLocale,
    });
  });

  it('should prioritize custom locales over the global locales', () => {
    const globalLocale = 'de-DE';
    const locale = 'fr-FR';
    const formattingLocale = 'en-US';
    const { result } = renderHook(() => useI18n({ locale, formattingLocale }), {
      wrapper: ({ children }) => (
        <I18nProvider locale={globalLocale}>{children}</I18nProvider>
      ),
    });
    expect(result.current).toEqual({ locale, formattingLocale });
  });
});
