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

import {
  isSameColor,
  isValidColor,
  normalizeColor,
} from './ColorInputService.js';

describe('ColorInputService', () => {
  describe('isValidColor', () => {
    it.each(['3F2', '#f3d', '123456', '#ABCDEF', '#A9C7d3'])(
      'should return true for %s',
      (color) => {
        const actual = isValidColor(color);
        expect(actual).toBe(true);
      },
    );

    it('should return false if the color contains letters outside the range A-F', () => {
      const actual = isValidColor('#ABG');
      expect(actual).toBe(false);
    });

    it('should return false if the color is too short', () => {
      const actual = isValidColor('#a0');
      expect(actual).toBe(false);
    });

    it('should return false if the color is between 3 and 6 characters long', () => {
      const actual = isValidColor('#04f28');
      expect(actual).toBe(false);
    });

    it('should return false if the color is too long', () => {
      const actual = isValidColor('a04f288');
      expect(actual).toBe(false);
    });
  });

  describe('isSameColor', () => {
    it('should return true if the colors are identical', () => {
      const actual = isSameColor('#fff', '#fff');
      expect(actual).toBe(true);
    });

    it.each([
      ['#f0d', '#ff00dd'],
      ['a04f28', '#a04f28'],
      ['#aabbcc', '#AABBCC'],
    ])(
      'should return true if the colors are equivalent (%s, %s)',
      (colorA, colorB) => {
        const actual = isSameColor(colorA, colorB);
        expect(actual).toBe(true);
      },
    );

    it.each([
      ['#f0e', '#ff00dd'],
      ['a04f28', '#a04f27'],
      ['#a04f28', '#a04f27'],
    ])(
      'should return false if the colors are different (%s, %s)',
      (colorA, colorB) => {
        const actual = isSameColor(colorA, colorB);
        expect(actual).toBe(false);
      },
    );
  });

  describe('normalizeColor', () => {
    it('should prefix a hashtag', () => {
      const actual = normalizeColor('aabbcc');
      expect(actual).toBe('#aabbcc');
    });

    it('should expand 3-char hex codes to 6 chars', () => {
      const actual = normalizeColor('aB4');
      expect(actual).toBe('#aabb44');
    });

    it('should lowercase the color', () => {
      const actual = normalizeColor('#AA00bb');
      expect(actual).toBe('#aa00bb');
    });
  });
});
