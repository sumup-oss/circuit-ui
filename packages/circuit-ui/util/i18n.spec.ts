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

import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest';

import { DEFAULT_LOCALE, getBrowserLocale } from './i18n';

describe('i18n', () => {
  describe('getBrowserLocale', () => {
    const originalWindow = window;
    let languagesGetter: MockInstance;
    let languageGetter: MockInstance;

    beforeEach(() => {
      window = originalWindow;
      languagesGetter = vi.spyOn(window.navigator, 'languages', 'get');
      languageGetter = vi.spyOn(window.navigator, 'language', 'get');
    });

    it('should return the default locale in server environments', () => {
      // @ts-expect-error The window object is undefined in server environments
      window = undefined;
      const actual = getBrowserLocale();
      expect(actual).toBe(DEFAULT_LOCALE);
    });

    it('should return the preferred locales', () => {
      const languages = ['de-DE', 'en'];
      languagesGetter.mockReturnValue(languages);
      const actual = getBrowserLocale();
      expect(actual).toEqual(languages);
    });

    it('should fall back to the preferred locale', () => {
      const language = 'de-DE';
      languagesGetter.mockReturnValue(undefined);
      languageGetter.mockReturnValue(language);
      const actual = getBrowserLocale();
      expect(actual).toEqual(language);
    });

    it('should fall back to the default locale', () => {
      languagesGetter.mockReturnValue(undefined);
      languageGetter.mockReturnValue(undefined);
      const actual = getBrowserLocale();
      expect(actual).toEqual(DEFAULT_LOCALE);
    });
  });
});
