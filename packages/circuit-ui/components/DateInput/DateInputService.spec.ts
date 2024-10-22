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

import { describe, expect, it } from 'vitest';

import { getDateSegments } from './DateInputService.js';

describe('DateInputService', () => {
  describe('getDateSegments', () => {
    it.each([
      // locale, year, month, day
      ['en-US', [4, 0, 2]],
      ['de-DE', [4, 2, 0]],
      ['pt-BR', [4, 2, 0]],
    ])('should order the segments for the %s locale', (locale, indices) => {
      const actual = getDateSegments(locale);
      const year = actual.findIndex(({ type }) => type === 'year');
      const month = actual.findIndex(({ type }) => type === 'month');
      const day = actual.findIndex(({ type }) => type === 'day');
      expect([year, month, day]).toEqual(indices);
    });

    it.each([
      // locale, literal
      ['en-US', '/'],
      ['de-DE', '.'],
      ['pt-BR', '/'],
    ])('should return the literal for the %s locale', (locale, literal) => {
      const actual = getDateSegments(locale);
      const literalSegment = actual.find(({ type }) => type === 'literal');
      expect(literalSegment?.value).toBe(literal);
    });
  });
});
