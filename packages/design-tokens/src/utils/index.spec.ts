/**
 * Copyright 2020, SumUp Ltd.
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

import { Breakpoints } from '../types';
import { createMediaQueries } from '.';

describe('Utils', () => {
  describe('createMediaQueries', () => {
    it('should turn numeric breakpoints into min-width media queries', () => {
      const breakpoints = { mega: 1000 } as Breakpoints;
      const actual = createMediaQueries(breakpoints);
      const expected = expect.objectContaining({
        mega: '@media (min-width: 1000px)',
      });
      expect(actual).toEqual(expected);
    });

    it('should turn string expressions into media queries', () => {
      const breakpoints = { untilMega: '(max-width: 1000px)' } as Breakpoints;
      const actual = createMediaQueries(breakpoints);
      const expected = expect.objectContaining({
        untilMega: '@media (max-width: 1000px)',
      });
      expect(actual).toEqual(expected);
    });
  });
});
