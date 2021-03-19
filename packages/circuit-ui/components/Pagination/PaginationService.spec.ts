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

import * as PaginationService from './PaginationService';

describe('PaginationService', () => {
  describe('generatePages', () => {
    it('should generate an array or pages of n length', () => {
      const actual = PaginationService.generatePages(5);
      const expected = [1, 2, 3, 4, 5];

      expect(actual).toEqual(expected);
    });
  });
});
