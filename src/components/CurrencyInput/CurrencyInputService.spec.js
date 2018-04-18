import { parseAmount } from './CurrencyInputService';

describe('CurrencyInputService', () => {
  it('should return the input value when it is falsy', () => {
    const actual = parseAmount();
    expect(actual).toBe(actual);
  });

  it('should return the input value when it has length zero', () => {
    const value = '';
    const actual = parseAmount(value);
    expect(actual).toBe(value);
  });

  it('should parse any non-zero-length string into a positive decimal number', () => {
    const values = ['20', 'abc', '19a', '-2', '   20,00', '0.assd8'];
    const expected = ['0.2', '0.00', '0.19', '0.02', '20', '0.08'];
    values.forEach((val, index) => {
      const actual = parseAmount(val, 10);
      expect(actual).toBe(expected[index]);
    });
  });
});
