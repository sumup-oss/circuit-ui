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

import { SCHEMES } from '../../constants/card-schemes';
import {
  getPlaceholder,
  getMask,
  isValidSecurityCode
} from './SecurityCodeInputService';

describe('SecurityCodeInputService', () => {
  describe('providing placeholders', () => {
    it('should return a 4-digit placeholder for AMEX', () => {
      const actual = getPlaceholder(SCHEMES.AMEX).length;
      expect(actual).toBe(4);
    });

    it('should return a 3-digit for anything else', () => {
      const madeUpScheme = 'Foobar';
      const actual = getPlaceholder(madeUpScheme).length;
      expect(actual).toBe(3);
    });
  });

  describe('providing a text mask', () => {
    it('should provide a 4 digit mask for AMEX', () => {
      const expected = [/\d/, /\d/, /\d/, /\d/];
      const actual = getMask(SCHEMES.AMEX);
      expect(actual).toEqual(expected);
    });

    it('should provide a 3 digit mask for all schemes but AMEX', () => {
      const expected = [/\d/, /\d/, /\d/];
      const actual = getMask(SCHEMES.VISA);
      expect(actual).toEqual(expected);
    });
  });

  describe('validating input values', () => {
    it('should validate three digit security codes', () => {
      const validValue = '331';
      const actualValid = isValidSecurityCode(SCHEMES.VISA, validValue);
      expect(actualValid).toBeTruthy();
      const invalidValue = 'f31';
      const actualInvalid = isValidSecurityCode(SCHEMES.VISA, invalidValue);
      expect(actualInvalid).toBeFalsy();
    });

    it('should validate AMEX security codes', () => {
      const validValue = '1231';
      const actualValid = isValidSecurityCode(SCHEMES.AMEX, validValue);
      expect(actualValid).toBeTruthy();
      const invalidValue = '231';
      const actualInvalid = isValidSecurityCode(SCHEMES.AMEX, invalidValue);
      expect(actualInvalid).toBeFalsy();
    });
  });
});
