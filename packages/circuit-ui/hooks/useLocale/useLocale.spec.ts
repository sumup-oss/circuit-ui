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

import { beforeAll, describe, expect, it, vi } from 'vitest';

import { act, renderHook } from '../../util/test-utils.js';

import { useLocale } from './useLocale.js';

describe('useLocale', () => {
  const navigatorLanguages = ['de-DE', 'de'];

  beforeAll(() => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(
      navigatorLanguages,
    );
  });

  it('should prioritize the custom locale over the browser locale', () => {
    const locale = 'fr-FR';
    const { result } = renderHook(() => useLocale(locale));
    expect(result.current).toBe(locale);
  });

  it('should return the browser locale', () => {
    const { result } = renderHook(() => useLocale());
    expect(result.current).toBe(navigatorLanguages);
  });

  it('should register only a single "languagechange" event listener', () => {
    const addEventListener = vi.spyOn(window, 'addEventListener');

    renderHook(() => useLocale());
    renderHook(() => useLocale());
    renderHook(() => useLocale());

    expect(addEventListener).toHaveBeenCalledOnce();
    expect(addEventListener).toHaveBeenCalledWith(
      'languagechange',
      expect.any(Function),
    );
  });

  it('should update the locale in response to the "languagechange" event', () => {
    const results = [
      renderHook(() => useLocale()),
      renderHook(() => useLocale()),
      renderHook(() => useLocale()),
    ];

    const updatedLocale = ['pt-BR'];

    act(() => {
      vi.spyOn(window.navigator, 'languages', 'get').mockReturnValueOnce(
        updatedLocale,
      );
      window.dispatchEvent(new Event('languagechange'));
    });

    results.forEach(({ result }) => {
      expect(result.current).toBe(updatedLocale);
    });
  });
});
