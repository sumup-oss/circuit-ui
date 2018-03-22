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
        thousandGroupNumbers
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
        thousandGroupNumbers
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
