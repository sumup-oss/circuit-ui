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

import { describe, expect, it, vi } from 'vitest';

import { renderHook } from '../../util/test-utils.js';
import type { Locale } from '../../util/i18n.js';

import { useI18n } from './useI18n.js';

type Props = {
  locale?: Locale;
  greeting?: string;
  foo?: string;
  onFoo?: () => void;
};

describe('useI18n', () => {
  const translations = {
    'en-US': { greeting: 'Hello' },
    'de-DE': { greeting: 'Hallo' },
  };

  it('should return translations for the provided locale', () => {
    const props: Props = { locale: 'de-DE' };
    const { result } = renderHook(() => useI18n(props, translations));
    expect(result.current.locale).toBe('de-DE');
    expect(result.current.greeting).toBe('Hallo');
  });

  it('should return the custom translation when provided', () => {
    const props: Props = { greeting: 'Salut' };
    const { result } = renderHook(() => useI18n(props, translations));
    expect(result.current.greeting).toBe('Salut');
  });

  it('should forward all other props', () => {
    const props: Props = { foo: 'bar', onFoo: vi.fn() };
    const { result } = renderHook(() => useI18n(props, translations));
    expect(result.current).toEqual(expect.objectContaining(props));
  });
});
