import { schemes } from '../..';
import {
  getPlaceholder,
  parseSecurityCode,
  validateSecurityCode
} from './SecurityCodeInputService';

describe('SecurityCodeInputService', () => {
  const { SCHEMES } = schemes;

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

  describe('parsing input values', () => {
    it('should parse only digits', () => {
      const value = '   324-khsdlkjfhs';
      const expected = '324';
      const actual = parseSecurityCode('', value);
      expect(actual).toBe(expected);
    });

    it('should parse partial values', () => {
      const value = '1';
      const expected = '1';
      const actual = parseSecurityCode('', value);
      expect(actual).toBe(expected);
    });

    it('should limit the value to three digits by default', () => {
      const value = '1234';
      const expected = '123';
      const actual = parseSecurityCode('randomScheme', value);
      expect(actual).toBe(expected);
    });

    it('should limit the value to three four digits for AMEX', () => {
      const value = '12345';
      const expected = '1234';
      const actual = parseSecurityCode(SCHEMES.AMEX, value);
      expect(actual).toBe(expected);
    });
  });

  describe('validating input values', () => {
    it('should detect an empty value', () => {
      const value = '';
      const actual = validateSecurityCode('', value).required;
      expect(actual).toBeTruthy();
    });

    it('should detect a falsy value', () => {
      const value = undefined;
      const actual = validateSecurityCode('', value).required;
      expect(actual).toBeTruthy();
    });

    it('should detect pattern errors', () => {
      const value = 'f231';
      const actual = validateSecurityCode('', value).pattern;
      expect(actual).toBeTruthy();
    });

    it('should detect pattern errors for AMEX', () => {
      const value = '231';
      const actual = validateSecurityCode(SCHEMES.AMEX, value).pattern;
      expect(actual).toBeTruthy();
    });
  });
});
