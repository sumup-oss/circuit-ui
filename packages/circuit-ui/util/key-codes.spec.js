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

import { isEnter, isSpacebar } from './key-codes';

describe('key codes', () => {
  describe('isEnter', () => {
    it('should return true if the enter key was pressed', () => {
      const event = { keyCode: 13, key: 'Enter', code: 'Enter' };
      const actual = isEnter(event);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const event = { keyCode: 32, key: ' ', code: 'Space' };
      const actual = isEnter(event);
      expect(actual).toBeFalsy();
    });
  });

  describe('isSpacebar', () => {
    it('should return true if the spacebar was pressed', () => {
      const event = { keyCode: 32, key: ' ', code: 'Space' };
      const actual = isSpacebar(event);
      expect(actual).toBeTruthy();
    });

    it('should return false if another key was pressed', () => {
      const event = { keyCode: 13, key: 'Enter', code: 'Enter' };
      const actual = isSpacebar(event);
      expect(actual).toBeFalsy();
    });
  });
});
