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

import * as StyleHelpers from './style-helpers';

describe('Style helpers', () => {
  describe('CSS unit calculations', () => {
    const a = '25px';
    const b = '5px';
    const c = 5;
    const d = '2rem';

    it('should add values of the same unit', () => {
      const actual = StyleHelpers.addUnit(a, b, c);
      const expected = '35px';
      expect(actual).toBe(expected);
    });

    it('should subtract values of the same unit', () => {
      const actual = StyleHelpers.subtractUnit(a, b, c);
      const expected = '15px';
      expect(actual).toBe(expected);
    });

    it('should multiply values of the same unit', () => {
      const actual = StyleHelpers.multiplyUnit(a, c);
      const expected = '125px';
      expect(actual).toBe(expected);
    });

    it('should divide values of the same unit', () => {
      const actual = StyleHelpers.divideUnit(a, c);
      const expected = '5px';
      expect(actual).toBe(expected);
    });

    it('should add values without a unit', () => {
      const actual = StyleHelpers.addUnit(a, b, c);
      const expected = '35px';
      expect(actual).toBe(expected);
    });

    it('should return undefined when values do not have the same unit', () => {
      const actual = StyleHelpers.addUnit(a, b, d);
      const expected = '32undefined';
      expect(actual).toBe(expected);
    });

    it('should return undefined when multiple values have a unit', () => {
      const actual = StyleHelpers.multiplyUnit(a, b);
      const expected = '125undefined';
      expect(actual).toBe(expected);
    });
  });
});
