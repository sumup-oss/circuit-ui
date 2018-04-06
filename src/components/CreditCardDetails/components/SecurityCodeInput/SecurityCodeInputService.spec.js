import { schemes } from '../..';
import { getPlaceholder } from './SecurityCodeInputService';

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
});
