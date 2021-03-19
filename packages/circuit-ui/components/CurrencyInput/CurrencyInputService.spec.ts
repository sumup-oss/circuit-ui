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

import { formatPlaceholder } from './CurrencyInputService';

describe('CurrencyInputService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('formatPlaceholder', () => {
    it('should format a numeric placeholder', () => {
      const placeholder = 1234.56;
      const actual = formatPlaceholder(placeholder, 'en-US');
      const expected = '1,234.56';
      expect(actual).toBe(expected);
    });

    it('should return a string placeholder', () => {
      const placeholder = '1234.56';
      const actual = formatPlaceholder(placeholder, 'de-DE');
      const expected = placeholder;
      expect(actual).toBe(expected);
    });
  });
});
