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

import * as regex from './regex';

describe('currency', () => {
  describe('currencyToRegex()', () => {
    it('should return a general currency regex.', () => {
      const actual = regex.currencyToRegex();
      expect(actual).toMatchSnapshot();
    });

    it('should return a default USD currency regex.', () => {
      const thousandSeparators = [','];
      const decimalNumbers = 2;
      const decimalSeparators = ['.'];
      const thousandGroupNumbers = 3;

      const actual = regex.currencyToRegex(
        thousandSeparators,
        decimalNumbers,
        decimalSeparators,
        thousandGroupNumbers,
      );
      expect(actual).toMatchSnapshot();
    });

    it('should return a default BGN currency regex.', () => {
      const thousandSeparators = [' '];
      const decimalNumbers = 2;
      const decimalSeparators = [','];
      const thousandGroupNumbers = 3;

      const actual = regex.currencyToRegex(
        thousandSeparators,
        decimalNumbers,
        decimalSeparators,
        thousandGroupNumbers,
      );
      expect(actual).toMatchSnapshot();
    });

    it('should return a default CLP currency regex.', () => {
      const thousandSeparators = ['.'];
      const decimalNumbers = 0;

      const actual = regex.currencyToRegex(thousandSeparators, decimalNumbers);
      expect(actual).toMatchSnapshot();
    });
  });
});
