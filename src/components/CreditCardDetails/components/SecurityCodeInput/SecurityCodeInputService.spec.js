import { schemes } from '../..';
import {
  getPlaceholder,
  parseSecurityCode,
  isValidSecurityCode
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
