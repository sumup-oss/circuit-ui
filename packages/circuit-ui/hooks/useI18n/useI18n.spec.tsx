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

import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

import { renderHook } from '../../util/test-utils.js';
import { getDefaultLocale } from '../../util/i18n.js';
import { I18nProvider } from '../../components/I18nContext/I18nContext.js';

import { useI18n } from './useI18n.js';

function getMockedDefaultLocale() {
  return ['de-DE', 'de'];
}

vi.mock('../../util/i18n.ts', () => ({
  getDefaultLocale: vi.fn(getMockedDefaultLocale),
}));

describe('useI18n', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return the default locale', () => {
    const defaultLocale = getMockedDefaultLocale();
    const { result } = renderHook(() => useI18n({}));
    expect(result.current).toEqual({
      locale: defaultLocale,
      formattingLocale: defaultLocale,
    });
  });

  it('should prioritize custom locales over the default locales', () => {
    const locale = 'fr-FR';
    const formattingLocale = 'en-US';
    const { result } = renderHook(() => useI18n({ locale, formattingLocale }));
    expect(result.current).toEqual({ locale, formattingLocale });
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

  it('should default the formattingLocale to the locale', () => {
    const locale = 'fr-FR';
    const { result } = renderHook(() => useI18n({ locale }));
    expect(result.current).toEqual({ locale, formattingLocale: locale });
  });

  it('should update the locale on the client', () => {
    const updatedLocale = 'pt-BR';
    (getDefaultLocale as Mock).mockReturnValue(updatedLocale);
    const { result } = renderHook(() => useI18n({}));
    expect(result.current).toEqual({
      locale: updatedLocale,
      formattingLocale: updatedLocale,
    });
  });
});
