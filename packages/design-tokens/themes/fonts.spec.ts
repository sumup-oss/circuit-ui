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

import { describe, it, expect } from 'vitest';

import { sumup } from './fonts.js';

// https://www.w3.org/TR/css-fonts-4/#unicode-range-desc
const UNICODE_RANGE = /^U\+[0-9A-F?]{1,6}(-[0-9A-F]{1,6})?$/i;

describe('fonts', () => {
  describe('sumup', () => {
    it.each(
      sumup
        .filter((fontFace) => fontFace['unicode-range'])
        .map((fontFace) => [fontFace.src, fontFace['unicode-range']]),
    )('should declare a valid unicode range for %s', (_src, unicodeRange) => {
      const invalid = unicodeRange
        .split(',')
        .map((range) => range.trim())
        .filter((range) => !UNICODE_RANGE.test(range));
      expect(invalid).toEqual([]);
    });
  });
});
