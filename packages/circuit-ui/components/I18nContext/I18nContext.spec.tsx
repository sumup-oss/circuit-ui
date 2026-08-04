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

import { describe, expect, it, vi } from 'vitest';

import { render } from '../../util/test-utils.js';

import { I18nContext, I18nProvider, type I18nConfig } from './I18nContext.js';
import { useContext } from 'react';

describe('I18nContext', () => {
  describe('I18nProvider', () => {
    function TestChild({ callback }: { callback: (i18n: I18nConfig) => void }) {
      const i18n = useContext(I18nContext);
      callback(i18n);
      return null;
    }

    it('should pass the locale and formattingLocale to children as context', () => {
      const callback = vi.fn();
      const locale = 'de-DE';
      const formattingLocale = ['en-US', 'en'];
      render(
        <I18nProvider locale={locale} formattingLocale={formattingLocale}>
          <TestChild callback={callback} />
        </I18nProvider>,
      );
      expect(callback).toHaveBeenCalledWith({
        locale,
        formattingLocale,
        isDefault: false,
      });
    });

    it('should default the formattingLocale to the locale when omitted', () => {
      const callback = vi.fn();
      const locale = 'de-DE';
      render(
        <I18nProvider locale={locale}>
          <TestChild callback={callback} />
        </I18nProvider>,
      );
      expect(callback).toHaveBeenCalledWith({
        locale,
        formattingLocale: locale,
        isDefault: false,
      });
    });
  });
});
