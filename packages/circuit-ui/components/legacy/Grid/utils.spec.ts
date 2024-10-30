/**
 * Copyright 2019, SumUp Ltd.
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
import { light as theme } from '@sumup-oss/design-tokens';

import { composeBreakpoints, normalizeToNumber, wrapStyles } from './utils.js';

describe('Grid utils', () => {
  describe('normalizeToNumber', () => {
    it('should normalize a string to a number', () => {
      const value = '0';
      const actual = normalizeToNumber(value);
      expect(actual).toBe(0);
    });

    it('should return the value if it is already a number', () => {
      const value = 0;
      const actual = normalizeToNumber(value);
      expect(actual).toBe(0);
    });
  });

  describe('wrapStyles', () => {
    it('should return the styles wrapped in the provided breakpoint', () => {
      const breakpoint = 'kilo';
      const styles = 'padding: 0';
      const actual = wrapStyles(theme, breakpoint, styles);

      expect(actual.styles.replace(/\s+/g, ' ')).toContain(
        '@media (min-width: 480px) { padding: 0 }',
      );
    });

    it('should return the plain styles for the default breakpoint', () => {
      const breakpoint = 'default';
      const styles = 'padding: 0';
      const actual = wrapStyles(theme, breakpoint, styles);

      expect(actual.styles).toContain('padding: 0');
      expect(actual.styles).not.toContain('@media');
    });
  });

  describe('composeBreakpoints', () => {
    it('should throw on unsupported breakpoints in development', () => {
      const fn = vi.fn((_, __, option: number) => option);
      const breakpoints = {
        default: 0,
        mega: 1,
        killo: 2,
      };

      const test = () => composeBreakpoints(fn, theme, breakpoints);

      expect(test).toThrow(
        "The breakpoint 'killo' isn't supported by the grid.",
      );
    });

    it('should sort the breakpoints by their priority', () => {
      const fn = vi.fn((_, __, option: number) => option);
      const breakpoints = {
        default: 0,
        mega: 1,
        kilo: 2,
      };

      const actual = composeBreakpoints(fn, theme, breakpoints);

      expect(actual).toEqual([0, 2, 1]);
    });

    it('should call the create style function for each breakpoint', () => {
      const fn = vi.fn((_, __, option: number) => option);
      const breakpoints = {
        default: 0,
        mega: 1,
        kilo: 2,
      };

      composeBreakpoints(fn, theme, breakpoints);

      expect(fn).toHaveBeenCalledTimes(3);
      expect(fn).toHaveBeenCalledWith(theme, theme.grid.default, 0);
      expect(fn).toHaveBeenCalledWith(theme, theme.grid.mega, 1);
      expect(fn).toHaveBeenCalledWith(theme, theme.grid.kilo, 2);
    });
  });
});
